"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Scale } from "lucide-react";
import { getProgrammes } from "@/lib/catalog";
import { disciplines } from "@/data/disciplines";
import type {
  Credential,
  DeliveryMode,
  StudyLevel,
  StudyMode,
} from "@/data/types";
import { institutions, institutionById } from "@/data/institutions";
import { programmes } from "@/data/programmes";
import { ProgrammeCard } from "./ProgrammeCard";

const levels: StudyLevel[] = [
  "Undergraduate",
  "Postgraduate",
  "Doctoral",
  "Professional",
];
const credentials: Credential[] = [
  "BSc",
  "BEng",
  "LLB",
  "MSc",
  "MBA",
  "MPH",
  "PhD",
  "PGD",
  "Professional Certificate",
];
const countries = [...new Set(institutions.map((i) => i.country))].sort();
type Filters = {
  query: string;
  level: string;
  discipline: string;
  credential: string;
  country: string;
  language: string;
  studyMode: string;
  mode: string;
  institutionId: string;
};
const empty: Filters = {
  query: "",
  level: "",
  discipline: "",
  credential: "",
  country: "",
  language: "",
  studyMode: "",
  mode: "",
  institutionId: "",
};
const labels: Record<keyof Filters, string> = {
  query: "Search",
  level: "Study level",
  discipline: "Subject",
  credential: "Qualification",
  country: "Country",
  language: "Language",
  studyMode: "Schedule",
  mode: "Delivery",
  institutionId: "Institution",
};
const displayMode = (mode: string) => mode.replace("OEC", "GOE Center");

