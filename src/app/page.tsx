import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Globe2,
  Landmark,
  MapPin,
  Award,
  Laptop2,
  Search,
  UserPlus,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { getCatalogue, enrolUrl, priceLabel } from "@/lib/liveCatalogue";
import { learnLinks } from "@/lib/site";
import { centers } from "@/data/centers";
import { institutions as sampleInstitutions } from "@/data/institutions";
import { getFeaturedProgrammes, getMarketplaceStats } from "@/lib/catalog";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { ProgrammeDiscoveryShowcase } from "@/components/ProgrammeDiscoveryShowcase";

const studyLevels = [
  ["Undergraduate", "Undergraduate degrees"],
  ["Postgraduate", "Postgraduate degrees"],
  ["Doctoral", "Doctoral programmes"],
  ["Professional", "Professional programmes & courses"],
] as const;

const journey = [
  [
    Search,
    "Discover",
    "Search programmes and short courses by discipline, qualification, institution, delivery mode and intake.",
  ],
  [
    UserPlus,
    "Enrol or apply",
    "Create a free account. Open courses start immediately; admission-based programmes go through the institution's review and appear on your My learning dashboard.",
  ],
  [
    Laptop2,
    "Learn",
    "Study with the institution's own teaching team and assessments, online or with a local Open Education Center for exams and support.",
  ],
  [
    Award,
    "Earn a verifiable credential",
    "Your certificate is awarded by the institution, recorded by EduLage, and verifiable by anyone from its credential ID.",
  ],
] as const;

const trust = [
  [Landmark, "Institution-led", "Admissions, teaching, assessment and every qualification remain with the institution."],
  [ShieldCheck, "Verifiable credentials", "Each credential carries an ID that employers can check on EduLage in seconds."],
  [CheckCircle2, "Transparent fees", "Course fees are set by the institution and shown before you enrol. Free courses are free."],
] as const;

export const metadata = {
  title: "EduLage — The Global Education Village",
  description:
    "Study online with recognised institutions: enrol in open courses today or apply for admission to degree programmes, all through one trusted platform.",
};

