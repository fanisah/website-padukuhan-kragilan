import Header from "./components/sections/Header";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import StrengthsSection from "./components/sections/StrengthsSection";
import UmkmSection from "./components/sections/UmkmSection";
import NewsSection from "./components/sections/NewsSection";
import AgendaSection from "./components/sections/AgendaSection";
import GallerySection from "./components/sections/GallerySection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";
import { OrnamentBand } from "./components/sections/shared";

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <Header />
      <main>
        <HeroSection />
        <OrnamentBand />
        <AboutSection />
        <StrengthsSection />
        <OrnamentBand />
        <UmkmSection />
        <NewsSection />
        <OrnamentBand />
        <AgendaSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

