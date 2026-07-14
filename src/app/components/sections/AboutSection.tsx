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
import { Badge, OrnamentDivider, SectionHeader } from "./shared";

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Text side */}
          <div>
            <SectionHeader
              label="Tentang Kami"
              title="Padukuhan Kragilan"
              description="Komunitas aktif di Kalurahan Sinduadi, Sleman — dikenal dengan semangat gotong royong, kreativitas warga, dan kekayaan budaya lokal."
            />

            <div className="space-y-4 text-[#6B7280] text-[0.95rem] leading-[1.82]">
              <p>
                Padukuhan Kragilan adalah komunitas yang hidup dan dinamis. Warganya aktif
                dalam kegiatan sosial, mengembangkan usaha lokal, dan menjaga tradisi budaya
                yang telah diwariskan turun-temurun.
              </p>
              <p>
                Dari warung kuliner hingga kerajinan tangan, dari kegiatan PKK hingga seni
                pertunjukan — Kragilan adalah padukuhan yang bergerak dan berkarya bersama.
              </p>
            </div>

            {/* Info grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: MapPin,     label: "Kalurahan",     value: "Sinduadi"       },
                { icon: Building2,  label: "Kapanewon",     value: "Mlati"          },
                { icon: Users,      label: "Jumlah Warga",  value: "±1.247 Jiwa"   },
                { icon: Calendar,   label: "Kegiatan/Bln",  value: "10+ Agenda"     },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#F46B35]/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#F46B35]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={15} className="text-[#F46B35]" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-semibold text-[#9CA3AF] uppercase tracking-wide">{label}</div>
                    <div className="text-[13px] font-semibold text-[#2B2B2B] mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 inline-flex items-center gap-2 text-[#F46B35] font-semibold text-[13px] hover:gap-3 transition-all">
              Selengkapnya tentang profil padukuhan <ArrowRight size={14} />
            </button>
          </div>

          {/* Photo collage */}
          <div className="flex flex-col gap-3">
            <div className="h-64 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1771648283737-ce89788c4111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Kegiatan warga Kragilan bersama"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 h-44">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590251869641-dd94fb569954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"
                  alt="Kerajinan batik warga"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1598063413828-0d42356b9573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"
                  alt="Warga di pasar lokal"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ POTENSI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
