# Roblox / Game Dev Route Design

## Goal
Move Roblox/Game Development evidence out of the main portfolio page and give it a dedicated `/roblox-gamedev` route, while leaving BloxTop and all pre-existing portfolio sections on `/`.

## Routing
The app stays dependency-light and does not add Vue Router. `App.vue` selects the rendered page from `window.location.pathname`: `/roblox-gamedev` renders the dedicated page; every other path renders the existing portfolio flow. Vercel rewrites `/roblox-gamedev` to `/index.html` so direct visits and refreshes resolve through the SPA.

## Main page
`RealWork.vue` remains on `/`, but contains only BloxTop and a compact link/card that points visitors to `/roblox-gamedev`. No Roblox project details, Roblox stack, or Roblox evidence list remain on the main page.

## Roblox/Game Dev page
Create `src/pages/RobloxGameDev.vue` as a focused page that reuses the current black/white manga-space visual language. It contains a clear back link to `/`, a page heading, the existing Roblox gameplay/NPC evidence, stack, public repository link, and data-driven media/testimonial slots that stay hidden when empty.

## Constraints
- Do not remove or replace existing portfolio sections or case studies.
- Keep BloxTop on `/`.
- Keep Roblox and Game Dev together on one route.
- Canonical path is `/roblox-gamedev`.
- Do not add Vue Router or another routing dependency.
- Preserve Spanish/English behavior inside the new page.
- Do not invent screenshots, testimonials, or client claims.

## Verification
Add structural regression tests asserting that `RealWork.vue` no longer contains Roblox project details, `App.vue` routes `/roblox-gamedev` to the new page, the new page contains the Roblox evidence, and `vercel.json` has the dedicated SPA rewrite. Run the Node tests and production Vite build before merge.