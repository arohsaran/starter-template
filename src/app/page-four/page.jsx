"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as React from "react";
import Link from "next/link";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react";

// This is the home page. Add your own components inside the section.
const chatSuggestions = [
  "Why is my first layer peeling?",
  "Which filament is best for strength?",
  "How do I fix stringing?",
  "What slicer should I use?",
];

function getPrinterHelpReply(question) {
  const text = question.toLowerCase();

  if (
    text.includes("first layer") ||
    text.includes("peel") ||
    text.includes("bed") ||
    text.includes("adhesion")
  ) {
    return "First-layer adhesion usually comes down to a clean bed, the right nozzle height, and proper temperature. Try cleaning the bed, setting PLA around 50–65°C, and making sure the nozzle is close enough without scraping the surface.";
  }

  if (
    text.includes("filament") ||
    text.includes("pla") ||
    text.includes("petg") ||
    text.includes("tpu") ||
    text.includes("abs") ||
    text.includes("asa")
  ) {
    return "Start with PLA if you are new to 3D printing. Use PETG for stronger, more durable parts, ABS/ASA for heat resistance, and TPU for flexible prints. Pick the material based on how the part will be used and the printer enclosure you have.";
  }

  if (
    text.includes("string") ||
    text.includes("ooze") ||
    text.includes("blobs") ||
    text.includes("travel")
  ) {
    return "Stringing is often caused by too much heat, poor retraction, or slow travel speeds. Lower nozzle temperature slightly, increase retraction distance, and reduce travel speed to improve results.";
  }

  if (
    text.includes("slicer") ||
    text.includes("cura") ||
    text.includes("prusa") ||
    text.includes("orca") ||
    text.includes("bambu")
  ) {
    return "A slicer converts your 3D model into G-code. Popular options include Cura, PrusaSlicer, Bambu Studio, and OrcaSlicer. Focus on layer height, infill, wall count, and temperature settings before you start tuning more advanced print settings.";
  }

  if (
    text.includes("warping") ||
    text.includes("crack") ||
    text.includes("weak") ||
    text.includes("layer")
  ) {
    return "Weak or warped prints are often caused by low nozzle temperature, poor cooling control, or poor part orientation. Check your layer adhesion, keep the bed clean, and place high-stress parts so the forces run along stronger directions.";
  }

  if (
    text.includes("support") ||
    text.includes("overhang") ||
    text.includes("bridging")
  ) {
    return "Supports are usually needed for sharp overhangs and bridges. In the slicer, use the lowest support density that still holds the print together, and keep your bridging speed moderate to avoid sagging.";
  }

  return "A good starting point is checking bed cleanliness, nozzle temperature, and whether your slicer settings match your filament. If you tell me the exact symptom—like peeling, warping, stringing, or weak layers—I can suggest a more specific fix.";
}

export default function PageFour() {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! Ask me about bed adhesion, filament choice, slicers, or common print problems.",
    },
  ]);
  const [input, setInput] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const question = input.trim();
    if (!question) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: question,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      text: getPrinterHelpReply(question),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfzNzQ-TQ6UbBejipUlGz1C4u3NAeKfYGA8fn-qTZo75h48_CRF1hvljQ&s=10.png"
        alt="3D Printing Setup"
        width="0"
        className="ml-auto block"
      />

      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          3D Printing FAQ & Guide
        </h1>
        <p className="text-muted-foreground">
          Find answers to common questions about 3D printing, troubleshooting, and material choices.
        </p>

        <Accordion defaultValue={["downloading"]} className="max-w-lg">
          <AccordionItem value="downloading">
            <AccordionTrigger>Where do I find things to 3D print?</AccordionTrigger>
            <AccordionContent>
              Popular repositories for free and paid 3D models include:
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><strong>Thingiverse:</strong> Massive library of community-uploaded STL files.</li>
                <li><strong>Printables:</strong> High-quality, curated models with rewards for contributors.</li>
                <li><strong>Thangs:</strong> A search engine for 3D models across multiple websites.</li>
                <li><strong>MakerWorld:</strong> Modern library optimized for easy slicing and multi-color prints.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="slicing">
            <AccordionTrigger>What software do I need before printing?</AccordionTrigger>
            <AccordionContent>
              You need a <strong>Slicer</strong> program to convert 3D models (.STL or .3MF) into G-code that the printer understands. Popular slicers include <em>Bambu Studio, PrusaSlicer, Cura, and OrcaSlicer</em>. In the slicer, you adjust settings like layer height, infill density, and print speed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="filaments">
            <AccordionTrigger>Which filament type should I use?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>PLA:</strong> Beginner-friendly, easy to print, great for decorative items.</li>
                <li><strong>PETG:</strong> Stronger, heat-resistant, ideal for functional parts.</li>
                <li><strong>ABS/ASA:</strong> Very durable and heat-resistant, but requires an enclosure and good ventilation due to fumes.</li>
                <li><strong>TPU:</strong> Flexible, rubber-like material for gaskets or squishy parts.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="troubleshooting">
            <AccordionTrigger>Why did my print fall off the bed?</AccordionTrigger>
            <AccordionContent>
              Bed adhesion issues are usually caused by:
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Dirty print bed (clean with warm water & dish soap or isopropyl alcohol).</li>
                <li>Incorrect bed temperature (50–65°C is recommended for PLA).</li>
                <li>Improper nozzle height / Z-offset (too far from the bed on the first layer).</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="adhesion">
            <AccordionTrigger>Why does my 3D print keep falling apart?</AccordionTrigger>
            <AccordionContent>
              Most prints fail structurally due to:
              <ol className="mt-1 list-decimal pl-5 space-y-1">
                <li><strong>Poor layer adhesion:</strong> Print temperature may be too low or cooling fan speed too high.</li>
                <li><strong>Under-extrusion:</strong> Partially clogged nozzle or incorrect flow rate settings.</li>
                <li><strong>Wet filament:</strong> Moisture causes popping/stringing; dry your spool in a filament dryer.</li>
                <li><strong>Weak orientation:</strong> 3D prints are weakest along layer lines. Re-orient the object so stress runs parallel to layers.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="post-processing">
            <AccordionTrigger>How do I smooth or finish my prints?</AccordionTrigger>
            <AccordionContent>
              You can improve the surface finish by removing support structures with pliers, sanding starting from 200 grit up to 1000+ grit, applying filler primer, and painting with acrylic paints. For ABS prints, acetone vapor smoothing can give a high-gloss finish.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ettiquette">
            <AccordionTrigger>How do I claim a 3D printer in a shared space?</AccordionTrigger>
            <AccordionContent>
              Write your name, estimated print completion time, and contact info on the whiteboard near the 3D printer. Always clear completed prints promptly so others can use the machine.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mt-8 max-w-2xl space-y-4 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              AI assistant
            </p>
            <h2 className="text-xl font-semibold">3D Print Helper</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Online
          </span>
        </div>

        <div className="space-y-3 rounded-xl border bg-background p-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {chatSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setInput(suggestion)}
              className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about prints, filaments, or troubleshooting..."
            className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Ask
          </button>
        </form>
      </section>
    </div>
  );
}

const component = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleAlertIcon />Backlog</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleDashedIcon />To Do</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleCheckIcon />Done</Link>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">Docs</Link>} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href}><div className="flex flex-col gap-1 text-sm">
        <div className="leading-none font-medium">{title}</div>
        <div className="line-clamp-2 text-muted-foreground">{children}</div>
      </div></Link>} />
    </li>
  );
}