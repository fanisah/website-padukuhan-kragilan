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

// â”€â”€â”€ BADGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function Badge({
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

// â”€â”€â”€ NAVBAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function OrnamentBand() {
  return (
    <div className="bg-[#FCFAF7] py-5 flex items-center justify-center border-y border-[#E5E7EB]">
      <OrnamentDivider align="center" size="md" />
    </div>
  );
}

// â”€â”€â”€ ABOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
