import MainContent from "../components/layout/MainContent";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import StrengthsSection from "../components/sections/StrengthsSection";
import UmkmSection from "../components/sections/UmkmSection";
import NewsSection from "../components/sections/NewsSection";
import AgendaSection from "../components/sections/AgendaSection";
import GallerySection from "../components/sections/GallerySection";
import ContactSection from "../components/sections/ContactSection";
import { OrnamentBand } from "../components/sections/shared";

export default function HomePage() {
  return (
    <MainContent>
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
    </MainContent>
  );
}
