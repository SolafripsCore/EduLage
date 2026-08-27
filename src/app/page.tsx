import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Headphones,
  Landmark,
  Laptop2,
  Map,
  MapPin,
  Network,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProgrammeDiscoveryShowcase } from "@/components/ProgrammeDiscoveryShowcase";
import { HighDemandFields } from "@/components/HighDemandFields";
import { institutions } from "@/data/institutions";
import { getInstitutionProgrammes, getMarketplaceStats } from "@/lib/catalog";

const studyLevels = [
  ["Undergraduate", "Undergraduate degrees"],
  ["Postgraduate", "Postgraduate degrees"],
  ["Doctoral", "Doctoral programmes"],
  ["Professional", "Professional programmes & courses"],
] as const;

const trustStandards = [
  [
    Landmark,
    "Recognised institutions",
    "Institutional identity, legal standing and accreditation information are clearly presented.",
  ],
  [
    ShieldCheck,
    "Institution-approved listings",
    "Programme information, entry requirements, tuition and intakes remain institution-controlled.",
  ],
  [
    GraduationCap,
    "Institution-issued credentials",
    "Every degree, diploma and certificate is awarded by the teaching institution—not EduLage.",
  ],
  [
    CheckCircle2,
    "Standards-based access",
    "Institutions and Open Education Centers participate through defined readiness and quality requirements.",
  ],
] as const;
const journey = [
  [
    Search,
    "Discover",
    "Search accredited online and open education programmes by discipline, qualification, institution, delivery mode and intake.",
    "/programmes",
    "Explore programmes",
  ],
  [
    Award,
    "Compare",
    "Review programme structure, entry requirements, duration, tuition, delivery format, awarding institution and learner support.",
    "/programmes",
    "Compare study options",
  ],
  [
    Landmark,
    "Apply",
    "Confirm your preferred programme and continue through the institution’s authorised application and admissions process.",
    "/help",
    "Understand admissions",
  ],
  [
    Laptop2,
    "Enrol and study",
    "Following admission, access teaching, assessment and academic support through the institution, with local OEC facilities where available.",
    "/open-education-centers",
    "Find an OEC",
  ],
] as const;
const resources = [
  [
    "Learner guide",
    "Choosing a credible online programme",
    "Understand qualifications, delivery formats and questions to ask before applying.",
    "/help",
  ],
  [
    "Institutional insight",
    "Building a trusted digital campus",
    "A practical view of readiness, governance and quality online delivery.",
    "/for-institutions",
  ],
  [
    "GOE briefing",
    "Expanding access through connected communities",
    "How country partnerships and OECs make open education practical.",
    "/goe",
  ],
] as const;

