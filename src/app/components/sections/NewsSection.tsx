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
import { newsContent, newsData } from "../../../data/news";

export default function NewsSection() {
  return (
    <section id="berita" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <SectionHeader
            label={newsContent.label}
            title={newsContent.title}
            description={newsContent.description}
          />
          <button className="flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F46B35] hover:gap-2.5 transition-all mb-10">
            {newsContent.action} <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsData.map((n, i) => (
            <article
              key={i}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300 cursor-pointer"
            >
              <div className="h-48 bg-[#F5F5F5] overflow-hidden">
                {n.photo ? (
                  <img src={n.photo} alt={n.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[52px] font-black text-[#E5E7EB] select-none">K</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <Badge variant={n.catV}>{n.category}</Badge>
                  <span className="text-[11px] text-[#9CA3AF]">{n.date}</span>
                </div>
                <h3 className="font-bold text-[#2B2B2B] text-[0.9rem] leading-[1.45] mb-2 group-hover:text-[#F46B35] transition-colors tracking-[-0.01em]">
                  {n.title}
                </h3>
                <p className="text-[0.83rem] text-[#6B7280] leading-relaxed mb-4 line-clamp-3">{n.excerpt}</p>
                <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#F46B35] hover:gap-2.5 transition-all">
                  Baca selengkapnya <ChevronRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ AGENDA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
