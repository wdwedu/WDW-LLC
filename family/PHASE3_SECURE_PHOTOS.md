# Phase 3 — secure family portrait delivery (integration staged; not live)

## Security boundary

`wdwedu/WDW-LLC` and GitHub Pages are public. Never commit the private JPEG files,
phone numbers, birth records, privileged keys, or an unrestricted image endpoint.
The original `family/horizontal-data.js` currently embeds **other older portraits** in a publicly
accessible file. Securing these eight **new** portraits does not make the entire tree private.
Review and remove sensitive embedded records before claiming a fully private family-facing site.

## Design

A private Supabase Storage bucket (`family-portraits`) is served through the user's
authenticated browser session; `storage.objects` RLS permits downloads only when
`public.wdw_family_photo_members` contains an active approval for `auth.uid()`.
Public frontend JS uses a browser **publishable** key, never a service key. Family
member access is individually revocable through the approvals table. Admin upload
permissions are restricted to the owner. There is no anonymous access policy.

`family-photo-extension.js` loads `family-access-config.json` only when it exists,
shows a small Family Photos login in the existing navigation, and requests the eight
portraits *only after* Supabase `auth.getUser()` succeeds. It uses private `download`,
not public URLs or signed URLs; browser object URLs are revoked on sign-out.
Saved browser-selected photos still override remote photos. Missing config leaves
all legacy site features intact (and does **not** mean they are secure).

## Files to provision privately, not in the repository

Eight vetted images from `Williams_Family_Tree_Eight_Card_Update.zip` must be uploaded
into `family-portraits/williams-eight/` **after** the private storage bucket and RLS
policies are activated. Their filenames are in the photo extension map.

## Required account-side setup (not yet performed)

1. Connect the owner's Supabase project with rights to manage Auth, SQL and Storage.
2. Review and run `setup-family-photos.sql`; verify the bucket remains private.
3. Enable Email Auth, configure allowed redirect `https://www.wdw.llc/family/horizontal.html`.
   Use `shouldCreateUser:false` and invite/create family accounts explicitly.
4. Populate an owner approval by verified `auth.users.id`, and invite approved family
   members individually with `role='family'`.
5. Upload eight portraits to `family-portraits/williams-eight/` through authenticated
   Storage or Dashboard. No public object URLs.
6. Publish `family-access-config.json` with ONLY `url` and `publishableKey` based on
   the example. No `service_role`, secret key, JWT, or contact details.
7. Negative tests: anonymous fetch denied; signed-in but unapproved user denied;
   approved user loads all eight; sign-out removes visible private photos;
   revoking an approved user's membership prevents further access.
8. Test real mobile/desktop browser login callbacks and ensure no access key or photo
   contents appear in a public GitHub tree, network-cached public URL, or browser logs.

The existing main branch is not touched by this stage. No merge, public deployment,
or private-photo upload is authorized merely by this design package.