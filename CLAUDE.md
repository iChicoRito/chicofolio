# CLAUDE.md

## Project

Personal portfolio website built on a Next.js.

* Next.js 16, React 19, TypeScript
* Tailwind CSS 4, shadcn/ui (Radix, Base UI)
* Zustand for state, React Hook Form + Zod for forms
* Resend for the contact form
* Biome for lint and format, Vitest + Testing Library for tests
* Source in `src/`, static files in `public/`, docs in `docs/`

## Commands

* `npm run dev`: start the dev server
* `npm run build`: production build
* `npm test`: run Vitest tests
* `npm run test:portfolio`: portfolio smoke test
* `npm run lint`: Biome lint
* `npm run check` / `npm run check:fix`: Biome check (and fix)
* `npm run format`: Biome format
* `npx tsc --noEmit`: type check

## Rules

### 1. Plan first

For any task bigger than a small fix:

1. Understand the goal and read the code it touches.
2. Write a short plan: what changes, which files, which skills or plugins are needed.
3. Check that the plan is not over-engineered.
4. Use the `visual-plan` skill to create a visual version of the plan. Save it in `docs/visual-plans` with a file name that describes the task.
5. Implement. Keep the code as simple as the plan.

Small fixes (typos, one-line changes, simple questions) skip the plan and the visual plan.

### 2. Keep it simple and focused

* Do only what the user asked. The latest instruction wins.
* Prefer the smallest change that correctly solves the task.
* Reuse existing code and project patterns before writing new code.
* Do not add abstractions, layers, features, or libraries without a clear need.
* Do not change, clean up, or restructure unrelated code.
* Keep existing working behavior unless the task requires a change.

### 3. Skills and plugins

Use a skill or plugin only when it directly helps the current task. Do not load one just because it is available.

### 4. Git

* Never commit unless the user asks.
* Commit messages contain only the approved message. No `Co-Authored-By`, no Claude or AI author lines, no other author changes.

### 5. Check work before finishing

* Review the changes for mistakes.
* Run the checks that match the change:
  * `npm test` and `npx tsc --noEmit`.
  * `npm run check` for lint and format.
* Say clearly what was not checked.
* Never claim something works without checking it when checking was possible.

### 6. Plain language

Use simple, clear words. Keep explanations short. Explain any technical term that is needed.
