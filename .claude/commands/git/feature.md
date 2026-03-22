Create a new feature branch for repo https://github.com/dannytv0307/vibe-coding.git

Feature name: $ARGUMENTS

**Step 1 — Validate input**
- If `$ARGUMENTS` is empty → stop and ask: "Vui lòng cung cấp tên feature. Ví dụ: /git:feature user-authentication"
- Sanitize the name: lowercase, replace spaces with `-`, remove special characters

**Step 2 — Check current state**
- Run `git status` to ensure working tree is clean
- If there are uncommitted changes → warn the user and ask: commit first or stash?

**Step 3 — Sync with remote**
- Run `git fetch origin`
- Checkout the latest `main` (or `master` if `main` doesn't exist): `git checkout main && git pull origin main`

**Step 4 — Create feature branch**
- Branch name format: `feature/<sanitized-name>`
- Run: `git checkout -b feature/<sanitized-name>`

**Step 5 — Push branch to remote**
- Run: `git push -u origin feature/<sanitized-name>`

**Step 6 — Report**
Print a summary:
```
✅ Feature branch created!
  Branch : feature/<sanitized-name>
  Remote : https://github.com/dannytv0307/vibe-coding.git
  Base   : main (or master)

Next steps:
  - Develop your feature
  - Commit with: /git:commit <message>
  - Open a PR when ready
```

**Safety rules:**
- NEVER create branches from a dirty working tree without confirmation
- NEVER force push
- If branch already exists on remote → warn and ask to use existing or pick a different name
