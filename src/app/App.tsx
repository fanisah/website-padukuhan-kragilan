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

// ─── TOKENS ──────────────────────────────────────────────────────────────────
// Primary:      #F46B35  Terracotta Orange
// Secondary:    #4C9A92  Teal
// Accent:       #F6C445  Warm Yellow
// Accent Dark:  #6B4B3E  Traditional Brown
// Deep Blue:    #1F4E8C
// Background:   #FCFAF7  Warm White
// Text:         #2B2B2B
// Muted:        #6B7280
// Border:       #E5E7EB

const NAV_LINKS = [
  { label: "Beranda",  href: "#beranda"  },
  { label: "Profil",   href: "#tentang"  },
  { label: "Potensi",  href: "#potensi"  },
  { label: "UMKM",     href: "#umkm"     },
  { label: "Berita",   href: "#berita"   },
  { label: "Agenda",   href: "#agenda"   },
  { label: "Galeri",   href: "#galeri"   },
  { label: "Kontak",   href: "#kontak"   },
];

function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// ─── ORNAMENT DIVIDER ────────────────────────────────────────────────────────
// Inspired by the Javanese scroll ornaments from the reference images.
// Uses terracotta, warm yellow, and teal — matching the new site palette.

function OrnamentDivider({
  align   = "center",
  onDark  = false,
  size    = "md",
  className = "",
}: {
  align?:     "center" | "left";
  onDark?:    boolean;
  size?:      "sm" | "md";
  className?: string;
}) {
  const terra      = onDark ? "rgba(244,107,53,0.92)"  : "#F46B35";
  const yellow     = onDark ? "rgba(246,196,69,0.95)"  : "#F6C445";
  const teal       = onDark ? "rgba(76,154,146,0.85)"  : "#4C9A92";
  const terraFaint = onDark ? "rgba(244,107,53,0.28)"  : "rgba(244,107,53,0.25)";

  const w = size === "sm" ? 200 : 280;
  const cx = w / 2;

  return (
    <div className={`flex items-center ${align === "center" ? "justify-center" : "justify-start"} ${className}`}>
      <svg width={w} height="22" viewBox={`0 0 ${w} 22`} fill="none">
        {/* Left arm */}
        <line x1="0" y1="11" x2={cx - 42} y2="11" stroke={terraFaint} strokeWidth="0.75" />
        {/* Left scroll curl */}
        <path
          d={`M${cx - 42},11 C${cx - 37},11 ${cx - 33},6.5 ${cx - 28},8.5 C${cx - 24},10 ${cx - 26},14 ${cx - 30},13 C${cx - 33},12.5 ${cx - 32},9 ${cx - 28},9`}
          stroke={terra} strokeWidth="0.95" fill="none" strokeOpacity="0.82" strokeLinecap="round"
        />
        {/* Left dot */}
        <circle cx={cx - 21} cy="11" r="1.5" fill={yellow} fillOpacity="0.9" />
        {/* Outer diamond outline */}
        <path d={`M${cx - 9},11 L${cx},3 L${cx + 9},11 L${cx},19 Z`}
          fill="none" stroke={terra} strokeWidth="0.75" strokeOpacity="0.45" />
        {/* Inner diamond filled teal */}
        <path d={`M${cx - 4},11 L${cx},7 L${cx + 4},11 L${cx},15 Z`}
          fill={teal} fillOpacity="0.8" />
        {/* Center dot */}
        <circle cx={cx} cy="11" r="1.8" fill={yellow} />
        {/* Right dot */}
        <circle cx={cx + 21} cy="11" r="1.5" fill={yellow} fillOpacity="0.9" />
        {/* Right scroll curl (mirror) */}
        <path
          d={`M${cx + 42},11 C${cx + 37},11 ${cx + 33},6.5 ${cx + 28},8.5 C${cx + 24},10 ${cx + 26},14 ${cx + 30},13 C${cx + 33},12.5 ${cx + 32},9 ${cx + 28},9`}
          stroke={terra} strokeWidth="0.95" fill="none" strokeOpacity="0.82" strokeLinecap="round"
        />
        {/* Right arm */}
        <line x1={cx + 42} y1="11" x2={w} y2="11" stroke={terraFaint} strokeWidth="0.75" />
      </svg>
    </div>
  );
}

// ─── BADGE ───────────────────────────────────────────────────────────────────

