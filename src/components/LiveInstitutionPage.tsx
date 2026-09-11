import Link from "next/link";
import Image from "next/image";
import { BookOpen, Building2, Globe2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Checklist } from "@/components/ui/Checklist";
import { ctaLabel, type LiveInstitution } from "@/lib/liveInstitution";

export function LiveInstitutionPage({ institution }: { institution: LiveInstitution }) {
  const { courses } = institution;
  return (
    <>
      <div className="relative isolate overflow-hidden bg-navy-900 py-14 text-white">
        <Container>
          <Link href="/institutions" className="text-sm text-white/75">← All institutions</Link>
          <div className="mt-9 flex items-center gap-5">
            <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border-4 border-white bg-white p-2">
              {institution.logo ? (
                <Image src={institution.logo} alt={`${institution.code} mark`} width={80} height={52} className="size-full object-contain" unoptimized />
              ) : (
                <span className="text-lg font-bold text-navy-800">{institution.code}</span>
              )}
            </span>
            <div>
              {institution.country && <p className="text-sm text-teal-400">{institution.country}</p>}
              <h1 className="mt-1 text-3xl font-bold text-white md:text-5xl">{institution.name}</h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <ShieldCheck size={16} className="text-teal-400" />Partner institution on EduLage
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
          <main>
            <section className="grid gap-4 sm:grid-cols-3">
              {[
                [Building2, "Institutional identity", institution.country ? `${institution.name} · ${institution.country}` : institution.name],
                [ShieldCheck, "Academic authority", "Programmes, assessment and credentials are governed by the institution."],
                [BookOpen, "Programme availability", `${courses.length} ${courses.length === 1 ? "course" : "courses"} currently listed`],
              ].map(([Icon, title, text]) => (
                <article key={title as string} className="rounded-xl border border-line p-5">
                  <Icon className="text-teal-700" />
                  <h3 className="mt-4 text-sm font-bold text-navy-800">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-600">{text as string}</p>
                </article>
              ))}
            </section>
            <section className="mt-14">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-navy-800">Courses</h2>
                <span className="text-sm text-ink-400">{courses.length} listed</span>
              </div>
              {courses.length === 0 ? (
                <p className="mt-5 rounded-xl border border-dashed border-line p-6 text-sm leading-6 text-ink-600">
                  {institution.name} is preparing its first courses on EduLage. Check back soon.
                </p>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {courses.map((course) => (
                    <article key={course.course_id} className="flex flex-col overflow-hidden rounded-xl border border-line">
                      {course.image && (
                        <Image src={course.image} alt="" width={640} height={360} className="h-40 w-full object-cover" unoptimized />
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-xs font-bold uppercase tracking-wide text-teal-700">{course.classification || "Course"}</p>
                        <h3 className="mt-2 font-bold text-navy-800">{course.title}</h3>
                        {course.start && (
                          <p className="mt-2 text-sm text-ink-600">
                            Starts {new Date(course.start).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        )}
                        <a href={course.about_url} className="mt-auto pt-5 text-sm font-bold text-teal-700">
                          {ctaLabel(course)} →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
            <section className="mt-14">
              <h2 className="text-2xl font-bold text-navy-800">Academic responsibility</h2>
              <div className="mt-5">
                <Checklist items={[
                  "Academic standards and assessment remain under institutional governance.",
                  "Programme information, entry requirements and fees remain subject to institutional confirmation.",
                  "Credentials are issued solely by the institution; EduLage records and verifies them.",
                ]} />
              </div>
            </section>
          </main>
          <aside className="h-fit rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-28">
            <Globe2 className="text-teal-700" />
            <h2 className="mt-4 font-bold text-navy-800">Learn with {institution.name}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              Courses run on the institution&apos;s EduLage learning site. Sign in once; your EduLage account works everywhere.
            </p>
            <a href={`https://${institution.host}/dashboard`} className="mt-6 flex justify-center rounded-md bg-navy-800 px-4 py-3 text-sm font-semibold text-white">
              Go to learning site
            </a>
            {institution.website && (
              <a href={institution.website} className="mt-4 block text-center text-xs font-bold text-teal-700" rel="noopener">
                Institution website
              </a>
            )}
          </aside>
        </div>
      </Container>
    </>
  );
}
