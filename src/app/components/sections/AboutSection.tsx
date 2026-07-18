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
import { Badge, OrnamentDivider, SectionHeader } from "./shared";
import { siteProfile } from "../../../data/profile";
import { usePublicProfile } from "../../context/PublicProfileContext";

const aboutIcons = {
  location: MapPin,
  district: Building2,
  population: Users,
  agenda: Calendar,
};

export default function AboutSection() {
  const profile = usePublicProfile();
  const paragraphs = [profile.history, [profile.vision, profile.mission].filter(Boolean).join("\n\n")].filter(Boolean);

  return (
    <section id="tentang" className="py-20 lg:py-24 bg-[#FFF9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Text side */}
          <div>
            <SectionHeader
              label={siteProfile.about.label}
              title={profile.name}
              description={profile.description}
            />

            <div className="space-y-4 text-[#5F6F72] text-[0.95rem] leading-[1.82]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="whitespace-pre-line">{paragraph}</p>
              ))}
            </div>

            {/* Info grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {siteProfile.about.facts.map(({ icon, label, value }) => {
                const Icon = aboutIcons[icon];
                return (
                <div key={label} className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFFEF9] border border-[#D8E4DF] shadow-[0_8px_24px_rgba(23,74,112,0.05)] hover:border-[#0D6F6B]/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#0D6F6B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={15} className="text-[#0D6F6B]" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-semibold text-[#7C8C8A] uppercase tracking-wide">{label}</div>
                    <div className="text-[13px] font-semibold text-[#173F57] mt-0.5">{value}</div>
                  </div>
                </div>
                );
              })}
            </div>

            <button className="mt-8 inline-flex items-center gap-2 text-[#0D6F6B] font-semibold text-[13px] hover:gap-3 transition-all">
              {siteProfile.about.profileAction} <ArrowRight size={14} />
            </button>
          </div>

          {/* Photo collage */}
          <div className="flex flex-col gap-3">
            <div className="h-64 rounded-2xl overflow-hidden">
              <img
                src={siteProfile.about.images[0].src}
                alt={siteProfile.about.images[0].alt}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 h-44">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={siteProfile.about.images[1].src}
                  alt={siteProfile.about.images[1].alt}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={siteProfile.about.images[2].src}
                  alt={siteProfile.about.images[2].alt}
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
