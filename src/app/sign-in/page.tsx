import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Sign in", description: "Sign in to EduLage." };
export default function SignInPage() {
  return <section className="section-space bg-surface"><Container><div className="mx-auto max-w-md rounded-lg border border-line bg-white p-8"><h1 className="text-2xl font-bold text-navy-800">Sign in</h1><p className="mt-2 text-sm text-ink-600">Learner and institution accounts will be available in a later phase.</p><form className="mt-7 space-y-4"><label className="block text-sm font-semibold text-ink-600" htmlFor="email">Email<input id="email" type="email" className="mt-2 w-full rounded-md border border-line px-3 py-3 font-normal" /></label><label className="block text-sm font-semibold text-ink-600" htmlFor="password">Password<input id="password" type="password" className="mt-2 w-full rounded-md border border-line px-3 py-3 font-normal" /></label><button type="button" className="w-full rounded-md bg-navy-800 py-3 text-sm font-semibold text-white">Sign in</button></form><Link href="/about" className="mt-6 block text-center text-sm font-medium text-teal-600">Learn more about EduLage</Link></div></Container></section>;
}
