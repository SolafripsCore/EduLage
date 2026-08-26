"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProgrammes } from "@/lib/catalog";
import { disciplines } from "@/data/disciplines";
import type { Credential, DeliveryMode, StudyLevel } from "@/data/types";
import { ProgrammeCard } from "./ProgrammeCard";

const credentials: Credential[] = ["BSc", "BEng", "LLB", "MSc", "MBA", "MPH", "PhD", "PGD", "Professional Certificate"];
const levels: StudyLevel[] = ["Undergraduate", "Postgraduate", "Doctoral", "Professional"];
const modes: DeliveryMode[] = ["Fully online", "Online + OEC exams"];

export function ProgrammesBrowser() {
  const searchParams = useSearchParams();
  const urlValues = useMemo(() => ({
    discipline: searchParams.get("discipline") ?? "",
    credential: searchParams.get("credential") ?? "",
    level: searchParams.get("level") ?? "",
    mode: searchParams.get("mode") ?? "",
    query: searchParams.get("q") ?? searchParams.get("query") ?? "",
  }), [searchParams]);
  const [discipline, setDiscipline] = useState("");
  const [credential, setCredential] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    setDiscipline(urlValues.discipline);
    setCredential(urlValues.credential);
    setLevel(urlValues.level);
    setMode(urlValues.mode);
    setQuery(urlValues.query);
  }, [urlValues]);
  const results = useMemo(() => getProgrammes({ discipline: discipline || undefined, credential: credential as Credential || undefined, level: level as StudyLevel || undefined, deliveryMode: mode as DeliveryMode || undefined, query: query || undefined }), [discipline, credential, level, mode, query]);
  return <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
    <aside className="card-hover rounded-xl border border-line bg-white p-5 lg:h-fit"><div className="flex items-center justify-between"><h2 className="font-bold text-navy-800">Filter programmes</h2><button className="rounded-sm text-xs text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500" onClick={() => { setDiscipline(""); setCredential(""); setLevel(""); setMode(""); setQuery(""); }}>Clear</button></div><label className="mt-6 block text-xs font-semibold text-ink-600" htmlFor="programme-query">Search</label><input id="programme-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search catalogue" className="mt-2 min-h-11 w-full rounded-md border border-line px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" /><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="discipline-filter">Discipline</label><select id="discipline-filter" value={discipline} onChange={(event) => setDiscipline(event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All disciplines</option>{disciplines.map((item) => <option key={item.name}>{item.name}</option>)}</select><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="level-filter">Level</label><select id="level-filter" value={level} onChange={(event) => setLevel(event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All levels</option>{levels.map((item) => <option key={item}>{item}</option>)}</select><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="credential-filter">Credential</label><select id="credential-filter" value={credential} onChange={(event) => setCredential(event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All credentials</option>{credentials.map((item) => <option key={item}>{item}</option>)}</select><label className="mt-5 block text-xs font-semibold text-ink-600" htmlFor="mode-filter">Delivery mode</label><select id="mode-filter" value={mode} onChange={(event) => setMode(event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option value="">All modes</option>{modes.map((item) => <option key={item}>{item}</option>)}</select></aside>
    <div><div className="mb-5 flex items-center justify-between"><p className="text-sm text-ink-600"><strong className="tabular-nums text-navy-800">{results.length}</strong> {results.length === 1 ? "programme" : "programmes"}</p><label className="flex items-center gap-2 text-sm text-ink-600" htmlFor="sort">Sort by<select id="sort" className="rounded-md border border-line bg-white px-2 py-1.5 text-xs focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"><option>Relevance</option><option>Recently added</option></select></label></div>{results.length ? <div className="grid gap-4 md:grid-cols-2">{results.map((programme, index) => <ProgrammeCard key={programme.id} programme={programme} priority={index === 0} />)}</div> : <div className="card-hover rounded-xl border border-line p-10 text-center"><h2 className="font-bold text-navy-800">No programmes match these filters</h2><p className="mt-2 text-sm text-ink-600">Try a different discipline or clear the filters.</p></div>}</div>
  </div>;
}
