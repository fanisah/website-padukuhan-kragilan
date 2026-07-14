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

export default function ContactSection() {
  return (
    <section id="kontak" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Kontak"
          title="Hubungi Kami"
          description="Kami siap membantu pertanyaan dan kebutuhan informasi masyarakat Padukuhan Kragilan."
          center
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-2">
          {/* Contact info */}
          <div className="space-y-3.5">
            {[
              { icon: MapPin, label: "Alamat",       value: "Padukuhan Kragilan, Kalurahan Sinduadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta", link: null },
              { icon: Phone,  label: "WhatsApp",     value: "+62 812 3456 7890",                    link: "https://wa.me/6281234567890"              },
              { icon: Mail,   label: "Email",        value: "kragilan.sinduadi@sleman.go.id",        link: "mailto:kragilan.sinduadi@sleman.go.id"   },
              { icon: Clock,  label: "Jam Layanan",  value: "Senin – Jumat, 08.00 – 15.00 WIB",     link: null                                       },
            ].map(({ icon: Icon, label, value, link }) => (
              <div key={label} className="flex gap-4 p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#F46B35]/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#F46B35]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#F46B35]" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-0.5">{label}</div>
                  {link
                    ? <a href={link} className="text-[13px] text-[#2B2B2B] font-medium hover:text-[#F46B35] transition-colors">{value}</a>
                    : <p className="text-[13px] text-[#2B2B2B] font-medium">{value}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white flex flex-col items-center justify-center gap-4 min-h-[380px]">
            <div className="w-14 h-14 rounded-2xl bg-[#F46B35]/10 flex items-center justify-center">
              <MapPin size={24} className="text-[#F46B35]" />
            </div>
            <div className="text-center">
              <p className="text-[13.5px] font-semibold text-[#2B2B2B]">Padukuhan Kragilan</p>
              <p className="text-[12px] text-[#9CA3AF] mt-1">Sinduadi, Mlati, Sleman, D.I. Yogyakarta</p>
            </div>
            <a
              href="https://maps.google.com/?q=Padukuhan+Kragilan+Sinduadi+Mlati+Sleman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F46B35] text-white text-[13px] font-semibold hover:bg-[#d85a2a] transition-colors"
            >
              Buka Google Maps <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
