# Roblox / Game Dev Route Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move Roblox/Game Development evidence off `/` and serve it from `/roblox-gamedev` without adding a router dependency.

**Architecture:** Keep the existing single Vue/Vite app. `App.vue` performs a minimal pathname switch, `RealWork.vue` retains BloxTop plus a route CTA, and a new `src/pages/RobloxGameDev.vue` owns all Roblox/Game Dev details. Vercel rewrites `/roblox-gamedev` to `index.html` for direct navigation.

**Tech Stack:** Vue 3, Vite, Tailwind CSS, Node test runner, Vercel rewrites

**Spec:** `docs/superpowers/specs/2026-09-13-roblox-gamedev-route-design.md`

## Global Constraints
- Preserve every pre-existing home section and case study.
- Keep BloxTop on `/`.
- Remove Roblox project details from `/`.
- Canonical route is `/roblox-gamedev`.
- Do not add Vue Router.
- Do not invent media or testimonials.

---

### Task 1: Route regression tests

**Files:**
- Modify: `tests/real-work.test.mjs`

**Interfaces:**
- Consumes: `src/App.vue`, `src/components/RealWork.vue`, `vercel.json`
- Produces: regression expectations for `src/pages/RobloxGameDev.vue` and `/roblox-gamedev`

- [ ] **Step 1: Write failing tests**

Add assertions that `RealWork.vue` contains BloxTop and a `/roblox-gamedev` link but no `Roblox Gameplay & NPC Systems`; that `App.vue` imports/renders `RobloxGameDev` based on `/roblox-gamedev`; that the page file exists and contains `Roblox-Scripting-Work`; and that `vercel.json` rewrites `/roblox-gamedev` to `/index.html`.

- [ ] **Step 2: Verify RED**

Run: `node --test tests/real-work.test.mjs`
Expected: FAIL because the dedicated route/page/rewrite do not exist and Roblox details still live in `RealWork.vue`.

### Task 2: Move Roblox/Game Dev to its own page

**Files:**
- Create: `src/pages/RobloxGameDev.vue`
- Modify: `src/components/RealWork.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: injected `language.currentLanguage`, existing `SpaceBackground` visual language
- Produces: `/roblox-gamedev` page and a home CTA linking to it

- [ ] **Step 1: Create `RobloxGameDev.vue`**

Render the existing Roblox evidence in English/Spanish, with a back link to `/`, stack tags, highlights, public repository link, and hidden empty media/testimonial sections.

- [ ] **Step 2: Remove Roblox details from `RealWork.vue`**

Keep only BloxTop in the project data and add a compact anchor linking to `/roblox-gamedev`.

- [ ] **Step 3: Add pathname routing in `App.vue`**

Compute `isRobloxGameDevRoute` from `window.location.pathname` and render `<RobloxGameDev />` instead of the normal home sequence when true. Keep the existing loading/progress shell and `SpaceBackground`.

- [ ] **Step 4: Verify GREEN for structural tests**

Run: `node --test tests/real-work.test.mjs`
Expected: all tests pass.

### Task 3: Vercel direct-route support and production verification

**Files:**
- Modify: `vercel.json`

**Interfaces:**
- Consumes: `/roblox-gamedev`
- Produces: SPA fallback to `/index.html` for that route

- [ ] **Step 1: Add rewrite**

Add `{ "source": "/roblox-gamedev", "destination": "/index.html" }` while retaining the existing `/api/(.*)` rewrite and headers.

- [ ] **Step 2: Run full verification**

Run: `node --test tests/real-work.test.mjs`
Expected: PASS.

Run: `npm run build`
Expected: Vite build exits successfully.

- [ ] **Step 3: Review diff**

Confirm no existing home sections or case studies were deleted and Roblox details exist only on the dedicated page.
