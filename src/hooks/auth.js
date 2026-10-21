"use client";
import { useState, useSyncExternalStore } from "react";
import PocketBase, { BaseAuthStore, getTokenPayload } from "pocketbase";
import { pb, dbUrl } from "../pocketbase";

const collection = "users";
let snapshot;
// Keep one auth request active across every component using this hook.
let activeOperation;

function getSnapshot() {
  const token = pb.authStore.token;
  const record = pb.authStore.record;
  // LocalAuthStore can deserialize a new object on every read. React needs a
  // stable snapshot until the actual account data changes.
  const recordKey = JSON.stringify(record);
  const valid = pb.authStore.isValid;
  if (
    !snapshot ||
    snapshot.token !== token ||
    snapshot.recordKey !== recordKey ||
    snapshot.valid !== valid
  ) {
    snapshot = { token, record, recordKey, valid };
  }
  return snapshot;
}

function subscribe(notify) {
  let timer;

  function changed() {
    clearTimeout(timer);
    notify();
    const expires = getTokenPayload(pb.authStore.token).exp;
    if (pb.authStore.isValid && Number.isFinite(expires)) {
      // authStore emits on save/clear, but not when time alone expires a token.
      timer = setTimeout(
        function handleTimeout() {
          if (!pb.authStore.isValid) pb.authStore.clear();
          changed();
        },
        Math.min(expires * 1000 - Date.now() + 50, 2147483647),
      );
    }
  }

  const unsubscribe = pb.authStore.onChange(changed);
  changed();
  return function cleanup() {
    clearTimeout(timer);
    unsubscribe();
  };
}

// The server cannot read browser storage. Start with no account and let hydration read the saved login.
function serverSnapshot() {
  return null;
}

function cancelled() {
  const error = new Error(
    "Authentication changed while the request was running. Try again if needed.",
  );
  error.code = "AUTH_CANCELLED";
  return error;
}

function credentials({ email, username, password } = {}) {
  const identity = (username || email || "").trim();
  if (!identity || !password)
    throw new Error("Enter your email (or configured username) and password.");
  return { identity, password };
}

export function useAuth() {
  // Subscribe to the shared auth store so every mounted component sees the current account.
  const state = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);

  // Run auth work in an isolated client, then publish it only if the account has not changed.
  async function run(action) {
    setError(null);
    if (activeOperation) {
      const busy = new Error(
        "Another authentication request is running. Wait for it or sign out to cancel it.",
      );
      setError(busy);
      throw busy;
    }
    const operation = new AbortController();
    activeOperation = operation;
    setPending(true);
    // An isolated store stops the SDK from publishing stale login/refresh results.
    const client = new PocketBase(dbUrl, new BaseAuthStore());
    client.authStore.save(pb.authStore.token, pb.authStore.record);
    let unsubscribe = pb.authStore.onChange(function handleStoreChange() {
      return operation.abort();
    });
    const options = { requestKey: null, signal: operation.signal };

    function ensureCurrent() {
      if (operation.signal.aborted || activeOperation !== operation)
        throw cancelled();
    }

    function publish(token, record) {
      ensureCurrent();
      unsubscribe();
      unsubscribe = function handleValue() {};
      pb.authStore.save(token, record);
    }

    try {
      const result = await action(client, options, publish, ensureCurrent);
      ensureCurrent();
      return result;
    } catch (failure) {
      const result = operation.signal.aborted ? cancelled() : failure;
      if (!operation.signal.aborted) setError(result);
      throw result;
    } finally {
      unsubscribe();
      if (activeOperation === operation) activeOperation = null;
      setPending(false);
    }
  }

  // Sign in with ordinary user credentials. The auth store subscription updates every mounted consumer.
  function login(data) {
    return run(async function handleClient(client, options, publish) {
      const { identity, password } = credentials(data);
      // Login must use an anonymous client even when another account is signed in.
      client.authStore.clear();
      const response = await client
        .collection(collection)
        .authWithPassword(identity, password, options);
      publish(response.token, response.record);
      return response.record;
    });
  }

  // Account creation and login are separate requests. Report a partial success if only login fails.
  function signup(data) {
    return run(
      async function handleClient(client, options, publish, ensureCurrent) {
        const { identity, password } = credentials(data);
        if (!data.passwordConfirm) throw new Error("Confirm your password.");
        client.authStore.clear();
        await client
          .collection(collection)
          .create(
            { ...data, emailVisibility: data.emailVisibility ?? false },
            options,
          );
        ensureCurrent();
        try {
          const response = await client
            .collection(collection)
            .authWithPassword(identity, password, options);
          publish(response.token, response.record);
          return response.record;
        } catch (cause) {
          ensureCurrent();
          const partial = new Error(
            "Your account was created, but sign-in failed. Try signing in; do not sign up again.",
            { cause },
          );
          partial.code = "SIGNUP_LOGIN_FAILED";
          partial.accountCreated = true;
          // Preserve validation/MFA details for callers without retaining passwords.
          partial.response = cause.response;
          partial.status = cause.status;
          throw partial;
        }
      },
    );
  }

  // Ask PocketBase to validate the saved token. A temporary network failure should not sign the user out.
  function refresh() {
    return run(async function handleClient(client, options, publish) {
      if (
        !client.authStore.token ||
        client.authStore.record?.collectionName !== collection
      ) {
        throw new Error("Sign in to refresh your account.");
      }
      try {
        const response = await client
          .collection(collection)
          .authRefresh(options);
        publish(response.token, response.record);
        return response.record;
      } catch (failure) {
        // Only a definitive rejection clears auth. Offline/5xx failures preserve it.
        if ([401, 403, 404].includes(failure.status)) publish("", null);
        throw failure;
      }
    });
  }

  // PocketBase requires the old password. Clear the shared login after the password changes.
  function changePassword({ oldPassword, password, passwordConfirm } = {}) {
    return run(async function handleClient(client, options, publish) {
      const user = client.authStore.record;
      if (!client.authStore.isValid || user?.collectionName !== collection)
        throw new Error("Sign in before changing your password.");
      if (!oldPassword || !password || !passwordConfirm)
        throw new Error(
          "Enter your current password and confirm your new password.",
        );
      const record = await client
        .collection(collection)
        .update(user.id, { oldPassword, password, passwordConfirm }, options);
      publish("", null);
      return record;
    });
  }

  // Cancel unfinished auth work before clearing browser auth, so an old response cannot sign the user back in.
  function logout() {
    activeOperation?.abort();
    // Keep the request lock until the cancelled request finishes.
    pb.authStore.clear();
    setError(null);
  }

  const user =
    state?.valid && state.record?.collectionName === collection
      ? state.record
      : null;
  return {
    user,
    isAuthenticated: !!user,
    isReady: state !== null,
    isPending,
    error,
    clearError: function clearError() {
      return setError(null);
    },
    login,
    signup,
    logout,
    refresh,
    changePassword,
  };
}
