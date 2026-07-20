import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
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
import { navigationLinks } from "../../../data/navigation";
import { siteProfile } from "../../../data/profile";
import KragilanLogo from "../brand/KragilanLogo";

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#FFFEF9]/98 backdrop-blur-sm shadow-[0_1px_0_0_#D8E4DF]" : "bg-[#FFF9EC]/92 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* Logo */}
          <Link to="/" className="group rounded-xl py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]" aria-label="Kembali ke beranda Padukuhan Kragilan">
            <KragilanLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navigationLinks.map((l) => (
              <NavLink
                key={l.href}
                to={l.path}
                end={l.path === "/"}
                className={({ isActive }) => `px-3.5 py-2 text-[13px] font-semibold rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6F6B] ${isActive ? "bg-[#DDEFE8] text-[#0D6F6B]" : "text-[#5F6F72] hover:text-[#0D6F6B] hover:bg-[#DDEFE8]/55"}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/kontak"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-[#0D6F6B] text-white text-[13px] font-semibold hover:bg-[#095B58] transition-colors"
            >
              {siteProfile.contactAction}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-[#173F57] hover:bg-[#F5F7F4] transition-colors"
              aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-[#D8E4DF] bg-[#FFFEF9] px-4 pt-2 pb-5">
          <nav className="flex flex-col gap-0.5">
            {navigationLinks.map((l) => (
              <NavLink
                key={l.href}
                to={l.path}
                end={l.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `min-h-11 text-left px-3 py-2.5 text-[14px] font-semibold rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6F6B] ${isActive ? "bg-[#DDEFE8] text-[#0D6F6B]" : "text-[#49636A] hover:text-[#0D6F6B] hover:bg-[#DDEFE8]/55"}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/kontak"
            onClick={() => setOpen(false)}
            className="mt-3 w-full py-3 rounded-[10px] bg-[#0D6F6B] text-white text-[13.5px] font-semibold"
          >
            {siteProfile.contactAction}
          </Link>
        </div>
      )}
    </header>
  );
}

// â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
