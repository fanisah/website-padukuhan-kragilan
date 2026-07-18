import KragilanMark from "./KragilanMark";

type KragilanLogoProps = { className?: string; inverse?: boolean; compact?: boolean };

export default function KragilanLogo({ className = "", inverse = false, compact = false }: KragilanLogoProps) {
  if (compact) return <KragilanMark className={`h-10 w-10 ${className}`} title="Padukuhan Kragilan" />;
  return <div className={`inline-flex items-center gap-3 ${className}`} role="img" aria-label="Padukuhan Kragilan"><KragilanMark className="h-10 w-10 shrink-0" title=""/><span className={`leading-none ${inverse ? "text-[#FFF9EC]" : "text-[#174A70]"}`} aria-hidden="true"><span className="block text-[9px] font-bold uppercase tracking-[0.22em] opacity-70">Padukuhan</span><span className="mt-1 block text-[17px] font-extrabold tracking-[-0.025em]">Kragilan</span></span></div>;
}
