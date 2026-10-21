"use client";
import { useSyncExternalStore } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pb, dbUrl, getAccountKey } from "../pocketbase";

const requestOptions = { requestKey: null };

function subscribe(notify) {
  return pb.authStore.onChange(function handleStoreChange() {
    return notify();
  });
}

function serverAccount() {
  return "anonymous";
}

// Keep SDK errors intact; expose their validation messages without form/UI dependencies.
export function getDatabaseFieldErrors(error) {
  const data = error?.response?.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};
  return Object.fromEntries(
    Object.entries(data)
      .filter(function matchesEntry([, detail]) {
        return typeof detail?.message === "string";
      })
      .map(function mapEntry([field, detail]) {
        return [field, detail.message];
      }),
  );
}

// Separate cached records by database URL, signed-in account, and collection.
function useCollectionKey(collection) {
  // Subscribe to the shared auth store so every mounted component sees the current account.
  const account = useSyncExternalStore(subscribe, getAccountKey, serverAccount);
  return ["pocketbase", dbUrl, account, collection];
}

// Object filters mean exact matches. Let the SDK escape values before building a filter string.
function prepareOptions(options = {}) {
  const { filter, ...rest } = options;
  if (filter == null || typeof filter === "string") return { ...rest, filter };
  if (typeof filter !== "object" || Array.isArray(filter)) {
    throw new TypeError(
      "filter must be a PocketBase expression or equality object.",
    );
  }
  const clauses = Object.entries(filter).map(function mapEntry([field, value]) {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*$/.test(field)) {
      throw new TypeError(
        "Use field names or dotted field paths in object filters.",
      );
    }
    return pb.filter(`${field} = {:value}`, { value });
  });
  return { ...rest, filter: clauses.join(" && ") };
}

// Expose the same mutation as call (callbacks) and callAsync (a promise). Errors remain available on the hook.
function withAliases(mutation) {
  return {
    ...mutation,
    call: mutation.mutate,
    callAsync: mutation.mutateAsync,
  };
}

// Read an array of records. Passing null pauses the request until its setup or selection is ready.
export function useList(collection, options = {}) {
  const key = useCollectionKey(collection);
  return useQuery({
    queryKey: [...key, "list", options],
    enabled: !!collection,
    queryFn: function loadRecords({ signal }) {
      return pb.collection(collection).getFullList({
        ...prepareOptions(options),
        ...requestOptions,
        signal,
      });
    },
  });
}

// Read one record by its saved ID. A missing ID keeps this query paused.
export function useFind(collection, id) {
  const key = useCollectionKey(collection);
  return useQuery({
    queryKey: [...key, "record", id],
    enabled: !!collection && !!id,
    queryFn: function loadRecord({ signal }) {
      return pb.collection(collection).getOne(id, {
        ...requestOptions,
        signal,
      });
    },
  });
}

// Ask PocketBase to build the file URL from its saved record and filename.
export function getUrl(record, filename, options) {
  return pb.files.getURL(record, filename, options);
}

// Create one record. Invalidate this collection’s queries so mounted lists read the saved values again.
export function useInsert(collection) {
  const key = useCollectionKey(collection);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationKey: [...key, "insert"],
    mutationFn: function saveRecord(data) {
      return pb.collection(collection).create(data, requestOptions);
    },
    onSuccess: function handleSuccess() {
      return qc.invalidateQueries({ queryKey: key });
    },
  });
  return withAliases(mutation);
}

// Update the existing ID with changed fields. This does not create a second record.
export function useUpdate(collection) {
  const key = useCollectionKey(collection);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationKey: [...key, "update"],
    mutationFn: function saveRecord({ id, set }) {
      return pb.collection(collection).update(id, set, requestOptions);
    },
    onSuccess: function handleSuccess() {
      return qc.invalidateQueries({ queryKey: key });
    },
  });
  return {
    ...mutation,
    call: function handleCall(id, set, callbacks) {
      return mutation.mutate({ id, set }, callbacks);
    },
    callAsync: function handleCallAsync(id, set, callbacks) {
      return mutation.mutateAsync({ id, set }, callbacks);
    },
  };
}

// Delete one record by ID and refresh the collection after success.
export function useRemove(collection) {
  const key = useCollectionKey(collection);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationKey: [...key, "remove"],
    mutationFn: function deleteRecord(id) {
      return pb.collection(collection).delete(id, requestOptions);
    },
    onSuccess: function handleSuccess() {
      return qc.invalidateQueries({ queryKey: key });
    },
  });
  return withAliases(mutation);
}

// Deletes only the supplied query's records. Never fetches a wider selection.
// Accept a loaded list explicitly, so deleting a filtered result cannot silently delete the whole collection.
export function useRemoveAll(collection) {
  const key = useCollectionKey(collection);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationKey: [...key, "remove-all"],
    mutationFn: async function deleteListedRecords(list) {
      if (!Array.isArray(list?.data)) {
        throw new TypeError("Pass the useList result to removeAll.call(list).");
      }
      const ids = [
        ...new Set(
          list.data.map(function mapRecord(record) {
            return record?.id;
          }),
        ),
      ];
      if (
        ids.some(function matchesId(id) {
          return typeof id !== "string" || !id;
        })
      ) {
        throw new TypeError("Every supplied record must have an id.");
      }
      for (const id of ids)
        await pb.collection(collection).delete(id, requestOptions);
      return ids.length;
    },
    // Earlier deletes may have succeeded when a later one fails.
    onSettled: function refreshQueries() {
      return qc.invalidateQueries({ queryKey: key });
    },
  });
  return withAliases(mutation);
}

// Explicit mutation: declaring this hook never inserts data by itself.
// Load sample records only when asked. Declaring this hook must never write during rendering.
export function usePreload(collection, defaultData) {
  const key = useCollectionKey(collection);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationKey: [...key, "preload"],
    // Serializes seed attempts for this collection/account in this QueryClient.
    scope: { id: JSON.stringify([...key, "preload"]) },
    mutationFn: async function seedEmptyCollection() {
      if (!Array.isArray(defaultData))
        throw new TypeError("defaultData must be an array of records.");
      if (!defaultData.length) return [];
      const existing = await pb.collection(collection).getList(1, 1, {
        ...requestOptions,
        fields: "id",
        skipTotal: true,
      });
      if (existing.items.length) return [];
      const inserted = [];
      for (const record of defaultData) {
        inserted.push(
          await pb.collection(collection).create(record, requestOptions),
        );
      }
      return inserted;
    },
    onSettled: function refreshQueries() {
      return qc.invalidateQueries({ queryKey: key });
    },
  });
  return withAliases(mutation);
}
