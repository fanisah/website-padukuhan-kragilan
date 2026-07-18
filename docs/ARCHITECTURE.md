# Architecture

The application is a React single-page application. Pages compose reusable components, services isolate Supabase access, and Supabase provides authentication and access to PostgreSQL.

```text
React
  ↓
Pages
  ↓
Components
  ↓
Services
  ↓
Supabase
  ↓
PostgreSQL
```

## Public Side

Public routes use `PublicLayout`, which supplies the shared header, footer, and `PublicProfileProvider`. Public pages display Home, Profil, Potensi, UMKM, Berita and its detail view, Agenda, Galeri, and Kontak. Published collection services query only records where `is_published` is true. News detail is retrieved by slug.

## Admin Side

The admin area provides Login, Dashboard, UMKM, Berita, Agenda, Galeri, and Profil pages. Its service modules expose database operations for the CMS: full CRUD for collection content and update-only access for the profile singleton. `AdminLayout` supplies the common authenticated admin interface.

## Context Providers

- `AuthProvider` is mounted around all routes. It initializes the Supabase session, listens for authentication changes, and exposes sign-in, sign-out, user, session, and loading state.
- `PublicProfileProvider` is mounted by `PublicLayout`. It loads the profile record and exposes resolved public profile values to public components.

## Protected Routes

`ProtectedRoute` waits while the authentication session is loading. Unauthenticated users are redirected to `/admin/login`; authenticated users may enter the nested `/admin` routes. Database authorization must also be enforced by Supabase policies.

## Service Layer

Files in `src/services` keep Supabase queries and data types separate from pages and components. Public services read published content. Admin services read all records and perform authorized mutations. Components consume these functions instead of querying Supabase directly.

## Fallback Strategy

The public website retains local static data when Supabase is unavailable, misconfigured, returns an error, or has no usable collection rows.

### Collection-level fallback

UMKM, News, Agenda, and Gallery start with their complete local collections. A collection is replaced only after its public service successfully returns at least one published row. Errors or empty results preserve the entire local collection.

### Field-level fallback

Profile uses field-level fallback. After loading the single `profile` record, each missing, blank, or invalid field falls back independently to the corresponding local value. If the profile request fails entirely, all local profile values remain active.
