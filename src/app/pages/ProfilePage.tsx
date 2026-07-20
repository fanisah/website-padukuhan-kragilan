import MainContent from "../components/layout/MainContent";
import { usePublicProfile } from "../context/PublicProfileContext";

export default function ProfilePage() {
  const profile = usePublicProfile();
  const missions = profile.mission.split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
  return <MainContent offsetHeader><section className="bg-[#FFF9EC] py-16 lg:py-20"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D6F6B]">Profil Padukuhan</p><h1 className="mt-3 text-3xl font-bold text-[#173F57] sm:text-4xl">Profil {profile.name}</h1><div className="mt-9 space-y-5"><Content title="Sejarah Padukuhan" value={profile.history}/><Content title="Visi" value={profile.vision}/><article className="rounded-2xl border border-[#D8E4DF] bg-white p-6 sm:p-8"><h2 className="text-xl font-bold text-[#173F57]">Misi</h2>{missions.length ? <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#5F6F72]">{missions.map((line,index)=><li key={`${line}-${index}`} className="flex gap-3"><span className="font-bold text-[#0D6F6B]">{index+1}.</span><span>{line.replace(/^[-•\d.)\s]+/,"")}</span></li>)}</ul>:<Empty/>}</article></div></div></section></MainContent>;
}
function Content({title,value}:{title:string;value:string}){return <article className="rounded-2xl border border-[#D8E4DF] bg-white p-6 sm:p-8"><h2 className="text-xl font-bold text-[#173F57]">{title}</h2>{value.trim()?<p className="mt-3 whitespace-pre-line text-[15px] leading-8 text-[#5F6F72]">{value}</p>:<Empty/>}</article>}
function Empty(){return <p className="mt-3 text-sm italic text-[#7C8C8A]">Informasi ini sedang disiapkan.</p>}
