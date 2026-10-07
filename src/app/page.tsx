import Image from "next/image";
import Link from "next/link";
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
  Check,
  Award,
} from "lucide-react";
import { getCatalogue, enrolUrl, priceLabel } from "@/lib/liveCatalogue";
import { getFeaturedProgrammes } from "@/lib/catalog";
import { learnLinks } from "@/lib/site";
import "./home.css";
import { ProgrammeCard } from "@/components/ProgrammeCard";

export const metadata = {
  title: "EduLage — Quality education, within your reach",
  description:
    "Explore degrees, professional programmes and short courses. Discover institution-led learning with flexible study options and local support through GOE Centers.",
};

const pathways = [
  {
    level: "Undergraduate",
    title: "Undergraduate",
    detail: "Build your foundation",
    text: "Find a degree that opens up your next chapter.",
    icon: GraduationCap,
    label: "Explore degrees",
  },
  {
    level: "Postgraduate",
    title: "Postgraduate",
    detail: "Go further in your field",
    text: "Deepen your expertise with advanced study.",
    icon: BookOpen,
    label: "Explore postgraduate study",
  },
  {
    level: "Doctoral",
    title: "Doctoral research",
    detail: "Contribute new knowledge",
    text: "Discover research-led paths in your discipline.",
    icon: Microscope,
    label: "Explore doctoral study",
  },
  {
    level: "Professional",
    title: "Professional learning",
    detail: "Keep moving forward",
    text: "Develop practical skills for your working life.",
    icon: BriefcaseBusiness,
    label: "Explore professional courses",
  },
];
const steps = [
  [
    "Find your programme",
    "Explore subjects, institutions and qualifications that fit your goals.",
  ],
  [
    "Enrol or apply",
    "Join an open course, or apply through the institution’s admissions process.",
  ],
  [
    "Make learning part of life",
    "Access your courses and follow your institution’s study schedule.",
  ],
  [
    "Earn your credential",
    "Complete the requirements for an institution-issued qualification.",
  ],
];

