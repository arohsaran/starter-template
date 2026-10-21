"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { useFind } from "@/hooks/database";
import { Button } from "@/components/ui/button";

export default function PageFive() {
  const router = useRouter();
  const { user, isReady, isAuthenticated, logout } = useAuth();
  // Do not request an account until the saved login has loaded.
  // PocketBase's View rule must also allow only this signed-in account.
  const account = useFind(
    isReady && isAuthenticated ? "users" : null,
    user?.id,
  );

  useEffect(
    function redirectSignedOutVisitor() {
      if (isReady && !isAuthenticated) router.replace("/sign-in");
    },
    [isReady, isAuthenticated, router],
  );

  // These checks hide account data before the redirect runs.
  if (!isReady) return <p role="status">Checking your login…</p>;
  if (!isAuthenticated) return <p role="status">Sending you to sign in…</p>;

  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Page Five
      </h1>
      {account.isPending ? (
        <p role="status">Loading your account…</p>
      ) : account.error ? (
        <div className="space-y-3">
          <p role="alert" className="text-sm text-destructive">
            Could not load your account. {account.error.message}
          </p>
          <Button
            variant="outline"
            onClick={function retryAccountRequest() {
              return account.refetch();
            }}
          >
            Try again
          </Button>
          <Button variant="ghost" onClick={logout}>
            Sign out
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground">
          Welcome, {account.data.name || account.data.email}. Add your content
          here.
        </p>
      )}
    </section>
  );
}
