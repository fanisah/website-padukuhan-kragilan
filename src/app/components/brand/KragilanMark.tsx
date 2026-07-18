type KragilanMarkProps = { className?: string; monochrome?: boolean; title?: string };

export default function KragilanMark({ className = "h-10 w-10", monochrome = false, title = "Lambang Padukuhan Kragilan" }: KragilanMarkProps) {
  const teal = monochrome ? "currentColor" : "#0D6F6B";
  const blue = monochrome ? "currentColor" : "#174A70";
  const yellow = monochrome ? "currentColor" : "#F6C343";
  const green = monochrome ? "currentColor" : "#9ABF3B";
  return <svg className={className} viewBox="0 0 64 64" role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true} fill="none">{title && <title>{title}</title>}<path d="M8 27 20 15h24l12 12-5 5-9-9H22l-9 9-5-5Z" fill={teal}/><path d="M17 27v18h7V29h16v16h7V27h-7v-5H24v5h-7Z" fill={blue}/><path d="M32 40c0-9 4-15 11-19-1 8-4 14-11 19Z" fill={green}/><path d="M32 40c0-7-3-12-9-15 1 7 4 12 9 15Z" fill={yellow}/><path d="M8 48c9-3 17-3 24 0s15 3 24 0" stroke={teal} strokeWidth="4" strokeLinecap="round"/><path d="M12 56c7-2 14-2 20 0s13 2 20 0" stroke={blue} strokeWidth="3" strokeLinecap="round" opacity=".82"/></svg>;
}
