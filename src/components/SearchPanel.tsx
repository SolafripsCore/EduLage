"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const quickFilters = ["Undergraduate", "Postgraduate", "Professional Certificate", "Fully online", "Available at an OEC"];

export function SearchPanel() {
  const [query, setQuery] = useState("");
  return <div>
    <form action="/programmes" className="grid gap-2 rounded-lg bg-white p-3 shadow-lg md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <label className="sr-only" htmlFor="programme-search">Search programmes, disciplines, or institutions</label>
      <input id="programme-search" name="query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search programmes, disciplines, or institutions" className="min-h-12 rounded-md border border-line px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-500" />
      <label className="sr-only" htmlFor="discipline-search">Discipline</label><select id="discipline-search" name="discipline" className="min-h-12 rounded-md border border-line bg-white px-3 text-sm text-ink-600"><option value="">Discipline</option><option>Business &amp; Management</option><option>Computer Science &amp; IT</option><option>Engineering</option><option>Health &amp; Medical Sciences</option><option>Education</option><option>Law</option></select>
      <label className="sr-only" htmlFor="country-search">Country</label><select id="country-search" name="country" className="min-h-12 rounded-md border border-line bg-white px-3 text-sm text-ink-600"><option value="">Country</option><option>Nigeria</option><option>Kenya</option><option>Rwanda</option><option>Botswana</option><option>Netherlands</option><option>New Zealand</option></select>
      <label className="sr-only" htmlFor="credential-search">Credential</label><select id="credential-search" name="credential" className="min-h-12 rounded-md border border-line bg-white px-3 text-sm text-ink-600"><option value="">Credential</option><option>BSc</option><option>MSc</option><option>PGD</option><option>Professional Certificate</option></select>
      <button className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-navy-800 px-6 text-sm font-semibold text-white hover:bg-navy-700"><Search size={17} />Search</button>
    </form>
    <div className="mt-4 flex flex-wrap gap-2">{quickFilters.map((filter) => <a key={filter} href={`/programmes?query=${encodeURIComponent(filter)}`} className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-white/80 hover:border-teal-400 hover:text-white">{filter}</a>)}</div>
  </div>;
}
