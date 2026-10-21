# Authentication with PocketBase

Use the `useAuth` hook from `src/hooks/auth.js`. It works with the shared client in `src/pocketbase.js`, PocketBase server **v0.40.x**, and JavaScript SDK **0.28.1**.

## Set up your server

1. Find your database URL in the LMS. Add it to `src/pocketbase.js`.
2. In the PocketBase dashboard, use an **auth** collection named `users`. An ordinary base collection cannot sign people in.
3. Enable Identity/Password authentication. Set `email` as an identity field.
4. Include a text field named `name`. The signup form sends it with the email and passwords.
5. Set the minimum password length to 8, matching the signup form. Stronger server rules are allowed; update the form to match.
6. For this basic flow, leave mandatory email verification and MFA off. Those features need additional screens and mail configuration.
7. Set the rules below deliberately. The starter does not change hosted rules for you.

| Auth collection rule | Value                                             | Result                              |
| -------------------- | ------------------------------------------------- | ----------------------------------- |
| Create               | Empty string                                      | Allows signup                       |
| List                 | `@request.auth.id != "" && id = @request.auth.id` | Only the user's own account         |
| View                 | `@request.auth.id != "" && id = @request.auth.id` | Only the user's own account         |
| Update               | `@request.auth.id != "" && id = @request.auth.id` | Only the user's own account         |
| Delete               | Locked (`null`)                                   | No account deletion in this starter |
| Manage               | Locked (`null`)                                   | No bypass of password checks        |

**Do not give public CRUD rules to the `users` auth collection or system collections.** The public base-collection policy used for development data is separate from account permissions. Do not store superuser credentials in the app.

## Try the included screens

1. While signed out, open Page Five. It sends you to Sign in.
2. Use Sign up to create an ordinary account. Successful signup also signs you in and opens Page Five.
3. Reload Page Five. The browser SDK reads the saved login.
4. Sign out in the navbar. Account content disappears and you arrive at Sign in.

The entire guard is in `src/app/page-five/page.jsx`. It waits for `isReady`, hides content when signed out, and uses `useFind("users", user.id)` only when signed in. A denied account request displays an error instead of cached account details.

## Import and use the hook

```jsx
"use client";

import { useAuth } from "@/hooks/auth";

export function AccountLabel() {
  const { user, isReady, logout } = useAuth();

  if (!isReady) return <p>Checking your login…</p>;
  if (!user) return <p>You are signed out.</p>;

  return <button onClick={logout}>Sign out {user.name || user.email}</button>;
}
```

There is one auth hook, with several actions. You do not need Jotai or a separate auth provider. TanStack Query is already provided by the root layout for database hooks.

## Hook values

| Value             | Meaning                                            |
| ----------------- | -------------------------------------------------- |
| `user`            | Current valid `users` record, or `null`            |
| `isAuthenticated` | Whether the hook has a valid ordinary user         |
| `isReady`         | The saved browser login has loaded                 |
| `isPending`       | An async action from this hook instance is running |
| `error`           | This hook instance's last failure, or `null`       |
| `clearError()`    | Clears the error without changing the login        |

The user is shared across components and browser tabs. Errors and pending state belong to each hook instance. Only one async auth action runs at a time in a browser tab. Logout can cancel it.

## Every auth action

| Action           | Arguments                                    | Successful result                                                 |
| ---------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| `login`          | `{ email, password }`                        | Signs in and returns the account record                           |
| `signup`         | `{ name, email, password, passwordConfirm }` | Creates an account, signs in, and returns the record              |
| `logout`         | None                                         | Clears browser auth; returns immediately                          |
| `refresh`        | None                                         | Asks the server to validate the token; returns the account record |
| `changePassword` | `{ oldPassword, password, passwordConfirm }` | Updates the password, returns the updated record, and signs out   |

Username login is also available as `login({ username, password })` if your server has a unique username field enabled as an identity. The included screens use email.

```jsx
const { login, signup, logout, refresh, changePassword } = useAuth();

// Inside an async event handler:
await login({ email: "alex@example.com", password: enteredPassword });
await signup({ name: "Alex", email, password, passwordConfirm });
await refresh();
await changePassword({ oldPassword, password, passwordConfirm });
logout();
```

These are separate examples, not a sequence to run automatically. `enteredPassword`, `email`, and the other variables must come from your form. Never hard-code real credentials.

Async failures are stored in `error` and thrown. Keep navigation, resetting inputs, and displaying messages in the page:

```jsx
async function signIn(values) {
  try {
    await login(values);
    reset();
    router.replace("/page-five");
  } catch {
    // The page displays error.message from useAuth. Keep the inputs after failure.
  }
}
```

## Failure behavior

- Failed login does not erase an existing login.
- Signup creates an account and then makes a separate login request. If only login fails, `error.accountCreated` is true. Go to Sign in instead of creating the same account again.
- Refresh preserves the login during a network failure or server error. A definitive rejection clears it.
- Token expiry clears the saved auth state and hides Page Five content.
- Logout cancels unfinished auth work so a late response cannot sign the user back in.
- Password changes require the old password. A successful change signs you out.

PocketBase validates fields on the server. `getDatabaseFieldErrors(error)` from `@/hooks/database` returns field messages if you want to connect them to React Hook Form's `setError`.

## Data access and persistence

The browser SDK saves auth in local storage scoped to the database URL. Do not log tokens or passwords. `isAuthenticated` is a UI flag; collection rules are the data permission check. This browser singleton must not be used as a shared session for server routes.

Signup accepts custom fields through the hook. Keep permission or role fields out of an untrusted signup form unless server rules restrict them. Logout clears the local token; it does not revoke every copy of that token held elsewhere.
