-- Corrective, idempotent migration for Potensi.
-- The existing table and rows are preserved.

create extension if not exists pgcrypto;

alter table public.potencies
  add column if not exists image_url text;

-- The live table uses UUID identifiers. Ensure new rows receive one automatically.
alter table public.potencies
  alter column id set default gen_random_uuid();

-- Older versions used icon for the hardcoded presentation. The simplified CMS no
-- longer edits it, so a default prevents that legacy column blocking inserts.
alter table public.potencies
  alter column icon set default 'creative';

grant select on table public.potencies to anon;
grant select, insert, update, delete on table public.potencies to authenticated;

alter table public.potencies enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='potencies' and policyname='Public can read published potencies') then
    create policy "Public can read published potencies" on public.potencies for select to anon using (is_published = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='potencies' and policyname='Authenticated admins can read potencies') then
    create policy "Authenticated admins can read potencies" on public.potencies for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='potencies' and policyname='Authenticated admins can insert potencies') then
    create policy "Authenticated admins can insert potencies" on public.potencies for insert to authenticated with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='potencies' and policyname='Authenticated admins can update potencies') then
    create policy "Authenticated admins can update potencies" on public.potencies for update to authenticated using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='potencies' and policyname='Authenticated admins can delete potencies') then
    create policy "Authenticated admins can delete potencies" on public.potencies for delete to authenticated using (true);
  end if;
end $$;

-- Storage bucket website-images and its upload policies are managed separately;
-- this migration intentionally does not alter Storage lifecycle or policies.
