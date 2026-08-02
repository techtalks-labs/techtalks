import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
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
    <main>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
      {error ? <p>{error}</p> : null}
      <p>
        Need an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </main>
  );
}
