# Tech Talks

Turborepo monorepo for Tech Talks: Express API, React web app, shared Drizzle/Postgres package, and Better Auth.

## Stack

| Layer    | Tech                                                                |
| -------- | ------------------------------------------------------------------- |
| Monorepo | pnpm workspaces + Turborepo                                         |
| API      | Express + TypeScript                                                |
| Web      | Vite + React + React Router + Tailwind + shadcn/ui                  |
| Database | PostgreSQL + Drizzle ORM                                            |
| Auth     | Better Auth (email / password)                                      |
| Tooling  | shared ESLint + TypeScript configs, Husky, Prettier, GitHub Actions |

## Folder structure

```text
.
├── apps/
│   ├── api/                      # @repo/api — Express REST + Better Auth
│   │   ├── src/
│   │   │   ├── auth.ts           # Better Auth server config
│   │   │   └── index.ts          # HTTP routes (/health, /items, /api/auth/*)
│   │   ├── eslint.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                      # @repo/web — Vite + React SPA
│       ├── src/
│       │   ├── components/
│       │   │   ├── AppShell.tsx  # Layout / branding shell
│       │   │   └── ui/           # shadcn/ui primitives (e.g. Button)
│       │   ├── lib/
│       │   │   ├── auth-client.ts
│       │   │   └── utils.ts
│       │   ├── pages/
│       │   │   ├── Home.tsx
│       │   │   ├── SignIn.tsx
│       │   │   └── SignUp.tsx
│       │   ├── index.css         # Tailwind + design tokens
│       │   └── main.tsx          # Router entry
│       ├── components.json       # shadcn config
│       ├── index.html
│       ├── vite.config.ts
│       ├── eslint.config.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── db/                       # @repo/db — Drizzle schema + client
│   │   ├── drizzle/              # SQL migrations
│   │   ├── src/
│   │   │   ├── auth-schema.ts    # Better Auth tables
│   │   │   ├── schema.ts         # App tables (e.g. items)
│   │   │   └── index.ts          # DB client export
│   │   ├── drizzle.config.ts
│   │   ├── eslint.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── eslint-config/            # @repo/eslint-config — shared lint presets
│   │   ├── base.ts
│   │   ├── node.ts
│   │   └── react.ts
│   │
│   └── typescript-config/        # @repo/typescript-config — shared tsconfigs
│       ├── base.json
│       ├── node.json
│       └── vite.json
│
├── .github/
│   ├── ISSUE_TEMPLATE/           # Bug / feature issue forms
│   ├── workflows/ci.yml          # format → lint → check → build
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .husky/
│   ├── pre-commit                # Prettier via lint-staged
│   ├── commit-msg                # Conventional Commits (commitlint)
│   └── pre-push                  # lint + check + build
│
├── docker-compose.yml            # Local Postgres 16
├── turbo.json                    # Turborepo task graph
├── pnpm-workspace.yaml           # Workspace roots + allowBuilds
├── commitlint.config.ts
├── vercel.json                   # Deploy only from main
├── .env.example                  # Env template (copy → .env)
└── package.json                  # Root scripts
```

### Package map

| Package                      | Name                      | Role                                        |
| ---------------------------- | ------------------------- | ------------------------------------------- |
| `apps/api`                   | `@repo/api`               | Express API + Better Auth                   |
| `apps/web`                   | `@repo/web`               | React frontend                              |
| `packages/db`                | `@repo/db`                | Drizzle schema, migrations, Postgres client |
| `packages/eslint-config`     | `@repo/eslint-config`     | Shared ESLint configs                       |
| `packages/typescript-config` | `@repo/typescript-config` | Shared TypeScript configs                   |

## Prerequisites

- Node.js 22+
- pnpm 11.18.0 (pinned via `packageManager`)
- Docker (for local Postgres)

## Setup

```bash
# 1. Install deps
pnpm install

# 2. Env
cp .env.example .env
# set BETTER_AUTH_SECRET (e.g. openssl rand -base64 32)

# 3. Database
docker compose up -d
pnpm --filter @repo/db db:migrate
```

`.env` is gitignored. Commit only `.env.example`.

## Develop

```bash
pnpm dev
```

| App | URL                   |
| --- | --------------------- |
| Web | http://localhost:5173 |
| API | http://localhost:3001 |

Useful API routes:

- `GET /health` — liveness
- `GET /items` — sample table query (empty until you insert rows)
- `/api/auth/*` — Better Auth (sign-up, sign-in, session)

## Scripts

From the repo root:

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Start all `dev` tasks (API + web) |
| `pnpm build`        | Production builds                 |
| `pnpm lint`         | ESLint across packages            |
| `pnpm check`        | TypeScript check (`tsc --noEmit`) |
| `pnpm format`       | Format with Prettier              |
| `pnpm format:check` | Check Prettier formatting         |

Package-specific examples:

```bash
pnpm --filter @repo/api dev
pnpm --filter @repo/web dev
pnpm --filter @repo/db db:generate   # after schema changes
pnpm --filter @repo/db db:migrate
```

## Environment

| Variable             | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `DATABASE_URL`       | Postgres connection string                             |
| `BETTER_AUTH_SECRET` | Auth signing secret (≥ 32 chars)                       |
| `BETTER_AUTH_URL`    | Public auth base URL (`http://localhost:3001` locally) |

Default Docker DB (from `docker-compose.yml`):

```text
postgresql://postgres:postgres@localhost:5432/monorepo
```

## Auth

- Server config: `apps/api/src/auth.ts`
- Auth tables: `packages/db/src/auth-schema.ts`
- Client: `apps/web/src/lib/auth-client.ts`
- Email/password is enabled; OAuth is not configured yet (add providers in the API auth config when needed)

## Database

- App table: `items` in `packages/db/src/schema.ts`
- Migrations: `packages/db/drizzle/`
- After changing schema files, run `db:generate` then `db:migrate`

## Quality gates

- **Pre-commit (Husky):** Prettier on staged files (`lint-staged`)
- **Commit message (Husky):** [Conventional Commits](https://www.conventionalcommits.org/) via commitlint  
  Examples: `feat: add talk list`, `fix(api): handle missing db`, `chore: bump deps`
- **Pre-push (Husky):** `pnpm lint && pnpm check && pnpm build`
- **CI (GitHub Actions):** install → format check → lint → typecheck → build

## Notes

- pnpm 11 requires allowing dependency build scripts for `esbuild` (`allowBuilds` in `pnpm-workspace.yaml`).
- Keep Docker running before using `/items` or auth that hits the database.
- The web “Latest from the API” section shows an empty state until `items` has rows — that means the wire-up works, not that the app is broken.
- Vercel deploys only from `main` (`vercel.json`).
