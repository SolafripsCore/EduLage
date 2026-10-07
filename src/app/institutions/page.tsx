import { PageIntro } from "@/components/PageIntro";
import { InstitutionDirectory } from "@/components/InstitutionDirectory";
import { Container } from "@/components/ui/Container";
import { getCatalogue } from "@/lib/liveCatalogue";

export const metadata = {
  title: "Institutions",
  description:
    "Explore institution profiles and learning providers in the EduLage catalogue.",
};
export default async function InstitutionsPage() {
  const catalogue = await getCatalogue();
  return (
    <>
      <PageIntro
        eyebrow="The network"
        title="Institutions on EduLage"
        description="Find a learning provider, explore its profile and understand the programmes and next steps available."
      />
      <section className="section-space bg-surface">
        <Container>
          <InstitutionDirectory live={catalogue?.institutions ?? []} />
        </Container>
      </section>
    </>
  );
}
