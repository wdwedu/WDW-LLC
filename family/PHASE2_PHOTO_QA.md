# Phase 2 — Eight private portraits: local QA (2026-10-25)

## Outcome
- Located `Williams_Family_Tree_Eight_Card_Update.zip` in the user's ChatGPT Library. ZIP was **not** uploaded to GitHub.
- Confirmed ZIP has all eight expected valid JPEGs, with no duplicate/missing filenames; each file decodes successfully.
- Inspected all eight crops against **user-provided photo descriptions**. The Gary/Brody/Larry and Laurence/Gertrude assignments follow the supplied left-to-right captions; this is not independent facial identity verification.
- A few group-photo crops contain small amounts of neighboring people/background. All eight portraits have usable face framing for the current family cards. Refine only if the user requests closer crops.
- Confirmed all eight existing stable person IDs and JPEG filenames match `family-photo-extension.js`. No duplicate people were added.
- Confirmed PR #3 on `feature/williams-eight-biographies` is draft, unmerged, six commits ahead/zero behind `main` before this QA update.
- Browser-rendered the ZIP's local `preview.html` with the eight local images temporarily inlined, avoiding network access. **Desktop 1280×800 and mobile 390×820: eight cards displayed, eight of eight images loaded, profile dialog and dialog portrait worked, no page-level horizontal overflow.**
- This does **not** verify the full deployed horizontal tree or a genuinely secured photo host. Those are future phases.

## Asset inventory (held privately, not tracked)
| Existing ID | Portrait filename | Resolution |
|---|---|---|
| `w1` | `laurence_williams.jpg` | 509×1100 |
| `w2` | `gertrude_smith_williams.jpg` | 667×1100 |
| `w4` | `eloise_williams.jpg` | 580×720 |
| `wa-gary` | `gary_williams.jpg` | 580×640 |
| `wa-brody` | `brody_williams.jpg` | 570×730 |
| `wa-larry` | `larry_williams.jpg` | 665×640 |
| `wa-henderson-derek` | `derek_henderson.jpg` | 841×1100 |
| `wa-henderson-reginald` | `reginal_henderson.jpg` | 1000×1019 |

## Mandatory privacy gate before Phase 3
The current public GitHub Pages website is **not** a private photo host. Files placed at `family/assets/williams-private/` in that public site would be publicly retrievable even if the UI asks for a family phrase or hides them behind an editor button. An ignore file reduces accidental commits, but does not prevent all uploads or enforce access control.

Implement and test real authentication and protected photo delivery before deploying these files. Private contact info and administrative records must never appear in public HTML, JS, or browser-downloadable JSON.

## Status
**Phase 2 local image QA complete; no photos committed; no merge; no production publication.**
Next: Phase 3 secure photo access/deployment design and implementation.
