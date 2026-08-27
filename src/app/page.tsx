import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Headphones,
  Landmark,
  Laptop2,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { CompactProgrammeCard, ProgrammeCard } from "@/components/ProgrammeCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getFeaturedInstitutions,
  getHomepageProgrammeSections,
  getInstitutionProgrammes,
  getMarketplaceStats,
} from "@/lib/catalog";

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

const goePillars = [
  [
    Landmark,
    "Institutional readiness",
    "Structured standards, governance and digital capability support so institutions can publish and deliver online with confidence.",
  ],
  [
    MapPin,
    "Open Education Center deployment",
    "Accredited local centers providing connectivity, learning space, learner support and secure computer-based assessment.",
  ],
  [
    Globe2,
    "Country-level adoption",
    "Coordinated national participation so ministries, regulators and institutions can widen access together.",
  ],
] as const;

const audiencePaths = [
  [
    GraduationCap,
    "For learners",
    "Discover accredited programmes, compare study options and continue through each institution’s official admissions process.",
    "/programmes",
    "Explore programmes",
  ],
  [
    Landmark,
    "For tertiary institutions",
    "Establish a digital campus, publish programmes globally and use shared delivery infrastructure without surrendering institutional identity or academic authority.",
    "/for-institutions",
    "Explore institutional participation",
  ],
  [
    MapPin,
    "For OEC operators",
    "Operate an accredited Open Education Center providing local learning space, support and secure assessment.",
    "/open-education-centers#operate",
    "Become an operator",
  ],
] as const;

const popularSearches = [
  ["Data & AI", "/programmes?discipline=Data%20%26%20AI"],
  ["Business & Management", "/programmes?discipline=Business%20%26%20Management"],
  ["Health & Medical Sciences", "/programmes?discipline=Health%20%26%20Medical%20Sciences"],
  ["Engineering", "/programmes?discipline=Engineering"],
  ["Doctoral programmes", "/programmes?level=Doctoral"],
] as const;

