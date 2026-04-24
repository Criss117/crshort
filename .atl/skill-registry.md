# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Go tests, Bubbletea TUI testing | go-testing | ~/.config/opencode/skills/go-testing/SKILL.md |
| Creating new AI agent skills | skill-creator | ~/.config/opencode/skills/skill-creator/SKILL.md |
| Creating GitHub issue | issue-creation | ~/.config/opencode/skills/issue-creation/SKILL.md |
| Creating pull request | branch-pr | ~/.config/opencode/skills/branch-pr/SKILL.md |
| Adversarial code review | judgment-day | ~/.config/opencode/skills/judgment-day/SKILL.md |
| React/Next.js performance | vercel-react-best-practices | .agents/skills/vercel-react-best-practices/SKILL.md |
| UI component / shadcn/ui | shadcn | .agents/skills/shadcn/SKILL.md |
| Frontend UI design | frontend-design | .agents/skills/frontend-design/SKILL.md |

## Compact Rules

### shadcn
- **className** for layout, not styling. Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`. For vertical stacks, `flex flex-col gap-*`.
- **Use `size-*** when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `cn()`** for conditional classes. Don't write manual template literal ternaries.
- **Forms use `FieldGroup` + `Field`.** Never use raw `div` with `space-y-*` or `grid gap-*` for form layout.
- **Items always inside their Group.** `SelectItem` → `SelectGroup`. `DropdownMenuItem` → `DropdownMenuGroup`.
- **Icons in Button use `data-icon`.** `data-icon="inline-start"` or `data-icon="inline-end"`.
- **Run `npx shadcn@latest docs <component>`** before working with any component to get correct API.

### frontend-design
- **Choose a bold aesthetic direction.** Refined minimalism, maximalist chaos, retro-futuristic, luxury, brutalist — pick one and commit.
- **Typography:** Use distinctive fonts. Avoid generic fonts like Inter, Roboto, Arial. Pair a distinctive display font with a refined body font.
- **Color:** Commit to a cohesive aesthetic. Use CSS variables. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion:** Use CSS-only animations where possible. Prioritize high-impact moments with animation-delay over scattered micro-interactions.
- **Spatial composition:** Unexpected layouts. Asymmetry. Overlap. Grid-breaking elements.
- **NEVER use generic AI aesthetics.** Avoid Inter, purple gradients, predictable layouts, cookie-cutter design.

### vercel-react-best-practices
- **async-parallel:** Use `Promise.all()` for independent async operations — never sequential awaits.
- **async-defer-await:** Move `await` into branches where actually used to avoid blocking paths that don't need it.
- **bundle-barrel-imports:** Import directly from source files. Barrel files (`index.js`) can load thousands of unused modules.
- **server-no-shared-module-state:** Never store mutable request data in module scope — causes race conditions.
- **rerender-memo:** Extract expensive work into memoized components to enable early returns.
- **Use `useTransition`** for non-urgent updates to keep UI responsive.
- **Use `startTransition`** to mark updates that don't need to be synchronous.

### go-testing
- Use **teatest** for Bubbletea TUI testing — provides stable component references.
- **Structure:** Table-driven tests, golden file comparisons, property-based tests.
- **Mocking:** Use interfaces, not concrete types — enables precise mocking.
- **Coverage:** Run with `-cover` flag, aim for 70%+ on business logic.
- **Integration tests:** Use `httptest` for HTTP handlers, `sqlmock` for DB.

### issue-creation
- **Issue-first workflow:** Always create GitHub issue before writing code.
- **Title format:** `[TYPE] Short description` (e.g., `[BUG] Auth redirect fails on logout`).
- **Description:** Include steps to reproduce, expected vs actual behavior, environment.
- **Labels:** Add appropriate labels (bug, feature, enhancement).

### branch-pr
- **Branch naming:** `type/description` (e.g., `fix/auth-redirect`, `feat/user-dashboard`).
- **PR description:** Include summary, testing steps, screenshots for UI changes.
- **Link issue:** Use "Closes #XXX" or "Fixes #XXX" to link to issue.
- **Reviews:** Request at least one reviewer for non-trivial changes.

### judgment-day
- **Launch two independent reviewers** simultaneously for the same code.
- **Synthesize findings:** Combine results, apply fixes.
- **Re-judge until both pass** or escalate after 2 iterations.
- **Escalation path:** If both blind judges fail, escalate to human review.

### skill-creator
- **Frontmatter required:** `name`, `description`, `user-invocable`, `allowed-tools`.
- **Description format:** First line is title, then "Trigger:" followed by exact trigger phrases.
- **Rules section:** Start with "## Rules" — these are enforced, not optional.
- **Store skills in:** `~/.config/opencode/skills/` (OpenCode), `.agents/skills/` (project).

### skill-registry
- **Scan user skills:** Glob `*/SKILL.md` across skill directories.
- **Skip `sdd-*` and `_shared`** — those are workflow skills, not coding skills.
- **Deduplicate:** Project-level skills take precedence over user-level.
- **Compact rules:** Extract 5-15 line summaries for each skill.
- **Write to:** `.atl/skill-registry.md` and save to engram.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | ./AGENTS.md | Project stack, commands, architecture quirks |

Read `AGENTS.md` for project-specific patterns, commands, and conventions.