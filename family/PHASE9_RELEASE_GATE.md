# Phase 9 — Final release preparation / hold (2026-10-26)

## Outcome
**Pre-release gate prepared; final public merge deliberately HELD**. Keep the current live tree working. User requests only the actual site link in conversation and no GitHub link.

## Verified during this phase
- Draft development branch includes the read-only `family-view.html` and existing `horizontal.html`.
- Existing family dataset `family/horizontal-data.js` contains **102 base cards and 75 inline base64 photo images**. These are source-visible to anyone with repository access (and existing public publishing may already expose them).
- Existing launch sequence depends on restoring all visuals, mobile drag/crop interactions, and browser-specific saved arrangements; no authenticated device/browser test has been performed on the unmerged draft.
- Eight newly cropped private portraits remain uncommitted to the public repo.
- Added `.github/workflows/family-tree-checks.yml` to run existing node relationship tests and detect accidentally tracked restricted photo files/public private-photo paths.

## Release conditions
1. Confirm that the family-facing names/biographies and 75 already embedded portraits are approved for public internet display. If not, remove/distribute sensitive portraits from an authenticated store BEFORE merge. Hiding by CSS or adding a client-side password is insufficient.
2. Confirm the user understands `family/horizontal.html` remains a public editing interface in a public repository, NOT a private server-backed admin application. Do not add contacts/addresses/emails there.
3. Render the draft at desktop/mobile and prove both themes/tree artwork, family cards, links, click-to-view panels, image cropping and bounded zoom, scrolling, save/import/export, and family reader non-mutating behavior.
4. Run the CI relationship-and-privacy suite to green and review any errors.
5. Check `family/index.html` route and preserve current browser-local saved arrangement with unchanged ID/key/schema and existing `family/tree.html` behavior.
6. Only after all checks and public-content approval, merge and verify exact actual website URL loads the intended family-facing page.

## Decision
**Do not merge**. No new private photos or contact details were published. Current live website remains as before. Further work includes rendered QA and explicit public photo/content approval, which is separate from consent to show family only.
