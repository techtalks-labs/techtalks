# @repo/landing

This is the public landing site for **Tech Talks**, the marketing page people hit before they join. Tech Talks runs Friday discussions, mock interviews, and shared reading, and this site is how we tell that story. It lives inside the Tech Talks Turborepo monorepo.

The whole thing is one static page with a radio-broadcast look: an on-air bar up top, a live mic, an audio carousel, and a crew orbit.

## Stack

| Layer     | Tech                                                         |
| --------- | ------------------------------------------------------------ |
| Framework | Astro 7 (static output)                                      |
| UI        | React 18 islands via `@astrojs/react`                        |
| Animation | `motion`                                                     |
| Icons     | `@phosphor-icons/react`, `lucide-react`                      |
| Fonts     | Geist / Geist Mono, self-hosted via Astro's stable Fonts API |

There's no database or backend here. It builds down to plain static HTML.

## The page

It's all one route, [`src/pages/index.astro`](src/pages/index.astro). The sections are:

- **Hero** — the headline and a live-mic studio island (`src/signal/LiveMic.tsx`)
- **Team** — the crew orbit (`src/components/CrewOrbitSection.tsx`)
- **Events** — a bento showing the three formats: Friday discussions, mock interviews, blog reading
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

The copy and data all live in one place, so you can change what the page says without touching layouts:

- [`src/data/site.ts`](src/data/site.ts) holds the site meta plus the `crew`, `sessions`, and `contributions`. Swap names, links, and copy here.
- [`src/pages/index.astro`](src/pages/index.astro) has the `applicationUrl` and `applicationsPaused` flags near the top. They drive the "Join the community" flow — while applications are paused, the join links pop the "applications coming back soon" dialog instead of sending people off-site.

## Commands

Run these from this folder, or from the repo root with `pnpm --filter @repo/landing <script>`:

| Command        | Action                                      |
| -------------- | ------------------------------------------- |
| `pnpm dev`     | Dev server at `http://localhost:4321`       |
| `pnpm build`   | Production build to `./dist/`               |
| `pnpm preview` | Preview the production build locally        |
| `pnpm check`   | `astro check` (type + template diagnostics) |
| `pnpm lint`    | ESLint                                      |

Running `pnpm dev` from the monorepo root will start this app along with everything else.

## Notes

- **Islands:** the React bits hydrate with `client:load` (the mic) or `client:visible` (crew, carousel). Everything else is static HTML.
- **Theme:** the light/dark toggle runs client-side and remembers your choice in `localStorage` under `tech-talks-theme`.
- **Tunnels:** `astro.config.mjs` allow-lists ngrok hosts, so you can share the dev server through a tunnel.
