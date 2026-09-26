import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Institution } from "@/data/types";

const buttonClass =
  "mt-6 flex items-center justify-center gap-2 rounded-md bg-navy-800 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

export function AdmissionsCta({ institution }: { institution: Institution }) {
  if (!institution.admissionsPortalUrl) {
    return (
      <>
        <Link href="/contact" className={buttonClass}>Request admissions guidance</Link>
        <p className="mt-4 text-xs leading-5 text-ink-400">
          The official institutional application link is published after it has been confirmed by {institution.name}. Admission decisions remain solely with the institution.
        </p>
      </>
    );
  }
  return (
    <>
      <a href={institution.admissionsPortalUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        Apply at {institution.shortName}
        <ExternalLink size={16} aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <p className="mt-4 text-xs leading-5 text-ink-400">
        You will leave EduLage and apply on {institution.name}&apos;s official admissions portal. Admission decisions remain solely with the institution.
      </p>
    </>
  );
}
