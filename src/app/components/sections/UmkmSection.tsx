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
import { Link } from "react-router";

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
import { Badge, SectionHeader } from "./shared";
import { umkmContent, umkmData } from "../../../data/umkm";
import { usePublishedCollection } from "../../hooks/usePublishedCollection";
import { getPublishedUmkm, type Umkm } from "../../../services/umkm";
import { normalizeImagePosition } from "../../utils/imageFocalPoint";
import { createWhatsAppUrl } from "../../utils/contactLinks";

type UmkmItem = (typeof umkmData)[number] & {
  hasWhatsApp: boolean;
  positionX: number;
  positionY: number;
  mapUrl: string | null;
  instagramUrl: string | null;
  whatsAppUrl: string | null;
  websiteUrl: string | null;
};

const localUmkmItems: UmkmItem[] = umkmData.map((item) => ({
  ...item,
  hasWhatsApp: false,
  positionX: 50,
  positionY: 50,
  mapUrl: null,
  instagramUrl: null,
  whatsAppUrl: null,
  websiteUrl: null,
}));

function mapUmkm(row: Umkm): UmkmItem {
  const position = normalizeImagePosition(row.image_position_x, row.image_position_y);
  return {
    name: row.nama.trim(),
    category: row.kategori?.trim() || "UMKM",
    catV: "gray",
    desc: row.deskripsi?.trim() || "",
    photo: row.foto_url?.trim() || null,
    positionX: position.x,
    positionY: position.y,
    hasMap: Boolean(row.maps_url?.trim()),
    hasIG: Boolean(row.instagram_url?.trim()),
    hasWhatsApp: Boolean(row.whatsapp?.trim()),
    hasWeb: false,
    mapUrl: row.maps_url?.trim() || null,
    instagramUrl: row.instagram_url?.trim() || null,
    whatsAppUrl: createWhatsAppUrl(row.whatsapp ?? "") || null,
    websiteUrl: null,
  };
}

export default function UmkmSection({ pageHeading = false }: { pageHeading?: boolean }) {
  const items = usePublishedCollection(localUmkmItems, getPublishedUmkm, mapUmkm);

  return (
    <section id="umkm" className="py-20 lg:py-24 bg-[#FFF9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <SectionHeader
            as={pageHeading ? "h1" : "h2"}
            label={umkmContent.label}
            title={umkmContent.title}
            description={umkmContent.description}
          />
          <Link to="/umkm" className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-sm text-[13px] font-semibold text-[#0D6F6B] hover:gap-2.5 transition-all mb-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]">
            {umkmContent.action} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((u) => (
            <div
              key={u.name}
              className="bg-[#FFFEF9] rounded-2xl overflow-hidden border border-[#D8E4DF] shadow-[0_8px_24px_rgba(23,74,112,0.05)] hover:shadow-[0_14px_32px_rgba(23,74,112,0.10)] hover:border-[#0D6F6B]/25 transition-[border-color,box-shadow] duration-300 group"
            >
              {/* Photo */}
              <div className="h-44 bg-[#F5F7F4] overflow-hidden border-b border-[#D8E4DF]">
                {u.photo ? (
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <ShoppingBag size={28} className="text-[#C8D5D0]" strokeWidth={1.5} />
                    <span className="text-[11px] text-[#7C8C8A]">Foto belum tersedia</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <Badge variant={u.catV}>{u.category}</Badge>
                <h3 className="font-bold text-[#173F57] text-[0.9rem] mt-2.5 mb-1.5 tracking-[-0.01em]">{u.name}</h3>
                {u.desc && (
                  <p className="text-[0.83rem] text-[#5F6F72] leading-relaxed mb-4">{u.desc}</p>
                )}

                {(u.hasMap || u.hasIG || u.hasWhatsApp || u.hasWeb) && (
                  <div className="flex flex-wrap gap-1.5">
                  {u.hasMap && u.mapUrl && (
                    <a href={u.mapUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-9 items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-xl border border-[#D8E4DF] text-[#5F6F72] hover:border-[#0D6F6B] hover:text-[#0D6F6B] hover:bg-[#DDEFE8]/45 transition-colors">
                      <MapPin size={10.5} /> Lokasi
                    </a>
                  )}
                  {u.hasIG && u.instagramUrl && (
                    <a href={u.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-9 items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-xl border border-[#D8E4DF] text-[#5F6F72] hover:border-[#2F8F83] hover:text-[#2F8F83] hover:bg-[#DDEFE8]/45 transition-colors">
                      <Instagram size={10.5} /> Instagram
                    </a>
                  )}
                  {u.hasWhatsApp && u.whatsAppUrl && (
                    <a href={u.whatsAppUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-9 items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-xl border border-[#D8E4DF] text-[#5F6F72] hover:border-[#2F8F83] hover:text-[#2F8F83] hover:bg-[#DDEFE8]/45 transition-colors">
                      <Phone size={10.5} /> WhatsApp
                    </a>
                  )}
                  {u.hasWeb && u.websiteUrl && (
                    <a href={u.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-9 items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-xl border border-[#D8E4DF] text-[#5F6F72] hover:border-[#174A70] hover:text-[#174A70] hover:bg-[#DDEFE8]/45 transition-colors">
                      <Globe size={10.5} /> Website
                    </a>
                  )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ BERITA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
