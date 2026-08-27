import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Globe2,
  Network,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui/Container";
export const metadata = {
  title: "About EduLage",
  description:
    "The purpose, model and governance principles of the Global Education Village.",
};
const principles = [
  [
    ShieldCheck,
    "Trust",
    "Transparent institutional responsibility and clearly defined participation standards.",
  ],
  [
    Scale,
    "Academic sovereignty",
    "Admissions, curricula, teaching, assessment and credentials remain institution-controlled.",
  ],
  [
    Globe2,
    "Global access",
    "Programmes become easier to discover across borders and more practical to access locally.",
  ],
  [
    Network,
    "Shared infrastructure",
    "Institutions, OECs, governments and partners participate through coordinated infrastructure.",
  ],
] as const;
const roles = [
  [
    Building2,
    "Participating institutions",
    "Control academic quality, admissions, learner records, assessment and credentials.",
  ],
  [
    Users,
    "Open Education Centers",
    "Provide approved facilities, connectivity, learner support and secure assessment environments.",
  ],
  [
    Network,
    "EduLage",
    "Supports discovery, shared standards, access coordination and ecosystem infrastructure.",
  ],
] as const;
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="The Global Education Village"
        title="Education infrastructure built around institutional trust."
        description="EduLage connects reputable tertiary institutions, learners, communities and partners through shared infrastructure for programme discovery, access and trusted open and online education."
      />
      <section className="relative h-80 overflow-hidden bg-navy-900">
        <Image
          src="/media/study-online.jpg"
          alt="Learner participating in online tertiary education"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-media-overlay absolute inset-0" />
        <Container>
          <div className="relative flex h-80 items-end pb-9">
            <p className="max-w-3xl text-2xl font-bold text-white md:text-3xl">
              Technology brings the world closer. EduLage brings quality
              education within reach.
            </p>
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="section-kicker">Our purpose</p>
              <h2 className="section-title">
                Enable access without replacing institutions.
              </h2>
              <p className="section-lead">
                EduLage makes programmes discoverable, supports access through
                Open Education Centers and connects participants through common
                infrastructure.
              </p>
              <p className="mt-5 leading-7 text-ink-600">
                EduLage does not admit students, approve curricula, teach on
                behalf of institutions or issue academic credentials. Those
                responsibilities remain with the relevant institution.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map(([Icon, title, text]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-line p-6"
                >
                  <Icon size={23} className="text-teal-700" />
                  <h3 className="mt-5 font-bold text-navy-800">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-surface py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="section-kicker">Governance model</p>
            <h2 className="section-title">
              Clear roles. Accountable outcomes.
            </h2>
            <p className="section-lead">
              Every participant retains responsibility for the work it is
              authorised and qualified to perform.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {roles.map(([Icon, title, text]) => (
              <article
                key={title}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <Icon size={23} className="text-teal-700" />
                <h3 className="mt-5 text-lg font-bold text-navy-800">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/quality-and-trust"
              className="rounded-xl bg-navy-800 px-6 py-3 text-sm font-bold text-white"
            >
              Understand quality and trust
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-bold text-navy-800"
            >
              Contact EduLage
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
