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
import { agendaContent, agendaData } from "../../../data/agenda";
import { usePublishedCollection } from "../../hooks/usePublishedCollection";
import { getPublishedAgendas, type Agenda } from "../../../services/agendas";

type AgendaItem = (typeof agendaData)[number];

function formatAgendaTime(value: string | null) {
  const time = value?.trim();
  if (!time) return "";

  const withoutZone = time.replace(/\s*WIB$/i, "");
  const normalized = withoutZone.replace(
    /(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?/g,
    (_, hours: string, minutes: string) => `${hours.padStart(2, "0")}.${minutes}`,
  );

  return `${normalized} WIB`;
}

function mapAgenda(row: Agenda): AgendaItem {
  const date = new Date(row.tanggal);
  const validDate = !Number.isNaN(date.getTime());

  return {
    day: validDate ? String(date.getUTCDate()).padStart(2, "0") : "—",
    month: validDate
      ? new Intl.DateTimeFormat("id-ID", { month: "short", timeZone: "UTC" })
          .format(date)
          .replace(".", "")
      : "",
    title: row.judul,
    time: formatAgendaTime(row.jam),
    place: row.lokasi?.trim() ?? "",
    upcoming: true,
  };
}

export default function AgendaSection() {
  const items = usePublishedCollection(agendaData, getPublishedAgendas, mapAgenda);

  return (
    <section id="agenda" className="py-20 lg:py-24 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-start">

          <div>
            <SectionHeader
              label={agendaContent.label}
              title={agendaContent.title}
              description={agendaContent.description}
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
            {items.map((item, i) => (
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
                    {item.time && <span className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                      <Clock size={10} /> {item.time}
                    </span>}
                    {item.place && <span className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                      <MapPin size={10} /> {item.place}
                    </span>}
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

// â”€â”€â”€ GALERI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
