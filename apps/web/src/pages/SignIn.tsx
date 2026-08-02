import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@repo/ui/button";
import { AppShell } from "@/components/AppShell";
import { authClient } from "../lib/auth-client";

export function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const result = await authClient.signIn.email({ email, password });
    if (result.error) {
      setError(result.error.message ?? "Sign in failed");
      return;
    }

    navigate("/");
  }

  return (
    <AppShell>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="app-lede">Sign in to pick up where you left off.</p>

      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <Button type="submit" className="w-full sm:w-auto">
          Sign in
        </Button>
      </form>

      {error ? <p className="auth-error">{error}</p> : null}

      <p className="auth-switch">
        Need an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </AppShell>
  );
}