export default function Home() {
  const featuredInstitutions = institutions.slice(0, 6);
  const stats = getMarketplaceStats();
  const networkStats = [
    { icon: Globe2, value: stats.countries, label: "Countries" },
    { icon: Landmark, value: stats.institutions, label: "Institutions" },
    { icon: BookOpen, value: stats.programmes, label: "Programmes" },
    { icon: Map, value: stats.centers, label: "OECs" },
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
      <section className="hero-premium relative isolate overflow-hidden bg-navy-900 text-white">
        <div className="hero-grid absolute inset-0 -z-20 opacity-20" />
        <div className="hero-aurora absolute inset-0 -z-20" />
        <Container>
          <div className="grid gap-9 pb-8 pt-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-14 lg:pb-9 lg:pt-14">
            <div className="relative z-10 max-w-3xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
                <span className="h-px w-8 bg-teal-400" />
                The Global Education Village
              </p>
              <h1 className="mt-5 max-w-[17ch] text-[2.45rem] font-bold leading-[1.06] text-white sm:text-[3rem] lg:text-[3.4rem]">
                Discover quality education without boundaries.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Explore accredited online and open education programmes from
                reputable tertiary institutions worldwide—through one trusted
                global education ecosystem.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button href="/programmes" variant="teal">
                  Explore programmes
                </Button>
                <Button href="/institutions" variant="ghost">
                  Explore institutions
                </Button>
                <Link
                  href="/open-education-centers"
                  className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white/75 transition hover:text-white"
                >
                  Find an Open Education Center{" "}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
              <ul
                className="mt-8 grid max-w-2xl gap-3 border-t border-white/15 pt-5 sm:grid-cols-3"
                aria-label="EduLage benefits"
              >
                <li className="flex items-start gap-2.5 text-xs leading-5 text-white/70">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-teal-400"
                  />
                  <span>Institution-led education</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs leading-5 text-white/70">
                  <Globe2 size={17} className="mt-0.5 shrink-0 text-teal-400" />
                  <span>Globally accessible programmes</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs leading-5 text-white/70">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-teal-400" />
                  <span>Local support through OECs</span>
                </li>
              </ul>
            </div>
          <div className="relative mx-auto w-full max-w-[520px] lg:justify-self-end">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl sm:aspect-[16/10] lg:aspect-[5/4]">
                <Image
                  src="/media/hero-learner.jpg"
                  alt="Learner accessing online tertiary education"
                  fill
                  priority
                  sizes="(max-width:1023px) 90vw,40vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/10 via-transparent to-white/5" />
            </div>

            <div className="absolute -left-3 top-5 z-10 w-[178px] rounded-xl border border-white/70 bg-white p-4 text-navy-800 shadow-[0_18px_45px_rgba(5,18,53,0.24)] sm:-left-7 sm:top-6 sm:w-[198px]" aria-label="Verified institution-issued credential">
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <ShieldCheck size={14} className="text-teal-600" />
                <span>Credential verified</span>
              </div>
              <p className="mt-2 text-[9px] text-ink-500">Issued by the institution</p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.06em] text-navy-800">EDU-4821-KX</p>
              <Link href="/verify" className="mt-3 inline-flex text-[9px] font-bold uppercase tracking-[0.08em] text-teal-700">Verified on EduLage</Link>
            </div>

            <Link href="/open-education-centers" className="group/oec absolute -bottom-4 -left-2 z-10 w-[142px] overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_18px_45px_rgba(5,18,53,0.28)] sm:-bottom-6 sm:-left-6 sm:w-[164px]" aria-label="Explore Open Education Centers">
              <span className="relative block h-[104px] sm:h-[122px]">
                <Image src="/media/oec-lab.jpg" alt="Learners using an Open Education Center" fill sizes="170px" className="object-cover transition duration-500 group-hover/oec:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-900/65 via-transparent to-transparent" />
                <span className="absolute inset-x-2 bottom-2 text-[9px] font-medium text-white">Open Education Center</span>
              </span>
            </Link>
          </div>
          </div>
          <div className="relative z-10 pb-8">
            <div className="rounded-2xl border border-white/15 bg-white p-5 text-navy-800 shadow-2xl md:p-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-bold text-navy-800">Find your programme</p>
                  <p className="mt-1 text-xs text-ink-600">
                    Search by subject, qualification, institution or delivery
                    format.
                  </p>
                </div>
                <Link
                  href="/programmes"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700"
                >
                  Advanced search and filters{" "}
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
              <form
                action="/programmes"
                className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_auto]"
                role="search"
              >
                <label className="relative">
                  <span className="sr-only">
                    Programme, subject or institution
                  </span>
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                    size={18}
                  />
                  <input
                    name="query"
                    placeholder="Programme, subject or institution"
                    className="h-12 w-full rounded-xl border border-line pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                </label>
                <label>
                  <span className="sr-only">Study level</span>
                  <select
                    name="level"
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-navy-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="">All study levels</option>
                    {studyLevels.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="sr-only">Delivery mode</span>
                  <select
                    name="mode"
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-navy-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="">All delivery modes</option>
                    <option>Fully online</option>
                    <option>Online + OEC exams</option>
                  </select>
                </label>
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 text-sm font-bold text-white transition hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  <Search size={17} />
                  Search programmes
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>
      <section
        className="bg-white py-20 md:py-24"
        aria-labelledby="how-edulage-works"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-16">
            <div className="order-2 lg:order-1 lg:sticky lg:top-28">
              <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] shadow-xl sm:min-h-[500px] lg:min-h-[560px]">
                <Image
                  src="/media/study-online.jpg"
                  alt="Learner participating in institution-led online higher education"
                  fill
                  sizes="(max-width:1023px)100vw,42vw"
                  className="object-cover transition duration-700 hover:scale-[1.02]"
                />
                <div className="image-scrim absolute inset-0" />
                <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/15 bg-navy-900/80 p-6 text-white backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-400">
                    Connected globally. Supported locally.
                  </p>
                  <p className="mt-2 text-base font-semibold leading-7 text-white">
                    A coordinated pathway to quality open and online education.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="section-kicker">How EduLage works</p>
              <h2 id="how-edulage-works" className="section-title max-w-3xl">
                A clear pathway from programme discovery to enrolment and study.
              </h2>
              <p className="section-lead max-w-3xl">
                EduLage brings programmes, institutions and essential study
                information together in one trusted ecosystem—helping learners
                make informed decisions and continue through each institution’s
                official admissions and learning processes.
              </p>
              <ol
                className="relative mt-9 space-y-3 before:absolute before:bottom-8 before:left-[1.55rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-teal-500 before:via-teal-500/60 before:to-line"
                aria-label="The EduLage learner journey"
              >
                {journey.map(([Icon, title, text, href, action], index) => (
                  <li
                    key={title}
                    className="group relative flex gap-4 rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-teal-500 hover:bg-teal-500/[0.035] hover:shadow-xl"
                  >
                    <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-4 border-white bg-navy-800 text-white shadow-sm transition group-hover:bg-teal-600">
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
                            Step 0{index + 1}
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-navy-800">
                            {title}
                          </h3>
                        </div>
                        <ArrowRight
                          size={17}
                          className="mt-2 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-teal-600"
                        />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink-600">
                        {text}
                      </p>
                      <Link
                        href={href}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700"
                      >
                        {action}
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-5 rounded-2xl border border-teal-500/25 bg-teal-500/[0.055] p-5 sm:flex sm:items-start sm:gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-teal-700 shadow-sm">
                  <ShieldCheck size={20} />
                </span>
                <div className="mt-3 sm:mt-0">
                  <h3 className="text-sm font-bold text-navy-800">
                    Academic responsibility remains with the institution.
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-ink-600">
                    Participating institutions determine admissions, provide
                    teaching and assessment, and issue all qualifications and
                    credentials. EduLage supports discovery, access and
                    ecosystem coordination.
                  </p>
                </div>
              </div>
              <div className="mt-7">
                <Button href="/programmes" variant="teal">
                  Start exploring programmes
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <ProgrammeDiscoveryShowcase />
      <HighDemandFields />
      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-kicker">Featured institutions</p>
              <h2 className="section-title">
                Explore reputable institutions worldwide.
              </h2>
              <p className="section-lead">
                Discover institutional profiles, academic strengths and
                programmes available through each digital campus.
              </p>
            </div>
            <Link
              href="/institutions"
              className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600"
            >
              View all institutions <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredInstitutions.map((institution) => {
              const count = getInstitutionProgrammes(institution.id).length;
              return (
                <Link
                  key={institution.id}
                  href={`/institutions/${institution.slug}`}
                  className="group grid grid-cols-[72px_1fr] gap-4 rounded-2xl border border-line p-5 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-xl"
                >
                  <span className="grid h-16 w-[72px] place-items-center rounded-xl bg-surface p-2">
                    <Image
                      src={institution.logo}
                      alt={`${institution.shortName} logo`}
                      width={64}
                      height={44}
                      className="max-h-11 w-auto object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-teal-600">
                      {institution.country}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-6 text-navy-800 group-hover:text-teal-600">
                      {institution.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-600">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={14} />
                        {institution.accreditationStatus}
                      </span>
                      <span>
                        {count} {count === 1 ? "programme" : "programmes"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
      <section className="bg-navy-900 py-20 text-white md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="section-kicker text-teal-400">
                Trust & academic authority
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                Clear standards. Clear responsibility.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/65">
                EduLage enables discovery and access while each institution
                retains responsibility for admissions, curriculum, teaching,
                assessment and certification.
              </p>
              <Link
                href="/quality-and-trust"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-400"
              >
                Explore quality and trust <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustStandards.map(([Icon, title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6"
                >
                  <Icon className="text-teal-400" size={23} />
                  <h3 className="mt-5 font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="overflow-hidden bg-surface py-20 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="section-kicker">Open Education Centers</p>
              <h2 className="section-title">
                Online education with dependable local access.
              </h2>
              <p className="section-lead">
                Independently operated, EduLage-accredited OECs provide
                connectivity, suitable learning spaces, learner support and
                secure institution-required assessment facilities.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Connected devices and reliable internet",
                  "Suitable spaces for focused learning",
                  "Trained local learner support",
                  "Secure computer-based assessment",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-navy-800"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-teal-600"
                    />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="relative min-h-[390px] overflow-hidden rounded-2xl">
                <Image
                  src="/media/oec-lab.jpg"
                  alt="Learners in an Open Education Center"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4">
                <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
                  <Image
                    src="/media/oec-exam.jpg"
                    alt="Secure digital assessment facility"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl bg-navy-900 p-6 text-white">
                  <MapPin className="text-teal-400" size={23} />
                  <h3 className="mt-4 font-bold text-white">
                    Closer to every community
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    Making online participation practical where connectivity or
                    equipment is limited.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <p className="section-kicker">Participate in the ecosystem</p>
              <h2 className="section-title">
                Purpose-built pathways for institutions and partners.
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-7 text-white lg:col-span-2">
              <div className="relative z-10 max-w-xl">
                <Landmark className="text-teal-400" size={27} />
                <h3 className="mt-5 text-2xl font-bold text-white">
                  For tertiary institutions
                </h3>
                <p className="mt-3 leading-7 text-white/65">
                  Establish a digital campus, publish programmes globally and
                  use shared delivery infrastructure without surrendering
                  institutional identity or academic authority.
                </p>
                <Link
                  href="/for-institutions"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-400"
                >
                  Explore institutional participation <ArrowRight size={15} />
                </Link>
              </div>
              <div className="hero-grid absolute inset-0 opacity-15" />
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <Globe2 className="text-teal-600" size={27} />
              <h3 className="mt-5 text-xl font-bold text-navy-800">
                Governments & partners
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">
                Use GOE to build institutional readiness, activate OEC networks
                and coordinate country participation.
              </p>
              <Link
                href="/goe"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-600"
              >
                Explore GOE partnerships <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-navy-900 py-20 text-white md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker text-teal-400">The global network</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                Education connected across institutions, countries and
                communities.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/65">
                Explore programmes and institutions across regions, with local
                access extended through Open Education Centers and country
                partnerships.
              </p>
              <Link
                href="/institutions"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-400"
              >
                Explore the global network <ArrowRight size={15} />
              </Link>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/5 p-7">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {networkStats.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-navy-900/50 p-5"
                  >
                    <Icon className="text-teal-400" size={21} />
                    <p className="mt-5 text-3xl font-bold text-white">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-white/55">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 p-4">
                <Network size={20} className="text-teal-400" />
                <p className="text-sm text-white/65">
                  A shared infrastructure with institutional identity preserved.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-surface py-20 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-kicker">Insights & resources</p>
              <h2 className="section-title">
                Make informed education decisions.
              </h2>
            </div>
            <Link href="/about" className="text-sm font-semibold text-teal-600">
              View all resources →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {resources.map(([type, title, text, href]) => (
              <article
                key={title}
                className="flex flex-col rounded-2xl border border-line bg-white p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-600">
                  {type}
                </p>
                <h3 className="mt-5 text-lg font-bold leading-7 text-navy-800">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-600">
                  {text}
                </p>
                <Link
                  href={href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy-800"
                >
                  Read resource <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white py-20">
        <Container>
          <div className="grid gap-6 rounded-[2rem] bg-navy-800 p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="section-kicker text-teal-400">Your next step</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold text-white md:text-4xl">
                Enter the Global Education Village.
              </h2>
              <p className="mt-4 max-w-2xl text-white/65">
                Discover a programme, explore participating institutions, locate
                an OEC or begin an institutional partnership.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button href="/programmes" variant="teal">
                Explore programmes
              </Button>
              <Button href="/get-started" variant="ghost">
                Get started
              </Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-600">
            <span className="flex items-center gap-2">
              <Headphones size={17} className="text-teal-600" />
              Help and learner support
            </span>
            <span className="flex items-center gap-2">
              <Building2 size={17} className="text-teal-600" />
              Institutional enquiries
            </span>
            <span className="flex items-center gap-2">
              <Users size={17} className="text-teal-600" />
              Partnership enquiries
            </span>
          </div>
        </Container>
      </section>
    </main>
  );
}
export const metadata = {
  title: "EduLage — The Global Education Village",
  description:
    "Discover quality open and online programmes from reputable tertiary institutions worldwide.",
};
