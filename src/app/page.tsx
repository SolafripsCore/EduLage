import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Playfair_Display } from "next/font/google";
import {
  BookOpen,
  GraduationCap,
  BriefcaseBusiness,
  Microscope,
  Search,
  Globe2,
  ShieldCheck,
  Landmark,
  Monitor,
  MapPin,
  Wifi,
  Award,
  Compass,
  Scale,
  ListChecks,
  Send,
  Sparkles,
  MessageCircle,
  Laptop,
  Orbit,
} from "lucide-react";
import { getCatalogue } from "@/lib/liveCatalogue";
import { learnLinks } from "@/lib/site";
import { ProgrammeExplorer } from "@/components/home/ProgrammeExplorer";
import { InstitutionShowcase } from "@/components/home/InstitutionShowcase";
import { LearnerFaq } from "@/components/LearnerFaq";
import "./home.css";

const heroDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-hero-display",
});
export const metadata = {
  title: "EduLage — Quality education and training within your reach",
  description:
    "Explore degrees, professional programmes and short courses. Discover institution-led learning with flexible study options and local support through GOE Centers.",
};
const pathways = [
  {
    level: "Undergraduate",
    title: "Undergraduate",
    detail: "BEGIN WITH POSSIBILITY",
    text: "Build a foundation for the future you want.",
    icon: GraduationCap,
    companion: BookOpen,
    label: "Explore degrees",
    colour: "mint",
  },
  {
    level: "Postgraduate",
    title: "Postgraduate",
    detail: "DEEPEN YOUR EXPERTISE",
    text: "Take your knowledge and ambition further.",
    icon: BookOpen,
    companion: Award,
    label: "Explore postgraduate study",
    colour: "blue",
  },
  {
    level: "Doctoral",
    title: "Doctoral research",
    detail: "ASK THE NEXT QUESTION",
    text: "Discover research-led paths to new knowledge.",
    icon: Microscope,
    companion: Orbit,
    label: "Explore doctoral study",
    colour: "peach",
  },
  {
    level: "Professional",
    title: "Professional learning",
    detail: "GROW WITH YOUR INDUSTRY",
    text: "Develop practical skills for your working life.",
    icon: BriefcaseBusiness,
    companion: Sparkles,
    label: "Explore professional courses",
    colour: "gold",
  },
];
const steps = [
  {
    title: "Explore",
    text: "Find a qualification and discipline that match your goals.",
    href: "/#programmes-courses",
    label: "Find a programme",
    icon: Compass,
  },
  {
    title: "Compare",
    text: "Look at the study format, duration and listed fees.",
    href: "/programmes",
    label: "Compare your options",
    icon: Scale,
  },
  {
    title: "Choose",
    text: "Confirm requirements, recognition and costs with the institution.",
    href: "/study-types",
    label: "Understand your options",
    icon: ListChecks,
  },
  {
    title: "Apply or enrol",
    text: "Follow the programme’s confirmed application pathway.",
    href: "/help",
    label: "Get application guidance",
    icon: Send,
  },
  {
    title: "Learn",
    text: "Enter your classroom and make learning part of your life.",
    href: learnLinks.signIn,
    label: "Go to your classroom",
    icon: Laptop,
  },
];

