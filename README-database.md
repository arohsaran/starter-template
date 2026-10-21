# Database hooks

`src/hooks/database.js` connects TanStack Query to the shared PocketBase client. The root layout already provides its QueryClient. Use these hooks inside a Client Component.

## Connect your database

Find your PocketBase URL in the LMS and add it to `src/pocketbase.js`. The placeholder is not a working URL. Restart development after changing an environment override.

The hooks work with PocketBase server **v0.40.x** and SDK **0.28.1**. The server and SDK have different version numbers. These hooks use collections you create in PocketBase; they do not create schemas automatically.

For the examples below, create an optional **base** collection named `tasks`, with a text field `title` and a boolean field `done`. No sample collection or records are bundled in the starter.

For a public development collection, set List, View, Create, Update, and Delete rules to empty strings (`""`), not `null`. **Anyone who can reach its API can read, create, modify, and delete the records. Use fictional practice data.** This policy does not apply to the `users` auth collection or system collections. Use deliberate server permissions before deploying a real app.

## Every hook

| Hook           | Arguments                   | Operation                                                 |
| -------------- | --------------------------- | --------------------------------------------------------- |
| `useList`      | `(collection, options)`     | Reads an array of matching records                        |
| `useFind`      | `(collection, id)`          | Reads one record by ID                                    |
| `useInsert`    | `(collection)`              | Creates one record                                        |
| `useUpdate`    | `(collection)`              | Changes fields on one record                              |
| `useRemove`    | `(collection)`              | Deletes one record                                        |
| `useRemoveAll` | `(collection)`              | Deletes only the records in the supplied loaded list      |
| `usePreload`   | `(collection, defaultData)` | Adds records only if the collection is empty, when called |

Import only the hooks you need. Mutation hooks provide `call` for callbacks and `callAsync` for promises. Keep page behavior such as resetting a form outside the database hook.

## Read an array

```jsx
"use client";

import { useList } from "@/hooks/database";
import { isPocketBaseConfigured } from "@/pocketbase";

export function TaskList() {
  // Null pauses the query until configuration is ready.
  const tasks = useList(isPocketBaseConfigured ? "tasks" : null, {
    sort: "title",
  });

  if (!isPocketBaseConfigured) return <p>Add your LMS database URL first.</p>;
  if (tasks.isPending) return <p>Loading tasks…</p>;
  if (tasks.error) return <p role="alert">{tasks.error.message}</p>;

  return (
    <ul>
      {tasks.data.map(function showTask(task) {
        return <li key={task.id}>{task.title}</li>;
      })}
    </ul>
  );
}
```

`tasks.data` is an array of objects, not a paginated response. `useList` uses PocketBase's `getFullList`. Use the SDK's `getList` directly if your project needs pagination for a large dataset.

## Create a record

```jsx
"use client";

import { useInsert } from "@/hooks/database";
import { isPocketBaseConfigured } from "@/pocketbase";
import { Button } from "@/components/ui/button";

export function AddTask() {
  const insert = useInsert("tasks");

  function addTask() {
    insert.call({ title: "First task", done: false });
  }

  return (
    <div>
      <Button
        disabled={!isPocketBaseConfigured || insert.isPending}
        onClick={addTask}
      >
        Add task
      </Button>
      {insert.error && <p role="alert">{insert.error.message}</p>}
    </div>
  );
}
```

After success, mounted `useList` queries for that collection refresh. You do not need to manually add the new record to every list.

## Canonical calls

These calls belong inside a Client Component. Run writes from event handlers, not during rendering.

| Operation             | Declare the hook                                 | Call it in a handler                                |
| --------------------- | ------------------------------------------------ | --------------------------------------------------- |
| List                  | `const tasks = useList("tasks");`                | Read `tasks.data`; use `tasks.refetch()` to refresh |
| Find                  | `const task = useFind("tasks", id);`             | Read `task.data`                                    |
| Insert                | `const insert = useInsert("tasks");`             | `insert.call({ title: "New task", done: false });`  |
| Update                | `const update = useUpdate("tasks");`             | `update.call(id, { done: true });`                  |
| Remove                | `const remove = useRemove("tasks");`             | `remove.call(id);`                                  |
| Remove loaded list    | `const removeAll = useRemoveAll("tasks");`       | `removeAll.call(tasks);`                            |
| Seed empty collection | `const preload = usePreload("tasks", defaults);` | `preload.call();`                                   |

Replace `id` with a saved record ID. Pass the complete `useList` result to `removeAll.call`, not just an ID or a collection name. Confirm destructive actions in your UI before calling them. A filtered list deletes only its loaded records.

## Callbacks and promises

```jsx
// Inside an event handler; insert is the useInsert result.
insert.call(values, {
  onSuccess: function clearSavedForm() {
    reset();
  },
});

// Or inside an async handler:
const saved = await insert.callAsync(values);
const changed = await update.callAsync(saved.id, { done: true });
```

`call` stores failures on `error` and supports callbacks. `callAsync` also rejects its promise: catch it in an async page handler so an error is not left unhandled. `mutate`, `mutateAsync`, `reset`, and other TanStack Query mutation members remain available. The native `update.mutate` form accepts `{ id, set }`; the convenience `update.call` accepts two separate arguments.

| State        | Meaning                                                                            |
| ------------ | ---------------------------------------------------------------------------------- |
| `isPending`  | Loading or saving; a disabled query can also be pending with `fetchStatus: "idle"` |
| `isFetching` | A read request is running, including a background refresh                          |
| `error`      | Last failure, or `null`                                                            |
| `data`       | Returned array, record, or mutation result                                         |
| `refetch()`  | Runs a read query again                                                            |

## Filters, sorting, and relations

```jsx
// Exact match object: the hook safely escapes each value.
const unfinished = useList("tasks", { filter: { done: false }, sort: "title" });

// For search expressions, let the SDK insert the value safely.
const matches = useList("tasks", {
  filter: pb.filter("title ~ {:text}", { text: searchText }),
  sort: "-created",
});

// If your own schema includes an author relation:
const posts = useList("posts", {
  filter: { author: authorId },
  expand: "author",
});
```

The search example needs `import { pb } from "@/pocketbase"` and a `searchText` value. Sorting by `created` requires a matching autodate field. The relation example needs your own `posts` collection and author relation; it is not bundled.

Passing `null` as a collection pauses a read. `useFind` also pauses when its ID is missing. Check configuration or selection before showing a loading message for a paused query.

## Seed and bulk-operation limits

```jsx
const defaults = [{ title: "Practice task", done: false }];
const preload = usePreload("tasks", defaults);

function loadDefaults() {
  preload.call();
}
```

Declaring `usePreload` never writes by itself. The empty-collection check and inserts are separate requests, not a server transaction. Concurrent clients can race; a partial failure may leave some records saved. Bulk deletion also uses separate requests. Both refresh the collection afterward, including after partial failure.

## Other helpers

| Helper                   | Arguments                      | Result                                            |
| ------------------------ | ------------------------------ | ------------------------------------------------- |
| `getUrl`                 | `(record, filename, options?)` | PocketBase file URL                               |
| `getDatabaseFieldErrors` | `(error)`                      | Object mapping field names to validation messages |

```jsx
import { getUrl, getDatabaseFieldErrors } from "@/hooks/database";

const url = getUrl(record, record.image);
const messages = getDatabaseFieldErrors(error);
```

The file example requires a file field named `image`. Protected files may also require a PocketBase file token. Do not assume a URL grants permission to a protected file.

Cache keys include the database URL, collection, options, and signed-in account. Account changes clear the cache. Collection rules still decide what the server permits; changing a filter or a route is not authorization.
