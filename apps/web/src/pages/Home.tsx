import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
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
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Home</h1>
      {isPending ? <p>Loading session…</p> : null}
      {session?.user ? (
        <div className="space-y-2">
          <p>Signed in as {session.user.email}</p>
          <Button type="button" variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/sign-in">Sign in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Items from API</h2>
        {itemsError ? <p>Error: {itemsError}</p> : null}
        {items === null && !itemsError ? <p>Loading items…</p> : null}
        {items ? <pre>{JSON.stringify(items, null, 2)}</pre> : null}
      </section>
    </main>
  );
}
