"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";

const mainLinks = [
  ["About", "/about"],
];

const catalogueLinks = [
  ["Programmes", "/programmes"],
  ["Institutions", "/institutions"],
];

const utilityLinks = [
  ["For institutions", "/for-institutions"],
  ["Open Education Centers", "/open-education-centers"],
  ["GOE Initiative", "/goe"],
  ["Verify a credential", "/verify"],
];

const studyTypeLinks = [
  ["Bachelor's degrees", "/programmes?level=Undergraduate"],
  ["Master's degrees", "/programmes?level=Postgraduate"],
  ["Doctoral / PhD", "/programmes?level=Doctoral"],
  ["Professional diplomas & certificates", "/programmes?level=Professional"],
  ["Fully online", "/programmes?mode=Fully+online"],
  ["Online + OEC exams", "/programmes?mode=Online+%2B+OEC+exams"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStudyOpen(false);
        setSearchOpen(false);
        setOpen(false);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setStudyOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const showSearch = () => {
    setSearchOpen((value) => !value);
    setStudyOpen(false);
    setOpen(false);
  };

  return <><div className="hidden h-9 bg-navy-900 text-xs text-white/70 lg:block"><div className="container-page flex h-full items-center justify-between"><span>Global education infrastructure for accredited institutions</span><div className="flex items-center divide-x divide-white/20"><>{utilityLinks.map(([label, href], index) => <Link key={href} href={href} className={`${index ? "pl-4" : ""} pr-4 last:pr-0 hover:text-white focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-teal-400`}>{label}</Link>)}</></div></div></div><header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-white">
    <div className="container-page flex h-[72px] items-center justify-between gap-5">
      <Link href="/" aria-label="Edulage home" className="shrink-0"><Image src="/brand/edulage-logo.png" alt="Edulage" width={150} height={54} className="h-11 w-[122px] object-contain md:h-[54px] md:w-[150px]" priority /></Link>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
        {mainLinks.map(([label, href]) => <Link key={href} href={href} className="rounded-sm text-sm font-medium text-ink-600 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">{label}</Link>)}
        <div className="relative">
          <button type="button" className="flex items-center gap-1 rounded-sm text-sm font-medium text-ink-600 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500" aria-expanded={studyOpen} aria-haspopup="menu" aria-controls="study-types-menu" onClick={() => { setStudyOpen((value) => !value); setSearchOpen(false); }}>{`Study types`}<ChevronDown size={15} className={`transition-transform ${studyOpen ? "rotate-180" : ""}`} /></button>
          {studyOpen && <div id="study-types-menu" role="menu" className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-xl border border-line bg-white p-2 shadow-xl">
            {studyTypeLinks.map(([label, href]) => <Link role="menuitem" key={href} href={href} onClick={() => setStudyOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-ink-600 hover:bg-surface hover:text-navy-800 focus-visible:bg-surface focus-visible:text-navy-800 focus-visible:outline-none">{label}</Link>)}
            <div className="mt-2 border-t border-line pt-2"><Link role="menuitem" href="/study-types" onClick={() => setStudyOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-teal-600 hover:bg-teal-500/10 focus-visible:bg-teal-500/10 focus-visible:outline-none">Compare all study types <span aria-hidden>→</span></Link></div>
          </div>}
        </div>
        {catalogueLinks.map(([label, href]) => <Link key={href} href={href} className="rounded-sm text-sm font-medium text-ink-600 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-2 md:flex">
        <button type="button" aria-label="Search programmes" aria-expanded={searchOpen} aria-controls="header-search-panel" onClick={showSearch} className="rounded-md p-2 text-ink-600 hover:bg-surface hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"><Search size={19} /></button>
        <Button href="/sign-in" variant="secondary" className="px-3 py-2">Sign in</Button>
        <Button href="/for-institutions" className="px-3 py-2">Get started</Button>
      </div>
      <button className="rounded-md p-2 text-navy-800 md:hidden" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={24} /></button>
    </div>
    {searchOpen && <div id="header-search-panel" className="border-t border-line bg-white shadow-lg"><div className="container-page py-4"><form action="/programmes" className="flex gap-2"><label htmlFor="header-search" className="sr-only">Search programmes</label><input id="header-search" name="q" autoFocus placeholder="Search programmes, disciplines or institutions" className="min-h-11 min-w-0 flex-1 rounded-md border border-line px-4 text-sm text-navy-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" /><Button type="submit">Search</Button></form></div></div>}
    {open && <div className="fixed inset-0 z-50 bg-white p-6 md:hidden">
      <div className="flex items-center justify-between"><Link href="/" onClick={() => setOpen(false)}><Image src="/brand/edulage-logo.png" alt="Edulage" width={150} height={54} className="h-11 w-[122px] object-contain" /></Link><button onClick={() => setOpen(false)} aria-label="Close navigation" className="rounded-md p-2 text-navy-800"><X size={25} /></button></div>
      <nav className="mt-10 flex flex-col gap-5" aria-label="Mobile navigation"><Link href="/about" onClick={() => setOpen(false)} className="border-b border-line pb-4 text-lg font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">About</Link><Link href="/programmes" onClick={() => setOpen(false)} className="border-b border-line pb-4 text-lg font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">Programmes</Link><Link href="/institutions" onClick={() => setOpen(false)} className="border-b border-line pb-4 text-lg font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">Institutions</Link><p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">Study types</p>{studyTypeLinks.slice(0, 4).map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="-mt-2 border-b border-line pb-4 text-base font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">{label}</Link>)}<p className="pt-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-600">More</p>{utilityLinks.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="-mt-2 border-b border-line pb-4 text-base font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">{label}</Link>)}<button type="button" onClick={showSearch} className="border-b border-line pb-4 text-left text-base font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500">Search programmes</button></nav>
      <div className="mt-8 flex gap-3"><Button href="/sign-in" variant="secondary" className="flex-1">Sign in</Button><Button href="/for-institutions" className="flex-1">Get started</Button></div>
    </div>}
  </header></>;
}
