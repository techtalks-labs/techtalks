# Contributing to Tech Talks

Thank you for contributing to Tech Talks. This guide explains the Git and GitHub workflow used by this project. It is written for beginners, so you can follow it step by step.

## The golden rule

Every change must reach `dev`, `main`, or `production` through a pull request (PR). Do not push commits directly to these branches.

```text
your fork: feature/* → PR → dev → PR → main → PR → production
```

Contributors create branches in their own forks. Branch creation in the central `techtalks-labs/techtalks` repository is restricted to administrators.

## Branches

| Branch                                    | Purpose                                                          | Who merges                        |
| ----------------------------------------- | ---------------------------------------------------------------- | --------------------------------- |
| `dev`                                     | Integration branch for features, fixes, tests, and documentation | Maintainers                       |
| `main`                                    | Stable, reviewed release candidate                               | Administrators                    |
| `production`                              | Approved production history                                      | Administrators                    |
| `feature/*`, `fix/*`, `docs/*`, `chore/*` | Short-lived contributor work in a fork                           | Nobody merges directly; open a PR |

All protected branches require:

- A pull request
- At least one approval
- A passing `check` CI job
- An up-to-date source branch
- Resolved review conversations
- No force-pushes or deletion

## Git concepts in plain language

- **Repository:** the project and its complete history.
- **Fork:** your GitHub copy of the project.
- **Clone:** a local copy on your computer.
- **Remote:** a GitHub repository connected to your local clone.
- **Branch:** an independent line of work.
- **Commit:** a saved snapshot with a message explaining the change.
- **Push:** upload local commits to GitHub.
- **Fetch:** download remote branch information without changing your files.
- **Pull request:** a request to review and merge one branch into another.
- **Merge:** combine histories from two branches.
- **Rebase:** replay your branch's commits on a newer base, creating new commit IDs.

## One-time setup

### 1. Fork the repository

