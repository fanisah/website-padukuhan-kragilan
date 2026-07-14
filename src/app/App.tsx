import { BrowserRouter, Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import StrengthsPage from "./pages/StrengthsPage";
import UmkmPage from "./pages/UmkmPage";
import NewsPage from "./pages/NewsPage";
import AgendaPage from "./pages/AgendaPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import {
  AdminAgendaPage,
  AdminDashboardPage,
  AdminGalleryPage,
  AdminNewsPage,
  AdminProfilePage,
  AdminUmkmPage,
} from "./pages/admin/AdminPages";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="berita" element={<AdminNewsPage />} />
              <Route path="agenda" element={<AdminAgendaPage />} />
              <Route path="umkm" element={<AdminUmkmPage />} />
              <Route path="galeri" element={<AdminGalleryPage />} />
              <Route path="profil" element={<AdminProfilePage />} />
            </Route>
          </Route>

          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="profil" element={<ProfilePage />} />
            <Route path="potensi" element={<StrengthsPage />} />
            <Route path="umkm" element={<UmkmPage />} />
            <Route path="berita" element={<NewsPage />} />
            <Route path="agenda" element={<AgendaPage />} />
            <Route path="galeri" element={<GalleryPage />} />
            <Route path="kontak" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
