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
import { Badge, OrnamentDivider } from "./shared";
import { goTo } from "./navigation";
import { siteProfile } from "../../../data/profile";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative min-h-svh flex items-end md:items-center">
      <div className="absolute inset-0">
        {/* Street parade â€” community, colorful, authentic */}
        <img
          src={siteProfile.hero.image}
          alt={siteProfile.hero.imageAlt}
          className="w-full h-full object-cover"
        />
        {/* Warm deep-brown overlay â€” left-heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#123E55]/86 via-[#123E55]/58 to-[#123E55]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123E55]/65 via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-[560px]">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFEF9]/12 border border-white/18 mb-7">
            <MapPin size={11} className="text-[#F6C343]" />
            <span className="text-[11px] font-medium text-white/85 tracking-wide">
              {siteProfile.location}
            </span>
          </div>

          <h1 className="text-[2.5rem] sm:text-[3.1rem] lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-[-0.025em]">
            {siteProfile.hero.title}{" "}
            <br />
            <span className="text-[#F6C343]">{siteProfile.hero.highlightedTitle}</span>
          </h1>

          <p className="mt-5 text-white/72 text-[1.02rem] leading-[1.75] max-w-[440px]">
            {siteProfile.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => goTo("#tentang")}
              className="px-6 py-3.5 rounded-xl bg-[#0D6F6B] hover:bg-[#095B58] text-white text-[13.5px] font-semibold transition-all hover:-translate-y-px hover:shadow-lg"
            >
              {siteProfile.hero.primaryAction}
            </button>
            <button
              onClick={() => goTo("#berita")}
              className="px-6 py-3.5 rounded-xl bg-[#FFFEF9]/12 hover:bg-[#FFFEF9]/22 border border-white/25 text-white text-[13.5px] font-semibold transition-all"
            >
              {siteProfile.hero.secondaryAction}
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-12 pt-8 border-t border-white/16">
            {siteProfile.statistics.map((s) => (
              <div key={s.label}>
                <div className="text-[1.65rem] font-bold text-white leading-none">{s.value}</div>
                <div className="text-[11px] text-white/48 mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ ORNAMENT BAND (section separator) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