export default async function Home() {
  const catalogue = await getCatalogue();
  const liveCourses = catalogue?.open_courses.slice(0, 4) ?? [];
  const featured = getFeaturedProgrammes(8 - liveCourses.length);
  const liveInstitutions = catalogue?.institutions ?? [];
  const sample = getMarketplaceStats();
  const partnerLogos = [
    ...liveInstitutions.map((i) => ({ key: i.code, href: `/institutions/${i.code.toLowerCase()}`, name: i.name, logo: i.logo, mark: i.code })),
    ...sampleInstitutions.map((i) => ({ key: i.id, href: `/institutions/${i.slug}`, name: i.name, logo: i.logo, mark: i.shortName })),
  ].slice(0, 12);
  const stats = [
    { icon: Landmark, value: (catalogue?.counts.institutions ?? 0) + sample.institutions, label: "Institutions" },
    { icon: BookOpen, value: (catalogue?.counts.courses ?? 0) + sample.programmes, label: "Programmes & courses" },
    { icon: Globe2, value: (catalogue?.counts.countries ?? 0) + sample.countries, label: "Countries" },
    { icon: MapPin, value: centers.length, label: "Open Education Centers" },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "EduLage",
            url: "https://edulage.org",
            slogan: "The Global Education Village",
            description:
              "A trusted global education ecosystem for quality open and online education from tertiary institutions worldwide.",
          }),
        }}
      />

      {/* Hero */}
      <section className="hero-premium relative isolate overflow-hidden bg-navy-900 text-white">
        <div className="hero-grid absolute inset-0 -z-20 opacity-20" />
        <div className="hero-aurora absolute inset-0 -z-20" />
        <Container>
          <div className="grid gap-10 pb-12 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:pb-16 lg:pt-16">
            <div className="relative z-10">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
                <span className="h-px w-8 bg-teal-400" />
                The Global Education Village
              </p>
              <h1 className="mt-5 max-w-[20ch] text-[2.2rem] font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-[2.7rem] lg:text-[3.1rem]">
                Study online with recognised institutions.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                Enrol in open courses today, or apply for admission to degree programmes. One free
                account, institution-issued credentials you can verify anywhere.
              </p>

              <form
                action="/programmes"
                role="search"
                className="mt-8 grid gap-2 rounded-2xl border border-white/15 bg-white p-2 text-navy-800 shadow-2xl sm:grid-cols-[1.6fr_1fr_auto]"
              >
                <label className="relative">
                  <span className="sr-only">Programme, subject or institution</span>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                  <input
                    name="query"
                    placeholder="Programme, subject or institution"
                    className="h-12 w-full rounded-xl border border-transparent bg-surface pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                  />
                </label>
                <label>
                  <span className="sr-only">Study level</span>
                  <select
                    name="level"
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-transparent bg-surface px-4 text-sm text-navy-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="">All study levels</option>
                    {studyLevels.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-bold text-white transition hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  <Search size={17} />
                  Search
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={learnLinks.register} variant="teal">
                  Create free account
                </Button>
                <Button href="/programmes" variant="ghost">
                  Browse all programmes
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-xs text-white/70" aria-label="EduLage benefits">
                {[
                  [ShieldCheck, "Institution-issued, verifiable credentials"],
                  [Globe2, "Open to learners everywhere"],
                  [MapPin, "Local exam & support centres"],
                ].map(([Icon, text]) => (
                  <li key={text as string} className="flex items-center gap-2">
                    <Icon size={15} className="shrink-0 text-teal-400" />
                    {text as string}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[440px] lg:justify-self-end">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
                <Image
                  src="/media/hero-learner.jpg"
                  alt="Learner studying online with an EduLage partner institution"
                  fill
                  priority
                  sizes="(max-width:1023px) 90vw, 440px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
              </div>
              <Link
                href="/verify/87ec13ac13c443dc844c124088d09121"
                className="absolute -bottom-5 -left-3 z-10 w-[230px] rounded-xl border border-white/70 bg-white p-4 text-navy-800 shadow-[0_18px_45px_rgba(5,18,53,0.28)] transition hover:-translate-y-0.5 sm:-left-8"
                aria-label="See a verified EduLage credential"
              >
                <span className="flex items-center gap-2 text-xs font-bold">
                  <ShieldCheck size={14} className="text-teal-600" />
                  Verified credential
                </span>
                <span className="mt-2 block text-xs text-ink-600">
                  Awarded by the institution, recorded by EduLage.
                </span>
                <span className="mt-2 block font-mono text-[11px] tracking-wide text-ink-400">
                  87ec13ac…9121
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.06em] text-teal-600">
                  Check it <ArrowRight size={11} />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Live numbers */}
      <section className="border-b border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-line py-6 sm:grid-cols-4 sm:divide-x">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-2 py-2 sm:justify-center">
                <Icon size={22} className="shrink-0 text-teal-600" />
                <div>
                  <dd className="text-2xl font-bold leading-none text-navy-800">{value}</dd>
                  <dt className="mt-1 text-xs text-ink-600">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Featured programmes and courses */}
      <section className="bg-surface py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-kicker">Featured programmes and courses</p>
              <h2 className="section-title">Selected by EduLage, taught and awarded by the institution.</h2>
              <p className="section-lead">
                Each card shows the qualification, institution, fee and how you join: open courses start immediately
                with a free account; admission-based programmes go through the institution&rsquo;s review.
              </p>
            </div>
            <Link href="/programmes" className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
              Browse all programmes <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {liveCourses.map((course) => (
              <article
                key={course.course_id}
                className="group card-hover flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white"
              >
                <div className="relative aspect-video overflow-visible bg-navy-800">
                  <div className="absolute inset-0 overflow-hidden rounded-t-xl">
                    {course.image && (
                      <Image src={course.image} alt={course.title} fill sizes="(max-width:767px) 100vw, 25vw" className="image-zoom object-cover" unoptimized />
                    )}
                    <div className="image-scrim absolute inset-0" />
                  </div>
                  <div className="absolute right-3 top-3">
                    <Pill image>{course.classification === "professional" ? "Professional Certificate" : "Certificate of completion"}</Pill>
                  </div>
                  <span className="absolute -bottom-5 left-4 flex h-11 w-14 items-center justify-center overflow-hidden rounded-md border-4 border-white bg-white p-1 text-xs font-bold text-navy-800 shadow-sm">
                    {course.institution_logo ? (
                      <Image src={course.institution_logo} alt={`${course.institution_name} logo`} width={48} height={36} className="size-full object-contain" unoptimized />
                    ) : (
                      course.institution
                    )}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-8">
                  <p className="text-xs font-semibold text-teal-600">{course.institution_name}</p>
                  <h3 className="line-clamp-2 mt-2 min-h-12 text-[17px] font-semibold leading-6 text-navy-800 group-hover:text-teal-600">{course.title}</h3>
                  <div className="mt-3 flex min-h-7 flex-wrap gap-1.5">
                    <span className="rounded-full bg-navy-800 px-2.5 py-1 text-xs font-bold text-white">
                      Open enrolment{course.enrolment_policy === "open_free" ? " · Free" : ""}
                    </span>
                    <span className="rounded-full bg-teal-500/10 px-2.5 py-1 text-xs font-bold text-teal-700">Fully online</span>
                  </div>
                  <p className="mt-3 text-xs text-ink-600">
                    {course.start ? `Starts ${new Date(course.start).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}` : "Rolling enrolment"}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
                    <div>
                      <p className="text-xs text-ink-400">Course fee</p>
                      <p className="mt-1 text-sm font-semibold text-navy-800">{priceLabel(course)}</p>
                    </div>
                    <a href={enrolUrl(course)} className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600">
                      Enrol now <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
            {featured.map((programme) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                discovery
                enrolmentLabel={programme.level === "Professional" ? "Open enrolment" : "Admission required"}
              />
            ))}
          </div>
        </Container>
      </section>

      <ProgrammeDiscoveryShowcase />

      {/* Partner institutions */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-kicker">Partner institutions</p>
              <h2 className="section-title">Study with institutions from around the world.</h2>
              <p className="section-lead">
                Every institution keeps its own identity, admissions and academic authority on its EduLage campus.
              </p>
            </div>
            <Link href="/institutions" className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
              View all institutions <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {partnerLogos.map((institution) => (
              <li key={institution.key}>
                <Link
                  href={institution.href}
                  title={institution.name}
                  className="group flex h-24 items-center justify-center rounded-xl border border-line bg-white p-4 transition hover:border-teal-500 hover:shadow-md"
                >
                  {institution.logo ? (
                    <Image
                      src={institution.logo}
                      alt={`${institution.name} logo`}
                      width={140}
                      height={56}
                      className="max-h-14 w-auto object-contain opacity-80 transition group-hover:opacity-100"
                      unoptimized={institution.logo.startsWith("http")}
                    />
                  ) : (
                    <span className="text-center text-sm font-bold leading-5 text-navy-800">{institution.mark}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works + trust */}
      <section className="bg-white py-20 md:py-24" aria-labelledby="how-edulage-works">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <div>
              <p className="section-kicker">How EduLage works</p>
              <h2 id="how-edulage-works" className="section-title">
                From discovery to a credential you can prove.
              </h2>
              <p className="section-lead">
                Account first, admission where the programme needs it. Short courses start immediately;
                degree programmes follow the institution&rsquo;s own admissions process — all from one dashboard.
              </p>
              <div className="mt-8 grid gap-3">
                {trust.map(([Icon, title, text]) => (
                  <div key={title} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                    <Icon className="shrink-0 text-teal-600" size={22} />
                    <div>
                      <h3 className="font-bold text-navy-800">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ol
              className="relative grid gap-3 before:absolute before:bottom-8 before:left-[1.55rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-teal-500 before:via-teal-500/60 before:to-line"
              aria-label="The EduLage learner journey"
            >
              {journey.map(([Icon, title, text], index) => (
                <li key={title} className="relative flex gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-teal-500 hover:shadow-lg">
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-4 border-white bg-navy-800 text-white shadow-sm">
                    <Icon size={19} />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Step 0{index + 1}</p>
                    <h3 className="mt-1 text-lg font-bold text-navy-800">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* OEC */}
      <section className="overflow-hidden bg-surface py-20 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-kicker">Open Education Centers</p>
              <h2 className="section-title">Online education with dependable local access.</h2>
              <p className="section-lead">
                Independently operated, EduLage-accredited centres provide connectivity, learning spaces, local
                support and secure institution-required exams.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Connected devices and reliable internet",
                  "Suitable spaces for focused learning",
                  "Trained local learner support",
                  "Secure computer-based assessment",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-navy-800">
                    <CheckCircle2 size={17} className="shrink-0 text-teal-600" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/open-education-centers">Find an OEC</Button>
                <Button href="/open-education-centers#operate" variant="secondary">
                  Become an operator
                </Button>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-xl sm:min-h-[420px]">
              <Image
                src="/media/oec-lab.jpg"
                alt="Learners working at computers in an Open Education Center"
                fill
                sizes="(max-width:1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Institutions & partners */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <p className="section-kicker">Participate in the ecosystem</p>
              <h2 className="section-title">Bring your institution to EduLage.</h2>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-7 text-white lg:col-span-2">
              <div className="relative z-10 max-w-xl">
                <Landmark className="text-teal-400" size={27} />
                <h3 className="mt-5 text-2xl font-bold text-white">For tertiary institutions</h3>
                <p className="mt-3 leading-7 text-white/70">
                  Register, get approved, and your own branded campus is live the same day: publish courses, set your
                  fees or admission rules, and issue your own credentials.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/for-institutions#register" variant="teal">
                    Register your institution
                  </Button>
                  <Link href="/for-institutions" className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-teal-400">
                    How it works <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="hero-grid absolute inset-0 opacity-15" />
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <Building2 className="text-teal-600" size={27} />
              <h3 className="mt-5 text-xl font-bold text-navy-800">Governments & partners</h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">
                Build institutional readiness, activate OEC networks and coordinate country participation through GOE.
              </p>
              <Link href="/goe" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
                Explore GOE partnerships <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-white pb-20">
        <Container>
          <div className="grid gap-6 rounded-[2rem] bg-navy-800 p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="section-kicker text-teal-400">Your next step</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold text-white md:text-4xl">Ready to start learning?</h2>
              <p className="mt-4 max-w-2xl text-white/70">
                Create your free account, pick a course, and your My learning dashboard is ready in under a minute.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button href={learnLinks.register} variant="teal">
                Create free account
              </Button>
              <Button href="/help" variant="ghost">
                Learner support
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
