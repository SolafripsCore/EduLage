import { SearchCheck } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Verify a credential", description: "Credential verification on Edulage will launch with the first credential-issuing cohort." };
export default function VerifyPage() {
  return <><PageIntro eyebrow="Trust and records" title="Verify an Edulage-hosted credential" description="Use a credential ID to check a record issued by a participating institution." /><section className="section-space"><Container><div className="mx-auto max-w-xl rounded-lg border border-line p-8 text-center"><SearchCheck size={38} className="mx-auto text-teal-600" strokeWidth={1.5} /><h2 className="mt-5 text-2xl font-bold text-navy-800">Verification is coming soon</h2><p className="mt-3 leading-7 text-ink-600">Credential verification launches with the first credential-issuing cohort. No credentials are available to verify in this preview build.</p><form className="mt-7 flex gap-2"><label htmlFor="verify-id" className="sr-only">Enter credential ID</label><input id="verify-id" name="id" placeholder="Enter credential ID" className="min-w-0 flex-1 rounded-md border border-line px-4 py-3 text-sm" /><button className="rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-white">Verify</button></form></div></Container></section></>;
}
