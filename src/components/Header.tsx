"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";

const links = [
  ["Programmes", "/programmes"],
  ["Institutions", "/institutions"],
  ["Open Education Centers", "/open-education-centers"],
  ["For Institutions", "/for-institutions"],
  ["About", "/about"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-line bg-white">
    <div className="container-page flex h-[72px] items-center justify-between gap-5">
      <Link href="/" aria-label="Edulage home" className="shrink-0"><Image src="/brand/edulage-logo.png" alt="Edulage" width={150} height={54} className="h-11 w-[122px] object-contain md:h-[54px] md:w-[150px]" priority /></Link>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-medium text-ink-600 hover:text-navy-800">{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-2 md:flex">
        <Link href="/verify" aria-label="Search or verify" className="rounded-md p-2 text-ink-600 hover:bg-surface hover:text-navy-800"><Search size={19} /></Link>
        <Button href="/sign-in" variant="secondary" className="px-3 py-2">Sign in</Button>
        <Button href="/for-institutions" className="px-3 py-2">Get started</Button>
      </div>
      <button className="rounded-md p-2 text-navy-800 md:hidden" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={24} /></button>
    </div>
    {open && <div className="fixed inset-0 z-50 bg-white p-6 md:hidden">
      <div className="flex items-center justify-between"><Link href="/" onClick={() => setOpen(false)}><Image src="/brand/edulage-logo.png" alt="Edulage" width={150} height={54} className="h-11 w-[122px] object-contain" /></Link><button onClick={() => setOpen(false)} aria-label="Close navigation" className="rounded-md p-2 text-navy-800"><X size={25} /></button></div>
      <nav className="mt-10 flex flex-col gap-5" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-line pb-4 text-lg font-semibold text-navy-800">{label}</Link>)}<Link href="/verify" onClick={() => setOpen(false)} className="border-b border-line pb-4 text-lg font-semibold text-navy-800">Verify a credential</Link></nav>
      <div className="mt-8 flex gap-3"><Button href="/sign-in" variant="secondary" className="flex-1">Sign in</Button><Button href="/for-institutions" className="flex-1">Get started</Button></div>
    </div>}
  </header>;
}