function Badge({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "teal" | "yellow" | "gray" | "blue";
}) {
  const s = {
    primary: "bg-[#F46B35]/10 text-[#c9521e]",
    teal:    "bg-[#4C9A92]/12 text-[#3a7a73]",
    yellow:  "bg-[#F6C445]/18 text-[#7a5f10]",
    gray:    "bg-[#F5F5F5] text-[#6B7280] border border-[#E5E7EB]",
    blue:    "bg-[#1F4E8C]/10 text-[#1F4E8C]",
  };
  return (
    <span className={`inline-block text-[11px] font-semibold px-2.5 py-[3px] rounded-full tracking-wide ${s[variant]}`}>
      {children}
    </span>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader({
  label,
  title,
  description,
  center = false,
}: {
  label:        string;
  title:        string;
  description?: string;
  center?:      boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <Badge variant="primary">{label}</Badge>
      <h2 className={`mt-3 text-[2rem] md:text-[2.35rem] font-bold text-[#2B2B2B] leading-[1.2] tracking-[-0.022em] ${center ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-[#6B7280] text-[1.02rem] leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
      <OrnamentDivider align={center ? "center" : "left"} className="mt-5" />
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
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
                Padukuhan Kragilan
              </div>
              <div className="text-[10.5px] text-[#9CA3AF] mt-[2px] tracking-wide">
                Sinduadi · Mlati · Sleman
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
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
              Hubungi Kami
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
            {NAV_LINKS.map((l) => (
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
            Hubungi Kami
          </button>
        </div>
      )}
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="beranda" className="relative min-h-svh flex items-end md:items-center">
      <div className="absolute inset-0">
        {/* Street parade — community, colorful, authentic */}
        <img
          src="https://images.unsplash.com/photo-1542897643-8158da5b4607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1920"
          alt="Suasana kegiatan warga Padukuhan Kragilan"
          className="w-full h-full object-cover"
        />
        {/* Warm deep-brown overlay — left-heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a1008]/86 via-[#2a1008]/58 to-[#2a1008]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1008]/65 via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-[560px]">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 border border-white/18 mb-7">
            <MapPin size={11} className="text-[#F6C445]" />
            <span className="text-[11px] font-medium text-white/85 tracking-wide">
              Kalurahan Sinduadi · Kapanewon Mlati · Kab. Sleman
            </span>
          </div>

          <h1 className="text-[2.5rem] sm:text-[3.1rem] lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-[-0.025em]">
            Selamat Datang di{" "}
            <br />
            <span className="text-[#F6C445]">Padukuhan Kragilan</span>
          </h1>

          <p className="mt-5 text-white/72 text-[1.02rem] leading-[1.75] max-w-[440px]">
            Portal informasi resmi Padukuhan Kragilan — rumah bagi komunitas aktif, budaya lokal, dan ekonomi kreatif warga.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => goTo("#tentang")}
              className="px-6 py-3.5 rounded-xl bg-[#F46B35] hover:bg-[#d85a2a] text-white text-[13.5px] font-semibold transition-all hover:-translate-y-px hover:shadow-lg"
            >
              Kenali Kragilan
            </button>
            <button
              onClick={() => goTo("#berita")}
              className="px-6 py-3.5 rounded-xl bg-white/12 hover:bg-white/22 border border-white/25 text-white text-[13.5px] font-semibold transition-all"
            >
              Berita Terbaru
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-12 pt-8 border-t border-white/16">
            {[
              { value: "1.247", label: "Jiwa" },
              { value: "347",   label: "KK"   },
              { value: "4",     label: "RT"    },
              { value: "1",     label: "RW"    },
            ].map((s) => (
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

// ─── ORNAMENT BAND (section separator) ───────────────────────────────────────

function OrnamentBand() {
  return (
    <div className="bg-[#FCFAF7] py-5 flex items-center justify-center border-y border-[#E5E7EB]">
      <OrnamentDivider align="center" size="md" />
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="tentang" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Text side */}
          <div>
            <SectionHeader
              label="Tentang Kami"
              title="Padukuhan Kragilan"
              description="Komunitas aktif di Kalurahan Sinduadi, Sleman — dikenal dengan semangat gotong royong, kreativitas warga, dan kekayaan budaya lokal."
            />

            <div className="space-y-4 text-[#6B7280] text-[0.95rem] leading-[1.82]">
              <p>
                Padukuhan Kragilan adalah komunitas yang hidup dan dinamis. Warganya aktif
                dalam kegiatan sosial, mengembangkan usaha lokal, dan menjaga tradisi budaya
                yang telah diwariskan turun-temurun.
              </p>
              <p>
                Dari warung kuliner hingga kerajinan tangan, dari kegiatan PKK hingga seni
                pertunjukan — Kragilan adalah padukuhan yang bergerak dan berkarya bersama.
              </p>
            </div>

            {/* Info grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: MapPin,     label: "Kalurahan",     value: "Sinduadi"       },
                { icon: Building2,  label: "Kapanewon",     value: "Mlati"          },
                { icon: Users,      label: "Jumlah Warga",  value: "±1.247 Jiwa"   },
                { icon: Calendar,   label: "Kegiatan/Bln",  value: "10+ Agenda"     },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#F46B35]/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#F46B35]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={15} className="text-[#F46B35]" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-semibold text-[#9CA3AF] uppercase tracking-wide">{label}</div>
                    <div className="text-[13px] font-semibold text-[#2B2B2B] mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 inline-flex items-center gap-2 text-[#F46B35] font-semibold text-[13px] hover:gap-3 transition-all">
              Selengkapnya tentang profil padukuhan <ArrowRight size={14} />
            </button>
          </div>

          {/* Photo collage */}
          <div className="flex flex-col gap-3">
            <div className="h-64 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1771648283737-ce89788c4111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Kegiatan warga Kragilan bersama"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 h-44">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590251869641-dd94fb569954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"
                  alt="Kerajinan batik warga"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1598063413828-0d42356b9573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"
                  alt="Warga di pasar lokal"
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

// ─── POTENSI ─────────────────────────────────────────────────────────────────

const POTENCIES = [
  {
    icon: Zap,
    title: "Ekonomi Kreatif",
    desc: "Berbagai usaha kreatif warga tumbuh dan berkembang, mulai dari produk kerajinan hingga jasa digital.",
    badge: "Tumbuh",
    bv: "primary" as const,
  },
  {
    icon: ShoppingBag,
    title: "UMKM Lokal",
    desc: "Warung makan, toko kelontong, kerajinan, dan usaha jasa yang menjadi tulang punggung ekonomi warga.",
    badge: "Aktif",
    bv: "teal" as const,
  },
  {
    icon: Music,
    title: "Seni & Budaya",
    desc: "Karawitan, jathilan, dan seni pertunjukan tradisional Jawa yang terus dirawat dan digelarkan.",
    badge: "Lestari",
    bv: "yellow" as const,
  },
  {
    icon: Users,
    title: "Kegiatan Sosial",
    desc: "PKK, Karang Taruna, arisan, dan berbagai kegiatan kemasyarakatan yang menjalin kebersamaan.",
    badge: "Rutin",
    bv: "primary" as const,
  },
  {
    icon: Building2,
    title: "Fasilitas Umum",
    desc: "Balai padukuhan, mushola, lapangan, dan sarana pendukung kehidupan warga yang memadai.",
    badge: "Memadai",
    bv: "teal" as const,
  },
  {
    icon: GraduationCap,
    title: "Pendidikan",
    desc: "PAUD, TK, dan akses ke jenjang pendidikan dasar yang mendukung tumbuh kembang generasi Kragilan.",
    badge: "Terjangkau",
    bv: "gray" as const,
  },
];

function Potensi() {
  return (
    <section id="potensi" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Potensi Desa"
          title="Kekuatan Padukuhan Kragilan"
          description="Kragilan bukan hanya tentang pertanian — ini adalah komunitas yang hidup, berbudaya, dan berkreasi."
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POTENCIES.map(({ icon: Icon, title, desc, badge, bv }) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── UMKM ────────────────────────────────────────────────────────────────────

const UMKM_DATA = [
  {
    name:     "Warung Bu Sari",
    category: "Kuliner",
    catV:     "primary" as const,
    desc:     "Masakan rumahan khas Jawa dengan cita rasa otentik. Buka setiap hari mulai pagi hingga sore.",
    photo:    "https://images.unsplash.com/photo-1603958123897-902ccdc49738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    hasMap:   true,
    hasIG:    true,
    hasWeb:   false,
  },
  {
    name:     "Batik Tulis Ibu Retno",
    category: "Kerajinan",
    catV:     "yellow" as const,
    desc:     "Batik tulis tangan dengan motif khas Yogyakarta. Menerima pesanan khusus dan kunjungan workshop.",
    photo:    "https://images.unsplash.com/photo-1590251869641-dd94fb569954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    hasMap:   true,
    hasIG:    true,
    hasWeb:   false,
  },
  {
    name:     "Toko Kelontong Pak Hardi",
    category: "Perdagangan",
    catV:     "gray" as const,
    desc:     "Kebutuhan sehari-hari tersedia lengkap dengan harga ramah di kantong. Buka dari pagi hingga malam.",
    photo:    null,
    hasMap:   true,
    hasIG:    false,
    hasWeb:   false,
  },
  {
    name:     "Jahit & Bordir Ibu Wati",
    category: "Jasa",
    catV:     "teal" as const,
    desc:     "Layanan jahit, bordir, dan permak pakaian. Pengerjaan rapi, teliti, dan selalu tepat waktu.",
    photo:    "https://images.unsplash.com/photo-1598063413828-0d42356b9573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    hasMap:   false,
    hasIG:    true,
    hasWeb:   false,
  },
];

function UMKM() {
  return (
    <section id="umkm" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <SectionHeader
            label="UMKM Kragilan"
            title="Usaha Warga Kami"
            description="Kenali dan dukung usaha-usaha lokal yang dijalankan warga Padukuhan Kragilan."
          />
          <button className="flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F46B35] hover:gap-2.5 transition-all mb-10">
            Lihat semua UMKM <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UMKM_DATA.map((u) => (
            <div
              key={u.name}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-[0_4px_24px_rgba(244,107,53,0.09)] hover:border-[#F46B35]/25 transition-all duration-300 group"
            >
              {/* Photo */}
              <div className="h-44 bg-[#F5F5F5] overflow-hidden">
                {u.photo ? (
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <ShoppingBag size={28} className="text-[#D1D5DB]" strokeWidth={1.5} />
                    <span className="text-[11px] text-[#9CA3AF]">Foto belum tersedia</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <Badge variant={u.catV}>{u.category}</Badge>
                <h3 className="font-bold text-[#2B2B2B] text-[0.9rem] mt-2.5 mb-1.5 tracking-[-0.01em]">{u.name}</h3>
                <p className="text-[0.83rem] text-[#6B7280] leading-relaxed mb-4">{u.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {u.hasMap && (
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:border-[#F46B35] hover:text-[#F46B35] transition-colors">
                      <MapPin size={10.5} /> Lokasi
                    </button>
                  )}
                  {u.hasIG && (
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:border-[#4C9A92] hover:text-[#4C9A92] transition-colors">
                      <Instagram size={10.5} /> Instagram
                    </button>
                  )}
                  {u.hasWeb && (
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:border-[#1F4E8C] hover:text-[#1F4E8C] transition-colors">
                      <Globe size={10.5} /> Website
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BERITA ──────────────────────────────────────────────────────────────────

const NEWS = [
  {
    category: "Kegiatan",
    catV:     "primary" as const,
    date:     "28 Juni 2026",
    title:    "Kirab Budaya Menyambut HUT Padukuhan Kragilan",
    excerpt:  "Ratusan warga antusias mengikuti kirab budaya yang menampilkan berbagai kesenian tradisional dan hasil karya UMKM lokal Padukuhan Kragilan.",
    photo:    "https://images.unsplash.com/photo-1542897643-8158da5b4607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    category: "Pengumuman",
    catV:     "gray" as const,
    date:     "20 Juni 2026",
    title:    "Jadwal Posyandu Balita Bulan Juli 2026",
    excerpt:  "Pengurus Posyandu Melati mengumumkan jadwal pelayanan rutin bulan Juli 2026 untuk seluruh balita di Padukuhan Kragilan.",
    photo:    null,
  },
  {
    category: "UMKM",
    catV:     "yellow" as const,
    date:     "15 Juni 2026",
    title:    "Batik Tulis Kragilan Tampil di Pameran Kabupaten Sleman",
    excerpt:  "Batik tulis karya warga Padukuhan Kragilan mendapat sambutan antusias di Pameran UMKM Kabupaten Sleman 2026, membuka peluang pasar baru.",
    photo:    "https://images.unsplash.com/photo-1604973104381-870c92f10343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

function Berita() {
  return (
    <section id="berita" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <SectionHeader
            label="Berita"
            title="Informasi Terkini"
            description="Kabar terbaru dari kegiatan dan kehidupan warga Padukuhan Kragilan."
          />
          <button className="flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F46B35] hover:gap-2.5 transition-all mb-10">
            Semua berita <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEWS.map((n, i) => (
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

// ─── AGENDA ──────────────────────────────────────────────────────────────────

const AGENDA = [
  { day: "05", month: "Jul", title: "Pertemuan Rutin PKK Padukuhan Kragilan",      time: "09.00 – 11.00 WIB", place: "Balai Padukuhan Kragilan",    upcoming: true  },
  { day: "12", month: "Jul", title: "Posyandu Balita & Lansia",                    time: "08.00 – 12.00 WIB", place: "Rumah Kader Posyandu",         upcoming: true  },
  { day: "17", month: "Jul", title: "Pentas Seni Karang Taruna Kragilan",          time: "19.00 WIB",         place: "Lapangan Padukuhan Kragilan",  upcoming: true  },
  { day: "20", month: "Jun", title: "Rapat Koordinasi Dukuh se-Kalurahan Sinduadi",time: "13.00 – 15.00 WIB", place: "Balai Kalurahan Sinduadi",     upcoming: false },
];

function Agenda() {
  return (
    <section id="agenda" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-start">

          <div>
            <SectionHeader
              label="Agenda"
              title="Kegiatan Mendatang"
              description="Jadwal kegiatan, acara budaya, dan pertemuan warga di Padukuhan Kragilan."
            />
            {/* Callout box */}
            <div className="p-5 rounded-2xl bg-[#F46B35]/6 border border-[#F46B35]/18">
              <div className="flex items-center gap-3 mb-2.5">
                <Calendar size={15} className="text-[#F46B35]" />
                <span className="text-[13px] font-semibold text-[#F46B35]">Ikuti agenda kami</span>
              </div>
              <p className="text-[12.5px] text-[#6B7280] leading-relaxed">
                Untuk konfirmasi kehadiran atau informasi agenda terkini, hubungi pengurus padukuhan melalui WhatsApp.
              </p>
              <button onClick={() => goTo("#kontak")} className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-[#F46B35] hover:gap-2.5 transition-all">
                Hubungi pengurus <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {AGENDA.map((item, i) => (
              <div
                key={i}
                className={`flex gap-4 p-4 rounded-2xl transition-all ${
                  item.upcoming
                    ? "bg-white border border-[#E5E7EB] hover:border-[#F46B35]/30 hover:shadow-[0_2px_12px_rgba(244,107,53,0.07)]"
                    : "bg-[#F9F9F9] opacity-52"
                }`}
              >
                {/* Date badge */}
                <div className={`flex-shrink-0 w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center ${
                  item.upcoming ? "bg-[#F46B35]" : "bg-[#E5E7EB]"
                }`}>
                  <span className={`text-[1.22rem] font-bold leading-none ${item.upcoming ? "text-white" : "text-[#9CA3AF]"}`}>
                    {item.day}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider mt-0.5 font-medium ${item.upcoming ? "text-white/65" : "text-[#9CA3AF]"}`}>
                    {item.month}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[#2B2B2B] text-[13px] leading-snug">{item.title}</h3>
                    {!item.upcoming && <Badge variant="gray">Selesai</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                    <span className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                      <Clock size={10} /> {item.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                      <MapPin size={10} /> {item.place}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GALERI ──────────────────────────────────────────────────────────────────

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1542897643-8158da5b4607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",  alt: "Kirab budaya warga",          big: true  },
  { src: "https://images.unsplash.com/photo-1771648283737-ce89788c4111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700", alt: "Kegiatan warga bersama",       big: false },
  { src: "https://images.unsplash.com/photo-1590251869641-dd94fb569954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700", alt: "Proses membatik",              big: false },
  { src: "https://images.unsplash.com/photo-1603958123897-902ccdc49738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700", alt: "Warung kuliner warga",          big: false },
  { src: "https://images.unsplash.com/photo-1621526402311-4caf81fe77c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700", alt: "Jalan desa Kragilan",           big: false },
  { src: "https://images.unsplash.com/photo-1771648032911-9596e0c0a31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700", alt: "Anak-anak bermain di padukuhan",big: false },
];

function Galeri() {
  const [lb, setLb] = useState<string | null>(null);

  return (
    <section id="galeri" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Galeri Foto"
          title="Potret Kragilan"
          description="Dokumentasi kegiatan, budaya, dan kehidupan sehari-hari warga Padukuhan Kragilan."
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: "200px" }}>
          {GALLERY.map((p, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl cursor-pointer group relative ${p.big ? "md:col-span-2 md:row-span-2" : ""}`}
              onClick={() => setLb(p.src)}
            >
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/24 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 rounded-full p-2.5">
                  <Eye size={18} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E5E7EB] text-[13px] font-semibold text-[#2B2B2B] hover:border-[#F46B35] hover:text-[#F46B35] transition-all">
            Lihat semua foto <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 md:p-8" onClick={() => setLb(null)}>
          <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" onClick={() => setLb(null)}>
            <X size={18} />
          </button>
          <img src={lb} alt="Foto galeri" className="max-w-full max-h-[90vh] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// ─── KONTAK ──────────────────────────────────────────────────────────────────

function Kontak() {
  return (
    <section id="kontak" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Kontak"
          title="Hubungi Kami"
          description="Kami siap membantu pertanyaan dan kebutuhan informasi masyarakat Padukuhan Kragilan."
          center
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-2">
          {/* Contact info */}
          <div className="space-y-3.5">
            {[
              { icon: MapPin, label: "Alamat",       value: "Padukuhan Kragilan, Kalurahan Sinduadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta", link: null },
              { icon: Phone,  label: "WhatsApp",     value: "+62 812 3456 7890",                    link: "https://wa.me/6281234567890"              },
              { icon: Mail,   label: "Email",        value: "kragilan.sinduadi@sleman.go.id",        link: "mailto:kragilan.sinduadi@sleman.go.id"   },
              { icon: Clock,  label: "Jam Layanan",  value: "Senin – Jumat, 08.00 – 15.00 WIB",     link: null                                       },
            ].map(({ icon: Icon, label, value, link }) => (
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
            ))}
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white flex flex-col items-center justify-center gap-4 min-h-[380px]">
            <div className="w-14 h-14 rounded-2xl bg-[#F46B35]/10 flex items-center justify-center">
              <MapPin size={24} className="text-[#F46B35]" />
            </div>
            <div className="text-center">
              <p className="text-[13.5px] font-semibold text-[#2B2B2B]">Padukuhan Kragilan</p>
              <p className="text-[12px] text-[#9CA3AF] mt-1">Sinduadi, Mlati, Sleman, D.I. Yogyakarta</p>
            </div>
            <a
              href="https://maps.google.com/?q=Padukuhan+Kragilan+Sinduadi+Mlati+Sleman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F46B35] text-white text-[13px] font-semibold hover:bg-[#d85a2a] transition-colors"
            >
              Buka Google Maps <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Pranadhara20px() {
  // Subtle placeholder for the Pranadhara logo at ~20px
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="KKN Pranadhara Mlati">
      <circle cx="10" cy="10" r="9.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="rgba(255,255,255,0.06)" />
      <text x="10" y="13.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">P</text>
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-[#261208]">
      {/* Ornament band — terracotta strip */}
      <div className="bg-[#F46B35] py-3.5 flex items-center justify-center">
        <OrnamentDivider align="center" onDark />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-[10px] bg-[#F46B35] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5L2 6.5V16.5H6.5V11H11.5V16.5H16V6.5L9 1.5Z" fill="white" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-[15px] leading-snug tracking-[-0.01em]">Padukuhan Kragilan</div>
                <div className="text-[10.5px] text-white/38 tracking-wide">Sistem Informasi Padukuhan</div>
              </div>
            </div>
            <p className="text-[12.5px] text-white/45 leading-relaxed max-w-xs">
              Portal informasi resmi Padukuhan Kragilan, Kalurahan Sinduadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-[10.5px] font-semibold text-white/45 uppercase tracking-widest mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button onClick={() => goTo(l.href)} className="text-[12.5px] text-white/40 hover:text-white/80 transition-colors">
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
                <MapPin size={13} className="text-[#F6C445] flex-shrink-0 mt-0.5" />
                <span className="text-[12.5px] text-white/40 leading-snug">Sinduadi, Mlati, Sleman, D.I. Yogyakarta</span>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors">
                  <Phone size={13} className="text-[#F6C445] flex-shrink-0 mt-0.5" /> +62 812 3456 7890
                </a>
              </li>
              <li>
                <a href="mailto:kragilan.sinduadi@sleman.go.id" className="flex gap-2.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors">
                  <Mail size={13} className="text-[#F6C445] flex-shrink-0 mt-0.5" /> kragilan.sinduadi@sleman.go.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with KKN credit */}
        <div className="mt-12 pt-6 border-t border-white/7 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-[11px] text-white/25">
            © 2026 Padukuhan Kragilan. Hak cipta dilindungi.
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

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <OrnamentBand />
        <About />
        <Potensi />
        <OrnamentBand />
        <UMKM />
        <Berita />
        <OrnamentBand />
        <Agenda />
        <Galeri />
        <Kontak />
      </main>
      <Footer />
    </div>
  );
}
