import Link from "next/link";
import { Award, BookOpen, Clock3, Monitor, UsersRound } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Study types",
  description: "Explore degree and professional study types available through accredited institutions.",
};

const studyTypes = [
  {
    icon: BookOpen,
    title: "Bachelor's degrees",
    credential: "BSc, BEng and LLB",
    duration: "Typically 36–60 months",
    audience: "For learners building a first higher-education qualification or changing direction with a full degree.",
    href: "/programmes?level=Undergraduate",
  },
  {
    icon: Award,
    title: "Master's degrees",
    credential: "MSc, MBA and MPH",
    duration: "Typically 12–24 months",
    audience: "For graduates and professionals deepening expertise, changing fields or preparing for advanced practice.",
    href: "/programmes?level=Postgraduate",
  },
  {
    icon: UsersRound,
    title: "Doctoral / PhD",
    credential: "PhD",
    duration: "Typically 36–48 months",
    audience: "For researchers developing original work with supervision and assessment governed by the institution.",
    href: "/programmes?level=Doctoral",
  },
  {
    icon: Clock3,
    title: "Professional diplomas & certificates",
    credential: "PGD and Professional Certificate",
    duration: "Typically 4–12 months",
    audience: "For working professionals seeking focused, applied learning without committing to a full degree.",
    href: "/programmes?level=Professional",
  },
];

export default function StudyTypesPage() {
  return <><PageIntro eyebrow="Choose your route" title="Study types for different ambitions" description="Compare recognised degree and professional pathways from accredited institutions worldwide. Each institution sets its own admissions, academic and credential requirements." /><Section eyebrow="Qualifications" title="Find the right level of study" description="Explore the qualifications represented in the Edulage catalogue, then review programme details and apply directly through the institution."><div className="grid gap-4 md:grid-cols-2">{studyTypes.map(({ icon: Icon, title, credential, duration, audience, href }) => <article key={title} className="card-hover flex h-full flex-col rounded-xl border border-line bg-white p-6"><div className="flex size-11 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600"><Icon size={22} /></div><h2 className="mt-5 text-xl font-bold text-navy-800">{title}</h2><dl className="mt-5 grid gap-3 text-sm"><div><dt className="font-semibold text-navy-800">Credential</dt><dd className="mt-1 text-ink-600">{credential}</dd></div><div><dt className="font-semibold text-navy-800">Typical duration</dt><dd className="mt-1 text-ink-600">{duration}</dd></div><div><dt className="font-semibold text-navy-800">Who it suits</dt><dd className="mt-1 leading-6 text-ink-600">{audience}</dd></div></dl><Link href={href} className="arrow-slide mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500">View programmes <span aria-hidden>→</span></Link></article>)}</div></Section><Section className="bg-surface" eyebrow="Choose how you participate" title="Delivery modes"><div className="grid gap-4 md:grid-cols-2"><article className="rounded-xl border border-line bg-white p-6"><div className="flex items-center gap-3"><Monitor className="text-teal-600" size={23} /><h2 className="text-xl font-bold text-navy-800">Fully online</h2></div><p className="mt-4 leading-7 text-ink-600">Study remotely through the institution’s online learning environment, with assessment and academic support defined by the institution.</p><Link href="/programmes?mode=Fully+online" className="arrow-slide mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500">Browse fully online <span aria-hidden>→</span></Link></article><article className="rounded-xl border border-line bg-white p-6"><div className="flex items-center gap-3"><BookOpen className="text-teal-600" size={23} /><h2 className="text-xl font-bold text-navy-800">Online + OEC exams</h2></div><p className="mt-4 leading-7 text-ink-600">Learn online and use an accredited Open Education Center for secure, institution-required computer-based examinations and local support.</p><Link href="/programmes?mode=Online+%2B+OEC+exams" className="arrow-slide mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500">Browse OEC-supported programmes <span aria-hidden>→</span></Link></article></div></Section><section className="border-t border-line bg-navy-900 py-14 text-white"><Container><p className="max-w-3xl text-sm leading-7 text-white/75">Institutions own admissions, teaching, assessment, learner records and credentials. Edulage provides programme discovery and shared infrastructure; it does not admit students or award qualifications.</p></Container></section></>;
}
