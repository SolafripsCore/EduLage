"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export type HelpEntry = { q: string; a: string; group: string };

export function HelpCenter({ entries }: { entries: HelpEntry[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const groups = useMemo(() => ["All", ...Array.from(new Set(entries.map((e) => e.group)))], [entries]);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => (group === "All" || e.group === group) && (!q || `${e.q} ${e.a}`.toLowerCase().includes(q)));
  }, [entries, query, group]);
  const byGroup = useMemo(() => {
    const m = new Map<string, HelpEntry[]>();
    shown.forEach((e) => m.set(e.group, [...(m.get(e.group) ?? []), e]));
    return Array.from(m.entries());
  }, [shown]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search help articles</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search help, e.g. “refund”, “certificate”, “sign in”" className="min-h-12 w-full rounded-md border border-line bg-white pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" />
        </label>
        <div role="tablist" aria-label="Help topics" className="flex flex-wrap gap-2">
          {groups.map((g) => <button key={g} role="tab" aria-selected={group === g} type="button" onClick={() => setGroup(g)} className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold ${group === g ? "border-navy-800 bg-navy-800 text-white" : "border-line bg-white text-navy-800 hover:border-navy-800"}`}>{g}</button>)}
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-600" aria-live="polite">{shown.length} {shown.length === 1 ? "answer" : "answers"}{query && <> for “{query}”</>}{(query || group !== "All") && <> · <button type="button" className="font-semibold text-teal-700" onClick={() => { setQuery(""); setGroup("All"); }}>Reset</button></>}</p>
      {byGroup.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-line bg-white p-8 text-center"><p className="font-bold text-navy-800">No matching answers</p><p className="mt-2 text-sm text-ink-600">Try a different word, or <a href="/contact" className="font-semibold text-teal-700 underline">send us your question</a>.</p></div>}
      <div className="mt-8 space-y-10">
        {byGroup.map(([g, items]) => <section key={g} aria-labelledby={`help-${g}`}>
          <h2 id={`help-${g}`} className="text-xl font-bold text-navy-800">{g}</h2>
          <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {items.map((e) => <details key={e.q} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-800 [&::-webkit-details-marker]:hidden"><span>{e.q}</span><span aria-hidden="true" className="text-teal-700 transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-600">{e.a}</p>
            </details>)}
          </div>
        </section>)}
      </div>
    </div>
  );
}
