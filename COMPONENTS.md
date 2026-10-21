# Included components

Start with [README-components.md](README-components.md) for component categories, a complete Button page example, and links to the shadcn website.

This starter includes **62 shadcn UI files** in the Base Nova style. The primary primitives are **Base UI**. `components.json` keeps the style and import aliases for adding components later.

The files are ready to import. There is no component gallery or sample business app.

## Use a component

```jsx
"use client";

import { Button } from "@/components/ui/button";

export function ExampleButton() {
  function handleClick() {
    console.log("Button clicked");
  }

  return <Button onClick={handleClick}>Try it</Button>;
}
```

The supplied files use TypeScript. Your pages and components can stay in JavaScript. Read a component's named exports to see its available parts, such as `Card`, `CardHeader`, and `CardContent`.

Base UI components use `render` to compose triggers with other components. Read the existing component code when following an example written for Radix's `asChild` API; do not assume the props are identical.

The global providers include the Base UI Toast provider and tooltip provider. The optional Sonner wrapper is also retained. Add a Sonner toaster only if you choose to use that separate notification system.

## Files

- `accordion` — `src/components/ui/accordion.tsx`
- `alert` — `src/components/ui/alert.tsx`
- `alert-dialog` — `src/components/ui/alert-dialog.tsx`
- `aspect-ratio` — `src/components/ui/aspect-ratio.tsx`
- `attachment` — `src/components/ui/attachment.tsx`
- `avatar` — `src/components/ui/avatar.tsx`
- `badge` — `src/components/ui/badge.tsx`
- `breadcrumb` — `src/components/ui/breadcrumb.tsx`
- `bubble` — `src/components/ui/bubble.tsx`
- `button` — `src/components/ui/button.tsx`
- `button-group` — `src/components/ui/button-group.tsx`
- `calendar` — `src/components/ui/calendar.tsx`
- `card` — `src/components/ui/card.tsx`
- `carousel` — `src/components/ui/carousel.tsx`
- `chart` — `src/components/ui/chart.tsx`
- `checkbox` — `src/components/ui/checkbox.tsx`
- `collapsible` — `src/components/ui/collapsible.tsx`
- `combobox` — `src/components/ui/combobox.tsx`
- `command` — `src/components/ui/command.tsx`
- `context-menu` — `src/components/ui/context-menu.tsx`
- `dialog` — `src/components/ui/dialog.tsx`
- `direction` — `src/components/ui/direction.tsx`
- `drawer` — `src/components/ui/drawer.tsx`
- `dropdown-menu` — `src/components/ui/dropdown-menu.tsx`
- `empty` — `src/components/ui/empty.tsx`
- `field` — `src/components/ui/field.tsx`
- `hover-card` — `src/components/ui/hover-card.tsx`
- `input` — `src/components/ui/input.tsx`
- `input-group` — `src/components/ui/input-group.tsx`
- `input-otp` — `src/components/ui/input-otp.tsx`
- `item` — `src/components/ui/item.tsx`
- `kbd` — `src/components/ui/kbd.tsx`
- `label` — `src/components/ui/label.tsx`
- `marker` — `src/components/ui/marker.tsx`
- `menubar` — `src/components/ui/menubar.tsx`
- `message` — `src/components/ui/message.tsx`
- `message-scroller` — `src/components/ui/message-scroller.tsx`
- `native-select` — `src/components/ui/native-select.tsx`
- `navigation-menu` — `src/components/ui/navigation-menu.tsx`
- `pagination` — `src/components/ui/pagination.tsx`
- `popover` — `src/components/ui/popover.tsx`
- `progress` — `src/components/ui/progress.tsx`
- `questionnaire` — `src/components/ui/questionnaire.tsx`
- `radio-group` — `src/components/ui/radio-group.tsx`
- `resizable` — `src/components/ui/resizable.tsx`
- `scroll-area` — `src/components/ui/scroll-area.tsx`
- `select` — `src/components/ui/select.tsx`
- `separator` — `src/components/ui/separator.tsx`
- `sheet` — `src/components/ui/sheet.tsx`
- `sidebar` — `src/components/ui/sidebar.tsx`
- `skeleton` — `src/components/ui/skeleton.tsx`
- `slider` — `src/components/ui/slider.tsx`
- `sonner` — `src/components/ui/sonner.tsx`
- `spinner` — `src/components/ui/spinner.tsx`
- `switch` — `src/components/ui/switch.tsx`
- `table` — `src/components/ui/table.tsx`
- `tabs` — `src/components/ui/tabs.tsx`
- `textarea` — `src/components/ui/textarea.tsx`
- `toast` — `src/components/ui/toast.tsx`
- `toggle` — `src/components/ui/toggle.tsx`
- `toggle-group` — `src/components/ui/toggle-group.tsx`
- `tooltip` — `src/components/ui/tooltip.tsx`

The responsive UI helpers also include `src/hooks/use-mobile.ts`. The navbar and theme toggle are in `src/components`.

## Add or update a component

```sh
pnpm dlx shadcn@4.21.0 add button
```

The pinned command uses the same CLI version as the copied component set. Review a replacement before overwriting local changes. You do not need to rerun this command to use any component listed above.
