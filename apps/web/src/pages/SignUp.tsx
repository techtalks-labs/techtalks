import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/AppShell";
import { authClient } from "../lib/auth-client";

export function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const result = await authClient.signUp.email({ name, email, password });
    if (result.error) {
      setError(result.error.message ?? "Sign up failed");
      return;
    }

    navigate("/");
  }

  return (
    <AppShell>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Join Tech Talks</h1>
      <p className="app-lede">Create an account and get into the room.</p>

      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </label>
        <Button type="submit" className="w-full sm:w-auto">
          Create account
        </Button>
      </form>

      {error ? <p className="auth-error">{error}</p> : null}

      <p className="auth-switch">
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </AppShell>
  );
}
