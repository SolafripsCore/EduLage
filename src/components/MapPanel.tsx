export function MapPanel() {
  return <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-navy-700 bg-navy-800 p-5">
    <svg viewBox="0 0 520 340" className="absolute inset-0 h-full w-full opacity-70" aria-label="Illustrative network map of Open Education Centers" role="img">
      <path d="M16 110C74 77 111 112 153 93S232 53 278 86s70 3 113 18 59 37 113 24M10 184c65-39 107 32 166-8s72-31 122 3 80-13 143 15M44 272c46-46 97 2 141-20s93-42 140 7 91 6 155 16" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
      <path d="M100 22c-30 63-33 114 4 161s27 99-7 143M214 8c-21 60-23 122 5 166s18 105-7 158M340 7c-16 66-10 118 17 168s13 101-8 152M440 26c-13 51-5 103 18 146s14 92-2 141" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/15" />
    </svg>
    {[["18%", "48%"], ["38%", "31%"], ["56%", "60%"], ["76%", "37%"], ["84%", "69%"], ["63%", "22%"]].map(([left, top], index) => <span key={index} className="absolute size-3 rounded-full bg-teal-400 shadow-[0_0_0_8px] shadow-teal-400/10" style={{ left, top }} />)}
    <div className="absolute bottom-5 left-5 flex gap-2 text-xs text-white/65"><span className="font-semibold text-white">6 accredited centers</span><span>·</span><span>4 countries</span></div>
  </div>;
}
