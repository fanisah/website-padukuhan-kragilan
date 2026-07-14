import { useState, useEffect } from "react";
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
import { goTo } from "./navigation";
import { navigationLinks } from "../../../data/navigation";
import { siteProfile } from "../../../data/profile";

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function handleLink(href: string) { setOpen(false); goTo(href); }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/98 backdrop-blur-sm shadow-[0_1px_0_0_#E5E7EB]" : "bg-[#FCFAF7]/92 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* Logo */}
          <button onClick={() => handleLink("#beranda")} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-[10px] bg-[#F46B35] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5L2 6.5V16.5H6.5V11H11.5V16.5H16V6.5L9 1.5Z" fill="white" fillOpacity="0.95" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="text-[13.5px] font-bold text-[#2B2B2B] group-hover:text-[#F46B35] transition-colors tracking-[-0.01em]">
                {siteProfile.name}
              </div>
              <div className="text-[10.5px] text-[#9CA3AF] mt-[2px] tracking-wide">
                {siteProfile.locationShort}
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navigationLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="px-3.5 py-2 text-[13px] font-medium text-[#6B7280] hover:text-[#F46B35] hover:bg-[#F46B35]/6 rounded-lg transition-all"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLink("#kontak")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-[#F46B35] text-white text-[13px] font-semibold hover:bg-[#d85a2a] transition-colors"
            >
              {siteProfile.contactAction}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-[#2B2B2B] hover:bg-[#F5F5F5] transition-colors"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white px-4 pt-2 pb-5">
          <nav className="flex flex-col gap-0.5">
            {navigationLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="text-left px-3 py-2.5 text-[13.5px] font-medium text-[#4B5563] hover:text-[#F46B35] hover:bg-[#F46B35]/6 rounded-lg transition-all"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => handleLink("#kontak")}
            className="mt-3 w-full py-3 rounded-[10px] bg-[#F46B35] text-white text-[13.5px] font-semibold"
          >
            {siteProfile.contactAction}
          </button>
        </div>
      )}
    </header>
  );
}

// â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
