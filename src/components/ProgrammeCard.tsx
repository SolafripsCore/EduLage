import Link from "next/link";
import Image from "next/image";
import { Clock3, Monitor } from "lucide-react";
import type { Programme } from "@/data/types";
import { institutionById } from "@/data/institutions";
import { Pill } from "./ui/Pill";

export function ProgrammeCard({
  programme,
  priority = false,
  enrolmentLabel,
}: {
  programme: Programme;
  priority?: boolean;
  discovery?: boolean;
  enrolmentLabel?: string;
}) {
  const institution = institutionById.get(programme.institutionId);
  if (!institution) return null;
  const tuition = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: programme.tuitionCurrency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(programme.tuitionFrom);
  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="premium-programme-card"
    >
      <div className="premium-card-image">
        <Image
          src={programme.image}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span>{enrolmentLabel ?? programme.level}</span>
      </div>
      <div className="premium-card-content">
        <div className="premium-card-institution">
          <Image src={institution.logo} alt="" width={32} height={32} />
          <span>{institution.name}</span>
        </div>
        <p className="premium-card-credential">
          {programme.credential}
          {!programme.courseId && (
            <span className="ed-sample-label">Sample listing</span>
          )}
        </p>
        <h3>{programme.title}</h3>
        <div className="premium-card-facts">
          <span>
            <Clock3 size={15} />
            {programme.durationMonths} months
          </span>
          <span>{programme.studyMode}</span>
        </div>
        <p className="premium-card-delivery">
          <Monitor size={15} />
          {programme.deliveryMode.replace("OEC", "GOE Center")}
        </p>
        <div className="premium-card-bottom">
          <div>
            <span>Listed tuition from</span>
            <strong>{tuition}</strong>
            <small>per {programme.tuitionPeriod}</small>
          </div>
          <span className="premium-card-cta">View details</span>
        </div>
      </div>
    </Link>
  );
}

export function CompactProgrammeCard({ programme }: { programme: Programme }) {
  const institution = institutionById.get(programme.institutionId);
  if (!institution) return null;
  const tuition = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: programme.tuitionCurrency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(programme.tuitionFrom);
  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="group card-hover flex h-full gap-4 rounded-xl border border-line bg-white p-4 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:gap-5"
    >
      <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-lg bg-navy-800 sm:h-32 sm:w-40">
        <Image
          src={programme.image}
          alt={programme.title}
          fill
          sizes="160px"
          className="image-zoom object-cover"
        />
        <div className="image-scrim absolute inset-0" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-xs font-semibold text-teal-600">
          {institution.name}
        </p>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-5 text-navy-800 transition-colors duration-200 group-hover:text-teal-600">
          {programme.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Pill image>{programme.credential}</Pill>
          <span className="text-xs text-ink-600">
            {programme.durationMonths} months
          </span>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-xs text-ink-600">
          <span>{programme.deliveryMode}</span>
          <span className="font-semibold text-navy-800">From {tuition}</span>
        </div>
      </div>
    </Link>
  );
}
