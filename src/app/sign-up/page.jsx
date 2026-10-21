"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/auth";
import { isPocketBaseConfigured } from "@/pocketbase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const router = useRouter();
  const { user, isReady, isPending, error, signup } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
  });

  // The hook creates the account, then signs it in. Navigate only when both succeed.
  async function createAccount(values) {
    try {
      await signup(values);
      reset();
      router.replace("/page-five");
    } catch {
      // If the account was created but login failed, the message links to sign-in.
    }
  }

  return (
    <section className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create account
        </h1>
        <p className="text-sm text-muted-foreground">
          Create an account to open Page Five.
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
        <form onSubmit={handleSubmit(createAccount)} className="space-y-4">
          <fieldset
            disabled={
              !isPocketBaseConfigured || isPending || !!error?.accountCreated
            }
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                maxLength={60}
                {...register("name")}
              />
            </div>
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
                autoComplete="new-password"
                required
                minLength={8}
                {...register("password")}
              />
              <p className="text-xs text-muted-foreground">
                Use at least 8 characters.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                autoComplete="new-password"
                required
                aria-invalid={!!errors.passwordConfirm}
                aria-describedby={
                  errors.passwordConfirm ? "password-confirm-error" : undefined
                }
                {...register("passwordConfirm", {
                  validate: function passwordsMatch(value, values) {
                    return value === values.password || "Passwords must match.";
                  },
                })}
              />
              {errors.passwordConfirm && (
                <p
                  id="password-confirm-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isPending ? "Creating account…" : "Create account"}
            </Button>
          </fieldset>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error.message}
            </p>
          )}
          {error?.accountCreated && (
            <Link
              href="/sign-in"
              className="block text-sm underline underline-offset-4"
            >
              Account created — go to sign in
            </Link>
          )}
        </form>
      )}
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-foreground underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}
