# Williams Family Tree — Eight-Photo Integration (2026-10-25)

## Completed on this branch
- Reused existing cards (no duplicate people): `w1`, `w2`, `w4`, `wa-gary`, `wa-brody`, `wa-larry`, `wa-henderson-derek`, and `wa-henderson-reginald`.
- Updated verified names: Laurence Williams, Gertrude Smith Williams, and Reginal Henderson.
- Added eight factual starter bios/relationship summaries in `horizontal-v2.js`; user-saved profile edits take priority.
- Wired `family-photo-extension.js` into `horizontal.html` after map initialization.
- The new loader checks for eight matching private image files and shows them if present; absent photos leave current cards intact. Browser-saved uploads take priority.

## Private image filenames (not committed)
Place these in `family/assets/williams-private/` in an actual access-controlled deployment:
`laurence_williams.jpg`, `gertrude_smith_williams.jpg`, `eloise_williams.jpg`, `gary_williams.jpg`, `brody_williams.jpg`, `larry_williams.jpg`, `derek_henderson.jpg`, and `reginal_henderson.jpg`.

## Photo identities
- Three men in the restaurant picture, LEFT to RIGHT: Gary Williams, Brody Williams, Larry Williams.
- Grandparent photo, LEFT to RIGHT: Laurence Williams, Gertrude Smith Williams.
- Separate photos: Reginal Henderson (Elaine’s youngest son), Derek Henderson (Elaine’s oldest son), and Eloise Williams (great-grandmother).

## Security and deployment
This GitHub repository is **public**. An on-page family passphrase is not strong access protection. DO NOT commit private pictures or living relatives' birth dates, contact information, or other administrative records to this repository. A complete locally downloadable eight-card preview and private photo package is available separately in the conversation. The public site should not be changed until a secure solution for family-only portraits is ready.

## Scope
The existing full horizontal tree, original relationships, photos, saved arrangements, export/import controls, and music links are preserved. These changes concern eight identified cards only; the other Ancestry list entries remain a separate review/import task. Existing user-saved profile overrides can still supersede updated default biographies.

## Verification
- Branch JavaScript parses without syntax errors.
- All eight card IDs exist in current tree data.
- `horizontal.html` loads the extension after the original map and v2.
- Photo assets in the local package match the filenames listed here.
- Production browser testing and actual access-controlled deployment remain unverified.
