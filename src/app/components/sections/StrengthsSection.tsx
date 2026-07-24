import { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { SectionHeader, SectionOrnament } from "./shared";
import { strengthsContent } from "../../../data/strengths";
import { getPublishedPotencies, type Potency } from "../../../services/potencies";

export default function StrengthsSection({ pageHeading = false }: { pageHeading?: boolean }) {
  const [potencies, setPotencies] = useState<Potency[]>([]);

  useEffect(() => {
    let active = true;
    getPublishedPotencies().then((rows) => { if (active) setPotencies(rows); }).catch(() => { if (active) setPotencies([]); });
    return () => { active = false; };
  }, []);

  return (
    <section id="potensi" className="relative overflow-hidden bg-[#FFFEF9] py-20 lg:py-24">
      <SectionOrnament position="bottom-left" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader label={strengthsContent.label} title={strengthsContent.title} description={strengthsContent.description} center as={pageHeading ? "h1" : "h2"} />
        {potencies.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {potencies.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-3xl border border-[#D8E4DF] bg-[#FFFEF9] shadow-[0_10px_28px_rgba(23,74,112,0.07)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0D6F6B]/25 hover:shadow-[0_18px_40px_rgba(23,74,112,0.11)]">
                <div className="m-2 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-[#D8E4DF]/80 bg-[#F1F3EF] p-2">
                  {item.image_url ? <img src={item.image_url} alt={item.judul ?? "Potensi Padukuhan"} className="h-full w-full object-contain" /> : <ImageIcon size={34} className="text-[#9AABA7]" aria-hidden="true" />}
                </div>
                <div className="p-6"><h3 className="text-[0.95rem] font-bold text-[#173F57]">{item.judul}</h3>{item.deskripsi && <p className="mt-2 text-[0.855rem] leading-relaxed text-[#5F6F72]">{item.deskripsi}</p>}</div>
              </article>
            ))}
          </div>
        ) : <p className="rounded-2xl border border-[#D8E4DF] bg-[#FFF9EC] px-6 py-10 text-center text-sm text-[#5F6F72]">Konten potensi sedang disiapkan.</p>}
      </div>
    </section>
  );
}
