# Database

Application data is stored in the Supabase `public` schema. The column lists below reflect the fields used by the current service layer.

## `profile`

Purpose: stores the public identity, descriptive content, contact details, social links, and branding for the padukuhan.

Main columns:

- `id`: numeric primary identifier; the application always reads and updates `id = 1`.
- `nama_padukuhan`, `deskripsi`, `sejarah`, `visi`, `misi`: public profile content.
- `alamat`, `email`, `telepon`: contact information.
- `maps_url`, `youtube_url`, `instagram_url`, `logo_url`: external links and branding.
- `updated_at`: last-update timestamp.

This is a singleton record. There must be exactly one application-managed row, with `id = 1`. The admin interface does not create or delete profile rows; it only updates this record.

## `umkm`

Purpose: stores local UMKM listings shown on the public site and managed in the admin CMS.

Important fields:

- `id`: numeric identifier.
- `nama`, `kategori`, `deskripsi`: business identity and description.
- `alamat`, `maps_url`: location details.
- `instagram_url`, `whatsapp`: contact and social links.
- `foto_url`: listing image URL.
- `is_published`: controls public visibility.
- `created_at`, `updated_at`: audit timestamps.

## `news`

Purpose: stores village news articles and their public detail pages.

Important fields:

- `id`: numeric identifier.
- `judul`: article title.
- `slug`: unique, URL-safe article identifier used by the detail route.
- `ringkasan`, `isi`: summary and full article content.
- `thumbnail_url`: article image URL.
- `penulis`, `tanggal`: author and publication date.
- `is_published`: controls public visibility.
- `created_at`, `updated_at`: audit timestamps.

The service generates a unique slug from the title, adding a numeric suffix when necessary. The database should enforce uniqueness on `slug` as a final integrity guarantee.

## `agendas`

Purpose: stores village agenda entries. The feature is called “Agenda,” while the physical table used by the application is `agendas`.

Important fields:

- `id`: numeric identifier.
- `judul`, `deskripsi`: event title and description.
- `tanggal`, `jam`: event date and optional time.
- `lokasi`: event location.
- `gambar_url`: event image URL.
- `is_published`: controls public visibility.
- `created_at`, `updated_at`: audit timestamps.

## `gallery`

Purpose: stores gallery items for village activities and documentation.

Important fields:

- `id`: numeric identifier.
- `judul`, `deskripsi`: image title and description.
- `foto_url`: required image URL.
- `tanggal`: gallery item date.
- `is_published`: controls public visibility.
- `created_at`, `updated_at`: audit timestamps.

## Authentication and Access

- Authenticated admins sign in through Supabase Authentication and manage CMS records through the admin services.
- Public visitors do not sign in. They receive only published collection records and the public profile.
- Supabase Row Level Security policies should enforce these permissions; client-side protected routes are not a substitute for database authorization.

## Storage

Image storage is planned. The planned Supabase Storage bucket is:

```text
website-images
```

The current data model stores image locations as URL fields such as `foto_url`, `thumbnail_url`, `gambar_url`, and `logo_url`.
