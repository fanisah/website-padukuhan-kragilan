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
import { strengthsContent, strengthsData } from "../../../data/strengths";
import { usePublishedCollection } from "../../hooks/usePublishedCollection";
import { getPublishedPotencies, type Potency } from "../../../services/potencies";

const strengthIcons = {
  creative: Zap,
  umkm: ShoppingBag,
  culture: Music,
  social: Users,
  facilities: Building2,
  education: GraduationCap,
};

type StrengthItem = {
  icon: keyof typeof strengthIcons;
  title: string;
  desc: string;
  badge: string;
  bv: "primary" | "teal" | "yellow" | "gray";
};

function mapPotency(row: Potency, index: number): StrengthItem {
  const fallback = strengthsData[index % strengthsData.length];
  const icon = Object.hasOwn(strengthIcons, row.icon ?? "")
    ? (row.icon as StrengthItem["icon"])
    : fallback.icon;
  return {
    icon,
    title: row.judul?.trim() || fallback.title,
    desc: row.deskripsi?.trim() || fallback.desc,
    badge: fallback.badge,
    bv: fallback.bv,
  };
}

export default function StrengthsSection() {
  const potencies = usePublishedCollection(strengthsData, getPublishedPotencies, mapPotency);

  return (
    <section id="potensi" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={strengthsContent.label}
          title={strengthsContent.title}
          description={strengthsContent.description}
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {potencies.map(({ icon, title, desc, badge, bv }) => {
            const Icon = strengthIcons[icon];
            return (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#F46B35]/35 bg-white hover:shadow-[0_4px_24px_rgba(244,107,53,0.08)] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#F46B35]/8 group-hover:bg-[#F46B35]/15 flex items-center justify-center transition-colors">
                  <Icon size={20} className="text-[#F46B35]" strokeWidth={1.75} />
                </div>
                <Badge variant={bv}>{badge}</Badge>
              </div>
              <h3 className="font-bold text-[#2B2B2B] text-[0.93rem] mb-2 tracking-[-0.01em]">{title}</h3>
              <p className="text-[0.855rem] text-[#6B7280] leading-relaxed">{desc}</p>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ UMKM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
