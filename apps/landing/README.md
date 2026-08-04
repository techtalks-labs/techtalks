# @repo/landing

The public landing site for **Tech Talks** — a beginner-friendly developer community built around Friday discussions, mock interviews, and shared reading. Part of the Tech Talks Turborepo monorepo.

It's a single, static marketing page with a "radio broadcast / signal" theme: an on-air bar, a live mic, an audio carousel, and a crew orbit.

## Stack

| Layer     | Tech                                                         |
| --------- | ------------------------------------------------------------ |
| Framework | Astro 7 (static output)                                      |
| UI        | React 18 islands via `@astrojs/react`                        |
| Animation | `motion`                                                     |
| Icons     | `@phosphor-icons/react`, `lucide-react`                      |
| Fonts     | Geist / Geist Mono, self-hosted via Astro's stable Fonts API |

No database or backend — this app renders to static HTML.

## The page

Everything is one route, [`src/pages/index.astro`](src/pages/index.astro), composed of:

- **Hero** — headline plus a live-mic studio island (`src/signal/LiveMic.tsx`)
- **Team** — the crew orbit (`src/components/CrewOrbitSection.tsx`)
- **Events** — a bento of the three formats: Friday discussions, mock interviews, blog reading
- **Friday clips** — an audio carousel (`src/signal/AudioCarousel.tsx`)
- **Contribute** — the closing "Join the community" call to action

## Structure

```text
apps/landing/
├── public/signal/            # Images (logo, crew, session shots)
├── src/
│   ├── pages/index.astro     # The page
│   ├── layouts/Base.astro    # HTML shell (head, fonts, meta)
│   ├── data/site.ts          # Single content model — see below
│   ├── components/           # Astro + React pieces (crew, timeline, cards)
│   └── signal/               # Signal-themed islands (LiveMic, AudioCarousel) + CSS
└── astro.config.mjs          # React integration, fonts, dev allowedHosts
```

## Editing content

Copy and data are centralized so you edit one file, not many layouts:

- [`src/data/site.ts`](src/data/site.ts) — site meta, `crew`, `sessions`, and `contributions`. Swap names, links, and copy here.
- [`src/pages/index.astro`](src/pages/index.astro) — the `applicationUrl` and `applicationsPaused` flags at the top control the "Join the community" flow. When paused, the join links open the "applications coming back soon" dialog instead of navigating out.

## Commands

Run from this app directory, or from the repo root with `pnpm --filter @repo/landing <script>`:

| Command        | Action                                      |
| -------------- | ------------------------------------------- |
| `pnpm dev`     | Dev server at `http://localhost:4321`       |
| `pnpm build`   | Production build to `./dist/`               |
| `pnpm preview` | Preview the production build locally        |
| `pnpm check`   | `astro check` (type + template diagnostics) |
| `pnpm lint`    | ESLint                                      |

From the monorepo root, `pnpm dev` starts this app alongside the rest.

## Notes

- **Islands:** React components hydrate with `client:load` (mic) or `client:visible` (crew, carousel) — the rest of the page ships as static HTML.
- **Theme:** light/dark is toggled client-side and persisted in `localStorage` under `tech-talks-theme`.
- **Tunnels:** `astro.config.mjs` allow-lists ngrok hosts so you can preview the dev server through a tunnel.
