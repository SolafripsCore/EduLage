"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Flame } from "lucide-react";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { programmes } from "@/data/programmes";
import type { Programme } from "@/data/types";

type Pathway = {
  label: string;
  level?: Programme["level"];
};

const pathways: Pathway[] = [
  { label: "Featured" },
  { label: "Bachelor’s degrees", level: "Undergraduate" },
  { label: "Master’s & postgraduate", level: "Postgraduate" },
  { label: "Doctoral programmes", level: "Doctoral" },
  { label: "Professional programmes", level: "Professional" },
];

function spreadByInstitution(items: Programme[]) {
  const seen = new Set<string>();
  const firstPass = items.filter((programme) => {
    if (seen.has(programme.institutionId)) return false;
    seen.add(programme.institutionId);
    return true;
  });
  return [...firstPass, ...items.filter((programme) => !firstPass.includes(programme))];
}

export function ProgrammeDiscoveryShowcase() {
  const [activePathway, setActivePathway] = useState("Featured");
  const [activeDiscipline, setActiveDiscipline] = useState("All disciplines");
  const railRef = useRef<HTMLDivElement>(null);
  const pathway = pathways.find((item) => item.label === activePathway) ?? pathways[0];

  const pathwayProgrammes = useMemo(() => {
    const pool = pathway.level
      ? programmes.filter((programme) => programme.level === pathway.level)
      : [...programmes.filter((programme) => programme.trending), ...programmes.filter((programme) => !programme.trending)];
    return spreadByInstitution(pool);
  }, [pathway.level]);

  const disciplineOptions = useMemo(() => {
    const counts = new Map<string, number>();
    pathwayProgrammes.forEach((programme) => counts.set(programme.discipline, (counts.get(programme.discipline) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 9);
  }, [pathwayProgrammes]);

  const visibleProgrammes = useMemo(() => {
    const filtered = activeDiscipline === "All disciplines"
      ? pathwayProgrammes
      : pathwayProgrammes.filter((programme) => programme.discipline === activeDiscipline);
    return filtered.slice(0, 8);
  }, [activeDiscipline, pathwayProgrammes]);

  const selectPathway = (label: string) => {
    setActivePathway(label);
    setActiveDiscipline("All disciplines");
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollRail = (direction: -1 | 1) => {
    railRef.current?.scrollBy({ left: direction * Math.max(300, railRef.current.clientWidth * 0.82), behavior: "smooth" });
  };

  const catalogueHref = pathway.level
    ? `/programmes?level=${encodeURIComponent(pathway.level)}${activeDiscipline !== "All disciplines" ? `&discipline=${encodeURIComponent(activeDiscipline)}` : ""}`
    : activeDiscipline !== "All disciplines"
      ? `/programmes?discipline=${encodeURIComponent(activeDiscipline)}`
      : "/programmes";

  return <section className="overflow-hidden bg-surface py-20 md:py-24" aria-labelledby="programme-discovery-title">
    <div className="container-page">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="section-kicker flex items-center gap-2"><Flame size={16} aria-hidden />Programme discovery</p>
          <h2 id="programme-discovery-title" className="section-title">Explore programmes and courses.</h2>
          <p className="section-lead">Navigate by academic pathway and discipline, then compare the qualification, institution, study format, duration, tuition and next intake.</p>
        </div>
        <Link href="/programmes" className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600">Advanced search & filters <ArrowRight size={16}/></Link>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm" role="tablist" aria-label="Programme pathways">
        <div className="flex min-w-max p-1.5">
          {pathways.map((item) => {
            const active = item.label === activePathway;
            const count = item.level ? programmes.filter((programme) => programme.level === item.level).length : programmes.length;
            return <button key={item.label} type="button" role="tab" aria-selected={active} onClick={() => selectPathway(item.label)} className={`min-h-14 border-b-2 px-5 text-left text-sm font-bold transition md:px-7 ${active ? "border-teal-500 bg-navy-800 text-white shadow-sm" : "border-transparent text-ink-600 hover:bg-surface hover:text-navy-800"}`}>
              <span>{item.label}</span><span className={`ml-2 text-[11px] ${active ? "text-teal-300" : "text-ink-400"}`}>{count}</span>
            </button>;
          })}
        </div>
      </div>

      <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-2" aria-label="Filter programmes by discipline">
        <button type="button" onClick={() => setActiveDiscipline("All disciplines")} className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-bold transition ${activeDiscipline === "All disciplines" ? "bg-teal-600 text-white shadow-md" : "border border-line bg-white text-navy-800 hover:border-teal-500"}`}>All disciplines</button>
        {disciplineOptions.map(([discipline, count]) => <button key={discipline} type="button" onClick={() => setActiveDiscipline(discipline)} className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-bold transition ${activeDiscipline === discipline ? "bg-teal-600 text-white shadow-md" : "border border-line bg-white text-navy-800 hover:border-teal-500"}`}>{discipline} <span className={activeDiscipline === discipline ? "text-white/70" : "text-ink-400"}>{count}</span></button>)}
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-6">
        <div><p className="text-sm font-bold text-navy-800">{activeDiscipline === "All disciplines" ? activePathway : activeDiscipline}</p><p className="mt-1 text-xs text-ink-500">Showing {visibleProgrammes.length} of {activeDiscipline === "All disciplines" ? pathwayProgrammes.length : pathwayProgrammes.filter((item) => item.discipline === activeDiscipline).length} available listings</p></div>
        <div className="hidden items-center gap-2 sm:flex">
          <button type="button" onClick={() => scrollRail(-1)} className="grid size-11 place-items-center rounded-full border border-line bg-white text-navy-800 transition hover:border-teal-500 hover:text-teal-600" aria-label="Previous programmes"><ArrowLeft size={18}/></button>
          <button type="button" onClick={() => scrollRail(1)} className="grid size-11 place-items-center rounded-full bg-navy-800 text-white transition hover:bg-teal-600" aria-label="Next programmes"><ArrowRight size={18}/></button>
        </div>
      </div>

      <div ref={railRef} className="mt-6 grid snap-x snap-mandatory auto-cols-[88%] grid-flow-col gap-5 overflow-x-auto pb-5 sm:auto-cols-[48%] lg:auto-cols-[32%] xl:auto-cols-[29%]" aria-live="polite">
        {visibleProgrammes.map((programme, index) => <div key={programme.id} className="snap-start"><ProgrammeCard programme={programme} priority={index < 3}/></div>)}
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-500/10 text-teal-600"><BookOpen size={19}/></span><div><p className="text-sm font-bold text-navy-800">Need a more precise match?</p><p className="mt-1 text-xs leading-5 text-ink-600">Use the complete catalogue to filter by institution, country, credential, language, schedule and delivery mode.</p></div></div>
        <Link href={catalogueHref} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-navy-800 px-5 text-sm font-bold text-white transition hover:bg-teal-600">View matching programmes <ArrowRight size={16}/></Link>
      </div>
    </div>
  </section>;
}
