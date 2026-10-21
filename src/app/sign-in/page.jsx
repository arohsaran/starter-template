"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/auth";
import { isPocketBaseConfigured } from "@/pocketbase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const router = useRouter();
  const { user, isReady, isPending, error, login } = useAuth();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: "", password: "" },
  });

  // handleSubmit gives this function an object containing the registered fields.
  async function signIn(values) {
    try {
      await login(values);
      reset();
      // Use a fixed destination rather than trusting a URL supplied by a visitor.
      router.replace("/page-five");
    } catch {
      // The hook stores the error. Keep the inputs and display its message below.
    }
  }

  return (
    <section className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to open Page Five.
        </p>
      </div>
      {!isPocketBaseConfigured && (
        <p
          role="status"
          className="rounded-lg border bg-muted/40 p-4 text-sm leading-6"
        >
          Find your PocketBase link in the LMS and add it to{" "}
          <code>src/pocketbase.js</code>. Follow README-auth.md to set up
          accounts.
        </p>
      )}
      {!isReady ? (
        <p role="status">Checking your login…</p>
      ) : user ? (
        <p>
          You are signed in.{" "}
          <Link href="/page-five" className="underline underline-offset-4">
            Open Page Five
          </Link>
          .
        </p>
      ) : (
        <form onSubmit={handleSubmit(signIn)} className="space-y-4">
          <fieldset
            disabled={!isPocketBaseConfigured || isPending}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                {...register("password")}
              />
            </div>
            <Button type="submit" className="w-full">
              {isPending ? "Signing in…" : "Sign in"}
            </Button>
          </fieldset>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error.message}
            </p>
          )}
        </form>
      )}
      <p className="text-sm text-muted-foreground">
        Need an account?{" "}
        <Link
          href="/sign-up"
          className="text-foreground underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
}
