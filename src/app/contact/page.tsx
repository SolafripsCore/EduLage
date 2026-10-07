import Link from "next/link";
import { Building2, Clock3, GraduationCap, Headphones, Network } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui/Container";
export const metadata = { title: "Contact EduLage", description: "Send a message to the EduLage learner, institutional, partnership or support teams." };
const routes = [
  [GraduationCap, "Learners", "Programmes, enrolment, payments, classroom access and certificates.", "support@edulage.org"],
  [Building2, "Institutions and trainers", "Joining EduLage, publishing programmes and institution administration.", "institutions@edulage.org"],
  [Network, "Governments and partners", "GOE country participation, GOE Center operation and infrastructure partnerships.", "partners@edulage.org"],
  [Headphones, "Privacy, accessibility and general", "Website, accessibility, privacy requests and anything else.", "support@edulage.org"],
] as const;
export default function Page() {
  return <>
    <PageIntro eyebrow="Contact EduLage" title="We're here to help." description="Tell us what you need and your message goes straight to the right team. We usually reply within two working days." />
    <section className="py-16 md:py-20"><Container>
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ContactForm />
        <aside className="space-y-4">
          {routes.map(([Icon, title, text, email]) => <article key={title} className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-700"><Icon size={22} /></span>
              <div><h2 className="font-bold text-navy-800">{title}</h2><p className="mt-1 text-sm leading-6 text-ink-600">{text}</p><a href={`mailto:${email}`} className="mt-2 inline-flex text-sm font-bold text-teal-700">{email}</a></div></div>
          </article>)}
          <div className="rounded-2xl bg-surface p-6"><div className="flex items-center gap-2 text-navy-800"><Clock3 size={18} className="text-teal-700" /><h2 className="font-bold">Response times</h2></div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-600"><li>Learner and payment enquiries: within 2 working days.</li><li>Institution and partnership enquiries: within 5 working days.</li><li>Urgent classroom access problems: use the help link inside your course; it reaches the duty team.</li></ul></div>
        </aside>
      </div>
      <div className="mt-10 rounded-2xl bg-navy-900 p-7 text-white"><h2 className="text-xl font-bold text-white">Asking about a specific programme?</h2><p className="mt-3 max-w-3xl leading-7 text-white/70">Admissions decisions, tuition, entry requirements and academic questions are answered by the awarding institution. Each <Link href="/programmes" className="underline">programme page</Link> and <Link href="/institutions" className="underline">institution profile</Link> shows the institution&apos;s own contact route where it is available — that is usually the fastest way to get an authoritative answer.</p></div>
    </Container></section>
  </>;
}
