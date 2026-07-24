-- TASK 033: role-based access for Padukuhan Kragilan administrators.
-- Run this migration before deploying the matching frontend changes.

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'editor'
    check (role in ('super_admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Preserve access for existing Auth users. The oldest existing account becomes
-- the initial super admin; other existing accounts remain content editors.
insert into public.admin_profiles (user_id, email, role, is_active)
select
  id,
  coalesce(email, ''),
  case when row_number() over (order by created_at, id) = 1
    then 'super_admin'
    else 'editor'
  end,
  true
from auth.users
on conflict (user_id) do nothing;

do $$
begin
  if not exists (
    select 1 from public.admin_profiles
    where role = 'super_admin' and is_active
  ) then
    update public.admin_profiles
    set role = 'super_admin', is_active = true, updated_at = now()
    where user_id = (
      select user_id from public.admin_profiles
      order by created_at, user_id
      limit 1
    );
  end if;
end $$;

create or replace function public.is_active_admin(target_user uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = target_user
      and is_active = true
      and role in ('super_admin', 'editor')
  );
$$;

create or replace function public.is_super_admin(target_user uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = target_user
      and is_active = true
      and role = 'super_admin'
  );
$$;

revoke all on function public.is_active_admin(uuid) from public;
revoke all on function public.is_super_admin(uuid) from public;
grant execute on function public.is_active_admin(uuid) to authenticated;
grant execute on function public.is_super_admin(uuid) to authenticated;

create or replace function public.sync_admin_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_profiles (user_id, email, role, is_active)
  values (new.id, coalesce(new.email, ''), 'editor', true)
  on conflict (user_id) do update
    set email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists sync_admin_profile_from_auth on auth.users;
create trigger sync_admin_profile_from_auth
after insert or update of email on auth.users
for each row execute function public.sync_admin_profile();

create or replace function public.protect_last_super_admin()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if old.role = 'super_admin'
     and old.is_active = true
     and (tg_op = 'DELETE' or new.role <> 'super_admin' or new.is_active = false)
     and not exists (
       select 1 from public.admin_profiles
       where user_id <> old.user_id
         and role = 'super_admin'
         and is_active = true
     )
  then
    raise exception 'Minimal satu Super Admin aktif harus tersedia.';
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

drop trigger if exists protect_last_super_admin on public.admin_profiles;
create trigger protect_last_super_admin
before update of role, is_active or delete on public.admin_profiles
for each row execute function public.protect_last_super_admin();

create or replace function public.set_admin_profile_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_admin_profile_updated_at on public.admin_profiles;
create trigger set_admin_profile_updated_at
before update on public.admin_profiles
for each row execute function public.set_admin_profile_updated_at();

alter table public.admin_profiles enable row level security;

drop policy if exists admin_profiles_read on public.admin_profiles;
create policy admin_profiles_read
on public.admin_profiles
for select
to authenticated
using (user_id = auth.uid() or public.is_super_admin());

drop policy if exists admin_profiles_super_admin_update on public.admin_profiles;
create policy admin_profiles_super_admin_update
on public.admin_profiles
for update
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

revoke insert, delete on public.admin_profiles from authenticated;
revoke update on public.admin_profiles from authenticated;
grant select on public.admin_profiles to authenticated;
grant update (role, is_active) on public.admin_profiles to authenticated;

-- Keep all existing content CRUD available to active Editors and Super Admins.
-- Restrictive policies also prevent deactivated accounts from using a stale JWT,
-- even if an older permissive "authenticated" policy still exists.
do $$
declare
  table_name text;
  policy_name text;
begin
  foreach table_name in array array[
    'profile',
    'umkm',
    'news',
    'agendas',
    'gallery',
    'potencies',
    'news_attachments'
  ]
  loop
    if to_regclass('public.' || table_name) is not null then
      policy_name := table_name || '_active_admin_restriction';
      execute format('alter table public.%I enable row level security', table_name);
      execute format('drop policy if exists %I on public.%I', policy_name, table_name);
      execute format(
        'create policy %I on public.%I as restrictive for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin())',
        policy_name,
        table_name
      );

      policy_name := table_name || '_active_admin_crud';
      execute format('drop policy if exists %I on public.%I', policy_name, table_name);
      execute format(
        'create policy %I on public.%I for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin())',
        policy_name,
        table_name
      );
    end if;
  end loop;
end $$;

-- Apply the same active-admin guard to writes in the website image bucket.
drop policy if exists website_images_active_admin_insert on storage.objects;
create policy website_images_active_admin_insert
on storage.objects as restrictive
for insert to authenticated
with check (bucket_id <> 'website-images' or public.is_active_admin());

drop policy if exists website_images_active_admin_update on storage.objects;
create policy website_images_active_admin_update
on storage.objects as restrictive
for update to authenticated
using (bucket_id <> 'website-images' or public.is_active_admin())
with check (bucket_id <> 'website-images' or public.is_active_admin());

drop policy if exists website_images_active_admin_delete on storage.objects;
create policy website_images_active_admin_delete
on storage.objects as restrictive
for delete to authenticated
using (bucket_id <> 'website-images' or public.is_active_admin());
