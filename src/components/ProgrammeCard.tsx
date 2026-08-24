import Link from "next/link";
import { Check } from "lucide-react";
import type { Programme } from "@/data/types";
import { institutionById } from "@/data/institutions";
import { Pill } from "./ui/Pill";

export function ProgrammeCard({ programme }: { programme: Programme }) {
  const institution = institutionById.get(programme.institutionId);
  if (!institution) return null;
  return <Link href={`/programmes/${programme.slug}`} className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md">
    <div className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-navy-800 text-xs font-bold text-white">{institution.shortName}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-navy-800">{institution.name}</p><p className="text-xs text-ink-400">{institution.country}</p></div></div>
    <h3 className="line-clamp-2 mt-5 min-h-12 text-[17px] font-semibold leading-6 text-navy-800">{programme.title}</h3>
    <div className="mt-4 flex flex-wrap gap-2"><Pill>{programme.credential}</Pill><Pill>{programme.deliveryMode}</Pill></div>
    <p className="mt-5 text-xs text-ink-400">{programme.durationMonths} months <span className="mx-1.5">·</span>{programme.studyMode} <span className="mx-1.5">·</span>{programme.language}</p>
    <div className="mt-auto flex items-center justify-between border-t border-line pt-4"><span className="flex items-center gap-1.5 text-xs font-medium text-teal-600"><span className="flex size-4 items-center justify-center rounded-full bg-teal-500/15"><Check size={11} strokeWidth={3} /></span>Accredited</span><span className="text-xs font-semibold text-navy-800 group-hover:text-teal-600">View programme <span aria-hidden>→</span></span></div>
  </Link>;
}