export default async function Home() {
  const catalogue = await getCatalogue();
  return (
    <div className={`ed-home ${heroDisplay.variable}`}>
      <section className="ed-hero" aria-labelledby="hero-title">
        <div className="ed-wrap ed-hero-grid">
          <div className="ed-hero-copy">
            <p className="ed-eyebrow">
              <span />
              THE GLOBAL EDUCATION VILLAGE
            </p>
            <h1 id="hero-title">
              <span className="ed-headline-lead">Quality education{" "}<br />and training</span>{" "}
              <span className="ed-headline-context">from reputable institutions globally</span>{" "}
              <em className="ed-headline-promise"><span className="ed-headline-dash">— </span>within your reach.</em>
            </h1>
            <p className="ed-intro">
              Explore degree, postgraduate and professional programmes. Compare
              institutions and study options, then choose an online or locally
              supported learning pathway.
            </p>
            <div className="ed-actions">
              <Link className="ed-btn" href="#programmes-courses">
                Explore programmes <Search size={17} />
              </Link>
              <Link className="ed-text-link" href="#how-it-works">
                How EduLage works
              </Link>
            </div>
            <div className="ed-hero-note">
              <span className="ed-note-icon">
                <Globe2 size={19} />
              </span>
              <span>
                Your ambition.
                <br />
                <strong>A world of possibility.</strong>
              </span>
            </div>
          </div>
          <figure className="ed-hero-artwork">
            <Image
              src="/illustrations/hero-global-learners.webp"
              alt="Illustrative collage of a confident learner holding a laptop, a multicultural study group and a university graduate"
              width={1254}
              height={1254}
              preload
              sizes="(max-width: 800px) 92vw, (max-width: 1400px) 45vw, 600px"
            />
            <figcaption>
              <span className="ed-hero-artwork-icon" aria-hidden="true">
                <BookOpen size={23} />
              </span>
              <span>
                <span className="ed-hero-artwork-kicker">LEARNING OPENS DOORS</span>
                <strong>Your next chapter starts with you.</strong>
              </span>
              <Globe2 className="ed-hero-artwork-globe" size={30} aria-hidden="true" />
            </figcaption>
          </figure>
          <form
            className="ed-search"
            action="/programmes"
            role="search"
            aria-label="Find a programme"
          >
            <div className="ed-search-title">
              <Compass size={26} />
              <span>
                FIND YOUR
                <br />
                <strong>next chapter</strong>
              </span>
            </div>
            <label className="ed-search-query">
              <span>What would you like to learn?</span>
              <input
                name="query"
                placeholder="Try business, computing or an institution"
                type="search"
              />
            </label>
            <label>
              <span>Study level</span>
              <select name="level" defaultValue="">
                <option value="">All study levels</option>
                {pathways.map((p) => (
                  <option key={p.level} value={p.level}>
                    {p.title}
                  </option>
                ))}
                <option value="Short courses">Short courses</option>
              </select>
            </label>
            <button className="ed-btn" type="submit">
              Find programmes <Search size={17} />
            </button>
          </form>
        </div>
      </section>

      <section className="ed-assurance" aria-label="The EduLage approach">
        <div className="ed-wrap">
          {[
            [Landmark, "Institution-led education", "/institutions"],
            [Monitor, "Flexible study options", "/study-types"],
            [ShieldCheck, "Institution-issued credentials", "/verify"],
            [MapPin, "Local learning support", "/open-education-centers"],
          ].map(([Icon, label, href]) => {
            const I = Icon as typeof Landmark;
            return (
              <Link href={href as string} key={label as string}>
                <I size={22} />
                <span>{label as string}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="ed-pathways-section" aria-labelledby="pathways-title">
        <div className="ed-wrap ed-section">
          <div className="ed-section-head">
            <div>
              <p className="ed-eyebrow">01 / MAKE YOUR NEXT MOVE</p>
              <h2 id="pathways-title">
                Different ambitions.
                <br />
                <em>Extraordinary possibilities.</em>
              </h2>
            </div>
            <p>
              Starting out, specialising or changing direction.
              <br />
              Find the path that feels right for you.
            </p>
          </div>
          <div className="ed-pathways">
            {pathways.map(({ icon: Icon, companion: Companion, ...p }, i) => (
              <Link
                href={`/programmes?level=${p.level}`}
                className={`ed-pathway ed-pathway-${p.colour}`}
                key={p.level}
              >
                <div className="ed-pathway-art" aria-hidden="true">
                  <span className="ed-art-disc" />
                  <span className="ed-art-grid" />
                  <span className="ed-art-main">
                    <Icon size={66} strokeWidth={1.3} />
                  </span>
                  <span className="ed-art-companion">
                    <Companion size={25} strokeWidth={1.4} />
                  </span>
                  <span className="ed-art-index">0{i + 1}</span>
                </div>
                <div className="ed-pathway-body">
                  <p className="ed-small-label">{p.detail}</p>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <span className="ed-pathway-link">
                    {p.label}
                    <span aria-hidden="true">+</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="ed-short-path">
            <span className="ed-short-icon">
              <Sparkles size={25} />
            </span>
            <div>
              <strong>Small steps. Meaningful progress.</strong>
              <p>Explore focused courses for your next skill or interest.</p>
            </div>
            <Link
              href="/programmes?level=Short+courses"
              className="ed-text-link"
            >
              Discover short courses
            </Link>
          </div>
        </div>
      </section>

      <nav className="ed-section-nav" aria-label="Explore this page">
        <div className="ed-wrap">
          <span>KEEP EXPLORING</span>
          <a href="#programmes-courses">Programmes & courses</a>
          <a href="#institutions-trainers">Institutions & trainers</a>
          <a href="#centers-title">Local support</a>
          <a href="#how-it-works">How it works</a>
          <a href="#learner-questions">Common questions</a>
        </div>
      </nav>
      <div id="programmes-courses" className="ed-discovery-anchor">
        <Suspense
          fallback={
            <div className="ed-discovery">
              <p className="ed-wrap ed-section" role="status">
                Loading programme discovery…
              </p>
            </div>
          }
        >
          <ProgrammeExplorer courses={catalogue?.open_courses ?? []} />
        </Suspense>
      </div>
      <InstitutionShowcase live={catalogue?.institutions ?? []} />

      <section
        className="ed-experience-section"
        aria-labelledby="experience-title"
      >
        <div className="ed-wrap ed-section ed-experience">
          <div className="ed-experience-art">
            <Image
              src="/illustrations/connected-learners.webp"
              alt="Illustrative collage of an adult learner studying online and a diverse group collaborating, connected by a world map"
              width={1254}
              height={1254}
              sizes="(max-width:800px) 100vw, 48vw"
            />
            <span className="ed-art-caption">
              <Globe2 size={19} /> A WORLD OF LEARNING, CONNECTED.
            </span>
          </div>
          <div className="ed-experience-copy">
            <p className="ed-eyebrow">03 / THE EDULAGE EXPERIENCE</p>
            <h2 id="experience-title">
              Your education.
              <br />
              <em>A wider world.</em>
            </h2>
            <p className="ed-section-description">
              Learning is personal. Opportunity should be global. Discover an
              easier way to connect your ambition with the right education.
            </p>
            <div className="ed-principles">
              {[
                {
                  icon: Landmark,
                  href: "/institutions",
                  title: "Learn with an institution",
                  text: "Explore the provider behind your programme, teaching and qualification.",
                },
                {
                  icon: Compass,
                  href: "/study-types",
                  title: "Find your own direction",
                  text: "Choose qualifications, schedules and formats that fit your next step.",
                },
                {
                  icon: Award,
                  href: "/quality-and-trust",
                  title: "Understand your qualification",
                  text: "Know who awards it, what it means and how to check recognition.",
                },
              ].map(({ icon: Icon, ...p }) => (
                <Link className="ed-principle" href={p.href} key={p.title}>
                  <span>
                    <Icon size={23} />
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                  <span className="ed-principle-plus" aria-hidden="true">
                    +
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ed-center" aria-labelledby="centers-title">
        <div className="ed-wrap ed-center-grid">
          <div className="ed-center-content">
            <p className="ed-eyebrow">04 / OPPORTUNITY, CLOSER TO HOME</p>
            <h2 id="centers-title">
              Global learning.
              <br />
              <em>Local connection.</em>
            </h2>
            <p>
              Online learning, with a place to connect. Explore Global Open
              Education Centers for study facilities, guidance and
              institution-required assessments.
            </p>
            <div className="ed-center-services">
              <div>
                <Wifi size={24} />
                <span>
                  Connected
                  <br />
                  study spaces
                </span>
              </div>
              <div>
                <MessageCircle size={24} />
                <span>
                  Local learner
                  <br />
                  guidance
                </span>
              </div>
              <div>
                <ShieldCheck size={24} />
                <span>
                  Assessment
                  <br />
                  support
                </span>
              </div>
            </div>
            <p className="ed-center-note">
              Services, operational locations and examination approval must be
              confirmed for your programme.
            </p>
            <div className="ed-actions">
              <Link
                href="/open-education-centers"
                className="ed-btn ed-btn-light"
              >
                Explore GOE Centers
              </Link>
              <Link
                href="/open-education-centers#operate"
                className="ed-light-link"
              >
                Become a center partner
              </Link>
            </div>
          </div>
          <div className="ed-center-photo">
            <Image
              src="/media/oec-lab.jpg"
              alt="Learners using computers in a shared study space"
              fill
              sizes="(max-width:800px) 100vw, 50vw"
            />
            <div className="ed-center-photo-caption">
              <span className="ed-center-pin">
                <MapPin size={25} />
              </span>
              <p>
                Connected spaces.
                <br />
                <strong>Real human support.</strong>
              </p>
            </div>
            <div className="ed-center-image-corner" aria-hidden="true">
              <Wifi size={34} />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="ed-how" aria-labelledby="how-title">
        <div className="ed-wrap ed-section">
          <div className="ed-section-head">
            <div>
              <p className="ed-eyebrow">05 / A CLEAR WAY FORWARD</p>
              <h2 id="how-title">
                Big ambitions.
                <br />
                <em>Simple next steps.</em>
              </h2>
            </div>
            <p>
              You don’t need every answer to begin.
              <br />
              Start exploring. We’ll help you find your way.
            </p>
          </div>
          <ol className="ed-steps">
            {steps.map(({ icon: Icon, ...s }, i) => (
              <li key={s.title}>
                <div className="ed-step-visual">
                  <span className="ed-step-number">0{i + 1}</span>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link className="ed-step-link" href={s.href}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-partners-section" aria-labelledby="partner-title">
        <div className="ed-wrap ed-partners">
          <div className="ed-partner-graphic" aria-hidden="true">
            <Landmark size={62} strokeWidth={1.1} />
            <span />
            <Globe2 size={44} strokeWidth={1.1} />
          </div>
          <div className="ed-partner-copy">
            <p className="ed-eyebrow">BUILD POSSIBILITY TOGETHER</p>
            <h2 id="partner-title">
              Your expertise.
              <br />
              <em>A greater reach.</em>
            </h2>
            <p>
              Bring your institution, training organisation or partnership into
              a wider world of learning.
            </p>
          </div>
          <div className="ed-partner-options">
            <Link href="/for-institutions">
              <Landmark size={25} />
              <div>
                <h3>Institutions & training providers</h3>
                <p>Explore becoming a learning partner</p>
              </div>
              <span aria-hidden="true">+</span>
            </Link>
            <Link href="/goe">
              <Globe2 size={25} />
              <div>
                <h3>Governments & development partners</h3>
                <p>Discover the Global Open Education Initiative</p>
              </div>
              <span aria-hidden="true">+</span>
            </Link>
          </div>
        </div>
      </section>
      <LearnerFaq />
      <section className="ed-final">
        <div className="ed-wrap ed-final-grid">
          <div>
            <p className="ed-eyebrow">THE NEXT CHAPTER IS YOURS</p>
            <h2>
              Make room for
              <br />
              <em>what’s possible.</em>
            </h2>
            <p>One new skill. A different direction. A bigger ambition.</p>
            <div className="ed-actions">
              <Link href="/programmes" className="ed-btn">
                Explore programmes
              </Link>
              <a href={learnLinks.register} className="ed-outline-btn">
                Create free account
              </a>
            </div>
          </div>
          <div className="ed-final-art" aria-hidden="true">
            <div className="ed-final-arch" />
            <div className="ed-final-orbit" />
            <GraduationCap size={130} strokeWidth={0.9} />
            <span>
              YOUR WORLD
              <br />
              OF POSSIBILITY.
            </span>
            <Sparkles className="ed-final-star" size={42} />
          </div>
        </div>
      </section>
    </div>
  );
}
