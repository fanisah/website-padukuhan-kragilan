import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Badge, SectionHeader, SectionOrnament } from "./shared";
import { umkmContent, umkmData } from "../../../data/umkm";
import { usePublishedCollection } from "../../hooks/usePublishedCollection";
import { getPublishedUmkm, type Umkm } from "../../../services/umkm";

type BadgeVariant = "primary" | "teal" | "yellow" | "gray" | "blue";

type UmkmItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  catV: BadgeVariant;
  desc: string;
  photo: string | null;
};

const localUmkmItems: UmkmItem[] = umkmData.map((item, index) => ({
  id: `local-${index}`,
  slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
  name: item.name,
  category: item.category,
  catV: item.catV,
  desc: item.desc,
  photo: item.photo,
}));

function mapUmkm(row: Umkm): UmkmItem {
  return {
    id: row.id,
    slug: row.slug || row.nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    name: row.nama.trim(),
    category: row.kategori?.trim() || "UMKM",
    catV: "gray",
    desc: row.deskripsi?.trim() || "",
    photo: row.foto_url?.trim() || null,
  };
}

export default function UmkmSection({ pageHeading = false }: { pageHeading?: boolean }) {
  const items = usePublishedCollection(localUmkmItems, getPublishedUmkm, mapUmkm);

  return (
    <section id="umkm" className="relative overflow-hidden bg-[#F3F8F4] py-20 lg:py-24">
      <SectionOrnament position="top-right" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader as={pageHeading ? "h1" : "h2"} label={umkmContent.label} title={umkmContent.title} description={umkmContent.description} />
          <Link to="/umkm" className="mb-10 inline-flex flex-shrink-0 items-center gap-1.5 rounded-sm text-[13px] font-semibold text-[#0D6F6B] transition-all hover:gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]">
            {umkmContent.action} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link to={`/umkm/${item.slug}`} key={item.id} aria-label={`Lihat detail ${item.name}`} className="group flex flex-col overflow-hidden rounded-3xl border border-[#D8E4DF] bg-[#FFFEF9] shadow-[0_10px_28px_rgba(23,74,112,0.07)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#0D6F6B]/25 hover:shadow-[0_18px_40px_rgba(23,74,112,0.11)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]">
              <div className="m-2 h-44 overflow-hidden rounded-2xl border border-[#D8E4DF] bg-[#F5F7F4]">
                {item.photo ? <img src={item.photo} alt={item.name} className="h-full w-full object-contain p-2" /> : <div className="flex h-full w-full flex-col items-center justify-center gap-2"><ShoppingBag size={28} className="text-[#C8D5D0]" strokeWidth={1.5} /><span className="text-[11px] text-[#7C8C8A]">Foto belum tersedia</span></div>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <Badge variant={item.catV}>{item.category}</Badge>
                <h3 className="mb-1.5 mt-2.5 text-[0.9rem] font-bold tracking-[-0.01em] text-[#173F57]">{item.name}</h3>
                {item.desc && <p className="mb-5 line-clamp-3 text-[0.83rem] leading-relaxed text-[#5F6F72]">{item.desc}</p>}
                <span className="mt-auto inline-flex min-h-10 w-fit items-center gap-2 rounded-xl border border-[#0D6F6B]/25 px-4 text-[12px] font-bold text-[#0D6F6B] transition-colors group-hover:bg-[#DDEFE8]/60">
                  Lihat Detail <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
