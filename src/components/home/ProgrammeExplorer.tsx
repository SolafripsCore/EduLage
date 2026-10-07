"use client";

import { CourseImage } from "../CourseImage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type KeyboardEvent } from "react";
import { BookOpen, Search, X, SlidersHorizontal } from "lucide-react";
import { programmes } from "@/data/programmes";
import { institutionById } from "@/data/institutions";
import {
  enrolUrl,
  priceLabel,
  type CatalogueCourse,
} from "@/lib/liveCatalogue";

const qualifications = [
  { id: "all", label: "All qualifications", awards: [] },
  {
    id: "bachelors",
    label: "Bachelor’s degrees",
    awards: ["BSc", "BEng", "LLB"],
  },
  { id: "masters", label: "Master’s degrees", awards: ["MSc", "MBA", "MPH"] },
  { id: "doctoral", label: "Doctoral degrees", awards: ["PhD"] },
  { id: "diplomas", label: "Postgraduate diplomas", awards: ["PGD"] },
  {
    id: "professional",
    label: "Professional certificates",
    awards: ["Professional Certificate"],
  },
  {
    id: "courses",
    label: "Short courses",
    awards: ["Certificate of completion"],
  },
];
export function ProgrammeExplorer({ courses }: { courses: CatalogueCourse[] }) {
  const params = useSearchParams();
  const qualification = qualifications.some(
    (q) => q.id === params.get("qualification"),
  )
    ? params.get("qualification")!
    : "all";
  const discipline = params.get("subject") || "";
  const query = params.get("search") || "";
  const limit = Math.max(6, Math.min(100, Number(params.get("shown")) || 6));
  function setDiscovery(updates: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [name, value] of Object.entries(updates)) {
      if (value) next.set(name, value);
      else next.delete(name);
    }
    window.history.replaceState(
      null,
      "",
      `/${next.size ? `?${next}` : ""}${window.location.hash}`,
    );
  }
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const entries = useMemo(
    () => [
      ...courses.map((c) => ({
        id: c.course_id,
        title: c.title,
        institution: c.institution_name,
        subject: "Subject not specified",
        award:
          c.classification === "professional"
            ? "Professional Certificate"
            : "Certificate of completion",
        image: c.image,
        format: "Online learning",
        duration: "Open course",
        price: priceLabel(c),
        href: enrolUrl(c),
        live: true,
      })),
      ...programmes
        .filter((p) => !courses.some((c) => c.course_id === p.courseId))
        .map((p) => ({
          id: p.id,
          title: p.title,
          institution: institutionById.get(p.institutionId)?.name ?? "",
          subject: p.discipline,
          award: p.credential,
          image: p.image,
          format: p.deliveryMode.replace("OEC", "GOE Center"),
          duration: `${p.durationMonths} months · ${p.studyMode}`,
          price: `${p.tuitionCurrency} ${p.tuitionFrom.toLocaleString("en-GB")} / ${p.tuitionPeriod}`,
          href: `/programmes/${p.slug}`,
          live: false,
        })),
    ],
    [courses],
  );
  const selected = qualifications.find((q) => q.id === qualification)!;
  const qualified = entries.filter(
    (e) => qualification === "all" || selected.awards.includes(e.award),
  );
  const subjects = [...new Set(qualified.map((e) => e.subject))].sort();
  const results = qualified.filter(
    (e) =>
      (!discipline || e.subject === discipline) &&
      (!query.trim() ||
        `${e.title} ${e.institution} ${e.subject}`
          .toLowerCase()
          .includes(query.trim().toLowerCase())),
  );
  function chooseQualification(id: string) {
    setDiscovery({
      qualification: id === "all" ? "" : id,
      subject: "",
      shown: "",
    });
  }
  function chooseSubject(subject: string) {
    setDiscovery({ subject, shown: "" });
    setSubjectsOpen(false);
  }
  function tabKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = qualifications.findIndex((q) => q.id === qualification);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? qualifications.length - 1
          : (current +
              (event.key === "ArrowRight" ? 1 : -1) +
              qualifications.length) %
            qualifications.length;
    chooseQualification(qualifications[next].id);
    const tabs =
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]',
      );
    tabs?.[next]?.focus();
  }
  return (
    <section className="ed-discovery" aria-labelledby="discovery-title">
      <div className="ed-wrap ed-section">
        <div className="ed-section-head">
          <div>
            <p className="ed-eyebrow">
              <SlidersHorizontal size={17} /> YOUR NEXT CHAPTER, BY DESIGN
            </p>
            <h2 id="discovery-title">
              Find your programme.
              <br />
              <em>Open your possibilities.</em>
            </h2>
            <p className="ed-discovery-lead">
              Choose a qualification, then explore the disciplines that interest
              you.
            </p>
          </div>
          <Link href="/programmes" className="ed-outline-btn">
            Full programme catalogue
          </Link>
        </div>
        <p className="ed-filter-caption">1. Choose your qualification</p>
        <p className="ed-filter-hint">
          Select a tab to see matching programmes. On smaller screens, swipe the
          qualification row for more options.
        </p>
        <div
          className="ed-qualification-tabs"
          role="tablist"
          aria-label="Qualifications"
        >
          {qualifications.map((q) => (
            <button
              type="button"
              key={q.id}
              id={`qualification-${q.id}`}
              role="tab"
              aria-selected={qualification === q.id}
              aria-controls="qualification-results"
              tabIndex={qualification === q.id ? 0 : -1}
              onKeyDown={tabKeys}
              onClick={() => chooseQualification(q.id)}
            >
              {q.label}
            </button>
          ))}
        </div>
        <div className="ed-explorer-layout">
          <div className="ed-discipline-sidebar" role="group" aria-label="Disciplines">
            <button
              className="ed-discipline-toggle"
              type="button"
              aria-expanded={subjectsOpen}
              aria-controls="discipline-options"
              onClick={() => setSubjectsOpen(!subjectsOpen)}
            >
              2. Discipline <span>{discipline || "All disciplines"}</span>
            </button>
            <div className="ed-discipline-heading">
              <p className="ed-filter-caption">2. Choose a discipline</p>
              <span>Refine your interests</span>
            </div>
            <div
              id="discipline-options"
              className={`ed-discipline-options ${subjectsOpen ? "is-open" : ""}`}
              role="group"
              aria-label="Disciplines"
            >
              <button
                type="button"
                aria-pressed={!discipline}
                onClick={() => chooseSubject("")}
              >
                All disciplines<span>{qualified.length}</span>
              </button>
              {subjects.map((subject) => (
                <button
                  type="button"
                  key={subject}
                  aria-pressed={discipline === subject}
                  onClick={() => chooseSubject(subject)}
                >
                  {subject}
                  <span>
                    {qualified.filter((e) => e.subject === subject).length}
                  </span>
                </button>
              ))}
            </div>
            <Link className="ed-explorer-help" href="/study-types">
              Not sure which qualification to choose?
            </Link>
          </div>
          <div
            id="qualification-results"
            role="tabpanel"
            aria-labelledby={`qualification-${qualification}`}
            className="ed-explorer-results"
          >
            <div className="ed-results-toolbar">
              <div>
                <h3>{selected.label}</h3>
                <p role="status" aria-live="polite">
                  {results.length}{" "}
                  {results.length === 1
                    ? "programme or course"
                    : "programmes and courses"}
                  {discipline ? ` · ${discipline}` : ""}
                </p>
              </div>
              <label className="ed-explorer-search">
                <Search size={17} />
                <span className="sr-only">Search these programmes</span>
                <input
                  type="search"
                  placeholder="Search these programmes"
                  value={query}
                  onChange={(e) => {
                    setDiscovery({ search: e.target.value, shown: "" });
                  }}
                />
              </label>
            </div>
            {(qualification !== "all" || discipline || query) && (
              <div className="ed-applied-filters">
                <button
                  type="button"
                  onClick={() =>
                    setDiscovery({
                      qualification: "",
                      subject: "",
                      search: "",
                      shown: "",
                    })
                  }
                >
                  Reset all selections <X size={14} />
                </button>
                {discipline && (
                  <button
                    onClick={() => chooseSubject("")}
                    type="button"
                    aria-label={`Remove discipline ${discipline}`}
                  >
                    {discipline}
                    <X size={14} />
                  </button>
                )}
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setDiscovery({ search: "", shown: "" });
                    }}
                    aria-label="Clear programme search"
                  >
                    {query}
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
            {results.length > 0 ? (
              <div className="ed-explorer-cards">
                {results.slice(0, limit).map((e) => (
                  <article className="ed-explorer-card" key={e.id}>
                    <Link
                      className="ed-explorer-photo"
                      href={e.href}
                      aria-label={`${e.live ? "Enrol in" : "View"} ${e.title}`}
                    >
                      <CourseImage
                        src={e.image}
                        sizes="(max-width:600px) 100vw, (max-width:1000px) 45vw, 30vw"
                      />
                      <span>
                        {e.live ? "Open enrolment" : "Catalogue preview"}
                      </span>
                    </Link>
                    <div className="ed-explorer-card-body">
                      <p className="ed-explorer-institution">{e.institution}</p>
                      <p className="ed-explorer-award">{e.award}</p>
                      <h4>
                        <Link href={e.href}>{e.title}</Link>
                      </h4>
                      <div className="ed-explorer-facts">
                        <p>{e.duration}</p>
                        <p>{e.format}</p>
                        {e.live && <p>Continues on the learning platform</p>}
                      </div>
                      <div className="ed-explorer-card-end">
                        <div>
                          <small>
                            {e.live ? "Course fee" : "Listed tuition"}
                          </small>
                          <strong>{e.price}</strong>
                        </div>
                        <Link href={e.href}>
                          {e.live ? "Enrol now" : "View details"}
                          <span className="sr-only"> for {e.title}</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ed-explorer-empty">
                <BookOpen size={30} />
                <h4>No matching programmes</h4>
                <p>
                  Choose another qualification or clear your search to explore
                  more options.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDiscovery({
                      qualification: "",
                      subject: "",
                      search: "",
                      shown: "",
                    });
                  }}
                >
                  Reset selections
                </button>
              </div>
            )}
            <div className="ed-results-footer">
              <p>
                Showing {Math.min(limit, results.length)} of {results.length}
              </p>
              {limit < results.length && (
                <button
                  type="button"
                  className="ed-outline-btn"
                  onClick={() => setDiscovery({ shown: String(limit + 6) })}
                >
                  Show more programmes
                </button>
              )}
            </div>
            <p className="ed-explorer-note">
              Catalogue previews are sample listings. Confirm institutional
              participation, current fees and programme availability before
              applying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
