import { useState } from "react";
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
import { SectionHeader } from "./shared";
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

export default function GallerySection() {
  const items = usePublishedCollection(localGalleryItems, getPublishedGallery, mapGallery);
  const [lb, setLb] = useState<string | null>(null);

  return (
    <section id="galeri" className="py-20 lg:py-24 bg-[#FFFEF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={galleryContent.label}
          title={galleryContent.title}
          description={galleryContent.description}
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: "200px" }}>
          {items.map((p, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl cursor-pointer group relative bg-[#F5F7F4] border border-[#D8E4DF] shadow-[0_8px_24px_rgba(23,74,112,0.06)] ${p.big ? "md:col-span-2 md:row-span-2" : ""}`}
              onClick={() => p.src && setLb(p.src)}
            >
              {p.src ? (
                <img src={p.src} alt={p.alt} className="h-full w-full object-contain p-1.5" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F5F7F4] text-[13px] font-semibold text-[#7C8C8A]">Gambar belum tersedia</div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/24 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#FFFEF9]/20 rounded-full p-2.5">
                  <Eye size={18} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#D8E4DF] text-[13px] font-semibold text-[#173F57] hover:border-[#0D6F6B] hover:text-[#0D6F6B] transition-all">
            {galleryContent.action} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 md:p-8" onClick={() => setLb(null)}>
          <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-[#FFFEF9]/10 text-white hover:bg-[#FFFEF9]/20 transition-colors" onClick={() => setLb(null)}>
            <X size={18} />
          </button>
          <img src={lb} alt="Foto galeri" className="max-w-full max-h-[90vh] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// â”€â”€â”€ KONTAK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
