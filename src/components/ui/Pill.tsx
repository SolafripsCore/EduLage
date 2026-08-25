import type { ReactNode } from "react";

export function Pill({ children, accent = false, image = false }: { children: ReactNode; accent?: boolean; image?: boolean }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${image ? "border-line bg-white text-navy-800 shadow-sm" : accent ? "border-teal-500/30 bg-teal-500/10 text-teal-600" : "border-line bg-surface text-ink-600"}`}>{children}</span>;
}
