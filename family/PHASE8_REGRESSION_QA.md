# Phase 8 — Family tree regression and privacy QA (2026-10-26)

## Status
**Source-level automated checks complete: 25 passed / 0 failed. Full visual browser tests and live deployment checks are NOT complete.** This distinction matters: source checks are not proof that controls work, cards are visible, or photos render correctly.

## Corrective edit committed
- `family/horizontal.js`: protect the family-facing page from writing browser-local editor state.
- Replace outdated ChatGPT-specific backup/export instructions with neutral, self-contained backup messaging.
- Preserve editor's local save key `wdw-family-horizontal-v1`, stable card IDs, export JSON schema and import behavior.

## Programmatic QA passing
- Six primary script syntax checks and other supporting JavaScript syntax tests.
- 134 unique family-person and placeholder records; all recorded parent references resolve.
- Admin and read-only family pages load scripts in the correct order.
- Read-only page does not load the optional protected-photo extension, nor browser-local editing data.
- Public page disables/hides editing tools; admin page retains crop, photo upload, arrangement, search, import/export and jukebox wiring.
- Source includes mouse-grab canvas pan, light/dark tree artwork selectors and family connector redraw logic.
- Mary Alice–Willie marriage line, Robertson parents and existing family IDs remain intact.
- `tree-light.jpg` and `tree-dark.jpg` files exist in GitHub (presence check only; not a visual render or decode test).
- Optional eight-photo extension contains no private image bytes and no public direct-private-image path.

## Tests NOT performed / NOT proved
- Desktop and phone **rendered** browsing of this draft branch.
- Whether mirrored tree images are visible or correctly aligned on actual screens.
- Family cards and photo cropping/dragging under real pointer/touch events.
- Save, restore, import/export with user-specific real browser localStorage.
- Protected-photo authentication tests with a running backend (no configured project).
- Full repo privacy audit of previously embedded photographs and other legacy data.
- Actual live deployment of the draft.

## Release gate
- Keep PR #3 draft and unmerged.
- Never publish private contact records or the eight restricted new photos through static public GitHub.
- Before Phase 9 merge, run real rendered browser QA and legacy source privacy review and resolve any failures.
