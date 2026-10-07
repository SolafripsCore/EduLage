"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, Landmark } from "lucide-react";
import { institutions } from "@/data/institutions";
import type { CatalogueInstitution } from "@/lib/liveCatalogue";

export function InstitutionDirectory({
  live = [],
}: {
  live?: CatalogueInstitution[];
}) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [source, setSource] = useState("");
  const entries = [
    ...live.map((i) => ({
      id: i.code,
      name: i.name,
      country: i.country,
      logo: i.logo,
      href: `/institutions/${i.code.toLowerCase()}`,
      live: true,
    })),
    ...institutions
      .filter(
        (i) => !live.some((l) => l.name.toLowerCase() === i.name.toLowerCase()),
      )
      .map((i) => ({
        id: i.id,
        name: i.name,
        country: i.country,
        logo: i.logo,
        href: `/institutions/${i.slug}`,
        live: false,
      })),
  ];
  const countries = [
    ...new Set(entries.map((i) => i.country).filter(Boolean)),
  ].sort();
  const items = entries.filter(
    (i) =>
      (!query.trim() ||
        `${i.name} ${i.country}`
          .toLowerCase()
          .includes(query.trim().toLowerCase())) &&
      (!country || i.country === country) &&
      (!source || (source === "connected" ? i.live : !i.live)),
  );
  const reset = () => {
    setQuery("");
    setCountry("");
    setSource("");
  };
  return (
    <div className="ed-directory">
      <div className="ed-directory-toolbar">
        <label>
          <span>Institution or country</span>
          <div className="ed-directory-search">
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the directory"
            />
          </div>
        </label>
        <label>
          <span>Country</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Profile type</span>
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">All profiles</option>
            <option value="connected">Learning-platform profiles</option>
            <option value="sample">Sample profiles</option>
          </select>
        </label>
      </div>
      <div className="ed-directory-count">
        <p role="status">
          {items.length} {items.length === 1 ? "profile" : "profiles"} found
        </p>
        {(query || country || source) && (
          <button onClick={reset}>Clear filters</button>
        )}
      </div>
      <div className="ed-data-notice">
        <strong>Know what you’re viewing</strong>
        <p>
          Learning-platform profiles come from the connected catalogue. Sample
          profiles illustrate the directory and do not confirm institutional
          participation. Confirm recognition and programme availability with the
          institution.
        </p>
      </div>
      <div className="ed-directory-grid">
        {items.map((i) => (
          <Link href={i.href} key={i.id} className="ed-directory-card">
            <div className="ed-directory-logo">
              {i.logo ? (
                <Image
                  src={i.logo}
                  alt=""
                  width={150}
                  height={70}
                  unoptimized={i.logo.startsWith("http")}
                />
              ) : (
                <Landmark size={34} />
              )}
            </div>
            <span className="ed-profile-type">
              {i.live ? "Learning-platform profile" : "Sample profile"}
            </span>
            <h2>{i.name}</h2>
            <p>{i.country || "Location not supplied"}</p>
            <span className="ed-directory-action">
              View institution profile
            </span>
          </Link>
        ))}
      </div>
      {!items.length && (
        <div className="ed-directory-empty">
          <Landmark size={32} />
          <h2>No matching institutions</h2>
          <p>Try another name or country, or clear your filters.</p>
          <button onClick={reset}>Show all profiles</button>
        </div>
      )}
      <div className="ed-directory-support">
        <div>
          <h2>Represent an institution or training organisation?</h2>
          <p>
            Explore participation and the information needed to introduce your
            programmes.
          </p>
        </div>
        <Link href="/for-institutions">Explore partnership</Link>
      </div>
    </div>
  );
}
