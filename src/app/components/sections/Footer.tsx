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
// Primary:      #0D6F6B  Deep Teal
// Secondary:    #2F8F83  Teal
// Accent:       #F6C343  Warm Yellow
// Accent Dark:  #6B4B3E  Traditional Brown
// Deep Blue:    #174A70
// Background:   #FFF9EC  Soft Cream
// Text:         #173F57
// Muted:        #5F6F72
// Border:       #D8E4DF
import { OrnamentDivider } from "./shared";
import { navigationLinks } from "../../../data/navigation";
import { usePublicProfile } from "../../context/PublicProfileContext";
import KragilanLogo from "../brand/KragilanLogo";

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
  const profile = usePublicProfile();
  const phoneDigits = profile.phone.replace(/\D/g, "");
  return (
    <footer className="bg-[#123E55]">
      {/* Ornament band â€” teal strip */}
      <div className="bg-[#0D6F6B] py-3.5 flex items-center justify-center">
        <OrnamentDivider align="center" onDark />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="lg:col-span-5">
            <KragilanLogo inverse className="mb-5" />
            <p className="text-[12.5px] text-white/45 leading-relaxed max-w-xs">
              {profile.description}
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
                <MapPin size={13} className="text-[#F6C343] flex-shrink-0 mt-0.5" />
                <span className="text-[12.5px] text-white/40 leading-snug">{profile.address}</span>
              </li>
              <li>
                <a href={phoneDigits ? `https://wa.me/${phoneDigits}` : undefined} className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors">
                  <Phone size={13} className="text-[#F6C343] flex-shrink-0 mt-0.5" /> {profile.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors">
                  <Mail size={13} className="text-[#F6C343] flex-shrink-0 mt-0.5" /> {profile.email}
                </a>
              </li>
              {profile.instagramUrl && <li><a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors"><Instagram size={13} className="text-[#F6C343] flex-shrink-0 mt-0.5" /> Instagram</a></li>}
              {profile.youtubeUrl && <li><a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors"><ExternalLink size={13} className="text-[#F6C343] flex-shrink-0 mt-0.5" /> YouTube</a></li>}
            </ul>
          </div>
        </div>

        {/* Bottom bar with KKN credit */}
        <div className="mt-12 pt-6 border-t border-white/7 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-[11px] text-white/25">
            © 2026 {profile.name}. Hak cipta dilindungi.
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
