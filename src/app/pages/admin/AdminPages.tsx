import AdminPlaceholderPage from "./AdminPlaceholderPage";

export function AdminDashboardPage() {
  return <AdminPlaceholderPage title="Dashboard" description="Ringkasan area administrasi Padukuhan Kragilan." />;
}

export function AdminNewsPage() {
  return <AdminPlaceholderPage title="Berita" description="Kelola informasi dan berita publik Padukuhan Kragilan." />;
}

export function AdminAgendaPage() {
  return <AdminPlaceholderPage title="Agenda" description="Kelola jadwal kegiatan dan agenda warga." />;
}

export function AdminUmkmPage() {
  return <AdminPlaceholderPage title="UMKM" description="Kelola daftar usaha dan UMKM warga." />;
}

export function AdminGalleryPage() {
  return <AdminPlaceholderPage title="Galeri" description="Kelola dokumentasi foto kegiatan padukuhan." />;
}

export function AdminProfilePage() {
  return <AdminPlaceholderPage title="Profil" description="Kelola informasi profil Padukuhan Kragilan." />;
}