export function ProgrammesBrowser() {
  const params = useSearchParams();
  const key = params.toString();
  const urlFilters: Filters = {
    ...empty,
    query: params.get("q") ?? params.get("query") ?? "",
    level: params.get("level") ?? "",
    discipline: params.get("discipline") ?? "",
    credential: params.get("credential") ?? "",
    country: params.get("country") ?? "",
    language: params.get("language") ?? "",
    studyMode: params.get("studyMode") ?? "",
    mode: params.get("mode") ?? params.get("deliveryMode") ?? "",
    institutionId: params.get("institution") ?? "",
  };
  const [local, setLocal] = useState<{ key: string; values: Filters } | null>(
    null,
  );
  const filters = local?.key === key ? local.values : urlFilters;
  const [count, setCount] = useState(9);
  const [sort, setSort] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);
  const comparisonRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = comparisonRef.current;
    if (comparing && !dialog?.open) dialog?.showModal();
    else if (!comparing && dialog?.open) dialog.close();
  }, [comparing]);
  const update = (name: keyof Filters, value: string) => {
    setLocal({ key, values: { ...filters, [name]: value } });
    setCount(9);
  };
  const reset = () => {
    setLocal({ key, values: { ...empty } });
    setCount(9);
  };
  const results = useMemo(() => {
    const items = getProgrammes({
      query: filters.query.trim() || undefined,
      level: (filters.level as StudyLevel) || undefined,
      discipline: filters.discipline || undefined,
      credential: (filters.credential as Credential) || undefined,
      country: filters.country || undefined,
      language: filters.language || undefined,
      studyMode: (filters.studyMode as StudyMode) || undefined,
      deliveryMode: (filters.mode as DeliveryMode) || undefined,
      institutionId: filters.institutionId || undefined,
    });
    return [...items].sort((a, b) =>
      sort === "duration"
        ? a.durationMonths - b.durationMonths
        : sort === "title"
          ? a.title.localeCompare(b.title)
          : Number(Boolean(b.trending)) - Number(Boolean(a.trending)),
    );
  }, [filters, sort]);
  const active = (Object.entries(filters) as [keyof Filters, string][]).filter(
    ([, v]) => v,
  );
  const compared = selected
    .map((id) => programmes.find((p) => p.id === id)!)
    .filter(Boolean);
  const toggleCompare = (id: string) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : current.length < 3
          ? [...current, id]
          : current,
    );
  const filterSelect = (
    name: keyof Filters,
    options: { value: string; label: string }[],
  ) => (
    <label className="catalog-filter" key={name}>
      {labels[name]}
      <select
        value={filters[name]}
        onChange={(e) => update(name, e.target.value)}
      >
        <option value="">All {labels[name].toLowerCase()} options</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
  const options = (values: string[]) =>
    values.map((value) => ({ value, label: displayMode(value) }));

  return (
    <div className="catalog-app">
      <div className="catalog-search">
        <Search size={23} />
        <label className="sr-only" htmlFor="catalog-query">
          Search programmes, subjects or institutions
        </label>
        <input
          id="catalog-query"
          value={filters.query}
          onChange={(e) => update("query", e.target.value)}
          placeholder="Search programmes, subjects or institutions"
          type="search"
        />
        <button
          className="catalog-filter-toggle"
          aria-expanded={filtersOpen}
          aria-controls="catalog-filters"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={18} />
          Filters
          {active.filter(([n]) => n !== "query").length > 0 && (
            <span>{active.filter(([n]) => n !== "query").length}</span>
          )}
        </button>
      </div>
      <div
        className="catalog-levels"
        role="group"
        aria-label="Filter by study level"
      >
        {["", ...levels].map((level) => (
          <button
            key={level}
            aria-pressed={filters.level === level}
            onClick={() => update("level", level)}
          >
            {level || "All programmes"}
          </button>
        ))}
      </div>
      <div className="catalog-layout">
        <aside
          id="catalog-filters"
          className={`catalog-filters ${filtersOpen ? "is-open" : ""}`}
        >
          <div className="catalog-filter-heading">
            <h2>Refine your search</h2>
            <button onClick={reset}>Reset</button>
          </div>
          {filterSelect("discipline", options(disciplines.map((d) => d.name)))}
          {filterSelect(
            "institutionId",
            institutions.map((i) => ({ value: i.id, label: i.name })),
          )}
          {filterSelect("credential", options(credentials))}
          {filterSelect("country", options(countries))}
          {filterSelect(
            "mode",
            options(["Fully online", "Online + OEC exams"]),
          )}
          {filterSelect("studyMode", options(["Full-time", "Part-time"]))}
          {filterSelect("language", options(["English", "French", "Mandarin"]))}
          <button
            className="catalog-filter-done"
            onClick={() => setFiltersOpen(false)}
          >
            Show {results.length} results
          </button>
          <div className="catalog-help">
            <h3>Need a little guidance?</h3>
            <p>Understand qualifications and study formats before choosing.</p>
            <Link href="/study-types">Explore study options</Link>
          </div>
        </aside>
        <div className="catalog-results">
          <div className="catalog-result-bar">
            <p role="status" aria-live="polite">
              <strong>{results.length}</strong>{" "}
              {results.length === 1 ? "programme" : "programmes"} to explore
            </p>
            <label>
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="duration">Shortest duration</option>
                <option value="title">Programme name</option>
              </select>
            </label>
          </div>
          {active.length > 0 && (
            <div className="catalog-active" aria-label="Active filters">
              {active.map(([name, value]) => (
                <button
                  key={name}
                  onClick={() => update(name, "")}
                  aria-label={`Remove ${labels[name]} filter: ${value}`}
                >
                  {name === "institutionId"
                    ? (institutionById.get(value)?.shortName ?? value)
                    : displayMode(value)}
                  <X size={13} />
                </button>
              ))}
              <button onClick={reset}>Clear all</button>
            </div>
          )}
          <p className="catalog-notice">
            Explore the catalogue preview. Confirm institutional participation,
            current fees and availability before applying.
          </p>
          {results.length ? (
            <>
              <div className="catalog-grid">
                {results.slice(0, count).map((p) => (
                  <div className="catalog-card-wrap" key={p.id}>
                    <ProgrammeCard programme={p} />
                    <label className="catalog-compare-check">
                      <input
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        disabled={
                          selected.length >= 3 && !selected.includes(p.id)
                        }
                        onChange={() => toggleCompare(p.id)}
                      />
                      Compare<span className="sr-only"> {p.title}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="catalog-pagination">
                <p>
                  Showing {Math.min(count, results.length)} of {results.length}{" "}
                  programmes
                </p>
                {count < results.length && (
                  <button onClick={() => setCount((c) => c + 9)}>
                    Show more programmes
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="catalog-empty">
              <Search size={35} />
              <h2>No matching programmes yet</h2>
              <p>
                Try a broader subject or remove a filter to see more options.
              </p>
              <button onClick={reset}>Reset filters</button>
            </div>
          )}
        </div>
      </div>
      {selected.length > 0 && (
        <div className="catalog-compare-bar">
          <div>
            <Scale size={21} />
            <span>
              <strong>{selected.length} of 3</strong> selected for comparison
            </span>
          </div>
          <button
            disabled={selected.length < 2}
            onClick={() => setComparing(true)}
          >
            Compare programmes
          </button>
          <button
            className="catalog-clear"
            onClick={() => setSelected([])}
            aria-label="Clear comparison"
          >
            <X size={20} />
          </button>
        </div>
      )}
      <dialog
        ref={comparisonRef}
        className="catalog-comparison"
        aria-labelledby="comparison-title"
        onClose={() => setComparing(false)}
      >
        <div className="catalog-comparison-head">
          <h2 id="comparison-title">Your programmes, side by side</h2>
          <button
            onClick={() => setComparing(false)}
            aria-label="Close programme comparison"
          >
            <X />
          </button>
        </div>
        <p>
          Compare the listed information. Sample programme details require
          confirmation.
        </p>
        <div
          className="catalog-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Scrollable programme comparison table"
        >
          <table>
            <caption className="sr-only">
              Comparison of selected programmes
            </caption>
            <thead>
              <tr>
                <th scope="col">Programme details</th>
                {compared.map((p) => (
                  <th scope="col" key={p.id}>
                    <Link href={`/programmes/${p.slug}`}>{p.title}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Institution",
                  (p: (typeof compared)[number]) =>
                    institutionById.get(p.institutionId)?.name,
                ],
                [
                  "Qualification",
                  (p: (typeof compared)[number]) => p.credential,
                ],
                [
                  "Duration",
                  (p: (typeof compared)[number]) =>
                    `${p.durationMonths} months`,
                ],
                [
                  "Study format",
                  (p: (typeof compared)[number]) =>
                    `${p.studyMode} · ${displayMode(p.deliveryMode)}`,
                ],
                ["Language", (p: (typeof compared)[number]) => p.language],
                [
                  "Listed tuition",
                  (p: (typeof compared)[number]) =>
                    `${p.tuitionCurrency} ${p.tuitionFrom.toLocaleString("en-GB")} / ${p.tuitionPeriod}`,
                ],
                [
                  "Listed intake",
                  (p: (typeof compared)[number]) => p.nextIntake,
                ],
              ].map(([label, get]) => (
                <tr key={label as string}>
                  <th scope="row">{label as string}</th>
                  {compared.map((p) => (
                    <td key={p.id}>
                      {(get as (p: (typeof compared)[number]) => string)(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="catalog-comparison-close"
          onClick={() => setComparing(false)}
        >
          Return to results
        </button>
      </dialog>
    </div>
  );
}
