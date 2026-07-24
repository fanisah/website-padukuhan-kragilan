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
import { Badge, OrnamentDivider } from "./shared";
import { siteProfile } from "../../../data/profile";
import { usePublicProfile } from "../../context/PublicProfileContext";

export default function HeroSection() {
  const profile = usePublicProfile();
  const statistics = [
    { value: profile.population, label: "Jiwa" },
    { value: profile.households, label: "KK" },
    { value: profile.neighborhoodUnits, label: "RT" },
    { value: profile.communityUnits, label: "RW" },
  ].filter((item): item is { value: number; label: string } => item.value !== null);
  return (
    <section id="beranda" className="relative flex min-h-svh items-end overflow-hidden md:items-center">
      <div className="absolute inset-0">
        {/* Street parade â€” community, colorful, authentic */}
        <img
          src={profile.heroImageUrl}
          alt={siteProfile.hero.imageAlt}
          className="w-full h-full object-cover"
        />
        {/* Warm deep-brown overlay â€” left-heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#123E55]/86 via-[#123E55]/58 to-[#123E55]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123E55]/65 via-transparent to-transparent" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#0D6F6B]/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 top-16 hidden h-64 w-64 rounded-full bg-[#F6C343]/10 blur-3xl sm:block" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#123E55]/35 to-transparent" aria-hidden="true" />
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
            {profile.heroHeadline}
          </h1>

          <p className="mt-5 text-white/72 text-[1.02rem] leading-[1.75] max-w-[440px]">
            {profile.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              to="/profil"
              className="rounded-xl bg-[#0D6F6B] px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-px hover:bg-[#095B58] hover:shadow-[0_14px_28px_rgba(0,0,0,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C343]"
            >
              Kenali Kragilan
            </Link>
            <Link
              to="/berita"
              className="rounded-xl border border-white/30 bg-[#FFFEF9]/12 px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-all hover:-translate-y-px hover:bg-[#FFFEF9]/22 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C343]"
            >
              Berita Terbaru
            </Link>
          </div>

          {statistics.length > 0 && <div className="mt-9 grid max-w-[440px] grid-cols-2 gap-x-8 gap-y-5 border-t border-white/20 pt-6 sm:grid-cols-4">
            {statistics.map(({ value, label }) => <div key={label}>
              <div className="text-[1.45rem] font-bold leading-none text-white">{new Intl.NumberFormat("id-ID").format(value)}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">{label}</div>
            </div>)}
          </div>}

        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ ORNAMENT BAND (section separator) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
