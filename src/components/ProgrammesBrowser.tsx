"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProgrammes } from "@/lib/catalog";
import { disciplines } from "@/data/disciplines";
import type { Credential, DeliveryMode, StudyLevel } from "@/data/types";
import { ProgrammeCard } from "./ProgrammeCard";

const credentials: Credential[] = ["BSc", "BEng", "LLB", "MSc", "MBA", "MPH", "PhD", "PGD", "Professional Certificate"];
const levels: StudyLevel[] = ["Undergraduate", "Postgraduate", "Doctoral", "Professional"];
const modes: DeliveryMode[] = ["Fully online", "Online + OEC exams"];
type FilterValues = { discipline: string; credential: string; level: string; mode: string; query: string };

export function ProgrammesBrowser() {
  const searchParams = useSearchParams();
  const paramString = searchParams.toString();
  const urlValues = useMemo<FilterValues>(() => ({ discipline: searchParams.get("discipline") ?? "", credential: searchParams.get("credential") ?? "", level: searchParams.get("level") ?? "", mode: searchParams.get("mode") ?? "", query: searchParams.get("q") ?? searchParams.get("query") ?? "" }), [paramString, searchParams]);
  const [localValues, setLocalValues] = useState<{ key: string; values: FilterValues } | null>(null);
  const filters = localValues?.key === paramString ? localValues.values : urlValues;
  const updateFilter = (name: keyof FilterValues, value: string) => setLocalValues({ key: paramString, values: { ...filters, [name]: value } });
  const results = useMemo(() => getProgrammes({ discipline: filters.discipline || undefined, credential: filters.credential as Credential || undefined, level: filters.level as StudyLevel || undefined, deliveryMode: filters.mode as DeliveryMode || undefined, query: filters.query || undefined }), [filters]);
  return <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
    <aside className="card-hover rounded-xl border border-line bg-white p-5 lg:h-fit"><div className="flex items-center justify-between"><h2 className="font-bold text-navy-800">Filter programmes</h2><button className="rounded-sm text-xs text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500" onClick={() => setLocalValues({ key: paramString, values: { discipline: "", credential: "", level: "", mode: "", query: "" } })}>Clear</button></div><label className="mt-6 block text-xs font-semibold text-ink-600" htmlFor="programme-query">Search</label><input id="programme-query" value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder="Search catalogue" className="mt-2 min-h-11 w-full rounded-md border border-line px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" /><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="discipline-filter">Discipline</label><select id="discipline-filter" value={filters.discipline} onChange={(event) => updateFilter("discipline", event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All disciplines</option>{disciplines.map((item) => <option key={item.name}>{item.name}</option>)}</select><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="level-filter">Level</label><select id="level-filter" value={filters.level} onChange={(event) => updateFilter("level", event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All levels</option>{levels.map((item) => <option key={item}>{item}</option>)}</select><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="credential-filter">Credential</label><select id="credential-filter" value={filters.credential} onChange={(event) => updateFilter("credential", event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All credentials</option>{credentials.map((item) => <option key={item}>{item}</option>)}</select><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="mode-filter">Delivery mode</label><select id="mode-filter" value={filters.mode} onChange={(event) => updateFilter("mode", event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All modes</option>{modes.map((item) => <option key={item}>{item}</option>)}</select></aside>
  </div>;
}
