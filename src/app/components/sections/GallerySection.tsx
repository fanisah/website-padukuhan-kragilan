import { useState } from "react";
import { Link } from "react-router";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ExternalLink,
  Instagram,
  Users,
  ShoppingBag,
  Music,
  ArrowRight,
  Eye,
  Globe,
  GraduationCap,
  Building2,
  Calendar,
  Zap,
} from "lucide-react";

// â”€â”€â”€ TOKENS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Primary:      #0D6F6B  Deep Teal
// Secondary:    #2F8F83  Teal
// Accent:       #F6C343  Warm Yellow
// Accent Dark:  #6B4B3E  Traditional Brown
// Deep Blue:    #174A70
// Background:   #FFF9EC  Soft Cream
// Text:         #173F57
// Muted:        #5F6F72
// Border:       #D8E4DF
import { SectionHeader, SectionOrnament } from "./shared";
import { galleryContent, galleryData } from "../../../data/gallery";
import { usePublishedCollection } from "../../hooks/usePublishedCollection";
import { getPublishedGallery, type GalleryItem } from "../../../services/gallery";
import { normalizeImagePosition } from "../../utils/imageFocalPoint";

type GalleryUiItem = (typeof galleryData)[number] & {
  positionX: number;
  positionY: number;
};

const localGalleryItems: GalleryUiItem[] = galleryData.map((item) => ({
  ...item,
  positionX: 50,
  positionY: 50,
}));

function mapGallery(row: GalleryItem, index: number): GalleryUiItem {
  const position = normalizeImagePosition(row.image_position_x, row.image_position_y);
  return {
    src: row.foto_url.trim(),
    alt: row.judul,
    big: index === 0,
    positionX: position.x,
    positionY: position.y,
  };
}

export default function GallerySection({ pageHeading = false }: { pageHeading?: boolean }) {
  const items = usePublishedCollection(localGalleryItems, getPublishedGallery, mapGallery);
  const [lb, setLb] = useState<string | null>(null);

  return (
    <section id="galeri" className="relative overflow-hidden bg-[#FFFEF9] py-20 lg:py-24">
      <SectionOrnament position="top-right" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          as={pageHeading ? "h1" : "h2"}
          label={galleryContent.label}
          title={galleryContent.title}
          description={galleryContent.description}
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: "200px" }}>
          {items.map((p, i) => (
            <button
              type="button"
              key={i}
              disabled={!p.src}
              aria-label={p.src ? `Perbesar ${p.alt}` : undefined}
              className={`relative overflow-hidden rounded-3xl border border-[#D8E4DF] bg-[#F5F7F4] shadow-[0_10px_28px_rgba(23,74,112,0.07)] transition-[transform,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6F6B] ${p.src ? "group cursor-pointer hover:-translate-y-1 hover:border-[#0D6F6B]/25 hover:shadow-[0_18px_40px_rgba(23,74,112,0.12)]" : "cursor-default"} ${p.big ? "md:col-span-2 md:row-span-2" : ""}`}
              onClick={() => p.src && setLb(p.src)}
            >
              {p.src ? (
                <img src={p.src} alt={p.alt} className="h-full w-full object-contain p-2.5" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F5F7F4] text-[13px] font-semibold text-[#7C8C8A]">Gambar belum tersedia</div>
              )}
              {p.src && <div className="absolute inset-0 bg-black/0 group-hover:bg-black/24 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#FFFEF9]/20 rounded-full p-2.5">
                  <Eye size={18} className="text-white" />
                </div>
              </div>}
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/galeri" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#D8E4DF] text-[13px] font-semibold text-[#173F57] hover:border-[#0D6F6B] hover:text-[#0D6F6B] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6F6B]">
            {galleryContent.action} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 md:p-8" onClick={() => setLb(null)}>
          <button type="button" aria-label="Tutup galeri" className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-[#FFFEF9]/10 text-white hover:bg-[#FFFEF9]/20 transition-colors" onClick={() => setLb(null)}>
            <X size={18} />
          </button>
          <img src={lb} alt="Foto galeri" className="max-w-full max-h-[90vh] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// â”€â”€â”€ KONTAK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
