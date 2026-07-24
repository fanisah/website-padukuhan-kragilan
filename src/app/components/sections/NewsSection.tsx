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
import { Badge, SectionHeader, SectionOrnament } from "./shared";
import { newsContent, newsData } from "../../../data/news";
import { usePublishedCollection } from "../../hooks/usePublishedCollection";
import { getPublishedNews, type News } from "../../../services/news";
import { Link } from "react-router";

type NewsItem = Omit<(typeof newsData)[number], "imagePosition">;

function formatNewsDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function mapNews(row: News): NewsItem {
  return {
    slug: row.slug,
    category: "Berita",
    catV: "gray",
    date: formatNewsDate(row.tanggal),
    title: row.judul,
    excerpt: row.ringkasan?.trim() ?? "",
    content: row.isi?.trim() ?? "",
    author: row.penulis?.trim() || null,
    photo: row.thumbnail_url?.trim() || null,
  };
}

export default function NewsSection({ limit, pageHeading = false }: { limit?: number; pageHeading?: boolean }) {
  const items = usePublishedCollection(newsData, getPublishedNews, mapNews);
  const visibleItems = limit ? items.slice(0, limit) : items;

  return (
    <section id="berita" className="relative overflow-hidden bg-[#FFFEF9] py-20 lg:py-24">
      <SectionOrnament position="bottom-left" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <SectionHeader
            as={pageHeading ? "h1" : "h2"}
            label={newsContent.label}
            title={newsContent.title}
            description={newsContent.description}
          />
          <Link to="/berita" className="flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0D6F6B] hover:gap-2.5 transition-all mb-10">
            {newsContent.action} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((n) => (
            <article
              key={n.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#D8E4DF] bg-[#FFFEF9] shadow-[0_10px_28px_rgba(23,74,112,0.07)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#0D6F6B]/25 hover:shadow-[0_18px_40px_rgba(23,74,112,0.11)]"
            >
              <div className="m-2 h-48 overflow-hidden rounded-2xl border border-[#D8E4DF] bg-[#F5F7F4]">
                {n.photo ? (
                  <img src={n.photo} alt={n.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[13px] font-semibold text-[#7C8C8A] select-none">Gambar belum tersedia</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <Badge variant={n.catV}>{n.category}</Badge>
                  <span className="text-[12px] font-medium text-[#62726F]">{n.date}</span>
                </div>
                <h3 className="font-bold text-[#173F57] text-[0.9rem] leading-[1.45] mb-2 group-hover:text-[#0D6F6B] transition-colors tracking-[-0.01em]">
                  <Link to={`/berita/${n.slug}`}>{n.title}</Link>
                </h3>
                {n.excerpt && <p className="text-[0.83rem] text-[#5F6F72] leading-relaxed mb-4 line-clamp-3">{n.excerpt}</p>}
                <Link to={`/berita/${n.slug}`} className="mt-auto inline-flex min-h-9 items-center gap-1.5 text-[13px] font-bold text-[#0D6F6B] hover:text-[#174A70] transition-colors">
                  Baca selengkapnya <ChevronRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ AGENDA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
