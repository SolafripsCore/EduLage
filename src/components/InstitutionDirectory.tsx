"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getInstitutions } from "@/lib/catalog";

export function InstitutionDirectory() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => getInstitutions(query), [query]);
  return <><label htmlFor="institution-query" className="sr-only">Search institutions</label><input id="institution-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by institution or country" className="mb-8 w-full rounded-md border border-line px-4 py-3 text-sm md:max-w-md" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((institution) => <Link key={institution.id} href={`/institutions/${institution.slug}`} className="flex min-h-40 flex-col justify-between rounded-lg border border-line bg-white p-5 hover:border-teal-500 hover:shadow-sm"><span className="flex size-11 items-center justify-center rounded-md bg-navy-800 text-xs font-bold text-white">{institution.shortName}</span><span><span className="block font-semibold text-navy-800">{institution.name}</span><span className="mt-1 block text-sm text-ink-400">{institution.country} · {institution.accreditationStatus}</span></span></Link>)}</div></>;
}
