-- PHASE 3: run only inside the owner's chosen Supabase project, AFTER reviewing.
-- No account IDs or private information are embedded in this public file.
-- All authorization is enforced server-side with RLS. No anonymous access.

create table if not exists public.wdw_family_photo_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','family')),
  active boolean not null default true,
  added_at timestamptz not null default now()
);

alter table public.wdw_family_photo_members enable row level security;
revoke all on public.wdw_family_photo_members from anon, authenticated;
grant select on public.wdw_family_photo_members to authenticated;
-- Only approved members may discover their own membership; no client writes.
drop policy if exists "approved member reads own photo membership" on public.wdw_family_photo_members;
create policy "approved member reads own photo membership"
on public.wdw_family_photo_members for select to authenticated
using (user_id = (select auth.uid()));

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('family-portraits','family-portraits',false,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=false,file_size_limit=5242880,
  allowed_mime_types=array['image/jpeg','image/png','image/webp'];

-- Reading a photo requires BOTH a valid Supabase user session AND active approval.
-- Never allow bucket listing or download to all authenticated accounts by role alone.
drop policy if exists "approved family may read portraits" on storage.objects;
create policy "approved family may read portraits"
on storage.objects for select to authenticated
using (
  bucket_id='family-portraits'
  and exists (
    select 1 from public.wdw_family_photo_members m
    where m.user_id=(select auth.uid()) and m.active
  )
);

-- Only the approved owner can upload, update, or delete images using an
-- authenticated application; service-role keys never go into frontend code.
drop policy if exists "owner may upload portraits" on storage.objects;
create policy "owner may upload portraits"
on storage.objects for insert to authenticated
with check (
  bucket_id='family-portraits'
  and exists(select 1 from public.wdw_family_photo_members m
             where m.user_id=(select auth.uid()) and m.active and m.role='owner')
);
drop policy if exists "owner may update portraits" on storage.objects;
create policy "owner may update portraits"
on storage.objects for update to authenticated
using (
 bucket_id='family-portraits'
 and exists(select 1 from public.wdw_family_photo_members m
            where m.user_id=(select auth.uid()) and m.active and m.role='owner')
)
with check (
 bucket_id='family-portraits'
 and exists(select 1 from public.wdw_family_photo_members m
            where m.user_id=(select auth.uid()) and m.active and m.role='owner')
);
drop policy if exists "owner may delete portraits" on storage.objects;
create policy "owner may delete portraits"
on storage.objects for delete to authenticated
using (
 bucket_id='family-portraits'
 and exists(select 1 from public.wdw_family_photo_members m
            where m.user_id=(select auth.uid()) and m.active and m.role='owner')
);

-- After Supabase Auth user accounts exist, an owner must approve their actual auth UUIDs.
-- Example (DO NOT fill in or commit family data here):
-- insert into public.wdw_family_photo_members(user_id,role,active)
-- values ('<OWNER_AUTH_USER_UUID>','owner',true);
-- Family users: same form with role 'family'.
-- Auth users must be invited / created by an administrator; signInWithOtp
-- uses shouldCreateUser:false and never grants membership automatically.