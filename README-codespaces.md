# GitHub Codespaces setup

Codespaces runs this project in a Linux development container. The same source files and pnpm lockfile also work on your computer with Node 24.

## Put the complete project on GitHub

Extract the ZIP before uploading. Put its **contents** at the repository root, so GitHub shows `package.json` and `src` immediately. GitHub stores an uploaded ZIP as an archive; it does not extract your source files for you.

| Item                                | Why it is needed                           |
| ----------------------------------- | ------------------------------------------ |
| `.devcontainer/devcontainer.json`   | Sets up Codespaces and forwards port 3000  |
| `.devcontainer/Dockerfile`          | Installs Node 24 and pinned pnpm           |
| `src`                               | All pages, UI components, and hooks        |
| `package.json` and `pnpm-lock.yaml` | Install the expected dependencies          |
| `pnpm-workspace.yaml`               | Keeps pnpm settings with the project       |
| Other root config files and READMEs | Styling, imports, checks, and instructions |

Files beginning with a dot can be hidden in your file manager. Keep them when copying the project. Exclude `node_modules`, `.next`, `.env.local`, and database runtime files; the supplied `.gitignore` handles these for Git commits.

You can mark the finished repository as a template in **Settings → General → Template repository**. Students can then create their own repositories with **Use this template**.

## Open and run

1. Open the complete repository on GitHub.
2. Select **Code → Codespaces → Create codespace on main**.
3. Wait for the container and dependency installation to finish.
4. Run `pnpm dev` in the Codespaces terminal.
5. Open port **3000** from the **Ports** tab if the preview does not open automatically.

Use the forwarded browser URL. Inside Codespaces, `localhost:3000` belongs to the remote container; the Ports tab opens the correct address for your browser. Keep the port's default private visibility while developing.

The development server must stay running. If you stop it or restart a codespace, run `pnpm dev` again. Setup installs dependencies automatically; it does not start a background server.

## What the configuration does

- Uses Microsoft's Node 24 development-container image.
- Installs pnpm 11.19.0, matching `package.json`.
- Runs `pnpm install --frozen-lockfile` after creating the container.
- Uses the non-root `node` user for development.
- Forwards port 3000 and opens its preview when a server is available.

`next.config.ts` uses `CODESPACE_NAME` and `GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN` to allow this codespace's preview hostname during development. GitHub provides both values. Local development needs neither value.

After editing `.devcontainer` configuration, run **Codespaces: Rebuild Container** from the Command Palette.

## Connect the database

Find your PocketBase link in the LMS and add it to `src/pocketbase.js`. Follow `README-auth.md` to configure the `users` collection. The four public pages work before a database is connected. Until then, the sign-in and signup forms stay disabled.

Use a separate browser tab for the app preview when checking sign-in. The PocketBase SDK saves the login in that browser origin's local storage. Localhost and a Codespaces preview have different origins, so signing in to one does not sign you in to the other.

## Common fixes

| Problem                                  | What to do                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `pnpm` is missing or has another version | Rebuild the supplied container. Locally, install pnpm 11.19.0 with npm.                          |
| The preview says the app is not running  | Run `pnpm dev`, then open port 3000.                                                             |
| Files are missing after uploading        | Compare the repository with the extracted project. Root config files alone are not the full app. |
| The sign-in button is disabled           | Add your LMS database URL and follow the auth README.                                            |
| A forwarded preview is blocked           | Rebuild the container, restart `pnpm dev`, and use this codespace's current port 3000 URL.       |
| Port 3000 is already in use locally      | Stop the other server, or run `pnpm exec next dev --hostname 0.0.0.0 --port 3001`.               |

Official references: [Node.js projects in Codespaces](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/setting-up-your-nodejs-project-for-codespaces), [forwarded ports](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace), and [default environment variables](https://docs.github.com/en/codespaces/developing-in-a-codespace/default-environment-variables-for-your-codespace).
