"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LockKeyhole, Shapes } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const pages = [
  { title: "Page One", href: "/" },
  { title: "Page Two", href: "/page-two" },
  { title: "Page Three", href: "/page-three" },
  { title: "Page Four", href: "/page-four" },
  { title: "Page Five", href: "/page-five" },
];

// The navbar and Page Five read the same PocketBase login through useAuth.
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isReady, logout } = useAuth();

  function signOut() {
    logout();
    router.replace("/sign-in");
  }

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Shapes className="size-5" aria-hidden="true" />
          Project Starter
        </Link>
        {/* On a small screen the links wrap so every page stays visible. */}
        <nav
          aria-label="Main navigation"
          className="order-last flex w-full flex-wrap gap-1 md:order-none md:w-auto md:flex-nowrap"
        >
          {pages.map(function renderPageLink(page) {
            const current = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors ${current ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}
              >
                {page.title}
                {page.href === "/page-five" && (
                  <LockKeyhole
                    className="size-3"
                    aria-label="Requires sign-in"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {!isReady ? (
            <span role="status" className="text-xs text-muted-foreground">
              Loading account…
            </span>
          ) : user ? (
            <>
              <span className="hidden max-w-36 truncate text-xs text-muted-foreground xl:block">
                {user.name || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Sign in
              </Link>
              <Link href="/sign-up" className={buttonVariants({ size: "sm" })}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
