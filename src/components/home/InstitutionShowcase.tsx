"use client";
import Image from "next/image";
import Link from "next/link";
import { Landmark, Globe2, BookOpen } from "lucide-react";
import { useState } from "react";
import { institutions } from "@/data/institutions";
import type { CatalogueInstitution } from "@/lib/liveCatalogue";
export function InstitutionShowcase({
  live,
}: {
  live: CatalogueInstitution[];
}) {
  const [expanded, setExpanded] = useState(false);
  const entries = [
    ...live.map((i) => ({
      id: i.code,
      name: i.name,
      country: i.country,
      logo: i.logo,
      href: `/institutions/${i.code.toLowerCase()}`,
      sample: false,
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
        sample: true,
      })),
  ];
  return (
    <section
      id="institutions-trainers"
      className="ed-institutions"
      aria-labelledby="institutions-title"
    >
      <div className="ed-wrap ed-section">
        <div className="ed-section-head">
          <div>
            <p className="ed-eyebrow">02 / DISCOVER WHO YOU CAN LEARN WITH</p>
            <h2 id="institutions-title">
              Reputable institutions
              <br />
              &amp; trainers on EduLage
            </h2>
          </div>
          <div>
            <p>
              Explore institution profiles, areas of expertise and the
              programmes in the catalogue.
            </p>
            <Link href="/institutions" className="ed-text-link">
              Explore the institution directory
            </Link>
          </div>
        </div>
        <div className="ed-institution-feature">
          <div className="ed-institution-feature-image">
            <Image
              src="/media/hero-lecture.jpg"
              alt="Learners attending a lecture in a university classroom"
              fill
              sizes="(max-width:650px) 100vw, 40vw"
            />
          </div>
          <div className="ed-institution-feature-copy">
            <span className="ed-feature-icon">
              <Landmark size={30} />
            </span>
            <p className="ed-small-label">
              THE PEOPLE. THE KNOWLEDGE. THE POSSIBILITIES.
            </p>
            <h3>
              Great learning begins
              <br />
              with the right connection.
            </h3>
            <p>
              Get to know learning providers, explore their expertise and
              discover where your interests could take you.
            </p>
            <div>
              <span>
                <Globe2 size={17} />
                Global perspectives
              </span>
              <span>
                <BookOpen size={17} />
                Institution-led learning
              </span>
            </div>
          </div>
        </div>
        <div className="ed-institution-grid">
          {entries.slice(0, expanded ? entries.length : 8).map((i) => (
            <Link href={i.href} key={i.id} className="ed-institution-tile">
              <div>
                {i.logo ? (
                  <Image
                    src={i.logo}
                    alt=""
                    width={150}
                    height={64}
                    unoptimized={i.logo.startsWith("http")}
                  />
                ) : (
                  <span>{i.id}</span>
                )}
              </div>
              <h3>{i.name}</h3>
              <p>{i.country || "View institution profile"}</p>
              <span className="ed-institution-status">
                {i.sample ? "Sample profile" : "Learning-platform profile"}
              </span>
            </Link>
          ))}
        </div>
        <div className="ed-institution-bottom">
          <p>
            Preview profiles illustrate the network; participation and offerings
            must be verified. Individual trainer profiles will appear when
            available.
          </p>
          {entries.length > 8 && (
            <button
              type="button"
              className="ed-outline-btn"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "Show fewer institutions"
                : `Explore all ${entries.length} profiles`}
            </button>
          )}
        </div>
        <div className="ed-trainer-invite">
          <div>
            <h3>Share your expertise with a wider world.</h3>
            <p>
              Universities, training organisations and educators can explore
              participation through EduLage’s institutional enquiry process.
            </p>
          </div>
          <Link href="/for-institutions" className="ed-btn">
            Become a learning partner
          </Link>
        </div>
      </div>
    </section>
  );
}
