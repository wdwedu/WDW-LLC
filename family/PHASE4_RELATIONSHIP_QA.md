# Phase 4 — Family relationship verification (2026-10-25)

**Branch:** `feature/williams-eight-biographies` (draft PR #3). **Do not merge or publish until privacy and browser testing.**

## Completed and checked
- Preserved all 134 current family/person/placeholder records and stable IDs; no duplicate IDs.
- All recorded `parent` ID references resolve to known records.
- Laurence Williams (`w1`) and Gertrude Smith Williams (`w2`) remain joined by the dotted marriage style.
- All 12 children in their displayed sibling group remain represented, including Wayne Williams Sr. (`w0`) as a *reference to the original card*, not a second person ID.
- Elaine Williams's three Henderson children (Derek, Wendy, Reginal), Gary Williams's daughter Chloe, and Brody's five named/placeholder child cards remain connected to their correct parent IDs.
- Henry Williams and Eloise Williams remain paired; Laurence's ancestor connection to Eloise persists through the stable stage data and existing link setup.
- Mary Alice D’Agostiano / Alice Goodson (`g3`) remains separate from Willie Goodson (`g22`), without a false Sarah Hall parent reference.
- **Fixed a missing line:** Alice (`g3`) and Willie (`g22`) now receive the black/white dotted marriage connector. The curve redraws after card rearrangement. Alice's Robertson parent connections remain intact.
- The eight-photo loader still points only to authenticated private storage, and the pictures were not added to public GitHub.
- Added repeatable zero-dependency Node test `family/tests/family-relationships.test.cjs`. Run in the repository with `node family/tests/family-relationships.test.cjs`.

## Testing and limits
- Programmatic source-data/connection assertions: **PASS** — 134 unique records, resolved parent IDs, key Williams and Goodson relationships, photo asset mapping, and ordered scripts.
- **Browser visual testing not performed in this phase.** Source integrity is not proof the SVG paths appear correctly in browsers or that all cards avoid overlap.
- Saved arrangements are browser-local; no user's personal `localStorage` was inspected, moved, or overwritten.
- Some historical records and the remaining Ancestry screenshot list are unverified; do not infer parents/children from similar names.
- Phase 3 real private service provisioning remains blocked: Supabase project access not connected. Existing public site still has older embedded portraits and should not be treated as access-controlled.

## Next
Proceed with Phase 5 Ancestry record reconciliation only from legible records or user-provided structured export. Complete the Phase 3 secure-service setup and privacy audit **before** any private image deployment or final merge.
