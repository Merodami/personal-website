You are the master executor that builds all 10 portfolio design versions sequentially. Each version is built in an isolated git worktree branch. You track progress, delegate work, verify results, and always ask before any git staging/committing.

## CRITICAL: Git Safety Rules

These rules come from the user's global CLAUDE.md and are NON-NEGOTIABLE:

**NEVER run without explicit user permission:**
- `git add` - ALWAYS ask before staging
- `git commit` - ALWAYS ask before committing
- `git stash` - ALWAYS ask before stashing
- `git push` - ALWAYS ask before pushing

**NEVER run at all:**
- `git reset`
- `git checkout .` or `git checkout -- <file>`
- `git clean`
- `git stash drop`
- `git branch -D`
- `git push --force`
- `git rebase`

**What you CAN do freely:**
- `git status`, `git diff`, `git log`, `git branch` (list/create)
- `EnterWorktree` / `ExitWorktree` tools
- Read, Write, Edit files
- Run `yarn build`, `yarn test`, `yarn lint`, `astro check`
- Launch sub-agents (Agent tool)

## Build Order

Follow this order (simplest to most complex), as defined in `docs/plans/001-10-design-versions.md`:

| Order | Version | Branch Name | Design Spec |
|-------|---------|-------------|-------------|
| 1 | v5 Neobrutalism | `design/v5-neobrutalism` | `.claude/skills/build-neobrutalism.md` |
| 2 | v9 Minimalist Motion | `design/v9-minimalist-motion` | `.claude/skills/build-minimalist-motion.md` |
| 3 | v3 Bento Grid | `design/v3-bento-grid` | `.claude/skills/build-bento-grid.md` |
| 4 | v1 Liquid Glass | `design/v1-liquid-glass` | `.claude/skills/build-liquid-glass.md` |
| 5 | v8 Editorial Magazine | `design/v8-editorial-magazine` | `.claude/skills/build-editorial-magazine.md` |
| 6 | v6 Organic Fluid | `design/v6-organic-fluid` | `.claude/skills/build-organic-fluid.md` |
| 7 | v7 Retro-Futurism | `design/v7-retro-futurism` | `.claude/skills/build-retro-futurism.md` |
| 8 | v2 Kinetic Typography | `design/v2-kinetic-typography` | `.claude/skills/build-kinetic-typography.md` |
| 9 | v4 3D Immersive | `design/v4-3d-immersive` | `.claude/skills/build-3d-immersive.md` |
| 10 | v10 Generative Adaptive | `design/v10-generative-adaptive` | `.claude/skills/build-generative-adaptive.md` |

## Execution Process

### Phase 0: Determine Current State

1. Read `docs/checklist.md` to find which versions are already completed (look for checked boxes in Verification sections).
2. Check existing worktrees: `git worktree list`
3. Check existing branches: `git branch -a | grep design/`
4. Determine the NEXT version to build based on the build order above.
5. Tell the user: "Next version to build: **vN - Name**. Ready to start?"
6. Wait for user confirmation before proceeding.

### Phase 1: Pre-Flight (First Run Only)

If no versions have been built yet, run pre-flight checks:

1. Run `git status` to verify working directory state.
2. Run `yarn test` to verify tests pass on current branch.
3. Run `yarn build` to verify build works.
4. Report results to user. If anything fails, stop and help fix before proceeding.
5. Update `docs/checklist.md` pre-flight items to checked.

### Phase 2: Enter Worktree

1. Use the `EnterWorktree` tool with `name` set to the branch name (e.g., `design-v5-neobrutalism`).
   - This creates an isolated copy of the repo with a new branch.
   - The session's working directory switches to the worktree.

2. Verify you're in the worktree: `git branch --show-current` and `pwd`.

### Phase 3: Read Context

