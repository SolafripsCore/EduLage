"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <section className="py-24 md:py-32"><Container><div className="mx-auto max-w-2xl text-center">
    <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-500/10 text-teal-700"><AlertTriangle size={30} /></span>
    <p className="section-kicker mt-8">Something went wrong</p>
    <h1 className="mt-3 text-3xl font-bold text-navy-800 md:text-4xl">This page didn&apos;t load properly.</h1>
    <p className="mt-4 leading-7 text-ink-600">Please try again. If it keeps happening, let us know through the help centre{error.digest && <> and quote reference <code className="rounded bg-surface px-1.5 py-0.5 text-xs">{error.digest}</code></>}.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <button type="button" onClick={reset} className="rounded-md bg-navy-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-700">Try again</button>
      <Link href="/help" className="rounded-md border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-800 hover:border-navy-800">Help centre</Link>
      <Link href="/" className="rounded-md border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-800 hover:border-navy-800">Home</Link>
    </div>
  </div></Container></section>;
}
