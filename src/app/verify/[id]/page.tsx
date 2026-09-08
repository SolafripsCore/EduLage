import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, GraduationCap, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Credential verification",
  description: "Check an institution-issued credential recorded through EduLage.",
  robots: { index: false, follow: true },
};

const CREDENTIAL_ID = /^[a-f0-9]{32}$/i;

export default async function VerifyCredential({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!CREDENTIAL_ID.test(id)) notFound();
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
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface p-4">
                <Clock3 className="mt-0.5 shrink-0 text-teal-700" />
                <div>
                  <p className="font-bold text-navy-800">Public lookup not yet active</p>
                  <p className="mt-1 text-sm text-ink-600">
                    Verification results are published once the awarding institution activates its authorised
                    verification records with EduLage. Until then, the credential page on the learning platform is the
                    reference copy; contact the institution or EduLage learner support to confirm it.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/help" className="inline-flex rounded-xl bg-navy-800 px-5 py-3 text-sm font-bold text-white">
                  Contact learner support
                </Link>
                <Link
                  href="/verify"
                  className="inline-flex rounded-xl border border-line px-5 py-3 text-sm font-bold text-navy-800"
                >
                  About verification
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                [GraduationCap, "Institution issued", "The awarding institution remains the authoritative source of this credential."],
                [ShieldCheck, "Recorded by EduLage", "EduLage keeps the record and assessment evidence behind the credential ID."],
                [Clock3, "Status explained", "Once active, the result shows valid, amended or revoked status where the institution provides it."],
              ].map(([Icon, title, text]) => (
                <div key={title as string} className="flex gap-4 rounded-xl border border-line p-5">
                  <Icon className="shrink-0 text-teal-700" />
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
