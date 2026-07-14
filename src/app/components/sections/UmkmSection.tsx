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
import { Badge, SectionHeader } from "./shared";

const UMKM_DATA = [
  {
    name:     "Warung Bu Sari",
    category: "Kuliner",
    catV:     "primary" as const,
    desc:     "Masakan rumahan khas Jawa dengan cita rasa otentik. Buka setiap hari mulai pagi hingga sore.",
    photo:    "https://images.unsplash.com/photo-1603958123897-902ccdc49738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    hasMap:   true,
    hasIG:    true,
    hasWeb:   false,
  },
  {
    name:     "Batik Tulis Ibu Retno",
    category: "Kerajinan",
    catV:     "yellow" as const,
    desc:     "Batik tulis tangan dengan motif khas Yogyakarta. Menerima pesanan khusus dan kunjungan workshop.",
    photo:    "https://images.unsplash.com/photo-1590251869641-dd94fb569954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    hasMap:   true,
    hasIG:    true,
    hasWeb:   false,
  },
  {
    name:     "Toko Kelontong Pak Hardi",
    category: "Perdagangan",
    catV:     "gray" as const,
    desc:     "Kebutuhan sehari-hari tersedia lengkap dengan harga ramah di kantong. Buka dari pagi hingga malam.",
    photo:    null,
    hasMap:   true,
    hasIG:    false,
    hasWeb:   false,
  },
  {
    name:     "Jahit & Bordir Ibu Wati",
    category: "Jasa",
    catV:     "teal" as const,
    desc:     "Layanan jahit, bordir, dan permak pakaian. Pengerjaan rapi, teliti, dan selalu tepat waktu.",
    photo:    "https://images.unsplash.com/photo-1598063413828-0d42356b9573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    hasMap:   false,
    hasIG:    true,
    hasWeb:   false,
  },
];

export default function UmkmSection() {
  return (
    <section id="umkm" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <SectionHeader
            label="UMKM Kragilan"
            title="Usaha Warga Kami"
            description="Kenali dan dukung usaha-usaha lokal yang dijalankan warga Padukuhan Kragilan."
          />
          <button className="flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F46B35] hover:gap-2.5 transition-all mb-10">
            Lihat semua UMKM <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UMKM_DATA.map((u) => (
            <div
              key={u.name}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-[0_4px_24px_rgba(244,107,53,0.09)] hover:border-[#F46B35]/25 transition-all duration-300 group"
            >
              {/* Photo */}
              <div className="h-44 bg-[#F5F5F5] overflow-hidden">
                {u.photo ? (
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <ShoppingBag size={28} className="text-[#D1D5DB]" strokeWidth={1.5} />
                    <span className="text-[11px] text-[#9CA3AF]">Foto belum tersedia</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <Badge variant={u.catV}>{u.category}</Badge>
                <h3 className="font-bold text-[#2B2B2B] text-[0.9rem] mt-2.5 mb-1.5 tracking-[-0.01em]">{u.name}</h3>
                <p className="text-[0.83rem] text-[#6B7280] leading-relaxed mb-4">{u.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {u.hasMap && (
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:border-[#F46B35] hover:text-[#F46B35] transition-colors">
                      <MapPin size={10.5} /> Lokasi
                    </button>
                  )}
                  {u.hasIG && (
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:border-[#4C9A92] hover:text-[#4C9A92] transition-colors">
                      <Instagram size={10.5} /> Instagram
                    </button>
                  )}
                  {u.hasWeb && (
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:border-[#1F4E8C] hover:text-[#1F4E8C] transition-colors">
                      <Globe size={10.5} /> Website
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ BERITA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
