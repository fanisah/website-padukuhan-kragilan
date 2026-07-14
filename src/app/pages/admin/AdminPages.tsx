import AdminPlaceholderPage from "./AdminPlaceholderPage";

export function AdminDashboardPage() {
  return <AdminPlaceholderPage title="Dashboard" description="Ringkasan area administrasi Padukuhan Kragilan." />;
}

export { default as AdminNewsPage } from "./AdminNewsPage";

export { default as AdminAgendaPage } from "./AdminAgendaPage";

export { default as AdminUmkmPage } from "./AdminUmkmPage";

export { default as AdminGalleryPage } from "./AdminGalleryPage";

export function AdminProfilePage() {
  return <AdminPlaceholderPage title="Profil" description="Kelola informasi profil Padukuhan Kragilan." />;
}
