import Link from "next/link";
import { BookOpen, Building2, CircleHelp, MapPin, ShieldCheck } from "lucide-react";
import { HelpCenter } from "@/components/HelpCenter";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui/Container";
import { helpEntries } from "@/data/help";
export const metadata = { title: "Help centre", description: "Answers for learners, institutions and partners using EduLage — accounts, programmes, enrolment, payments, certificates and verification." };
const topics = [
  [BookOpen, "Choosing a programme", "Compare qualification, delivery format, duration, tuition and intake before continuing.", "/programmes"],
  [Building2, "Understanding institutions", "Review institutional profiles, academic authority and official admissions pathways.", "/institutions"],
  [MapPin, "Using a GOE Center", "Local connectivity, study space, learner support and supervised assessment facilities.", "/open-education-centers"],
  [ShieldCheck, "Trust and verification", "The difference between institutional recognition, accreditation and EduLage profile checks.", "/quality-and-trust"],
] as const;
export default function Page() {
  return <>
    <PageIntro eyebrow="Help centre" title="How can we help?" description="Straight answers on accounts, programmes, enrolment, payments, certificates and verification — for learners, institutions and partners." />
    <section className="py-16 md:py-20"><Container>
      <HelpCenter entries={helpEntries} />
      <h2 className="mt-16 text-2xl font-bold text-navy-800">Guides</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {topics.map(([Icon, title, text, href]) => <Link key={title} href={href} className="group rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-xl"><Icon size={23} className="text-teal-700" /><h3 className="mt-5 text-xl font-bold text-navy-800">{title}</h3><p className="mt-3 leading-7 text-ink-600">{text}</p><span className="mt-6 inline-flex text-sm font-bold text-teal-700">View guidance →</span></Link>)}
      </div>
      <div className="mt-10 grid gap-8 rounded-2xl bg-surface p-7 md:grid-cols-[1fr_auto] md:items-center">
        <div><CircleHelp className="text-teal-700" /><h2 className="mt-4 text-2xl font-bold text-navy-800">Still need help?</h2><p className="mt-2 text-ink-600">Send us a message and it goes straight to the right team. We usually reply within two working days.</p></div>
        <Link href="/contact" className="rounded-xl bg-navy-800 px-6 py-3 text-sm font-bold text-white">Contact EduLage</Link>
      </div>
    </Container></section>
  </>;
}
