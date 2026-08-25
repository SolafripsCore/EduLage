import { Container } from "./ui/Container";

export function PageIntro({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return <div className="border-b border-line bg-surface py-16 md:py-20"><Container><div className="max-w-3xl">{eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-teal-600">{eyebrow}</p>}<h1 className="text-4xl font-bold text-navy-800 md:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-ink-600">{description}</p></div></Container></div>;
}
