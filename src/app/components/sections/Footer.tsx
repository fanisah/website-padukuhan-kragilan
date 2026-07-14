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
import { useNavigate } from "react-router";

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
import { OrnamentDivider } from "./shared";
import { navigationLinks } from "../../../data/navigation";

function Pranadhara20px() {
  // Subtle placeholder for the Pranadhara logo at ~20px
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="KKN Pranadhara Mlati">
      <circle cx="10" cy="10" r="9.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="rgba(255,255,255,0.06)" />
      <text x="10" y="13.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">P</text>
    </svg>
  );
}

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#261208]">
      {/* Ornament band â€” terracotta strip */}
      <div className="bg-[#F46B35] py-3.5 flex items-center justify-center">
        <OrnamentDivider align="center" onDark />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-[10px] bg-[#F46B35] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5L2 6.5V16.5H6.5V11H11.5V16.5H16V6.5L9 1.5Z" fill="white" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-[15px] leading-snug tracking-[-0.01em]">Padukuhan Kragilan</div>
                <div className="text-[10.5px] text-white/38 tracking-wide">Sistem Informasi Padukuhan</div>
              </div>
            </div>
            <p className="text-[12.5px] text-white/45 leading-relaxed max-w-xs">
              Portal informasi resmi Padukuhan Kragilan, Kalurahan Sinduadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-[10.5px] font-semibold text-white/45 uppercase tracking-widest mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {navigationLinks.map((l) => (
                <li key={l.href}>
                  <button onClick={() => navigate(l.path)} className="text-[12.5px] text-white/40 hover:text-white/80 transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-[10.5px] font-semibold text-white/45 uppercase tracking-widest mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5">
                <MapPin size={13} className="text-[#F6C445] flex-shrink-0 mt-0.5" />
                <span className="text-[12.5px] text-white/40 leading-snug">Sinduadi, Mlati, Sleman, D.I. Yogyakarta</span>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors">
                  <Phone size={13} className="text-[#F6C445] flex-shrink-0 mt-0.5" /> +62 812 3456 7890
                </a>
              </li>
              <li>
                <a href="mailto:kragilan.sinduadi@sleman.go.id" className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors">
                  <Mail size={13} className="text-[#F6C445] flex-shrink-0 mt-0.5" /> kragilan.sinduadi@sleman.go.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with KKN credit */}
        <div className="mt-12 pt-6 border-t border-white/7 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-[11px] text-white/25">
            © 2026 Padukuhan Kragilan. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <Pranadhara20px />
            <p className="text-[11px] text-white/20 italic">
              Dikembangkan dalam rangka KKN-PPM UGM Pranadhara Mlati 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// â”€â”€â”€ APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
