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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
    </BrowserRouter>
  );
}
