-- Apply once in the Supabase SQL editor before using the new CMS sections.
-- The profile table remains a singleton (id = 1); no existing data is removed.

alter table public.profile
  add column if not exists hero_headline text,
  add column if not exists hero_subheadline text,
  add column if not exists hero_image_url text,
  add column if not exists about_image_url text,
  add column if not exists jam_pelayanan text,
  add column if not exists facebook_url text,
  add column if not exists website_url text;

alter table public.potencies
  add column if not exists image_url text;

update public.profile
set
  hero_headline = coalesce(hero_headline, 'Website Resmi Padukuhan Kragilan'),
  hero_subheadline = coalesce(hero_subheadline, 'Informasi, layanan, dan potensi Padukuhan Kragilan dalam satu tempat.'),
  jam_pelayanan = coalesce(jam_pelayanan, 'Senin–Jumat, 08.00–15.00 WIB')
where id = 1;
