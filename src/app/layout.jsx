import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import "./globals.css";

// The layout stays a Server Component so Next.js can read this metadata.
export const metadata = {
  title: "Project Starter",
  description: "A simple Next.js, shadcn, and PocketBase project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only fixed top-3 left-3 z-50 rounded-md bg-background p-3 text-sm focus:not-sr-only"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main
            id="main-content"
            className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20"
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
