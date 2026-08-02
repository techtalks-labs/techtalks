import type { ReactNode } from "react";
import { Link } from "react-router";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="app-shell__orb" aria-hidden />
      <div className="app-shell__grid" aria-hidden />
      <div className="app-shell__content">
        <header className="mb-8">
          <Link to="/" className="app-brand inline-block no-underline">
            Tech <span>Talks</span>
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
