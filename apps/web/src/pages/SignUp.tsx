import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
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
    <main>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" type="text" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required minLength={8} />
        </label>
        <button type="submit">Create account</button>
      </form>
      {error ? <p>{error}</p> : null}
      <p>
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </main>
  );
}
