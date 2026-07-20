import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileText, Globe, Images, PlayCircle } from "lucide-react";
import { Link, useParams } from "react-router";
import { newsData } from "../../data/news";
import { getPublishedNews, getPublishedNewsBySlug, type News } from "../../services/news";
import MainContent from "../components/layout/MainContent";
import {
  getNewsAttachments,
  type NewsAttachment,
  type NewsAttachmentType,
} from "../../services/newsAttachments";

type DetailNews = {
  id: string | null;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string | null;
  photo: string | null;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function mapDatabaseNews(row: News): DetailNews {
  return {
    id: row.id,
    slug: row.slug,
    title: row.judul,
    date: formatDate(row.tanggal),
    excerpt: row.ringkasan?.trim() ?? "",
    content: row.isi?.trim() ?? "",
    author: row.penulis?.trim() || null,
    photo: row.thumbnail_url?.trim() || null,
  };
}

const attachmentIcons = {
  document: FileText,
  video: PlayCircle,
  gallery: Images,
  website: Globe,
  link: ExternalLink,
} satisfies Record<NewsAttachmentType, typeof ExternalLink>;

export default function NewsDetailPage() {
  const { slug = "" } = useParams();
  const [item, setItem] = useState<DetailNews | null>(null);
  const [attachments, setAttachments] = useState<NewsAttachment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const localItem = newsData.find((news) => news.slug === slug);
    setAttachments([]);

    async function load() {
      try {
        const databaseItem = await getPublishedNewsBySlug(slug);
        if (databaseItem) {
          if (active) setItem(mapDatabaseNews(databaseItem));
          try {
            const records = await getNewsAttachments(databaseItem.id);
            if (active) setAttachments(records);
          } catch (error) {
            if (import.meta.env.DEV) console.error("Unable to load news attachments.", error);
          }
          return;
        }

        const databaseCollection = await getPublishedNews();
        if (active && databaseCollection.length === 0 && localItem) setItem({ ...localItem, id: null });
      } catch {
        if (active && localItem) setItem({ ...localItem, id: null });
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <MainContent offsetHeader>
      <section className="min-h-[60vh] bg-[#FFF9EC] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="py-20 text-center text-[#5F6F72]">Memuat berita…</p>
          ) : !item ? (
            <div className="py-20 text-center">
              <h1 className="text-[2rem] font-bold text-[#173F57]">Berita tidak ditemukan.</h1>
              <Link to="/berita" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0D6F6B] px-6 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#095B58]">
                <ArrowLeft size={16} /> Kembali ke Berita
              </Link>
            </div>
          ) : (
            <article className="overflow-hidden rounded-3xl border border-[#D8E4DF] bg-[#FFFEF9] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <div className="bg-[#F5F7F4]">
                {item.photo ? (
                  <img src={item.photo} alt={item.title} className="h-auto w-full object-contain" />
                ) : (
                  <div className="flex h-full items-center justify-center text-[14px] font-semibold text-[#7C8C8A]">Gambar belum tersedia</div>
                )}
              </div>
              <div className="p-6 sm:p-10 lg:px-14">
                <p className="text-[12px] text-[#7C8C8A]">{item.date}</p>
                <h1 className="mt-3 text-[2rem] font-bold leading-tight tracking-[-0.025em] text-[#173F57] sm:text-[2.5rem]">{item.title}</h1>
                {item.author && <p className="mt-3 text-[13px] font-semibold text-[#5F6F72]">Oleh {item.author}</p>}
                {item.excerpt && item.excerpt !== item.content && <p className="mt-6 text-[1rem] font-medium leading-relaxed text-[#49636A]">{item.excerpt}</p>}
                {item.content && <div className="mt-7 whitespace-pre-wrap text-[1rem] leading-8 text-[#49636A]">{item.content}</div>}
                {attachments.length > 0 && (
                  <section aria-labelledby="supporting-materials-title" className="mt-9 rounded-2xl border border-[#D8E4DF] bg-[#F5F7F4] p-5 sm:p-6">
                    <h2 id="supporting-materials-title" className="text-[1.1rem] font-bold text-[#173F57]">Materi Pendukung</h2>
                    <ul className="mt-4 space-y-2.5">
                      {attachments.map((attachment) => {
                        const Icon = attachmentIcons[attachment.type] ?? ExternalLink;
                        return (
                          <li key={attachment.id}>
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-semibold text-[#0D6F6B] transition-colors hover:bg-[#DDEFE8]/65 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6F6B]">
                              <Icon size={18} aria-hidden="true" className="shrink-0" />
                              <span>{attachment.title}</span>
                              <ExternalLink size={14} aria-hidden="true" className="ml-auto shrink-0 opacity-65" />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )}
                <Link to="/berita" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[#0D6F6B] px-6 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#095B58]">
                  <ArrowLeft size={16} /> Kembali ke Berita
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>
    </MainContent>
  );
}
