import KragilanMark from "./KragilanMark";
import { usePublicProfile } from "../../context/PublicProfileContext";

type KragilanLogoProps = { className?: string; inverse?: boolean; compact?: boolean };

export default function KragilanLogo({ className = "", inverse = false, compact = false }: KragilanLogoProps) {
  const profile = usePublicProfile();
  return <div className={`inline-flex min-w-0 items-center gap-2.5 ${className}`} role="img" aria-label="Padukuhan Kragilan">
    {profile.logoUrl
      ? <img src={profile.logoUrl} alt="" className={`${compact ? "h-9 w-9" : "h-10 w-10"} shrink-0 object-contain`} />
      : <KragilanMark className={`${compact ? "h-9 w-9" : "h-10 w-10"} shrink-0`} title="" />}
    <span className={`${compact ? "text-[13px]" : "text-[15px] sm:text-[16px]"} whitespace-nowrap font-extrabold tracking-[-0.025em] ${inverse ? "text-[#FFF9EC]" : "text-[#174A70]"}`} aria-hidden="true">Padukuhan Kragilan</span>
  </div>;
}
