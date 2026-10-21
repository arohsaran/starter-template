# Using shadcn components

A component is a piece of a page that you can use again. A Button, Input, and Card are examples. shadcn gives you component source files that you can read and change in your project.

This starter already includes 62 UI component files in `src/components/ui`. You can import them into a page without installing each one. The starter uses Base UI and the Base Nova style.

Visit the [shadcn website](https://ui.shadcn.com) to see examples. Use the [component documentation](https://ui.shadcn.com/docs/components) to find a component and learn its options. When the documentation offers a choice, select **Base UI** to match this starter.

## Choose a component

These groups help you choose a component for a task. Some components can fit in more than one group.

| Category               | What it helps you do                         | Examples included in this starter                                                              |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Actions                | Let someone perform an action                | Button, Button Group, Toggle, Toggle Group                                                     |
| Forms and inputs       | Collect information from someone             | Input, Textarea, Label, Field, Checkbox, Radio Group, Switch, Select, Combobox, Slider         |
| Dates                  | Let someone choose a date                    | Calendar; combine Calendar and Popover for a date picker                                       |
| Navigation             | Help someone move around a site or view      | Navigation Menu, Sidebar, Breadcrumb, Pagination, Tabs                                         |
| Layout and content     | Arrange information on a page                | Card, Separator, Scroll Area, Resizable, Accordion, Collapsible, Aspect Ratio                  |
| Popups and menus       | Show more information or choices when needed | Dialog, Alert Dialog, Sheet, Drawer, Popover, Dropdown Menu, Context Menu, Tooltip, Hover Card |
| Feedback and status    | Explain what happened or what is loading     | Alert, Toast, Sonner, Progress, Spinner, Skeleton, Empty                                       |
| Data and media         | Present records, images, or values           | Table, Chart, Avatar, Badge, Item, Carousel                                                    |
| Messages and questions | Display a conversation or collect answers    | Message, Bubble, Message Scroller, Attachment, Questionnaire                                   |

For example, use an **Input** to enter a name, a **Button** to submit it, and a **Table** to display saved records. The components provide the interface. Your page code decides what happens when someone uses it.

See `COMPONENTS.md` for the full list of included files.

## Add a Button to a page

Open `src/app/page-two/page.jsx`. Replace its contents with this example. Then visit `/page-two`.

```jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PageTwo() {
  // Keep the number of clicks in this page's state.
  const [clicks, setClicks] = useState(0);

  function handleClick() {
    setClicks(clicks + 1);
  }

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Page Two</h1>
      <p>You clicked the button {clicks} times.</p>

      <Button type="button" onClick={handleClick}>
        Add one
      </Button>
    </section>
  );
}
```

### How the example works

| Code                                              | Meaning                                                                                                                     |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `"use client"`                                    | Lets this Next.js page use state and respond to clicks.                                                                     |
| `import { Button } from "@/components/ui/button"` | Imports the named `Button` export from the local component file. `@/` means `src/`.                                         |
| `useState(0)`                                     | Starts the click count at zero.                                                                                             |
| `function handleClick()`                          | Defines the function that increases the count.                                                                              |
| `onClick={handleClick}`                           | Gives the Button a function to run when clicked. Do not add `()` here; that would call the function while the page renders. |
| `<Button>Add one</Button>`                        | Places a button on the page. The text between the tags is its label.                                                        |
| `type="button"`                                   | Makes this a regular button. Use `type="submit"` when a button should submit a form.                                        |
| `className="space-y-4"`                           | Uses Tailwind classes to add space between the section's elements.                                                          |

Click **Add one** to update the count. Reloading the page resets it to zero. This example does not save anything to a database.

The page uses a default export because Next.js requires one for page files. The Button uses a named import. You can use this TypeScript component from a JavaScript page without adding type annotations.

## Change the Button's appearance

Props are options that you pass to a component. Replace the Button above with this version to change its style and size:

```jsx
<Button type="button" variant="outline" size="lg" onClick={handleClick}>
  Add one
</Button>
```

| Prop        | Example values                                                    | Purpose                                                                                                 |
| ----------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `variant`   | `default`, `outline`, `secondary`, `ghost`, `destructive`, `link` | Changes the visual style.                                                                               |
| `size`      | `default`, `xs`, `sm`, `lg`, `icon`                               | Changes the button's size. Give icon-only buttons an accessible name, such as `aria-label="Open menu"`. |
| `disabled`  | `true` or `false`                                                 | Prevents interaction while disabled.                                                                    |
| `className` | `"w-full"`                                                        | Adds Tailwind classes; this example makes the button fill its container's width.                        |

A visual style does not add an action. For example, `variant="destructive"` changes the appearance; your code must still perform any deletion. Use Next.js `Link` with the `buttonVariants` styles for navigation. A Button with `variant="link"` still behaves as a button. See [README-routes.md](README-routes.md) for a complete navigation example.

See the official [Base UI Button documentation](https://ui.shadcn.com/docs/components/base/button) for more examples. Some examples written for Radix use `asChild`; Base UI composition uses `render` instead.

## Use another included component

1. Choose a component from the category table.
2. Find its file in `src/components/ui` and check its named exports.
3. Import the parts you need into your page.
4. Add those parts to the JSX returned by your page function.

For example, a Card has separate parts that you combine:

```jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

```jsx
<Card>
  <CardHeader>
    <CardTitle>My project</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card groups related information.</p>
  </CardContent>
</Card>
```

You do not need to run an install command for the components already included. If you need a component that is missing, read the installation command on its shadcn documentation page and run it from the project folder. Review changes before replacing a component you have edited.
