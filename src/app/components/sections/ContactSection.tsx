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
import { contactContent, contactData } from "../../../data/contact";

const contactIcons = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

export default function ContactSection() {
  return (
    <section id="kontak" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={contactContent.label}
          title={contactContent.title}
          description={contactContent.description}
          center
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-2">
          {/* Contact info */}
          <div className="space-y-3.5">
            {contactData.map(({ icon, label, value, link }) => {
              const Icon = contactIcons[icon];
              return (
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
              );
            })}
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white flex flex-col items-center justify-center gap-4 min-h-[380px]">
            <div className="w-14 h-14 rounded-2xl bg-[#F46B35]/10 flex items-center justify-center">
              <MapPin size={24} className="text-[#F46B35]" />
            </div>
            <div className="text-center">
              <p className="text-[13.5px] font-semibold text-[#2B2B2B]">{contactContent.mapName}</p>
              <p className="text-[12px] text-[#9CA3AF] mt-1">{contactContent.mapLocation}</p>
            </div>
            <a
              href={contactContent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F46B35] text-white text-[13px] font-semibold hover:bg-[#d85a2a] transition-colors"
            >
              {contactContent.mapAction} <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