Open [techtalks-labs/techtalks](https://github.com/techtalks-labs/techtalks) and select **Fork**.

### 2. Clone your fork

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git clone https://github.com/YOUR_USERNAME/techtalks.git
cd techtalks
```

### 3. Add the official repository as `upstream`

```bash
git remote add upstream https://github.com/techtalks-labs/techtalks.git
git remote -v
```

You should now have:

- `origin`: your fork
- `upstream`: the official repository

### 4. Install the project

```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm --filter @repo/db db:migrate
```

Set a secure `BETTER_AUTH_SECRET` in `.env`. Never commit `.env`.

## Make a contribution

### 1. Get the latest official branches

```bash
git fetch upstream
```

`fetch` is safe: it downloads history without changing your working files.

### 2. Create a branch from the latest `dev`

```bash
git switch -c feature/short-description upstream/dev
```

Use a descriptive branch name:

```text
feature/add-talk-submission
fix/sign-in-error
docs/improve-local-setup
test/add-auth-tests
chore/update-dependencies
```

Create a new branch for every separate contribution. Never work directly on `dev`, `main`, or `production`.

### 3. Make and inspect your changes

```bash
git status
git diff
```

`git status` shows changed files. `git diff` shows the exact unstaged changes.

### 4. Stage only the files that belong to the change

```bash
git add path/to/file
git diff --staged
```

Avoid `git add .` or `git add -A` unless you have checked every changed file. This prevents unrelated files and secrets from entering a commit.

### 5. Run the quality checks

```bash
pnpm format:check
pnpm lint
pnpm check
pnpm build
```

Fix failures before committing. CI runs the same checks on GitHub.

### 6. Commit the change

Use this format:

```text
type(optional-scope): short description
```

The scope is optional. Use it when it makes the affected area clearer:

```text
feat(web): add talk submission form
fix(auth): handle expired session
docs: explain database setup
test(api): cover invalid requests
chore(config): update CI workflow
```

Use one of these five types:

| Type    | Use it for                                           |
| ------- | ---------------------------------------------------- |
| `feat`  | New functionality                                    |
| `fix`   | Bug fixes and performance improvements               |
| `docs`  | Documentation only                                   |
| `test`  | Adding or changing automated tests                   |
| `chore` | Dependencies, builds, CI, formatting, or maintenance |

Guidelines:

- Start the description with an action such as `add`, `fix`, `update`, or `remove`.
- Keep the complete first line at 72 characters or fewer.
- Do not end the description with a period.
- Keep each commit focused on one logical change.

Create the commit with:

```bash
git commit -m "feat(web): add talk submission form"
```

Good commits are small, focused, and understandable on their own.

### 7. Push the branch to your fork

```bash
git push -u origin feature/short-description
```

The `-u` option connects your local branch to the branch in your fork. Later pushes can use `git push`.

### 8. Open a pull request into `dev`

On GitHub, select **Compare & pull request** and verify:

```text
base repository: techtalks-labs/techtalks
base branch:      dev
head repository: YOUR_USERNAME/techtalks
compare branch:   feature/short-description
```

Do not target `main` or `production` for normal contributions.

Complete the PR template:

- Explain what changed and why.
- Link the relevant issue.
- Provide steps reviewers can use to test it.
- Include screenshots or recordings for UI changes.
- Mention known limitations or follow-up work.

### 9. Respond to review feedback

Make requested changes on the same local branch:

```bash
git add path/to/file
git commit -m "fix: address review feedback"
git push
```

The existing PR updates automatically. Do not open another PR for review fixes.

Resolve conversations only after the feedback has been addressed or the team has agreed on an outcome.

## Update your branch when `dev` changes

If GitHub says your branch is behind `dev`, update it before merge.

### Recommended: rebase your own feature branch

```bash
git fetch upstream
git rebase upstream/dev
git push --force-with-lease
```

Rebase creates new commit IDs, so the normal push is rejected. `--force-with-lease` updates the branch only if nobody else has pushed unexpected work.

Only rebase and force-push a branch that belongs to you. Never rebase or force-push `dev`, `main`, `production`, or another contributor's branch.

### Simpler alternative: merge `dev` into your feature branch

```bash
git fetch upstream
git merge upstream/dev
git push
```

This avoids rewriting commits but creates a merge commit. Use this approach if you are not comfortable with rebase.

## Resolve a rebase conflict

Git stops when the same lines changed in both branches.

1. Run `git status` to see conflicted files.
2. Open each file and resolve the conflict markers.
3. Stage each resolved file with `git add path/to/file`.
4. Continue:

```bash
git rebase --continue
```

To cancel the entire rebase and return to the previous state:

```bash
git rebase --abort
```

Ask for help if you are unsure. Do not guess during a conflict.

## After your PR is merged

Delete the feature branch from your fork and locally:

```bash
git switch main
git branch -d feature/short-description
git push origin --delete feature/short-description
```

Start the next contribution from a fresh branch based on `upstream/dev`.

## Maintainer promotion flow

Maintainers promote reviewed work through protected branches:

1. Contributor PR: `feature/*` → `dev`
2. Release PR: `dev` → `main`
3. Production PR: `main` → `production`

Use **Squash and merge** for normal feature PRs to keep `dev` concise. Use **Create a merge commit** for release and production promotion PRs so the branch relationship remains visible.

Hotfixes begin from `main`, enter `main` through a PR, and are then promoted through PRs to both `dev` and `production`.

## Safety rules

- Never commit passwords, tokens, private keys, `.env`, or production data.
- Never push directly to `dev`, `main`, or `production`.
- Never force-push shared branches.
- Never rebase shared branches.
- Use `--force-with-lease`, never plain `--force`, on your own feature branch.
- Inspect `git status`, `git diff`, and `git diff --staged` before committing.
- Do not include unrelated cleanup in a focused PR.
- Do not commit generated `dist` output.
- Commit `pnpm-lock.yaml` only when dependencies change.
- Ask before running destructive commands such as `git reset --hard`.

## Pull request checklist

Before requesting review, confirm:

- [ ] The branch was created from the latest `upstream/dev`.
- [ ] The PR targets `dev`.
- [ ] The change is focused and contains no unrelated files.
- [ ] Commit messages follow Conventional Commits.
- [ ] `pnpm format:check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm check` passes.
- [ ] `pnpm build` passes.
- [ ] Tests were added or updated when appropriate.
- [ ] Documentation was updated when behavior changed.
- [ ] UI changes include screenshots or a recording.
- [ ] No secrets or `.env` files are included.
- [ ] All review conversations are resolved.

## Useful commands

| Command                                    | Purpose                                   |
| ------------------------------------------ | ----------------------------------------- |
| `git status`                               | Show the current branch and changed files |
| `git diff`                                 | Show unstaged changes                     |
| `git diff --staged`                        | Show what will be committed               |
| `git log --oneline --graph --decorate -10` | Show recent branch history                |
| `git fetch upstream`                       | Download official repository history      |
| `git switch branch-name`                   | Change branches                           |
| `git switch -c new-branch upstream/dev`    | Create a branch from current `dev`        |
| `git add path/to/file`                     | Stage a specific file                     |
| `git commit -m "type: message"`            | Create a commit                           |
| `git push`                                 | Upload commits to your fork               |
| `git rebase --abort`                       | Safely cancel an unfinished rebase        |

## Getting help

If you are stuck:

1. Stop before running destructive commands.
2. Copy the output of `git status`.
3. Describe the command you ran and the result you expected.
4. Ask in the issue or PR without sharing credentials or secret values.

It is always safer to ask than to accidentally discard work.
