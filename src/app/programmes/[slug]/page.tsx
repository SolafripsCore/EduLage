import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Clock3, Languages, Monitor } from "lucide-react";
import { notFound } from "next/navigation";
import { getInstitutionProgrammes, getProgrammeBySlug } from "@/lib/catalog";
import { institutionById } from "@/data/institutions";
import { programmes } from "@/data/programmes";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Checklist } from "@/components/ui/Checklist";
import { ProgrammeCard } from "@/components/ProgrammeCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const programme = getProgrammeBySlug((await params).slug);
  return { title: programme?.title ?? "Programme", description: programme ? `Study ${programme.title} at an accredited institution.` : "Programme details" };
}

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export default async function ProgrammeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const programme = getProgrammeBySlug((await params).slug);
  if (!programme) notFound();
  const institution = institutionById.get(programme.institutionId);
  if (!institution) notFound();

  const tuition = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: programme.tuitionCurrency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(programme.tuitionFrom);
  const siblings = getInstitutionProgrammes(institution.id)
    .filter((item) => item.slug !== programme.slug)
    .slice(0, 3);

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Course", name: programme.title, provider: { "@type": "CollegeOrUniversity", name: institution.name } }) }} />
    <div className="group relative isolate overflow-hidden bg-navy-900 py-14 text-white">
      <Image src={programme.image} alt="" fill sizes="100vw" className="image-zoom absolute inset-0 -z-20 object-cover" />
      <div className="hero-media-overlay absolute inset-0 -z-10" />
      <Container>
        <Link href="/programmes" className="text-sm text-white/75 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-400">← All programmes</Link>
        <div className="mt-9 flex items-start gap-4">
            <span className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-4 border-white bg-white p-2">
            <Image src={institution.logo} alt={`${institution.shortName} mark`} width={68} height={44} className="size-full object-contain" />
          </span>
          <div>
            <p className="text-sm text-teal-400">{institution.name} · {institution.city}, {institution.country}</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">{programme.title}</h1>
            <p className="mt-3 text-white/75">{programme.credential} · {programme.level}</p>
          </div>
        </div>
      </Container>
    </div>
    <Container>
      <div className="grid gap-10 py-14 lg:grid-cols-[1fr_340px]">
        <div>
          <section>
            <h2 className="text-2xl font-bold text-navy-800">Programme overview</h2>
            <p className="mt-4 leading-7 text-ink-600">This programme is delivered by {institution.name}. Review the institution’s programme information and entry requirements before applying.</p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-navy-800">Structure</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{programme.modules.map((module) => <div key={module} className="flex gap-3 rounded-lg border border-line p-4 text-sm text-ink-600"><Check size={17} className="shrink-0 text-teal-600" />{module}</div>)}</div>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-navy-800">Entry requirements</h2>
            <div className="mt-5"><Checklist items={programme.entryRequirements} /></div>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-navy-800">Assessment</h2>
            <p className="mt-4 leading-7 text-ink-600">{programme.assessmentNote} {programme.requiresOecExam ? "Some institution-required examinations take place at an accredited Open Education Center." : ""}</p>
          </section>
        </div>
        <aside className="card-hover h-fit rounded-xl border border-line p-6 lg:sticky lg:top-28">
          <div className="grid grid-cols-3 gap-3 border-b border-line pb-5 text-center">
            <div><Clock3 size={18} className="mx-auto text-teal-600" /><p className="mt-2 text-xs text-ink-400">Duration</p><p className="mt-1 text-sm font-semibold text-navy-800">{programme.durationMonths} months</p></div>
            <div><Monitor size={18} className="mx-auto text-teal-600" /><p className="mt-2 text-xs text-ink-400">Study mode</p><p className="mt-1 text-sm font-semibold text-navy-800">{programme.studyMode}</p></div>
            <div><Languages size={18} className="mx-auto text-teal-600" /><p className="mt-2 text-xs text-ink-400">Language</p><p className="mt-1 text-sm font-semibold text-navy-800">{programme.language}</p></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2"><Pill accent>{programme.credential}</Pill><Pill>{programme.deliveryMode}</Pill></div>
          <div className="mt-5 space-y-3 border-y border-line py-4">
            <div className="flex items-center justify-between gap-4 text-sm"><span className="text-ink-400">Tuition from</span><span className="font-semibold text-navy-800">{tuition} / {programme.tuitionPeriod}</span></div>
            <div className="flex items-center justify-between gap-4 text-sm"><span className="text-ink-400">Next intake</span><span className="font-semibold text-navy-800">{programme.nextIntake}</span></div>
          </div>
          <p className="mt-5 text-sm leading-6 text-ink-600">{programme.tuitionNote}</p>
          <a href={institution.admissionsPortalUrl} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-md bg-navy-800 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">Apply on {institution.shortName}&apos;s portal <ArrowUpRight size={16} /></a>
          <p className="mt-4 text-xs leading-5 text-ink-400">Admission decisions are made solely by {institution.name}. EduLage does not process admissions.</p>
        </aside>
      </div>
    </Container>
    {siblings.length > 0 && <section className="border-t border-line bg-surface py-16">
      <Container>
        <h2 className="mb-8 text-3xl font-bold text-navy-800">More programmes from {institution.name}</h2>
        <div className="grid gap-4 md:grid-cols-3">{siblings.map((sibling) => <ProgrammeCard key={sibling.id} programme={sibling} />)}</div>
      </Container>
    </section>}
  </>;
}
