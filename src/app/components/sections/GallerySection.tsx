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
// Primary:      #F46B35  Terracotta Orange
// Secondary:    #4C9A92  Teal
// Accent:       #F6C445  Warm Yellow
// Accent Dark:  #6B4B3E  Traditional Brown
// Deep Blue:    #1F4E8C
// Background:   #FCFAF7  Warm White
// Text:         #2B2B2B
// Muted:        #6B7280
// Border:       #E5E7EB
import { SectionHeader } from "./shared";
import { galleryContent, galleryData } from "../../../data/gallery";

export default function GallerySection() {
  const [lb, setLb] = useState<string | null>(null);

  return (
    <section id="galeri" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={galleryContent.label}
          title={galleryContent.title}
          description={galleryContent.description}
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: "200px" }}>
          {galleryData.map((p, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl cursor-pointer group relative ${p.big ? "md:col-span-2 md:row-span-2" : ""}`}
              onClick={() => setLb(p.src)}
            >
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/24 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 rounded-full p-2.5">
                  <Eye size={18} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E5E7EB] text-[13px] font-semibold text-[#2B2B2B] hover:border-[#F46B35] hover:text-[#F46B35] transition-all">
            {galleryContent.action} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 md:p-8" onClick={() => setLb(null)}>
          <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" onClick={() => setLb(null)}>
            <X size={18} />
          </button>
          <img src={lb} alt="Foto galeri" className="max-w-full max-h-[90vh] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// â”€â”€â”€ KONTAK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
