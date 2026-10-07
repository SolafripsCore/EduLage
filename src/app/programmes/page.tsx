import { Suspense } from "react";
import Link from "next/link";
import { ProgrammesBrowser } from "@/components/ProgrammesBrowser";
export const metadata = {
  title: "Find your next programme",
  description:
    "Explore and compare programmes by subject, institution, qualification and study format.",
};
export default function ProgrammesPage() {
  return (
    <div className="programmes-page">
      <section className="catalog-intro">
        <div className="container-page">
          <nav aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Programmes</span>
          </nav>
          <p className="catalog-eyebrow">EXPLORE. COMPARE. FIND YOUR PATH.</p>
          <h1>
            Invest in your <em>next chapter.</em>
          </h1>
          <p>
            Discover programmes that connect your interests with your ambitions.
          </p>
        </div>
      </section>
      <section className="catalog-surface">
        <div className="container-page">
          <Suspense
            fallback={
              <p role="status" className="p-8">
                Loading the programme catalogue…
              </p>
            }
          >
            <ProgrammesBrowser />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
