import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, GraduationCap, ShieldCheck, ShieldX, XCircle } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui/Container";
import { learnUrl } from "@/lib/site";

export const metadata = {
  title: "Credential verification",
  description: "Check an institution-issued credential recorded through EduLage.",
  robots: { index: false, follow: true },
};

const CREDENTIAL_ID = /^[a-f0-9]{32}$/i;

type Credential = {
  id: string;
  status: "valid" | "revoked";
  learner_name: string;
  course_title: string;
  institution: string;
  institution_code: string;
  programme_title: string;
  credential: string;
  issued_on: string;
  certificate_url: string;
};

type Lookup = { kind: "found"; credential: Credential } | { kind: "not_found" } | { kind: "unavailable" };

async function lookup(id: string): Promise<Lookup> {
  try {
    const res = await fetch(`${learnUrl}/edulage/api/v1/credentials/${id}/`, { cache: "no-store" });
    if (res.status === 404) return { kind: "not_found" };
    if (!res.ok) return { kind: "unavailable" };
    return { kind: "found", credential: (await res.json()) as Credential };
  } catch {
    return { kind: "unavailable" };
  }
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function VerifyCredential({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!CREDENTIAL_ID.test(id)) notFound();
  const result = await lookup(id.toLowerCase());

  return (
    <>
      <PageIntro
        eyebrow="Trust and records"
        title="Credential verification"
        description="Credentials are awarded and issued by the participating institution. EduLage holds the record so that it can be checked without transferring academic authority from the institution."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="rounded-2xl border border-line bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">Credential ID</p>
              <p className="mt-2 break-all font-mono text-lg text-ink-900">{id.toLowerCase()}</p>

              {result.kind === "found" && result.credential.status === "valid" && (
                <>
                  <div className="mt-6 flex items-start gap-3 rounded-xl bg-teal-600/10 p-4">
                    <ShieldCheck className="mt-0.5 shrink-0 text-teal-600" />
                    <div>
                      <p className="font-bold text-navy-800">Valid credential</p>
                      <p className="mt-1 text-sm text-ink-600">
                        This credential was issued by {result.credential.institution} and is recorded by EduLage.
                      </p>
                    </div>
                  </div>
                  <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                    {[
                      ["Awarded to", result.credential.learner_name],
                      ["Credential", result.credential.credential],
                      ["Course", result.credential.course_title],
                      ["Programme", result.credential.programme_title || "—"],
                      ["Awarding institution", result.credential.institution],
                      ["Issued on", formatDate(result.credential.issued_on)],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{label}</dt>
                        <dd className="mt-1 font-medium text-ink-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              {result.kind === "found" && result.credential.status === "revoked" && (
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-red-50 p-4">
                  <ShieldX className="mt-0.5 shrink-0 text-red-700" />
                  <div>
                    <p className="font-bold text-navy-800">Credential revoked</p>
                    <p className="mt-1 text-sm text-ink-600">
                      {result.credential.institution} has withdrawn this credential. It should not be relied upon;
                      contact the institution for details.
                    </p>
                  </div>
                </div>
              )}

              {result.kind === "not_found" && (
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface p-4">
                  <XCircle className="mt-0.5 shrink-0 text-ink-600" />
                  <div>
                    <p className="font-bold text-navy-800">No credential found</p>
                    <p className="mt-1 text-sm text-ink-600">
                      No issued credential matches this ID. Check the ID printed on the certificate; if you believe
                      this is an error, contact the awarding institution or EduLage learner support.
                    </p>
                  </div>
                </div>
              )}

              {result.kind === "unavailable" && (
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface p-4">
                  <Clock3 className="mt-0.5 shrink-0 text-teal-600" />
                  <div>
                    <p className="font-bold text-navy-800">Verification temporarily unavailable</p>
                    <p className="mt-1 text-sm text-ink-600">
                      We could not reach the credential record just now. Please try again in a few minutes.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {result.kind === "found" && (
                  <a
                    href={result.credential.certificate_url}
                    className="inline-flex rounded-xl bg-navy-800 px-5 py-3 text-sm font-bold text-white"
                  >
                    View certificate
                  </a>
                )}
                <Link
                  href="/help"
                  className={`inline-flex rounded-xl px-5 py-3 text-sm font-bold ${
                    result.kind === "found"
                      ? "border border-line text-navy-800"
                      : "bg-navy-800 text-white"
                  }`}
                >
                  Contact learner support
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                [GraduationCap, "Institution issued", "The awarding institution remains the authoritative source of this credential."],
                [ShieldCheck, "Recorded by EduLage", "EduLage keeps the record and assessment evidence behind the credential ID."],
                [Clock3, "Status explained", "The result shows whether the credential is valid or has been revoked by the institution."],
              ].map(([Icon, title, text]) => (
                <div key={title as string} className="flex gap-4 rounded-xl border border-line p-5">
                  <Icon className="shrink-0 text-teal-600" />
                  <div>
                    <h3 className="font-bold text-navy-800">{title as string}</h3>
                    <p className="mt-1 text-sm text-ink-600">{text as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
