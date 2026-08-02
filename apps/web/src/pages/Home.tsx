import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@repo/ui/button";
import { AppShell } from "@/components/AppShell";
import { authClient } from "../lib/auth-client";

type Item = {
  id: number;
  name: string;
  createdAt: string;
};

const API_URL = "http://localhost:3001";

export function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [items, setItems] = useState<Item[] | null>(null);
  const [itemsError, setItemsError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<Item[]>;
      })
      .then(setItems)
      .catch((error: unknown) => {
        setItemsError(error instanceof Error ? error.message : "Failed to load items");
      });
  }, []);

  async function signOut() {
    await authClient.signOut();
  }

  return (
    <AppShell>
      <p className="app-lede">
        Short talks. Real builders. One place for the conversations that move tech forward.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {isPending ? <p className="text-sm text-muted-foreground">Checking session…</p> : null}
        {session?.user ? (
          <>
            <p className="text-sm text-muted-foreground mr-2">
              Signed in as <span className="font-medium text-foreground">{session.user.email}</span>
            </p>
            <Button type="button" variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </>
        ) : !isPending ? (
          <>
            <Button asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </>
        ) : null}
      </div>

      <section className="surface" aria-labelledby="items-heading">
        <h2 id="items-heading" className="font-display text-lg font-semibold tracking-tight">
          Latest from the API
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Live read from Postgres via Express.</p>

        {itemsError ? <p className="auth-error">Error: {itemsError}</p> : null}
        {items === null && !itemsError ? (
          <p className="items-empty mt-4">Loading items…</p>
        ) : null}
        {items && items.length === 0 ? (
          <p className="items-empty mt-4">No items yet — the wire-up works.</p>
        ) : null}
        {items && items.length > 0 ? (
          <ul className="items-list mt-4">
            {items.map((item) => (
              <li key={item.id}>
                <span className="font-medium">{item.name}</span>
                <time className="text-muted-foreground text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </AppShell>
  );
}
