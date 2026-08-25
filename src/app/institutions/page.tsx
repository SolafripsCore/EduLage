import { PageIntro } from "@/components/PageIntro";
import { InstitutionDirectory } from "@/components/InstitutionDirectory";
import { Container } from "@/components/ui/Container";
import { getInstitutions } from "@/lib/catalog";

export const metadata = { title: "Institutions", description: "Explore accredited institutions participating on Edulage." };
export default function InstitutionsPage() {
  getInstitutions();
  return <><PageIntro eyebrow="The network" title="Institutions on Edulage" description="Every participating institution is a first-class tenant with its own admissions process, academic governance, and credentials." /><section className="section-space bg-surface"><Container><InstitutionDirectory /></Container></section></>;
}
