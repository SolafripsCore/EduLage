"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { ArrowRight, BarChart3, Sparkles, TrendingUp } from "lucide-react";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { programmes } from "@/data/programmes";

type Field = {
  name: string;
  shortName: string;
  description: string;
  programmeIds: string[];
  href: string;
};

const fields: Field[] = [
  {
    name: "Artificial Intelligence & Machine Learning",
    shortName: "AI & Machine Learning",
    description: "Develop expertise in intelligent systems, applied machine learning, automation and responsible AI.",
    programmeIds: ["prog-002", "prog-026", "prog-021", "prog-049"],
    href: "/programmes?discipline=Data%20%26%20AI",
  },
  {
    name: "Data Science & Analytics",
    shortName: "Data Science & Analytics",
    description: "Build the analytical, computational and decision-making capabilities needed in data-driven organisations.",
    programmeIds: ["prog-001", "prog-019", "prog-035", "prog-029"],
    href: "/programmes?discipline=Data%20%26%20AI",
  },
  {
    name: "Computer Science & Information Technology",
    shortName: "Computer Science & IT",
    description: "Explore software engineering, computing systems, digital infrastructure and emerging technologies.",
    programmeIds: ["prog-017", "prog-025", "prog-003", "prog-027"],
    href: "/programmes?discipline=Computer%20Science%20%26%20IT",
  },
  {
    name: "Business, Management & Entrepreneurship",
    shortName: "Business & Management",
    description: "Strengthen leadership, enterprise, finance and strategic management capabilities for a changing economy.",
    programmeIds: ["prog-016", "prog-032", "prog-036", "prog-041"],
    href: "/programmes?discipline=Business%20%26%20Management",
  },
  {
    name: "Health & Medical Sciences",
    shortName: "Health & Medical Sciences",
    description: "Advance knowledge in public health, health systems, clinical data and community health practice.",
    programmeIds: ["prog-005", "prog-018", "prog-034", "prog-043"],
    href: "/programmes?discipline=Health%20%26%20Medical%20Sciences",
  },
  {
    name: "Sustainability & Climate Innovation",
    shortName: "Sustainability & Climate",
    description: "Prepare to address climate, energy, water and sustainable-development challenges across sectors.",
    programmeIds: ["prog-009", "prog-011", "prog-020", "prog-047"],
    href: "/programmes?discipline=Environment%20%26%20Sustainability",
  },
];

const programmeById = new Map(programmes.map((programme) => [programme.id, programme]));

export function HighDemandFields() {
  const [activeFieldName, setActiveFieldName] = useState(fields[0].name);
  const activeField = fields.find((field) => field.name === activeFieldName) ?? fields[0];
  const selectedProgrammes = activeField.programmeIds.flatMap((id) => {
    const programme = programmeById.get(id);
    return programme ? [programme] : [];
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const tabs = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
    const current = tabs.indexOf(event.currentTarget);
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next]?.focus();
    tabs[next]?.click();
  };

  return <section className="overflow-hidden bg-white py-14 md:py-20" aria-labelledby="high-demand-title">
    <div className="container-page">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="section-kicker flex items-center gap-2"><TrendingUp size={16} aria-hidden/>High-demand learning</p>
          <h2 id="high-demand-title" className="section-title">Explore high-demand fields.</h2>
          <p className="section-lead">Discover programmes and courses in rapidly growing fields shaping careers, industries and society worldwide.</p>
        </div>
        <div className="hidden items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 lg:flex"><BarChart3 size={20} className="text-teal-600"/><p className="max-w-52 text-xs leading-5 text-ink-600"><strong className="block text-navy-800">Curated for relevance</strong>Selected across qualification levels and institutions.</p></div>
      </div>

      <div className="relative mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:flex-wrap [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="High-demand fields">
          {fields.map((field) => {
            const active = field.name === activeField.name;
            return <button key={field.name} id={`field-tab-${field.shortName.replaceAll(" ", "-")}`} type="button" role="tab" aria-selected={active} aria-controls="high-demand-programmes" tabIndex={active ? 0 : -1} onKeyDown={handleKeyDown} onClick={() => setActiveFieldName(field.name)} className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${active ? "border-navy-800 bg-navy-800 text-white shadow-md" : "border-line bg-surface text-navy-800 hover:border-teal-500 hover:bg-white"}`}>{field.shortName}</button>;
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent md:hidden"/>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 border-y border-line py-5 sm:flex-row sm:items-center">
        <div><div className="flex items-center gap-2"><Sparkles size={17} className="text-teal-600"/><h3 className="text-lg font-bold text-navy-800">{activeField.name}</h3></div><p className="mt-2 max-w-3xl text-sm leading-6 text-ink-600">{activeField.description}</p></div>
        <span className="shrink-0 rounded-full bg-teal-500/10 px-3 py-1.5 text-xs font-bold text-teal-700">{selectedProgrammes.length} selected opportunities</span>
      </div>

      <div id="high-demand-programmes" role="tabpanel" aria-labelledby={`field-tab-${activeField.shortName.replaceAll(" ", "-")}`} className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {selectedProgrammes.map((programme, index) => <ProgrammeCard key={`${activeField.name}-${programme.id}`} programme={programme} priority={index < 2} discovery/>)}
      </div>

      <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy-900 px-6 py-5 text-white sm:flex-row sm:items-center">
        <div><p className="text-sm font-bold text-white">Continue exploring {activeField.shortName}</p><p className="mt-1 text-xs text-white/60">Compare additional qualifications, institutions, delivery formats and upcoming intakes.</p></div>
        <Link href={activeField.href} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-teal-500 px-5 text-sm font-bold text-navy-900 transition hover:bg-teal-400">Explore all programmes <ArrowRight size={16}/></Link>
      </div>
    </div>
  </section>;
}
