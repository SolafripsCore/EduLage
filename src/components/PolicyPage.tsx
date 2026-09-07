import { CheckCircle2 } from "lucide-react";
import { PageIntro } from "./PageIntro";
import { Container } from "./ui/Container";

export function PolicyPage({ eyebrow, title, description, sections }: { eyebrow: string; title: string; description: string; sections: Array<{ title: string; body: string; points?: string[] }> }) {
  return <><PageIntro eyebrow={eyebrow} title={title} description={description}/><section className="py-16 md:py-20"><Container><div className="mx-auto max-w-4xl space-y-6">{sections.map(section=><article key={section.title} className="rounded-2xl border border-line bg-white p-6 md:p-8"><h2 className="text-xl font-bold text-navy-800">{section.title}</h2><p className="mt-3 leading-7 text-ink-600">{section.body}</p>{section.points&&<ul className="mt-5 grid gap-3 sm:grid-cols-2">{section.points.map(point=><li key={point} className="flex gap-2.5 text-sm leading-6 text-ink-600"><CheckCircle2 size={17} className="mt-1 shrink-0 text-teal-600"/>{point}</li>)}</ul>}</article>)}</div></Container></section></>;
}
