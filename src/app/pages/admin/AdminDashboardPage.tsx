import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, FileText, Images, MapPin, Store, type LucideIcon } from "lucide-react";
import { Link } from "react-router";
import {
  getAdminDashboardStats,
  getRecentDashboardNews,
  getUpcomingDashboardAgendas,
  type AdminDashboardStats,
  type DashboardAgenda,
  type DashboardNews,
} from "../../../services/adminDashboard";

const emptyStats: AdminDashboardStats = { news: 0, agendas: 0, umkm: 0, gallery: 0 };

const cards = [
  { key: "news", label: "Berita", path: "/admin/berita", action: "Kelola Berita", icon: FileText },
  { key: "agendas", label: "Agenda", path: "/admin/agenda", action: "Kelola Agenda", icon: CalendarDays },
  { key: "umkm", label: "UMKM", path: "/admin/umkm", action: "Kelola UMKM", icon: Store },
  { key: "gallery", label: "Galeri", path: "/admin/galeri", action: "Kelola Galeri", icon: Images },
] as const;

function localDateKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function formatTime(value: string | null) {
  if (!value?.trim()) return "";
  return value.trim().replace(/(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?/, (_, hour: string, minute: string) => `${hour.padStart(2, "0")}.${minute}`);
}

function DashboardLink({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) {
  return <Link to={to} className={`rounded-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0D6F6B] ${className}`}>{children}</Link>;
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-[#F5F7F4] px-4 py-6 text-center text-[13px] text-[#6B7D7B]">{children}</p>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(emptyStats);
  const [agendas, setAgendas] = useState<DashboardAgenda[]>([]);
  const [news, setNews] = useState<DashboardNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ stats: false, agendas: false, news: false });

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      getAdminDashboardStats(),
      getUpcomingDashboardAgendas(localDateKey()),
      getRecentDashboardNews(),
    ]).then(([statsResult, agendaResult, newsResult]) => {
      if (!active) return;
      if (statsResult.status === "fulfilled") setStats(statsResult.value);
      if (agendaResult.status === "fulfilled") setAgendas(agendaResult.value);
      if (newsResult.status === "fulfilled") setNews(newsResult.value);
      setErrors({
        stats: statsResult.status === "rejected",
        agendas: agendaResult.status === "rejected",
        news: newsResult.status === "rejected",
      });
      if (import.meta.env.DEV) {
        for (const result of [statsResult, agendaResult, newsResult]) {
          if (result.status === "rejected") console.error("Dashboard data request failed.", result.reason);
        }
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <section>
      <div>
        <h1 className="text-[1.75rem] font-bold tracking-[-0.025em] text-[#173F57]">Dashboard</h1>
        <p className="mt-2 text-[14px] text-[#5F6F72]">Lihat ringkasan konten dan pilih bagian yang ingin dikelola.</p>
      </div>

      {errors.stats && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700" role="alert">Data ringkasan belum dapat dimuat.</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, label, path, action, icon: Icon }) => (
          <article key={key} className="rounded-2xl border border-[#D8E4DF] bg-white p-5 shadow-[0_8px_24px_rgba(23,74,112,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wide text-[#6B7D7B]">{label}</p>
                {loading ? <div className="mt-3 h-9 w-16 animate-pulse rounded-lg bg-[#E7EEEA]" /> : <p className="mt-2 text-[2rem] font-bold tabular-nums text-[#173F57]">{errors.stats ? "—" : stats[key]}</p>}
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDEFE8] text-[#0D6F6B]"><Icon size={21} aria-hidden="true" /></div>
            </div>
            <DashboardLink to={path} className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0D6F6B] hover:underline">
              {action} <ArrowRight size={14} aria-hidden="true" />
            </DashboardLink>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <DashboardPanel title="Agenda Terdekat" icon={CalendarDays} managePath="/admin/agenda" error={errors.agendas} errorText="Agenda terdekat belum dapat dimuat.">
          {loading ? <PanelSkeleton /> : agendas.length === 0 ? <EmptyState>Belum ada agenda mendatang.</EmptyState> : (
            <ul className="divide-y divide-[#E7EEEA]">
              {agendas.map((agenda) => (
                <li key={agenda.id} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-[14px] font-bold text-[#173F57]">{agenda.judul}</p>
                  <p className="mt-1 text-[12px] font-medium text-[#0D6F6B]">{formatDate(agenda.tanggal)}{formatTime(agenda.jam) && ` · ${formatTime(agenda.jam)}`}</p>
                  {agenda.lokasi && <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#6B7D7B]"><MapPin size={13} aria-hidden="true" /> {agenda.lokasi}</p>}
                </li>
              ))}
            </ul>
          )}
        </DashboardPanel>

        <DashboardPanel title="Berita Terbaru" icon={FileText} managePath="/admin/berita" error={errors.news} errorText="Berita terbaru belum dapat dimuat.">
          {loading ? <PanelSkeleton /> : news.length === 0 ? <EmptyState>Belum ada berita.</EmptyState> : (
            <ul className="divide-y divide-[#E7EEEA]">
              {news.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <div><p className="text-[14px] font-bold text-[#173F57]">{item.judul}</p><p className="mt-1 text-[12px] text-[#6B7D7B]">{formatDate(item.tanggal)}</p></div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.is_published ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{item.is_published ? "Terbit" : "Draf"}</span>
                </li>
              ))}
            </ul>
          )}
        </DashboardPanel>
      </div>

      <section className="mt-6 rounded-2xl border border-[#D8E4DF] bg-white p-5 sm:p-6" aria-labelledby="quick-actions-title">
        <h2 id="quick-actions-title" className="text-[17px] font-bold text-[#173F57]">Aksi Cepat</h2>
        <p className="mt-1 text-[13px] text-[#6B7D7B]">Pilih jenis konten yang ingin Anda kelola.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {cards.map(({ path, action, icon: Icon }) => <DashboardLink key={path} to={path} className="inline-flex min-h-11 items-center gap-2 border border-[#D8E4DF] px-4 text-[13px] font-semibold text-[#49636A] hover:border-[#0D6F6B] hover:bg-[#DDEFE8]/40 hover:text-[#0D6F6B]"><Icon size={16} aria-hidden="true" /> {action}</DashboardLink>)}
        </div>
      </section>
    </section>
  );
}

function DashboardPanel({ title, icon: Icon, managePath, error, errorText, children }: { title: string; icon: LucideIcon; managePath: string; error: boolean; errorText: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#D8E4DF] bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4"><h2 className="flex items-center gap-2 text-[17px] font-bold text-[#173F57]"><Icon size={19} aria-hidden="true" className="text-[#0D6F6B]" /> {title}</h2><DashboardLink to={managePath} className="text-[12px] font-semibold text-[#0D6F6B] hover:underline">Kelola</DashboardLink></div>
      {error ? <EmptyState>{errorText}</EmptyState> : children}
    </section>
  );
}

function PanelSkeleton() {
  return <div className="space-y-3" role="status" aria-label="Memuat data"><div className="h-14 animate-pulse rounded-xl bg-[#E7EEEA]" /><div className="h-14 animate-pulse rounded-xl bg-[#E7EEEA]" /><div className="h-14 animate-pulse rounded-xl bg-[#E7EEEA]" /></div>;
}
