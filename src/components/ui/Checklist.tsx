import { Check } from "lucide-react";

export function Checklist({ items, light = false }: { items: string[]; light?: boolean }) {
  return <ul className="space-y-3">{items.map((item) => <li key={item} className={`flex items-start gap-3 text-sm leading-6 ${light ? "text-white/80" : "text-ink-600"}`}><span className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-full ${light ? "bg-teal-400 text-navy-900" : "bg-teal-500/15 text-teal-600"}`}><Check size={11} strokeWidth={3} /></span><span>{item}</span></li>)}</ul>;
}
