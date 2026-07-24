import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  ExternalLink,
  Instagram,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Store,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { umkmData } from "../../data/umkm";
import {
  getPublishedUmkm,
  getPublishedUmkmBySlug,
  type Umkm,
} from "../../services/umkm";
import MainContent from "../components/layout/MainContent";
import { Badge, OrnamentDivider, SectionOrnament } from "../components/sections/shared";
import { createWhatsAppUrl } from "../utils/contactLinks";

type DetailUmkm = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  photo: string | null;
  featuredProducts: string | null;
  operatingDays: string | null;
  address: string | null;
  whatsappUrl: string | null;
  instagramUrl: string | null;
  shopeeUrl: string | null;
  mapsUrl: string | null;
};

function createLocalSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeExternalUrl(value: string | null) {
  const candidate = value?.trim();
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function mapDatabaseUmkm(row: Umkm): DetailUmkm {
  return {
    id: row.id,
    slug: row.slug || createLocalSlug(row.nama),
    name: row.nama.trim(),
    category: row.kategori?.trim() || "UMKM",
    description: row.deskripsi?.trim() || "",
    photo: row.foto_url?.trim() || null,
    featuredProducts: row.featured_products?.trim() || null,
    operatingDays: row.operating_days?.trim() || null,
    address: row.alamat?.trim() || null,
    whatsappUrl: createWhatsAppUrl(row.whatsapp ?? "") || null,
    instagramUrl: safeExternalUrl(row.instagram_url),
    shopeeUrl: safeExternalUrl(row.shopee),
    mapsUrl: safeExternalUrl(row.maps_url),
  };
}

const localItems: DetailUmkm[] = umkmData.map((item, index) => ({
  id: `local-${index}`,
  slug: createLocalSlug(item.name),
  name: item.name,
  category: item.category,
  description: item.desc,
  photo: item.photo,
  featuredProducts: null,
  operatingDays: null,
  address: null,
  whatsappUrl: null,
  instagramUrl: null,
  shopeeUrl: null,
  mapsUrl: null,
}));

function stableScore(value: string) {
  return Array.from(value).reduce((score, character) => ((score * 31) + character.charCodeAt(0)) >>> 0, 7);
}

export default function UmkmDetailPage() {
  const { slug = "" } = useParams();
  const [item, setItem] = useState<DetailUmkm | null>(null);
  const [collection, setCollection] = useState<DetailUmkm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const localItem = localItems.find((candidate) => candidate.slug === slug) ?? null;
    setItem(null);
    setCollection([]);
    setLoading(true);

    async function load() {
      try {
        const databaseItem = await getPublishedUmkmBySlug(slug);
        const databaseCollection = await getPublishedUmkm();
        if (!active) return;

        if (databaseItem) {
          setItem(mapDatabaseUmkm(databaseItem));
          setCollection(databaseCollection.map(mapDatabaseUmkm));
        } else if (databaseCollection.length === 0 && localItem) {
          setItem(localItem);
          setCollection(localItems);
        }
      } catch {
        if (active && localItem) {
          setItem(localItem);
          setCollection(localItems);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    const previousTitle = document.title;
    const existingMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = existingMeta?.content;
    const meta = existingMeta ?? document.head.appendChild(document.createElement("meta"));
    if (!existingMeta) meta.name = "description";

    if (item) {
      document.title = `UMKM ${item.name} | Padukuhan Kragilan`;
      meta.content = item.description || `Profil UMKM ${item.name} di Padukuhan Kragilan.`;
    } else if (!loading) {
      document.title = "UMKM Tidak Ditemukan | Padukuhan Kragilan";
      meta.content = "Profil UMKM yang Anda cari tidak ditemukan.";
    }

    return () => {
      document.title = previousTitle;
      if (existingMeta) existingMeta.content = previousDescription ?? "";
      else meta.remove();
    };
  }, [item, loading]);

  const related = useMemo(
    () => collection
      .filter((candidate) => candidate.slug !== item?.slug)
      .sort((a, b) => stableScore(`${slug}-${a.id}`) - stableScore(`${slug}-${b.id}`))
      .slice(0, 3),
    [collection, item?.slug, slug],
  );

  return (
    <MainContent offsetHeader>
      <section className="relative min-h-[70vh] overflow-hidden bg-[#FFF9EC] py-12 sm:py-16 lg:py-20">
        <SectionOrnament position="top-right" />
        <SectionOrnament position="bottom-left" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="py-24 text-center text-[14px] font-medium text-[#5F6F72]" role="status">Memuat profil UMKM…</p>
          ) : !item ? (
            <div className="mx-auto max-w-2xl rounded-3xl border border-[#D8E4DF] bg-[#FFFEF9] px-6 py-20 text-center shadow-[0_16px_45px_rgba(23,74,112,0.08)]">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0D6F6B]">404</p>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-[#173F57]">UMKM tidak ditemukan</h1>
              <p className="mt-4 text-[#5F6F72]">Profil usaha yang Anda cari tidak tersedia atau belum diterbitkan.</p>
              <Link to="/umkm" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0D6F6B] px-6 text-[13px] font-bold text-white hover:bg-[#095B58] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C343]">
                <ArrowLeft size={16} /> Kembali ke UMKM
              </Link>
            </div>
          ) : (
            <>
              <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#647876]">
                <Link to="/" className="rounded-sm hover:text-[#0D6F6B] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0D6F6B]">Beranda</Link>
                <span aria-hidden="true">/</span>
                <Link to="/umkm" className="rounded-sm hover:text-[#0D6F6B] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0D6F6B]">UMKM</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-[#173F57]">{item.name}</span>
              </nav>

              <article className="overflow-hidden rounded-[2rem] border border-[#D8E4DF] bg-[#FFFEF9] shadow-[0_20px_55px_rgba(23,74,112,0.09)]">
                <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="flex min-h-72 items-center justify-center border-b border-[#D8E4DF] bg-[#F2F5F0] p-4 sm:min-h-[420px] sm:p-8 lg:border-b-0 lg:border-r">
                    {item.photo ? (
                      <img src={item.photo} alt={`Foto usaha ${item.name}`} className="max-h-[560px] h-auto w-full object-contain" />
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-[#7C8C8A]"><ShoppingBag size={42} strokeWidth={1.4} /><span className="text-[13px]">Foto usaha belum tersedia</span></div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                    <Badge variant="gray">{item.category}</Badge>
                    <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-[#173F57] sm:text-4xl lg:text-[2.75rem]">{item.name}</h1>
                    {item.description && <p className="mt-6 whitespace-pre-line text-[15px] leading-8 text-[#526C70]">{item.description}</p>}
                  </div>
                </div>

                <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
                  {item.featuredProducts && <ProfileSection icon={Package} title="Produk Unggulan"><p>{item.featuredProducts}</p></ProfileSection>}

                  {(item.operatingDays || item.address) && (
                    <ProfileSection icon={Clock3} title="Informasi">
                      <div className="grid gap-5 sm:grid-cols-2">
                        {item.operatingDays && <Info label="Hari Operasional" value={item.operatingDays} icon={Clock3} />}
                        {item.address && <Info label="Alamat" value={item.address} icon={MapPin} />}
                      </div>
                    </ProfileSection>
                  )}

                  {(item.whatsappUrl || item.instagramUrl || item.shopeeUrl || item.mapsUrl) && (
                    <ProfileSection icon={Phone} title="Hubungi UMKM">
                      <div className="flex flex-wrap gap-3">
                        {item.whatsappUrl && <Contact href={item.whatsappUrl} label="WhatsApp" ariaLabel={`Hubungi ${item.name} melalui WhatsApp`} icon={Phone} />}
                        {item.instagramUrl && <Contact href={item.instagramUrl} label="Instagram" ariaLabel={`Buka Instagram ${item.name}`} icon={Instagram} />}
                        {item.shopeeUrl && <Contact href={item.shopeeUrl} label="Shopee" ariaLabel={`Buka toko Shopee ${item.name}`} icon={Store} />}
                        {item.mapsUrl && <Contact href={item.mapsUrl} label="Google Maps" ariaLabel={`Buka lokasi ${item.name} di Google Maps`} icon={MapPin} />}
                      </div>
                    </ProfileSection>
                  )}

                  <Link to="/umkm" className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#0D6F6B]/25 px-5 text-[13px] font-bold text-[#0D6F6B] hover:bg-[#DDEFE8]/55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]">
                    <ArrowLeft size={16} /> Kembali ke UMKM
                  </Link>
                </div>
              </article>

              {related.length > 0 && (
                <section aria-labelledby="related-umkm-title" className="mt-16 lg:mt-20">
                  <h2 id="related-umkm-title" className="text-2xl font-bold tracking-[-0.025em] text-[#173F57] sm:text-3xl">UMKM Lainnya</h2>
                  <OrnamentDivider align="left" className="mt-4" />
                  <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((candidate) => <RelatedCard key={candidate.id} item={candidate} />)}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>
    </MainContent>
  );
}

function ProfileSection({ icon: Icon, title, children }: { icon: typeof Package; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9 border-b border-[#D8E4DF] pb-9">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D6F6B]/10 text-[#0D6F6B]"><Icon size={18} aria-hidden="true" /></span>
        <h2 className="text-xl font-bold text-[#173F57]">{title}</h2>
      </div>
      <div className="whitespace-pre-line text-[14px] leading-7 text-[#526C70]">{children}</div>
    </section>
  );
}

function Info({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Clock3 }) {
  return <div className="flex gap-3 rounded-2xl bg-[#F5F7F4] p-4"><Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#0D6F6B]" /><div><p className="text-[11px] font-bold uppercase tracking-wider text-[#7C8C8A]">{label}</p><p className="mt-1 whitespace-pre-line text-[13px] leading-6 text-[#294B55]">{value}</p></div></div>;
}

function Contact({ href, label, ariaLabel, icon: Icon }: { href: string; label: string; ariaLabel: string; icon: typeof ExternalLink }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0D6F6B] px-4 text-[12px] font-bold text-white shadow-sm hover:bg-[#095B58] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F6C343]"><Icon size={15} aria-hidden="true" />{label}<ExternalLink size={12} aria-hidden="true" className="opacity-65" /></a>;
}

function RelatedCard({ item }: { item: DetailUmkm }) {
  return (
    <Link to={`/umkm/${item.slug}`} className="group overflow-hidden rounded-2xl border border-[#D8E4DF] bg-[#FFFEF9] shadow-[0_10px_28px_rgba(23,74,112,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(23,74,112,0.10)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]">
      <div className="flex h-40 items-center justify-center bg-[#F2F5F0] p-3">
        {item.photo ? <img src={item.photo} alt={`Foto usaha ${item.name}`} className="h-full w-full object-contain" /> : <ShoppingBag size={28} aria-hidden="true" className="text-[#AABBB6]" />}
      </div>
      <div className="p-5">
        <Badge variant="gray">{item.category}</Badge>
        <h3 className="mt-3 font-bold text-[#173F57]">{item.name}</h3>
        <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-[#0D6F6B]">Lihat Detail <ArrowRight size={13} /></span>
      </div>
    </Link>
  );
}
