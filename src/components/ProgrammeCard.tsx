import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock3, MapPin, Monitor } from "lucide-react";
import type { Programme } from "@/data/types";
import { institutionById } from "@/data/institutions";
import { Pill } from "./ui/Pill";

export function ProgrammeCard({ programme, priority = false }: { programme: Programme; priority?: boolean }) {
  const institution = institutionById.get(programme.institutionId);
  if (!institution) return null;
  const tuition = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: programme.tuitionCurrency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(programme.tuitionFrom);
  return <Link href={`/programmes/${programme.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md">
    <div className="relative aspect-video overflow-visible bg-navy-800">
      <Image src={programme.image} alt="" fill priority={priority} sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover" />
      <div className="image-scrim absolute inset-0" />
      <div className="absolute right-3 top-3"><Pill accent>{programme.credential}</Pill></div>
      <span className="absolute -bottom-5 left-4 flex size-11 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-sm"><Image src={institution.logo} alt="" width={36} height={36} className="size-full object-contain" /></span>
    </div>
    <div className="flex flex-1 flex-col p-5 pt-8">
      <p className="text-xs font-semibold text-teal-600">{institution.name}</p>
      <h3 className="line-clamp-2 mt-2 min-h-12 text-[17px] font-semibold leading-6 text-navy-800">{programme.title}</h3>
      <div className="mt-4 space-y-2 text-xs text-ink-600">
        <p className="flex items-center gap-2"><MapPin size={14} className="shrink-0 text-ink-400" />{institution.city}, {institution.country}</p>
        <p className="flex items-center gap-2"><Clock3 size={14} className="shrink-0 text-ink-400" />{programme.durationMonths} months <span aria-hidden>·</span> {programme.studyMode}</p>
        <p className="flex items-center gap-2"><Monitor size={14} className="shrink-0 text-ink-400" />{programme.deliveryMode}</p>
        <p className="flex items-center gap-2"><CalendarDays size={14} className="shrink-0 text-ink-400" />Next intake: {programme.nextIntake}</p>
      </div>
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
        <div><p className="text-[11px] text-ink-400">Tuition from</p><p className="mt-1 text-sm font-semibold text-navy-800">{tuition} / {programme.tuitionPeriod}</p></div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-navy-800 group-hover:text-teal-600">View programme <span aria-hidden>→</span></span>
      </div>
    </div>
  </Link>;
}
