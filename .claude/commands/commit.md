Run a full git commit workflow for repo https://github.com/dannytv0307/vibe-coding.git

User input (use this as the commit message or context): $ARGUMENTS

**Step 1 — Check status**
- Run `git status` and `git diff` to review all changes

**Step 2 — Stage files**
- Stage all relevant files with `git add`
- NEVER stage: `.env`, secrets, large binaries

**Step 3 — Build commit message**
If `$ARGUMENTS` is provided, use it as the commit description.
Otherwise, infer the message from the diff.

Use Conventional Commits format with emojis:
- `✨ feat:` — new feature
- `🐛 fix:` — bug fix
- `♻️ refactor:` — code refactoring
- `🔧 chore:` — config, dependencies, tooling
- `📝 docs:` — documentation
- `💄 style:` — formatting, UI styling
- `🚀 perf:` — performance improvement
- `✅ test:` — adding or updating tests
- `🔒 security:` — security fix

If changes are complex and `$ARGUMENTS` is empty → ask me to confirm the message before committing.

Final format:
```
<emoji> <type>: <message from $ARGUMENTS or inferred>
```

**Step 4 — Commit**
```bash
git commit -m "<emoji> <type>: <message>"
```

**Step 5 — Push**
- Check current branch
- Push to remote: `git push origin <branch>` (add `-u` if no upstream set)
- Report: branch name, commit hash, remote URL

**Safety rules:**
- If push is rejected → fetch + rebase first, NEVER force push to `main`
- If conflicts exist → list conflicting files and ask how to resolve
