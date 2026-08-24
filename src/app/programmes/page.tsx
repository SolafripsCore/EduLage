import { PageIntro } from "@/components/PageIntro";
import { ProgrammesBrowser } from "@/components/ProgrammesBrowser";
import { Container } from "@/components/ui/Container";
import { getProgrammes } from "@/lib/catalog";

export const metadata = { title: "Browse programmes", description: "Compare degree and professional programmes from accredited institutions." };
export default function ProgrammesPage() {
  getProgrammes();
  return <><PageIntro eyebrow="The catalogue" title="Browse programmes" description="Compare degree and professional programmes from accredited institutions. Admissions decisions remain with each institution." /><section className="section-space bg-surface"><Container><ProgrammesBrowser /></Container></section></>;
}
