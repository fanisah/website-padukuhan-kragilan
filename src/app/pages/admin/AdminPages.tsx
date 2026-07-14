import AdminPlaceholderPage from "./AdminPlaceholderPage";

export function AdminDashboardPage() {
  return <AdminPlaceholderPage title="Dashboard" description="Ringkasan area administrasi Padukuhan Kragilan." />;
}

export { default as AdminNewsPage } from "./AdminNewsPage";

export function AdminAgendaPage() {
  return <AdminPlaceholderPage title="Agenda" description="Kelola jadwal kegiatan dan agenda warga." />;
}

export { default as AdminUmkmPage } from "./AdminUmkmPage";

export function AdminGalleryPage() {
  return <AdminPlaceholderPage title="Galeri" description="Kelola dokumentasi foto kegiatan padukuhan." />;
}

export function AdminProfilePage() {
  return <AdminPlaceholderPage title="Profil" description="Kelola informasi profil Padukuhan Kragilan." />;
}