export default function Home() {
  const stats = getMarketplaceStats();
  const featuredInstitutions = getFeaturedInstitutions(8);
  const { trending, degree, professional } = getHomepageProgrammeSections();
  const metrics = [
    [stats.institutions, "Institutions"],
    [stats.countries, "Countries"],
    [stats.programmes, "Programmes"],
    [stats.centers, "Open Education Centers"],
  ] as const;

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
              <h1 className="mt-5 max-w-[18ch] text-[2.15rem] font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.6rem] lg:text-[3rem]">
                Discover quality education without boundaries.
              </h1>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-white/72 sm:text-base sm:leading-7">
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
                  Find an Open Education Center
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
                  <ShieldCheck size={17} className="mt-0.5 shrink-0 text-teal-400" />
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
              <div className="mt-7 grid max-w-2xl grid-cols-2 gap-4 border-t border-white/15 pt-5 sm:grid-cols-4">
                {metrics.map(([value, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold tabular-nums text-teal-400">{value}</p>
                    <p className="mt-1 text-xs leading-4 text-white/55">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[430px] lg:justify-self-end">
              <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] border border-white/15 bg-navy-800 shadow-2xl">
                <Image
                  src="/media/hero-learner.jpg"
                  alt="Learner accessing online tertiary education"
                  fill
                  priority
                  sizes="(max-width:1023px) 90vw,430px"
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/10 via-transparent to-white/5" />
              </div>
              <div
                className="absolute -left-3 top-5 z-10 w-[178px] rounded-xl border border-white/70 bg-white p-4 text-navy-800 shadow-[0_18px_45px_rgba(5,18,53,0.24)] sm:-left-7 sm:top-6 sm:w-[198px]"
                aria-label="Verified institution-issued credential"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <ShieldCheck size={14} className="text-teal-600" />
                  <span>Credential verified</span>
                </div>
                <p className="mt-2 text-[9px] text-ink-500">Issued by the institution</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.06em] text-navy-800">EDU-4821-KX</p>
                <Link href="/verify" className="mt-3 inline-flex text-[9px] font-bold uppercase tracking-[0.08em] text-teal-700">
                  Verified on EduLage
                </Link>
              </div>
              <Link
                href="/open-education-centers"
                className="group/oec absolute -bottom-4 -left-2 z-10 w-[142px] overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_18px_45px_rgba(5,18,53,0.28)] sm:-bottom-6 sm:-left-6 sm:w-[164px]"
                aria-label="Explore Open Education Centers"
              >
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
                  <p className="mt-1 text-xs text-ink-600">Search by subject, qualification, institution or delivery format.</p>
                </div>
                <Link href="/programmes" className="group inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                  Advanced search and filters <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <form action="/programmes" className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_auto]" role="search">
                <label className="relative">
                  <span className="sr-only">Programme, subject or institution</span>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                  <input name="query" placeholder="Programme, subject or institution" className="h-12 w-full rounded-xl border border-line pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" />
                </label>
                <label>
                  <span className="sr-only">Study level</span>
                  <select name="level" defaultValue="" className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-navy-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
                    <option value="">All study levels</option>
                    {studyLevels.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label>
                  <span className="sr-only">Delivery mode</span>
                  <select name="mode" defaultValue="" className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-navy-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
                    <option value="">All delivery modes</option>
                    <option>Fully online</option>
                    <option>Online + OEC exams</option>
                  </select>
                </label>
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 text-sm font-bold text-white transition hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  <Search size={17} />Search programmes
                </button>
              </form>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-ink-500">Popular:</span>
                {popularSearches.map(([label, href]) => <Link key={label} href={href} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-navy-800 transition hover:border-teal-500 hover:bg-teal-500/10 focus-visible:ring-2 focus-visible:ring-teal-500">{label}</Link>)}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="section-kicker">Featured institutions</p>
              <h2 className="section-title">Learners study with accredited institutions on every continent.</h2>
              <p className="section-lead">Discover institutional profiles, academic strengths and programmes available through each digital campus.</p>
            </div>
            <Link href="/institutions" className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600">View all institutions <span aria-hidden>→</span></Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredInstitutions.map((institution) => {
              const count = getInstitutionProgrammes(institution.id).length;
              return <Link key={institution.id} href={`/institutions/${institution.slug}`} className="group flex h-full flex-col rounded-2xl border border-line p-5 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-xl">
                <span className="grid h-16 w-[72px] place-items-center rounded-xl bg-surface p-2">
                  <Image src={institution.logo} alt={`${institution.shortName} logo`} width={64} height={44} className="max-h-11 w-auto object-contain" />
                </span>
                <p className="mt-4 text-xs font-semibold text-teal-600">{institution.country} · {institution.region}</p>
                <h3 className="mt-1 text-base font-bold leading-6 text-navy-800 group-hover:text-teal-600">{institution.name}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-600">
                  <span className="flex items-center gap-1"><ShieldCheck size={14} />{institution.accreditationStatus}</span>
                  <span>{count} {count === 1 ? "programme" : "programmes"}</span>
                </div>
                <span className="arrow-slide mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold text-teal-600">View digital campus <span aria-hidden>→</span></span>
              </Link>;
            })}
          </div>
        </Container>
      </section>
      <section className="bg-surface py-14 md:py-20" aria-labelledby="how-edulage-works">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-16">
            <div className="order-2 lg:order-1 lg:sticky lg:top-28">
              <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] shadow-xl sm:min-h-[500px] lg:min-h-[560px]">
                <Image src="/media/study-online.jpg" alt="Learner participating in institution-led online higher education" fill sizes="(max-width:1023px)100vw,42vw" className="object-cover transition duration-700 hover:scale-[1.02]" />
                <div className="image-scrim absolute inset-0" />
                <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/15 bg-navy-900/80 p-6 text-white backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-400">Connected globally. Supported locally.</p>
                  <p className="mt-2 text-base font-semibold leading-7 text-white">A coordinated pathway to quality open and online education.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="section-kicker">How EduLage works</p>
              <h2 id="how-edulage-works" className="section-title max-w-3xl">A clear pathway from programme discovery to enrolment and study.</h2>
              <p className="section-lead max-w-3xl">EduLage brings programmes, institutions and essential study information together in one trusted ecosystem—helping learners make informed decisions and continue through each institution’s official admissions and learning processes.</p>
              <ol className="relative mt-8 space-y-3 before:absolute before:bottom-8 before:left-[1.55rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-teal-500 before:via-teal-500/60 before:to-line" aria-label="The EduLage learner journey">
                {journey.map(([Icon, title, text, href, action], index) => <li key={title} className="group relative flex gap-4 rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-teal-500 hover:bg-teal-500/[0.035] hover:shadow-xl">
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-4 border-white bg-navy-800 text-white shadow-sm transition group-hover:bg-teal-600"><Icon size={19} /></span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">Step 0{index + 1}</p><h3 className="mt-1 text-lg font-bold text-navy-800">{title}</h3></div><ArrowRight size={17} className="mt-2 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-teal-600" /></div>
                    <p className="mt-2 text-sm leading-6 text-ink-600">{text}</p>
                    <Link href={href} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700">{action}<ArrowRight size={13} /></Link>
                  </div>
                </li>)}
              </ol>
              <div className="mt-5 rounded-2xl border border-teal-500/25 bg-teal-500/[0.055] p-5 sm:flex sm:items-start sm:gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-teal-700 shadow-sm"><ShieldCheck size={20} /></span>
                <div className="mt-3 sm:mt-0"><h3 className="text-sm font-bold text-navy-800">Academic responsibility remains with the institution.</h3><p className="mt-1 text-sm leading-6 text-ink-600">Participating institutions determine admissions, provide teaching and assessment, and issue all qualifications and credentials. EduLage supports discovery, access and ecosystem coordination.</p></div>
              </div>
              <div className="mt-7"><Button href="/programmes" variant="teal">Start exploring programmes</Button></div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl"><p className="section-kicker">Trending now</p><h2 className="section-title">Trending programmes and courses.</h2><p className="section-lead">Explore programmes learners are discovering across disciplines, institutions and study levels.</p></div>
            <Link href="/programmes" className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600">View all programmes <span aria-hidden>→</span></Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trending.map((programme, index) => <div key={programme.id} className={index >= 4 ? "hidden h-full md:block" : "h-full"}><ProgrammeCard programme={programme} discovery priority={index < 3} /></div>)}
          </div>
        </Container>
      </section>
      <section className="bg-surface py-14 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl"><p className="section-kicker">From accredited tertiary institutions worldwide</p><h2 className="section-title">Degree programmes.</h2><p className="section-lead">Find bachelor&apos;s, master&apos;s and doctoral study with academic standards, admissions and credentials governed by the institution.</p></div>
            <Link href="/programmes" className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600">View all degree programmes <span aria-hidden>→</span></Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link href="/programmes?level=Undergraduate" className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition hover:border-teal-500 hover:bg-teal-500/10 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">Bachelor&apos;s degrees</Link>
            <Link href="/programmes?level=Postgraduate" className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition hover:border-teal-500 hover:bg-teal-500/10 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">Master&apos;s degrees</Link>
            <Link href="/programmes?level=Doctoral" className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition hover:border-teal-500 hover:bg-teal-500/10 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">Doctoral programmes</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{degree.map((programme, index) => <div key={programme.id} className={index >= 4 ? "hidden h-full md:block" : "h-full"}><ProgrammeCard programme={programme} discovery /></div>)}</div>
          <p className="mt-8 text-xs text-ink-600">Degrees are awarded by the institution, never by EduLage.</p>
        </Container>
      </section>
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl"><p className="section-kicker">Build practical expertise</p><h2 className="section-title">Professional diplomas and certificates.</h2><p className="section-lead">Shorter, applied pathways from reputable institutions and companies worldwide, designed to fit around work and other commitments.</p></div>
            <Link href="/programmes?level=Professional" className="arrow-slide inline-flex items-center gap-2 text-sm font-semibold text-teal-600">View all professional programmes <span aria-hidden>→</span></Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">{professional.map((programme, index) => <div key={programme.id} className={index >= 4 ? "hidden h-full md:block" : "h-full"}><CompactProgrammeCard programme={programme} /></div>)}</div>
        </Container>
      </section>
      <section className="bg-navy-900 py-14 text-white md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div><p className="section-kicker text-teal-400">Trust &amp; academic authority</p><h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">Clear standards. Clear responsibility.</h2><p className="mt-5 text-lg leading-8 text-white/65">EduLage enables discovery and access while each institution retains responsibility for admissions, curriculum, teaching, assessment and certification.</p><Link href="/quality-and-trust" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-400">Explore quality and trust <ArrowRight size={15} /></Link></div>
            <div className="grid gap-3 sm:grid-cols-2">{trustStandards.map(([Icon, title, text]) => <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6"><Icon className="text-teal-400" size={23} /><h3 className="mt-5 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{text}</p></div>)}</div>
          </div>
        </Container>
      </section>
      <section className="overflow-hidden bg-surface py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div><p className="section-kicker">Open Education Centers</p><h2 className="section-title">Online education with dependable local access.</h2><p className="section-lead">Independently operated, EduLage-accredited OECs provide connectivity, suitable learning spaces, learner support and secure institution-required assessment facilities.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{["Connected devices and reliable internet", "Suitable spaces for focused learning", "Trained local learner support", "Secure computer-based assessment"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-navy-800"><CheckCircle2 size={17} className="shrink-0 text-teal-600" />{item}</div>)}</div><div className="mt-8 flex flex-wrap gap-3"><Button href="/open-education-centers">Find an OEC</Button><Button href="/open-education-centers#operate" variant="secondary">Become an operator</Button></div></div>
            <div className="grid grid-cols-2 gap-4"><div className="relative min-h-[390px] overflow-hidden rounded-2xl"><Image src="/media/oec-lab.jpg" alt="Learners in an Open Education Center" fill sizes="25vw" className="object-cover" /></div><div className="grid gap-4"><div className="relative min-h-[220px] overflow-hidden rounded-2xl"><Image src="/media/oec-exam.jpg" alt="Secure digital assessment facility" fill sizes="25vw" className="object-cover" /></div><div className="rounded-2xl bg-navy-900 p-6 text-white"><MapPin className="text-teal-400" size={23} /><h3 className="mt-4 font-bold text-white">Closer to every community</h3><p className="mt-2 text-sm leading-6 text-white/60">Making online participation practical where connectivity or equipment is limited.</p></div></div></div>
          </div>
        </Container>
      </section>
      <section className="relative isolate overflow-hidden bg-navy-900 py-14 text-white md:py-20">
        <div className="hero-grid absolute inset-0 -z-10 opacity-25" /><div className="hero-aurora absolute inset-0 -z-20 opacity-80" />
        <Container>
          <div className="max-w-3xl"><p className="section-kicker text-teal-400">Global Open Education Initiative</p><h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">EduLage is activated through the Global Open Education (GOE) Initiative.</h2><p className="mt-5 text-lg leading-8 text-white/65">GOE supports institutional readiness, deploys Open Education Centers and drives country-level adoption so quality open and online education reaches every community.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{goePillars.map(([Icon, title, text]) => <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6"><Icon className="text-teal-400" size={24} /><h3 className="mt-5 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></div>)}</div>
          <div className="mt-8 flex flex-wrap gap-3"><Button href="/goe" variant="teal">Explore the GOE Initiative</Button><Button href="/contact" variant="ghost">Partner with GOE</Button></div>
        </Container>
      </section>
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl"><p className="section-kicker">Participate in the ecosystem</p><h2 className="section-title">Purpose-built pathways for learners, institutions and partners.</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{audiencePaths.map(([Icon, title, text, href, action]) => <div key={title} className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-xl"><Icon className="text-teal-600" size={27} /><h3 className="mt-5 text-xl font-bold text-navy-800">{title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-ink-600">{text}</p><Link href={href} className="arrow-slide mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-600">{action} <span aria-hidden>→</span></Link></div>)}</div>
        </Container>
      </section>
      <section className="bg-surface py-14 md:py-20">
        <Container>
          <div className="grid gap-6 rounded-[2rem] bg-navy-800 p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12"><div><p className="section-kicker text-teal-400">Your next step</p><h2 className="mt-4 max-w-3xl text-3xl font-bold text-white md:text-4xl">Enter the Global Education Village.</h2><p className="mt-4 max-w-2xl text-white/65">Discover a programme, explore participating institutions, locate an OEC or begin an institutional partnership.</p></div><div className="flex flex-wrap gap-3 md:justify-end"><Button href="/programmes" variant="teal">Explore programmes</Button><Button href="/get-started" variant="ghost">Get started</Button></div></div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-600"><span className="flex items-center gap-2"><Headphones size={17} className="text-teal-600" />Help and learner support</span><span className="flex items-center gap-2"><Building2 size={17} className="text-teal-600" />Institutional enquiries</span><span className="flex items-center gap-2"><Users size={17} className="text-teal-600" />Partnership enquiries</span></div>
        </Container>
      </section>
    </main>
  );
}

export const metadata = {
  title: "EduLage — The Global Education Village",
  description: "Discover quality open and online programmes from reputable tertiary institutions worldwide.",
};
