import { Suspense } from "react";
import { PageIntro } from "@/components/PageIntro";
import { ProgrammesBrowser } from "@/components/ProgrammesBrowser";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Browse programmes", description: "Compare degree and professional programmes from accredited institutions." };
export default function ProgrammesPage() {
  return <><PageIntro eyebrow="The catalogue" title="Browse programmes" description="Compare degree and professional programmes from accredited institutions. Admissions decisions remain with each institution." /><section className="section-space bg-surface"><Container><Suspense fallback={<div className="rounded-xl border border-line bg-white p-8 text-sm text-ink-600">Loading programmes…</div>}><ProgrammesBrowser /></Suspense></Container></section></>;
}
