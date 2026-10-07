import Link from "next/link";
import Image from "next/image";
import {
  Clock3,
  Languages,
  Monitor,
  Award,
  ShieldCheck,
  Check,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getInstitutionProgrammes, getProgrammeBySlug } from "@/lib/catalog";
import { institutionById } from "@/data/institutions";
import { programmes } from "@/data/programmes";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { learnLinks } from "@/lib/site";
import { EnrolCta } from "@/components/EnrolCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProgrammeBySlug((await params).slug);
  return {
    title: p?.title ?? "Programme",
    description: p
      ? `Explore ${p.title}: structure, entry requirements, study format and listed fees.`
      : "Programme details",
  };
}
export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}
export default async function ProgrammeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProgrammeBySlug((await params).slug);
  if (!p) notFound();
  const institution = institutionById.get(p.institutionId);
  if (!institution) notFound();
  const tuition = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: p.tuitionCurrency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(p.tuitionFrom);
  const siblings = getInstitutionProgrammes(institution.id)
    .filter((s) => s.id !== p.id)
    .slice(0, 3);
  return (
    <div className="programme-detail">
      <section className="detail-hero">
        <div className="container-page">
          <nav className="detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/programmes">Programmes</Link>
            <span>/</span>
            <span aria-current="page">{p.title}</span>
          </nav>
          <div className="detail-hero-grid">
            <div>
              <Link
                href={`/institutions/${institution.slug}`}
                className="detail-institution"
              >
                <Image src={institution.logo} alt="" width={46} height={46} />
                <span>
                  {institution.name}
                  <small>
                    {institution.city}, {institution.country}
                  </small>
                </span>
              </Link>
              <p className="detail-eyebrow">
                {p.level} · {p.credential}
              </p>
              <h1>{p.title}</h1>
              <p className="detail-hero-description">
                Explore the curriculum, understand the requirements and decide
                whether this programme fits your next step.
              </p>
              <div className="detail-hero-tags">
                <span>{p.studyMode}</span>
                <span>{p.deliveryMode.replace("OEC", "GOE Center")}</span>
              </div>
            </div>
            <div className="detail-photo">
              <Image
                src={p.image}
                alt={`Subject imagery for ${p.title}`}
                fill
                priority
                sizes="(max-width:800px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="detail-nav">
        <nav className="container-page" aria-label="Programme sections">
          <a href="#overview">Overview</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#requirements">Entry requirements</a>
          <a href="#assessment">Assessment</a>
          <a href="#fees">Fees & next steps</a>
        </nav>
      </div>
      <div className="container-page detail-layout">
        <div className="detail-main">
          {!p.courseId && (
            <div className="detail-preview">
              <ShieldCheck size={22} />
              <div>
                <strong>Programme catalogue preview</strong>
                <p>
                  This is a sample listing. Institutional participation,
                  curriculum, fees and intake dates need confirmation before you
                  apply.
                </p>
              </div>
            </div>
          )}
          <section id="overview">
            <p className="detail-section-number">01 / THE OPPORTUNITY</p>
            <h2>See the bigger picture.</h2>
            <p>
              This listing brings together key information about {p.title},
              including its study format, curriculum and entry requirements.
              Review the details with {institution.name} before making an
              application.
            </p>
            <div className="detail-facts">
              {[
                { icon: Award, label: "Qualification", value: p.credential },
                {
                  icon: Clock3,
                  label: "Duration",
                  value: `${p.durationMonths} months`,
                },
                { icon: Monitor, label: "Schedule", value: p.studyMode },
                {
                  icon: Languages,
                  label: "Teaching language",
                  value: p.language,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <Icon size={21} />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>
          <section id="curriculum">
            <p className="detail-section-number">02 / WHAT YOU WILL STUDY</p>
            <h2>A closer look at the curriculum.</h2>
            <p>
              Explore the listed areas of study. The institution confirms the
              final module structure and learning requirements.
            </p>
            <ol className="detail-modules">
              {p.modules.map((m, i) => (
                <li key={m}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{m}</h3>
                  <BookMark />
                </li>
              ))}
            </ol>
          </section>
          <section id="requirements">
            <p className="detail-section-number">03 / YOUR STARTING POINT</p>
            <h2>Entry requirements.</h2>
            <ul className="detail-checklist">
              {p.entryRequirements.map((r) => (
                <li key={r}>
                  <Check size={19} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className="detail-note">
              Admissions decisions and any additional eligibility requirements
              remain with the institution.
            </p>
          </section>
          <section id="assessment">
            <p className="detail-section-number">
              04 / HOW LEARNING IS ASSESSED
            </p>
            <h2>Demonstrate what you know.</h2>
            <p>{p.assessmentNote}</p>
            {p.requiresOecExam && (
              <div className="detail-support">
                <ShieldCheck size={25} />
                <div>
                  <h3>Local assessment support</h3>
                  <p>
                    Check whether a GOE Center is required for examinations and
                    which locations are approved for this programme.
                  </p>
                  <Link href="/open-education-centers">
                    Explore GOE Centers
                  </Link>
                </div>
              </div>
            )}
          </section>
          <section className="detail-faq">
            <h2>Before you take the next step.</h2>
            {[
              [
                "Who awards the qualification?",
                `Confirm the awarding institution and the qualification’s recognition directly with ${institution.name}. EduLage connects learners with institutions; admissions, teaching and qualifications remain institution-led.`,
              ],
              [
                "What costs should I confirm?",
                "Ask for current tuition, application and assessment fees, payment terms and any additional study costs before paying.",
              ],
              [
                "How do I apply?",
                "Use the enrolment or admissions option shown for the programme. If a confirmed application link is unavailable, request guidance before creating an application.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
        </div>
        <aside id="fees" className="detail-enrol">
          <p className="detail-eyebrow">PLAN YOUR NEXT STEP</p>
          <h2>Programme at a glance</h2>
          <div className="detail-price">
            <span>Listed tuition from</span>
            <strong>{p.tuitionFrom > 0 ? tuition : "To be confirmed"}</strong>
            <small>per {p.tuitionPeriod} · subject to confirmation</small>
          </div>
          <dl>
            <div>
              <dt>Qualification</dt>
              <dd>{p.credential}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{p.durationMonths} months</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{p.deliveryMode.replace("OEC", "GOE Center")}</dd>
            </div>
            <div>
              <dt>Listed intake</dt>
              <dd>{p.nextIntake}</dd>
            </div>
          </dl>
          <p className="detail-note">{p.tuitionNote}</p>
          <EnrolCta courseId={p.courseId} institutionName={institution.name} />
          <div className="detail-already">
            <span>Already admitted?</span>
            <a href={learnLinks.signIn}>Sign in to your classroom</a>
          </div>
        </aside>
      </div>
      {siblings.length > 0 && (
        <section className="detail-related">
          <div className="container-page">
            <p className="detail-eyebrow">KEEP EXPLORING</p>
            <h2>More from {institution.name}.</h2>
            <div>
              {siblings.map((s) => (
                <ProgrammeCard key={s.id} programme={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
function BookMark() {
  return (
    <span className="detail-module-mark" aria-hidden="true">
      MODULE
    </span>
  );
}
