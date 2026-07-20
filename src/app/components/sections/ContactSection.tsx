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
import { SectionHeader } from "./shared";
import { contactContent, contactData } from "../../../data/contact";
import { usePublicProfile } from "../../context/PublicProfileContext";
import { createMailtoUrl, createWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from "../../utils/contactLinks";

const contactIcons = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
  instagram: Instagram,
  website: Globe,
  external: ExternalLink,
};

export default function ContactSection({ pageHeading = false }: { pageHeading?: boolean }) {
  const profile = usePublicProfile();
  const whatsAppUrl = createWhatsAppUrl(profile.phone, GENERAL_WHATSAPP_MESSAGE);
  const emailUrl = createMailtoUrl(profile.email);
  const contacts = [
    { ...contactData[0], value: profile.address, link: null, external: false },
    { ...contactData[1], value: profile.phone, link: whatsAppUrl || null, external: true },
    { ...contactData[2], value: profile.email, link: emailUrl || null, external: false },
    { ...contactData[3], value: profile.serviceHours, external: false },
    ...(profile.instagramUrl ? [{ icon: "instagram" as const, label: "Instagram", value: "Instagram Padukuhan", link: profile.instagramUrl, external: true }] : []),
    ...(profile.facebookUrl ? [{ icon: "external" as const, label: "Facebook", value: "Facebook Padukuhan", link: profile.facebookUrl, external: true }] : []),
    ...(profile.youtubeUrl ? [{ icon: "external" as const, label: "YouTube", value: "YouTube Padukuhan", link: profile.youtubeUrl, external: true }] : []),
    ...(profile.websiteUrl ? [{ icon: "website" as const, label: "Website", value: "Website Padukuhan", link: profile.websiteUrl, external: true }] : []),
  ];
  return (
    <section id="kontak" className="py-20 lg:py-24 bg-[#FFF9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          as={pageHeading ? "h1" : "h2"}
          label={contactContent.label}
          title={contactContent.title}
          description={contactContent.description}
          center
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-2">
          {/* Contact info */}
          <div className="space-y-3.5">
            {contacts.map(({ icon, label, value, link, external }) => {
              const Icon = contactIcons[icon];
              return (
              <div key={label} className="flex gap-4 p-5 rounded-2xl bg-[#FFFEF9] border border-[#D8E4DF] shadow-[0_8px_24px_rgba(23,74,112,0.05)] hover:border-[#0D6F6B]/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#0D6F6B]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#0D6F6B]" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#7C8C8A] uppercase tracking-wide mb-0.5">{label}</div>
                  {link
                    ? <a href={link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="rounded-sm text-[13px] text-[#173F57] font-medium hover:text-[#0D6F6B] hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]">{value}</a>
                    : <p className="text-[13px] text-[#173F57] font-medium">{value}</p>
                  }
                </div>
              </div>
              );
            })}
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl border border-[#D8E4DF] bg-[#FFFEF9] flex flex-col items-center justify-center gap-4 min-h-[380px]">
            <div className="w-14 h-14 rounded-2xl bg-[#0D6F6B]/10 flex items-center justify-center">
              <MapPin size={24} className="text-[#0D6F6B]" />
            </div>
            <div className="text-center">
              <p className="text-[13.5px] font-semibold text-[#173F57]">{profile.name}</p>
              <p className="text-[12px] text-[#7C8C8A] mt-1">{profile.address}</p>
            </div>
            <a
              href={profile.mapsUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`${profile.mapsUrl ? "inline-flex" : "hidden"} items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D6F6B] text-white text-[13px] font-semibold hover:bg-[#095B58] transition-colors`}
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
