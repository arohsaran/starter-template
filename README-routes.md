# Pages and routes

A **route** is the URL path for a page, such as `/about`. This starter uses the Next.js App Router. Inside `src/app`, folder names form the route, and a `page.jsx` file provides the page content.

| File                          | Route         |
| ----------------------------- | ------------- |
| `src/app/page.jsx`            | `/`           |
| `src/app/page-two/page.jsx`   | `/page-two`   |
| `src/app/about/page.jsx`      | `/about`      |
| `src/app/about/team/page.jsx` | `/about/team` |

## Add a page

Create a folder named `about` inside `src/app`. Add a file named `page.jsx` inside it:

```jsx
"use client";

export default function AboutPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold">About</h1>
      <p>This is my project.</p>
    </section>
  );
}
```

Run `pnpm dev` and visit `/about` on your preview website. Locally, that is usually `http://localhost:3000/about`.

The folder name sets the URL. The function name does not. Keep the filename `page.jsx` and its default export so Next.js can find the page. A folder alone does not create a page.

This example follows the starter's convention of client pages. `"use client"` lets you add state, hooks, and click handlers later. Next.js does not require this directive for a page that only displays text.

## Link to the page with shadcn Button styles

Use Next.js `Link` for navigation. Use shadcn's `buttonVariants` helper to give it the same styles as a Button. This is the pattern used by the starter's navbar.

For example, replace the contents of `src/app/page-two/page.jsx` with:

```jsx
"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PageTwo() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Page Two</h1>

      <Link
        href="/about"
        className={buttonVariants({ variant: "outline" })}
      >
        About this project
      </Link>
    </section>
  );
}
```

| Code                                     | Meaning                                                       |
| ---------------------------------------- | ------------------------------------------------------------- |
| `import Link from "next/link"`           | Imports the Next.js navigation component.                     |
| `href="/about"`                          | Sets the destination. Use the route, not the source filename. |
| `buttonVariants({ variant: "outline" })` | Returns the classes for an outlined shadcn Button.            |
| `className={...}`                        | Applies those styles to the Link.                             |
| `About this project`                     | Gives the link its visible text.                              |

Click the link to open `/about`. Next.js handles navigation between pages without a full page reload in normal use.

The result is a link that looks like a button. Keep it as a link so people can open it in another tab. Do not put a `<Button>` inside a `<Link>`. Use a regular `<Button onClick={handleClick}>` for actions, such as opening a dialog.

To add the page to the common navbar, add this object to the `pages` array in `src/components/navbar.jsx`:

```js
{ title: "About", href: "/about" }
```

Adding a page does not add a navbar link automatically.

See the official [Next.js pages guide](https://nextjs.org/docs/app/getting-started/layouts-and-pages) and [shadcn Button link guide](https://ui.shadcn.com/docs/components/base/button#as-link).

## Dynamic routes: `[slug]`

A dynamic route lets one page file handle different URL values. Square brackets mark the part that changes.

Create `src/app/products/[slug]/page.jsx`. Type the brackets as part of the folder name.

```jsx
"use client";

import { useParams } from "next/navigation";

export default function ProductPage() {
  const { slug } = useParams();

  return <h1 className="text-3xl font-semibold">Product: {slug}</h1>;
}
```

| URL                  | Value of `slug` | Heading           |
| -------------------- | --------------- | ----------------- |
| `/products/pen`      | `"pen"`         | Product: pen      |
| `/products/notebook` | `"notebook"`    | Product: notebook |

`slug` is a name for a URL value. You could name the folder `[id]` instead and read `id` from `useParams()`. These values are strings. They do not automatically fetch a database record.

Link to a real URL, such as `<Link href="/products/pen">View pen</Link>`. Do not link to `/products/[slug]`. This example does not create a `/products` listing page; add `src/app/products/page.jsx` if you need one.

## Underscore folders: `_components` and `_lib`

A folder whose name starts with `_` is a **private folder** in the App Router. Next.js excludes that folder and its contents from routing. Use it to keep supporting files close to the page that uses them.

```text
src/app/about/
  page.jsx                -> /about
  _components/
    about-card.jsx        -> supporting component; no route
  _lib/
    facts.js              -> supporting data or functions; no route
```

You can import these files normally. An underscore does not change how imports work. Even a `page.jsx` inside `_components` would not create a route.

The underscore marks a folder, not an individual file, for exclusion. A normal supporting file such as `about-card.jsx` does not create a route either; `_components` is an optional way to make your intent clear.

**Private here means excluded from routing. It does not mean protected by a login.** Use authentication and database permissions to protect account data.

For comparison, `(group)` folders organize routes without adding their names to the URL. `src/app/(info)/about/page.jsx` still creates `/about`; unlike an underscore folder, a route group allows pages inside it.

Read the [Next.js project structure guide](https://nextjs.org/docs/app/getting-started/project-structure) for more folder conventions.
