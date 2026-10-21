# Project Starter

Five simple pages, a shared navbar, a theme toggle, and PocketBase sign-in and signup. This project uses Next.js App Router and shadcn with Base UI. Page Five requires a login. The other four pages work before you connect a database.

## Start in GitHub Codespaces

1. Put this project's contents at the root of your GitHub repository. Include the hidden `.devcontainer` folder, `src`, `package.json`, and `pnpm-lock.yaml`.
2. Select **Code → Codespaces → Create codespace on main** on GitHub.
3. Wait for setup. The container installs Node 24, pnpm 11.19.0, and the locked dependencies.
4. Run `pnpm dev` in the Codespaces terminal, then open the preview for port **3000**.

Read [README-codespaces.md](README-codespaces.md) for setup and troubleshooting.

## Start locally

Install Node **24**. If you use nvm, run `nvm install` and `nvm use` in this folder. Install the pinned package manager with `npm install --global pnpm@11.19.0`. Then run:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://localhost:3000**. Keep the terminal running while you work. Press **Ctrl+C** to stop the server.

## Pages

| Address       | File under `src/app`  | Access            |
| ------------- | --------------------- | ----------------- |
| `/`           | `page.jsx`            | Public — Page One |
| `/page-two`   | `page-two/page.jsx`   | Public            |
| `/page-three` | `page-three/page.jsx` | Public            |
| `/page-four`  | `page-four/page.jsx`  | Public            |
| `/page-five`  | `page-five/page.jsx`  | Signed in         |
| `/sign-in`    | `sign-in/page.jsx`    | Sign in           |
| `/sign-up`    | `sign-up/page.jsx`    | Create account    |

Each page contains its own code. Open that file to change its heading or add content. The navbar lives in `src/components/navbar.jsx`. Edit its `pages` array when you rename a page or add a route.

## Connect PocketBase

Find your PocketBase link in the LMS. Open `src/pocketbase.js` and replace `https://????.pockethost.io` with your link. This placeholder is not a working address.

Follow **README-auth.md** to configure the `users` authentication collection. After creating an account or signing in, you arrive at Page Five. Sign out using the navbar.

You can also set `NEXT_PUBLIC_POCKETBASE_URL` in `.env.local`. It overrides the file setting. Restart development after a change; rebuild production after changing a browser environment variable. A database URL is public configuration. Never put a superuser password or API secret in a `NEXT_PUBLIC_` variable.

## Tools already connected

| Tool                            | What it does                                                 |
| ------------------------------- | ------------------------------------------------------------ |
| Next.js 16.4.2 and React 19.3.0 | Pages and interactive UI                                     |
| shadcn, Base UI, Tailwind CSS   | Ready-to-use components and styling                          |
| TanStack Query                  | Shared database request cache, loading states, and refreshes |
| PocketBase SDK 0.28.1           | Connects to a PocketBase v0.40.x server                      |
| React Hook Form                 | Collects and checks the sign-in and signup form values       |
| Lucide                          | Icons                                                        |
| next-themes                     | Light, dark, and system themes                               |
| Base UI Toast provider          | Ready for notifications                                      |

The SDK version and PocketBase server version are different numbering systems.

All 62 UI component files are included. Read [README-components.md](README-components.md) for component categories and a Button page example. Read **COMPONENTS.md** for the full inventory. Read **README-database.md** for every database hook and **README-auth.md** for auth values and actions.

Read [README-routes.md](README-routes.md) to add pages, link to them with shadcn Button styles, and understand dynamic routes and underscore folders.

There are no demo datasets, lessons, test suite, or AI endpoints. Add your own collections when you need them.

## JavaScript and client pages

The numbered pages and auth pages start with `"use client"`. This allows hooks, click handlers, and browser auth state. You can add ordinary `.js` and `.jsx` files without types. Type checking for JavaScript is off; the supplied UI library still uses TypeScript.

Use named functions and named exports for your components and hooks. Next.js page and layout files use default exports because Next.js requires them. The root layout stays a Server Component so it can export page metadata.

## Protection model

Page Five waits for the browser's saved login, redirects signed-out visitors, and asks PocketBase for the signed-in user's record. PocketBase rules must reject access to other users' records. The browser redirect does not protect secrets embedded in JavaScript or HTML. Server-protected pages and server sessions are outside this starter.

## Checks

```sh
pnpm check
pnpm build
pnpm start
```

`check` runs lint, type checking, and formatting checks. `pnpm format` formats the source. Run `pnpm build` before `pnpm start`. Stop the development server first so port 3000 is available.
