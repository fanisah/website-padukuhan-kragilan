-- TASK 029: enrich existing UMKM records without replacing or deleting data.
-- Existing equivalents remain in use:
-- category -> kategori, instagram -> instagram_url, address -> alamat,
-- google_maps_url -> maps_url, and whatsapp -> whatsapp.

alter table public.umkm
  add column if not exists featured_products text,
  add column if not exists shopee text,
  add column if not exists operating_days text,
  add column if not exists slug text;

do $$
declare
  target record;
  base_slug text;
  candidate text;
  suffix integer;
begin
  for target in
    select id, nama
    from public.umkm
    where slug is null or btrim(slug) = ''
    order by created_at nulls last, id
  loop
    base_slug := trim(both '-' from regexp_replace(
      lower(translate(target.nama, 'ÁÀÂÄÃÅáàâäãåÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÖÕóòôöõÚÙÛÜúùûüÇçÑñ', 'AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuCcNn')),
      '[^a-z0-9]+',
      '-',
      'g'
    ));
    if base_slug = '' then base_slug := 'umkm'; end if;

    candidate := base_slug;
    suffix := 2;
    while exists (select 1 from public.umkm where slug = candidate and id <> target.id) loop
      candidate := base_slug || '-' || suffix;
      suffix := suffix + 1;
    end loop;

    update public.umkm set slug = candidate where id = target.id;
  end loop;
end $$;

alter table public.umkm
  alter column slug set not null;

create unique index if not exists umkm_slug_unique_idx
  on public.umkm (slug);