export default async function Home() {
  const catalogue = await getCatalogue();
  const courses = catalogue?.open_courses.slice(0, 3) ?? [];
  const featured = getFeaturedProgrammes(Math.max(0, 3 - courses.length));
  return (
    <div className="ed-home">
      <section className="ed-hero" aria-labelledby="hero-title">
        <div className="ed-wrap ed-hero-grid">
          <div className="ed-hero-copy">
            <p className="ed-eyebrow">
              <span /> THE GLOBAL EDUCATION VILLAGE
            </p>
            <h1 id="hero-title">
              Quality education
              <br />
              and training from
              <br />
              reputable institutions.
              <br />
              <em>Wherever you are.</em>
            </h1>
            <p className="ed-intro">
              Discover degrees, professional programmes and short courses.
              Connect with institutions, explore your options and find a way to
              learn that fits your life.
            </p>
            <div className="ed-actions">
              <Link className="ed-btn" href="/programmes">
                Explore programmes
              </Link>
              <Link className="ed-text-link" href="#how-it-works">
                How EduLage works
              </Link>
            </div>
            <div className="ed-hero-note">
              <Globe2 size={18} />
              <span>Global learning. A world of possibility.</span>
            </div>
          </div>
          <form
            className="ed-search"
            action="/programmes"
            role="search"
            aria-label="Find a programme"
          >
            <div className="ed-search-title">
              <Search size={22} />
              <span>
                Find your
                <br />
                <strong>next chapter</strong>
              </span>
            </div>
            <label className="ed-search-query">
              <span>What would you like to learn?</span>
              <input
                name="query"
                placeholder="Subject, programme or institution"
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
              </select>
            </label>
            <button className="ed-btn" type="submit">
              Find programmes
            </button>
          </form>
          <div
            className="ed-hero-editorial"
            aria-label="Learning wherever life takes you"
          >
            <div className="ed-photo ed-photo-primary">
              <Image
                src="/media/study-online.jpg"
                alt="Learner attending an online class from her study space"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 48vw"
              />
            </div>
            <div className="ed-editorial-caption">
              <span>YOUR WORLD. YOUR EDUCATION.</span>
              <p>
                A place for ambition.
                <br />A path to possibility.
              </p>
              <Link href="/study-types">Find your way to learn</Link>
            </div>
            <div className="ed-photo ed-photo-secondary">
              <Image
                src="/media/hero-learner-alt.jpg"
                alt="Student on campus holding a tablet"
                fill
                sizes="(max-width: 800px) 35vw, 185px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ed-assurance" aria-label="The EduLage approach">
        <div className="ed-wrap">
          <div>
            <Landmark />
            <span>Institution-led education</span>
          </div>
          <div>
            <Monitor />
            <span>Flexible study options</span>
          </div>
          <div>
            <ShieldCheck />
            <span>Institution-issued credentials</span>
          </div>
          <div>
            <MapPin />
            <span>Local learning support</span>
          </div>
        </div>
      </section>

      <section className="ed-section ed-wrap" aria-labelledby="pathways-title">
        <div className="ed-section-head">
          <div>
            <p className="ed-eyebrow">A PATH FOR EVERY AMBITION</p>
            <h2 id="pathways-title">Where will learning take you?</h2>
          </div>
          <p>
            Starting out, specialising or changing direction.
            <br />
            Choose the next step that’s right for you.
          </p>
        </div>
        <div className="ed-pathways">
          {pathways.map(({ icon: Icon, ...p }, i) => (
            <Link
              href={`/programmes?level=${p.level}`}
              className="ed-pathway"
              key={p.level}
            >
              <div className="ed-pathway-top">
                <Icon size={29} strokeWidth={1.4} />
                <span>0{i + 1}</span>
              </div>
              <p className="ed-small-label">{p.detail}</p>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="ed-pathway-link">{p.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ed-catalogue" aria-labelledby="programmes-title">
        <div className="ed-wrap ed-section">
          <div className="ed-section-head">
            <div>
              <p className="ed-eyebrow">EXPLORE THE POSSIBILITIES</p>
              <h2 id="programmes-title">Find something that moves you.</h2>
            </div>
            <Link className="ed-outline-btn" href="/programmes">
              Browse all programmes
            </Link>
          </div>
          <div className="ed-programmes">
            {courses.map((course) => (
              <article className="ed-programme" key={course.course_id}>
                <div className="ed-programme-image">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt=""
                      fill
                      sizes="(max-width:700px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <BookOpen size={52} strokeWidth={1} />
                  )}
                  <span>Open enrolment</span>
                </div>
                <div className="ed-programme-body">
                  <p className="ed-institution">{course.institution_name}</p>
                  <h3>{course.title}</h3>
                  <p className="ed-programme-type">
                    {course.classification === "professional"
                      ? "Professional certificate"
                      : "Certificate of completion"}
                  </p>
                  <div className="ed-programme-meta">
                    <span>Online learning</span>
                    <span>Open course</span>
                  </div>
                  <div className="ed-programme-bottom">
                    <div>
                      <small>Course fee</small>
                      <strong>{priceLabel(course)}</strong>
                    </div>
                    <a href={enrolUrl(course)}>Enrol now</a>
                  </div>
                </div>
              </article>
            ))}
            {featured.map((p) => (
              <ProgrammeCard
                key={p.id}
                programme={p}
                enrolmentLabel="Catalogue preview"
              />
            ))}
          </div>
          {featured.length > 0 && (
            <p className="ed-catalogue-note">
              Catalogue previews illustrate the study options. Institutional
              participation, programme availability and fees must be confirmed
              before applying.
            </p>
          )}
          <div className="ed-subjects">
            <span>Explore by interest</span>
            {[
              "Business & Management",
              "Data & AI",
              "Health & Medical Sciences",
              "Education",
            ].map((s) => (
              <Link
                href={`/programmes?discipline=${encodeURIComponent(s)}`}
                key={s}
              >
                {s === "Health & Medical Sciences" ? "Health sciences" : s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="ed-wrap ed-subject-section"
        aria-labelledby="subjects-title"
      >
        <div className="ed-section-head">
          <div>
            <p className="ed-eyebrow">FOLLOW YOUR CURIOSITY</p>
            <h2 id="subjects-title">Big ideas start with an interest.</h2>
          </div>
          <Link className="ed-text-link" href="/programmes">
            Explore every subject
          </Link>
        </div>
        <div className="ed-subject-grid">
          {[
            {
              name: "Business & Management",
              caption: "Lead teams. Build enterprises.",
              image: "business",
            },
            {
              name: "Data & AI",
              caption: "Make sense of a changing world.",
              image: "data",
            },
            {
              name: "Computer Science & IT",
              caption: "Create what comes next.",
              image: "computing",
            },
            {
              name: "Health & Medical Sciences",
              caption: "Put knowledge to work for people.",
              image: "health",
            },
            {
              name: "Education",
              caption: "Help others discover their potential.",
              image: "education",
            },
            {
              name: "Engineering",
              caption: "Turn complex challenges into progress.",
              image: "engineering",
            },
          ].map((subject) => (
            <Link
              href={`/programmes?discipline=${encodeURIComponent(subject.name)}`}
              key={subject.name}
            >
              <div className="ed-subject-photo">
                <Image
                  src={`/media/discipline-${subject.image}.jpg`}
                  alt=""
                  fill
                  sizes="(max-width:520px) 90vw, (max-width:800px) 45vw, 30vw"
                />
              </div>
              <div>
                <h3>{subject.name}</h3>
                <p>{subject.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="ed-section ed-wrap ed-experience"
        aria-labelledby="experience-title"
      >
        <div>
          <p className="ed-eyebrow">THE EDULAGE EXPERIENCE</p>
          <h2 id="experience-title">
            Your education.
            <br />
            <em>A wider world.</em>
          </h2>
          <p className="ed-section-description">
            An easier way to discover learning, connect with institutions and
            take your next step with confidence.
          </p>
          <Link className="ed-text-link" href="/about">
            Get to know EduLage
          </Link>
        </div>
        <div className="ed-principles">
          {[
            {
              icon: Landmark,
              title: "Learn with an institution",
              text: "Teaching, admissions and assessments remain with the institution you choose.",
            },
            {
              icon: BookOpen,
              title: "Choose a path that fits",
              text: "Compare qualifications, schedules and delivery formats before you commit.",
            },
            {
              icon: Award,
              title: "Make your learning count",
              text: "Understand who awards your credential and how it can be verified.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div className="ed-principle" key={title}>
              <Icon size={25} strokeWidth={1.4} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ed-center" aria-labelledby="centers-title">
        <div className="ed-center-photo">
          <Image
            src="/media/oec-lab.jpg"
            alt="Learners using computers in a shared study space"
            fill
            sizes="(max-width:800px) 100vw, 50vw"
          />
        </div>
        <div className="ed-center-content">
          <p className="ed-eyebrow">GLOBAL OPEN EDUCATION CENTERS</p>
          <h2 id="centers-title">
            Global opportunity.
            <br />
            <em>Support closer to home.</em>
          </h2>
          <p>
            Online learning, with a place to connect. Explore GOE Centers for
            study facilities, learner support and institution-required
            assessments.
          </p>
          <ul>
            <li>
              <Wifi size={18} />
              Connected learning spaces
            </li>
            <li>
              <BookOpen size={18} />
              Local guidance and support
            </li>
            <li>
              <ShieldCheck size={18} />
              Assessment facilities where available
            </li>
          </ul>
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
      </section>

      <section
        id="how-it-works"
        className="ed-wrap ed-section ed-how"
        aria-labelledby="how-title"
      >
        <div className="ed-section-head">
          <div>
            <p className="ed-eyebrow">A CLEAR WAY FORWARD</p>
            <h2 id="how-title">From curiosity to achievement.</h2>
          </div>
          <p>
            One account to begin.
            <br />A simple path to your learning journey.
          </p>
        </div>
        <ol className="ed-steps">
          {steps.map(([title, text], i) => (
            <li key={title}>
              <span className="ed-step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ed-wrap ed-partners" aria-labelledby="partner-title">
        <div>
          <p className="ed-eyebrow">FOR INSTITUTIONS & PARTNERS</p>
          <h2 id="partner-title">
            Bring your expertise
            <br />
            to a wider world.
          </h2>
          <p>
            Connect with learners through your institution’s own programmes,
            teaching and credentials.
          </p>
        </div>
        <div className="ed-partner-options">
          <Link href="/for-institutions">
            <Landmark size={24} />
            <div>
              <h3>Universities & training providers</h3>
              <p>Explore joining the EduLage network</p>
            </div>
            <span className="ed-option-mark">
              <Check size={16} />
            </span>
          </Link>
          <Link href="/goe">
            <Globe2 size={24} />
            <div>
              <h3>Governments & development partners</h3>
              <p>Discover the Global Open Education Initiative</p>
            </div>
            <span className="ed-option-mark">
              <Check size={16} />
            </span>
          </Link>
        </div>
      </section>

      <section className="ed-final">
        <div className="ed-wrap">
          <p className="ed-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>
            Make room for <em>what’s next.</em>
          </h2>
          <p>Find your programme. Take your first step.</p>
          <div className="ed-actions">
            <Link href="/programmes" className="ed-btn">
              Explore programmes
            </Link>
            <a href={learnLinks.register} className="ed-outline-btn">
              Create free account
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
