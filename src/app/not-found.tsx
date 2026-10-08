import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
export default function NotFound() {
  return <section className="py-24 md:py-32"><Container><div className="mx-auto max-w-2xl text-center">
    <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-500/10 text-teal-700"><Compass size={30} /></span>
    <p className="section-kicker mt-8">Page not found</p>
    <h1 className="mt-3 text-3xl font-bold text-navy-800 md:text-4xl">We couldn&apos;t find that page.</h1>
    <p className="mt-4 leading-7 text-ink-600">The link may be out of date, or the programme or institution may have moved. Try one of these instead.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link href="/programmes" className="rounded-md bg-navy-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-700">Browse programmes</Link>
      <Link href="/institutions" className="rounded-md border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-800 hover:border-navy-800">Institutions</Link>
      <Link href="/help" className="rounded-md border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-800 hover:border-navy-800">Help centre</Link>
      <Link href="/" className="rounded-md border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-800 hover:border-navy-800">Home</Link>
    </div>
  </div></Container></section>;
}
