# Phase 7 — Separate family-facing and editing experiences

## Implemented (draft branch only)
- `family/family-view.html` is a **read-only family experience** built from the same existing Williams–Goodson family records and card IDs as `family/horizontal.html`.
- All established tree navigation, pan/zoom, light/dark themes, family connections, already-public photos and short biographies remain available.
- `family/family-view.css` and `family/family-view.js` hide/disable Arrange, Save, Export, Import, profile fields and photo-management tools in the family-facing interface.
- `family/horizontal.js` now bypasses reading browser-local editing profile, picture and position overrides when `data-family-view="public"`; admin browser notes are not deliberately carried into the read-only viewer.
- `family-view.html` deliberately does **not** include `family-photo-extension.js` or attempt private photo authentication, because no secure storage account has been provisioned.
- Existing editor `family/horizontal.html` stays in place, preserving the user's browser-saved changes and established functionality. This is a **presentation split, not private admin security**.

## Privacy and limits
- GitHub Pages is public. The existing editor URL and the source records it includes remain publicly accessible; hiding controls cannot authorize access or secure administrative data.
- The existing website code already contains some embedded photographs and names. This phase does not add new private image files or personally identifying contact data.
- Public read-only page shows **photos already contained in published tree data**. The eight separately cropped private photos are **not** made visible in this release: doing so in a public repository requires affirmative approval to publish those photos.
- No private contact records (addresses, emails, telephone numbers, private notes, social links) have been added. They must remain separate from public JS, HTML, browser localStorage on shared devices, and public export files.
- Without signing up for a backend or using real access controls, an actual private administrator backend cannot be delivered securely on this static public host.

## Checks
- Draft branch file and script load order confirmed.
- Both modified JS files parse.
- No static private-photo loader on the family view.
- Browser-local profile/photo overrides excluded from the family view.
- Full interactive desktop/mobile, source exposure audit and live hosting validation remain outstanding. No deployment or merge was performed.

## Deployment gate
Do not merge until all prior and new source files have been audited for sensitive family data, including embedded portraits already in public scripts. The user may approve a public subset of photos and biographies while leaving personal contact details off-site.
