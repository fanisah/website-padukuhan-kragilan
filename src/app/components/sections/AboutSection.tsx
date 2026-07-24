import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SectionHeader, SectionOrnament } from "./shared";
import { siteProfile } from "../../../data/profile";
import { usePublicProfile } from "../../context/PublicProfileContext";

export default function AboutSection() {
  const profile = usePublicProfile();
  return (
    <section id="tentang" className="relative overflow-hidden bg-[#FFF9EC] py-20 lg:py-24">
      <SectionOrnament position="top-right" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeader label={siteProfile.about.label} title={profile.name} description={profile.description} />
          <Link to="/profil" className="inline-flex items-center gap-2 rounded-sm text-[13px] font-semibold text-[#0D6F6B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D6F6B]">
            Selengkapnya tentang profil padukuhan <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[#D8E4DF] bg-[#F1F3EF] p-2 shadow-[0_18px_45px_rgba(23,74,112,0.10)]">
          <img src={profile.aboutImageUrl} alt={`Tentang ${profile.name}`} className="h-auto max-h-[480px] w-full rounded-2xl object-contain" />
        </div>
      </div>
    </section>
  );
}
