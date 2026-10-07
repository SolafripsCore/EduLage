import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageIntro } from "./PageIntro";
import { Container } from "./ui/Container";

export type PolicySection = { title: string; body: string | string[]; points?: string[] };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const related: Array<[string, string]> = [["Privacy policy", "/privacy"], ["Terms of use", "/terms"], ["Refunds and payments", "/refunds"], ["Cookie notice", "/cookies"], ["Data protection", "/data-protection"], ["Accessibility", "/accessibility"]];

export function PolicyPage({ eyebrow, title, description, updated, sections, contact = "support@edulage.org" }: { eyebrow: string; title: string; description: string; updated?: string; sections: PolicySection[]; contact?: string }) {
  return <><PageIntro eyebrow={eyebrow} title={title} description={description} />
    <section className="py-16 md:py-20"><Container>
      <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
        <nav aria-label="On this page" className="lg:sticky lg:top-28">
          {updated && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Last updated {updated}</p>}
          <nav aria-label="On this page" className="mt-4 rounded-2xl border border-line bg-white p-5"><p className="text-sm font-bold text-navy-800">On this page</p><ol className="mt-3 space-y-2 text-sm">{sections.map((s, i) => <li key={s.title}><a href={`#${slug(s.title)}`} className="text-ink-600 hover:text-teal-700"><span className="mr-2 text-ink-400">{i + 1}.</span>{s.title}</a></li>)}</ol></nav>
          <nav aria-label="Related policies" className="mt-4 rounded-2xl bg-surface p-5"><p className="text-sm font-bold text-navy-800">Related</p><ul className="mt-3 space-y-2 text-sm">{related.filter(([l]) => l !== title).map(([label, href]) => <li key={href}><Link href={href} className="text-ink-600 hover:text-teal-700">{label}</Link></li>)}</ul></nav>
        </nav>
        <div className="max-w-3xl space-y-6">
          {sections.map((section, i) => <article key={section.title} id={slug(section.title)} className="scroll-mt-28 rounded-2xl border border-line bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-navy-800"><span className="mr-2 text-teal-700">{i + 1}.</span>{section.title}</h2>
            {(Array.isArray(section.body) ? section.body : [section.body]).map((p) => <p key={p.slice(0, 40)} className="mt-3 leading-7 text-ink-600">{p}</p>)}
            {section.points && <ul className="mt-5 grid gap-3 sm:grid-cols-2">{section.points.map((point) => <li key={point} className="flex gap-2.5 text-sm leading-6 text-ink-600"><CheckCircle2 size={17} className="mt-1 shrink-0 text-teal-600" />{point}</li>)}</ul>}
          </article>)}
          <div className="rounded-2xl bg-navy-900 p-6 text-white md:p-8"><h2 className="text-lg font-bold text-white">Questions about this policy?</h2><p className="mt-2 leading-7 text-white/70">Write to <a href={`mailto:${contact}`} className="font-semibold text-white underline">{contact}</a> or use the <Link href="/contact" className="font-semibold text-white underline">contact form</Link>. We answer policy questions within five working days.</p></div>
        </div>
      </div>
    </Container></section></>;
}
