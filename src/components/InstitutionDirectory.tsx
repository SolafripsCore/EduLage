"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { getInstitutions } from "@/lib/catalog";

export function InstitutionDirectory() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => getInstitutions(query), [query]);
  const grouped = useMemo(() => items.reduce<Record<string, typeof items>>((groups, institution) => {
    (groups[institution.region] ??= []).push(institution);
    return groups;
  }, {}), [items]);

  return <>
    <label htmlFor="institution-query" className="sr-only">Search institutions</label>
    <input id="institution-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by institution or country" className="mb-10 w-full rounded-md border border-line px-4 py-3 text-sm md:max-w-md" />
    <div className="space-y-12">
      {Object.entries(grouped).map(([region, regionItems]) => <section key={region} aria-labelledby={`region-${region}`}>
        <div className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
          <h2 id={`region-${region}`} className="text-xl font-bold text-navy-800">{region}</h2>
          <span className="text-xs text-ink-400">{regionItems.length} {regionItems.length === 1 ? "institution" : "institutions"}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regionItems.map((institution) => <Link key={institution.id} href={`/institutions/${institution.slug}`} className="flex min-h-48 flex-col justify-between overflow-hidden rounded-lg border border-line bg-white hover:border-teal-500 hover:shadow-sm">
            <div className="relative h-32 w-full">
              <Image src={institution.campusImage} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <span className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center overflow-hidden rounded-md border border-line bg-white">
                  <Image src={institution.logo} alt={`${institution.shortName} mark`} width={40} height={40} className="size-9 object-contain" />
                </span>
                <span className="text-xs font-semibold text-teal-600">{institution.tenantStatus === "active" ? "Active tenant" : "Provisional tenant"}</span>
              </span>
              <span className="mt-5">
                <span className="block font-semibold leading-5 text-navy-800">{institution.name}</span>
                <span className="mt-1 block text-sm text-ink-600">{institution.city}, {institution.country}</span>
                <span className="mt-3 block text-xs text-ink-600">{institution.accreditationBody} · {institution.accreditationStatus}</span>
              </span>
            </div>
          </Link>)}
        </div>
      </section>)}
    </div>
  </>;
}