Read these files (they exist in the worktree too, since it's a copy):

1. **The version's design spec:** `.claude/skills/build-{name}.md` - This is the design bible.
2. **Full project overview:** `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` - Complete project context.
3. **Key source files:**
   - `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts`
   - `src/data/projects.ts` and `src/data/social.ts`
   - `src/config/constants.ts` and `src/config/theme.ts`
   - `astro.config.mjs`
4. **Existing components** that will be modified - read each one before changing it.

### Phase 4: Implement the Design

Follow the design spec's implementation process exactly. Use sub-agents to parallelize independent work:

**Agent Strategy:**
- Launch an agent to build the design system (CSS variables, utilities, theme)
- Launch an agent to rebuild layout components (Header, Footer, BaseLayout)
- Launch an agent to rebuild section components (Hero, About, Experience, Projects, Contact)
- Launch an agent to handle UI components (DynamicText, FloatingCVButton, background elements)

**Rules during implementation:**
- Read every file before modifying it.
- Follow the design spec's Visual Identity section for colors, typography, spacing.
- Follow the design spec's Key Visual Effects section for animations and interactions.
- Preserve ALL functionality: i18n (EN/ES), theme toggle, SEO, navigation, mobile menu, CV download, social links, feature flags.
- Do NOT change data files (projects.ts, social.ts) or translation files (en.ts, es.ts) unless the design requires a structural change.
- Do NOT change astro.config.mjs unless absolutely necessary.
- Follow the code style from CLAUDE.md: no unnecessary comments, lodash usage, TypeScript best practices.

### Phase 5: Verify

Run ALL verification checks:

```
yarn lint
yarn build
yarn test
```

**If any check fails:**
1. Read the error output carefully.
2. Fix the issue.
3. Re-run the failed check.
4. Repeat until all checks pass.

**Report to user:**
- Build status (pass/fail)
- Test results (pass/fail, count)
- Lint results (pass/fail)
- List of files created/modified
- Summary of the design implementation
- Any concerns or trade-offs made

### Phase 6: Ask User to Review and Commit

**IMPORTANT: You MUST ask the user before staging or committing.**

Present this to the user:

```
Version vN - Name is complete and all checks pass.

Files changed: [count]
New files: [list key new files]
Modified files: [list key modified files]

Would you like me to:
1. Stage all changes and commit with message "feat: implement vN {name} design version"
2. Let you review first (I'll show you a diff summary)
3. Skip committing for now

Please choose 1, 2, or 3.
```

- If user chooses 1: Run `git add .` then `git commit` with the agreed message.
- If user chooses 2: Run `git diff --stat` and show summary, then ask again.
- If user chooses 3: Leave changes uncommitted in the worktree.

### Phase 7: Exit Worktree

1. Use `ExitWorktree` with `action: "keep"` to preserve the worktree and branch.
   - This returns the session to the original working directory.
   - The worktree remains on disk for the user to inspect later.

2. Tell the user where the worktree lives and how to access it:
   ```
   Worktree preserved at: [path]
   Branch: [branch name]
   To preview: cd [path] && yarn dev
   ```

### Phase 8: Update Checklist

Back in the original directory, update `docs/checklist.md`:
- Check off all completed items for the version that was just built.
- Note the date of completion.

### Phase 9: Next Version

Ask the user:

```
Version vN - Name is DONE.

Progress: [completed]/10 versions built.
Next in queue: vM - NextName

Would you like to:
1. Continue to the next version now
2. Take a break (you can resume later by invoking /execute-design-versions again)
```

- If user chooses 1: Go back to Phase 2 with the next version.
- If user chooses 2: End the session. The checklist tracks progress for resumption.

## Resuming After a Break

When this command is invoked and versions already exist:

1. Read `docs/checklist.md` to find completed versions.
2. Check `git worktree list` for any in-progress worktrees.
3. If an uncommitted worktree exists for a version:
   - Ask: "Found an in-progress worktree for vN. Resume working on it, or start fresh?"
   - If resume: `EnterWorktree` into the existing one (or `cd` to it).
   - If fresh: Ask user to remove the old worktree first.
4. If all completed versions are committed, pick the next one from the build order.

## Error Recovery

**Build fails:** Read error, fix, rebuild. Common issues:
- TypeScript errors: check prop types and imports.
- CSS errors: check Tailwind class names and custom properties.
- Missing imports: check all component imports.

**Tests fail:** Read test output, determine if:
- Test needs updating for new design (e.g., DOM structure changed) - fix the test.
- Actual bug in implementation - fix the implementation.

**Worktree issues:** If something goes wrong with the worktree:
- `git worktree list` to check status.
- NEVER force-remove. Ask the user what to do.

## Key Reminders

- **Use sub-agents aggressively** to parallelize work (per CLAUDE.md agent policy).
- **Read before writing** - always read a file before modifying it.
- **No em dashes** in any markdown files.
- **No unnecessary comments** in code.
- **Use lodash** for utility functions.
- **Ask before any git add/commit/stash/push** - every single time, no exceptions.
- **One version at a time** - do not attempt to build multiple versions simultaneously.
- **Follow the design spec** - each version's `.claude/skills/build-{name}.md` is the design bible.
