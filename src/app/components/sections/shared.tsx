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

export function OrnamentDivider({
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
  const terra      = onDark ? "rgba(255,249,236,0.9)"  : "#0D6F6B";
  const yellow     = onDark ? "rgba(246,196,69,0.95)"  : "#F6C343";
  const teal       = onDark ? "rgba(76,154,146,0.85)"  : "#2F8F83";
  const terraFaint = onDark ? "rgba(255,249,236,0.28)"  : "rgba(13,111,107,0.22)";

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

// â”€â”€â”€ BADGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function Badge({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "teal" | "yellow" | "gray" | "blue";
}) {
  const s = {
    primary: "bg-[#0D6F6B]/10 text-[#0A5E5A]",
    teal:    "bg-[#2F8F83]/12 text-[#246F68]",
    yellow:  "bg-[#F6C343]/18 text-[#7a5f10]",
    gray:    "bg-[#F5F7F4] text-[#5F6F72] border border-[#D8E4DF]",
    blue:    "bg-[#174A70]/10 text-[#174A70]",
  };
  return (
    <span className={`inline-block text-[11px] font-semibold px-2.5 py-[3px] rounded-full tracking-wide ${s[variant]}`}>
      {children}
    </span>
  );
}

// â”€â”€â”€ SECTION HEADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function SectionHeader({
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
      <h2 className={`mt-3 text-[2rem] md:text-[2.35rem] font-bold text-[#173F57] leading-[1.2] tracking-[-0.022em] ${center ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-[#5F6F72] text-[1.02rem] leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
      <OrnamentDivider align={center ? "center" : "left"} className="mt-5" />
    </div>
  );
}

// â”€â”€â”€ NAVBAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function OrnamentBand() {
  return (
    <div className="bg-[#FFF9EC] py-5 flex items-center justify-center border-y border-[#D8E4DF]">
      <OrnamentDivider align="center" size="md" />
    </div>
  );
}

// â”€â”€â”€ ABOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
