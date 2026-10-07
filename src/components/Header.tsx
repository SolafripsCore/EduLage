"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AccountControls } from "./AccountControls";
import { Button } from "./ui/Button";

const mainLinks = [
  ["Programmes", "/programmes"],
  ["Institutions", "/institutions"],
];

const catalogueLinks = [
  ["For institutions", "/for-institutions"],
  ["About", "/about"],
];

const utilityLinks = [
  ["GOE Centers", "/open-education-centers"],
  ["Quality & trust", "/quality-and-trust"],
  ["Help & Support", "/help"],
  ["Verify a credential", "/verify"],
];

const studyTypeLinks = [
  ["Bachelor's degrees", "/programmes?level=Undergraduate"],
  ["Postgraduate study", "/programmes?level=Postgraduate"],
  ["Doctoral / PhD", "/programmes?level=Doctoral"],
  ["Professional diplomas & certificates", "/programmes?level=Professional"],
  ["Short courses", "/programmes?level=Short+courses"],
  ["Fully online", "/programmes?mode=Fully+online"],
  ["Online + GOE Center exams", "/programmes?mode=Online+%2B+OEC+exams"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDialogElement>(null);
  const studyTriggerRef = useRef<HTMLButtonElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const closePanels = () => {
    setOpen(false);
    setStudyOpen(false);
    setSearchOpen(false);
  };

  useEffect(() => {
    const dialog = mobileRef.current;
    if (open && !dialog?.open) dialog?.showModal();
    else if (!open && dialog?.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (studyOpen) studyTriggerRef.current?.focus();
        else if (searchOpen) searchTriggerRef.current?.focus();
        setStudyOpen(false);
        setSearchOpen(false);
        setOpen(false);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
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
  }, [studyOpen, searchOpen]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const showSearch = () => {
    setSearchOpen((value) => !value);
    setStudyOpen(false);
    setOpen(false);
  };

  return (
    <>
      <div className="hidden h-9 bg-[#102f36] text-xs text-white/80 lg:block">
        <div className="container-page flex h-full items-center justify-between">
          <span>The Global Education Village</span>
          <div className="flex items-center divide-x divide-white/20">
            <>
              {utilityLinks.map(([label, href], index) => (
                <Link
                  key={href}
                  href={href}
                  className={`${index ? "pl-4" : ""} pr-4 last:pr-0 hover:text-white focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-teal-400`}
                >
                  {label}
                </Link>
              ))}
            </>
          </div>
        </div>
      </div>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-[#e0e7e2] bg-white/95 backdrop-blur-md"
      >
        <div className="container-page flex h-[82px] items-center justify-between gap-5">
          <Link href="/" aria-label="EduLage home" className="shrink-0">
            <Image
              src="/brand/edulage-logo.png"
              alt="EduLage"
              width={150}
              height={54}
              className="h-11 w-[122px] object-contain md:h-[54px] md:w-[150px]"
              priority
            />
          </Link>
          <nav
            className="hidden items-center gap-5 lg:flex"
            aria-label="Main navigation"
          >
            {mainLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                onClick={closePanels}
                className="ed-nav-link rounded-sm text-sm font-medium text-ink-600 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {label}
              </Link>
            ))}
            <div className="relative">
              <button
                ref={studyTriggerRef}
                type="button"
                className="flex items-center gap-1 rounded-sm text-sm font-medium text-ink-600 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-expanded={studyOpen}
                aria-controls="study-types-menu"
                onClick={() => {
                  setStudyOpen((value) => !value);
                  setSearchOpen(false);
                }}
              >
                {`Study types`}
                <ChevronDown
                  size={15}
                  className={`transition-transform ${studyOpen ? "rotate-180" : ""}`}
                />
              </button>
              {studyOpen && (
                <div
                  id="study-types-menu"
                  className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-xl border border-line bg-white p-2 shadow-xl"
                >
                  {studyTypeLinks.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setStudyOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-ink-600 hover:bg-surface hover:text-navy-800 focus-visible:bg-surface focus-visible:text-navy-800 focus-visible:outline-none"
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="mt-2 border-t border-line pt-2">
                    <Link
                      href="/study-types"
                      onClick={() => setStudyOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-teal-600 hover:bg-teal-500/10 focus-visible:bg-teal-500/10 focus-visible:outline-none"
                    >
                      Compare all study types
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {catalogueLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                onClick={closePanels}
                className="ed-nav-link rounded-sm text-sm font-medium text-ink-600 hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              ref={searchTriggerRef}
              type="button"
              aria-label="Search programmes"
              aria-expanded={searchOpen}
              aria-controls="header-search-panel"
              onClick={showSearch}
              className="rounded-md p-2 text-ink-600 hover:bg-surface hover:text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Search size={19} />
            </button>
            <AccountControls />
          </div>
          <button
            className="rounded-md p-2 text-navy-800 lg:hidden"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => {
              setStudyOpen(false);
              setSearchOpen(false);
              setOpen(true);
            }}
          >
            <Menu size={24} />
          </button>
        </div>
        {searchOpen && (
          <div
            id="header-search-panel"
            className="border-t border-line bg-white shadow-lg"
          >
            <div className="container-page py-4">
              <form action="/programmes" className="flex gap-2">
                <label htmlFor="header-search" className="sr-only">
                  Search programmes
                </label>
                <input
                  id="header-search"
                  name="q"
                  autoFocus
                  placeholder="Search programmes, disciplines or institutions"
                  className="min-h-11 min-w-0 flex-1 rounded-md border border-line px-4 text-sm text-navy-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
          </div>
        )}
        <dialog
          ref={mobileRef}
          id="mobile-navigation"
          aria-label="Navigation"
          onClose={() => setOpen(false)}
          className="ed-mobile-dialog"
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image
                  src="/brand/edulage-logo.png"
                  alt="EduLage"
                  width={150}
                  height={54}
                  className="h-11 w-[122px] object-contain"
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-md p-2 text-navy-800"
              >
                <X size={25} />
              </button>
            </div>
            <nav
              className="mt-8 flex flex-col gap-4 pb-4"
              aria-label="Mobile navigation"
            >
              {[...mainLinks, ...catalogueLinks].map(([label, href]) => (
                <Link
                  key={`${label}-${href}`}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="border-b border-line pb-3 text-lg font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {label}
                </Link>
              ))}
              <p className="pt-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-600">
                Study options
              </p>
              {studyTypeLinks.slice(0, 5).map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="-mt-1 border-b border-line pb-3 text-base font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {label}
                </Link>
              ))}
              <p className="pt-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-600">
                More
              </p>
              {utilityLinks.map(([label, href]) => (
                <Link
                  key={`${label}-${href}`}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="-mt-1 border-b border-line pb-3 text-base font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={showSearch}
                className="border-b border-line pb-3 text-left text-base font-semibold text-navy-800 focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                Search programmes
              </button>
            </nav>
            <div className="sticky bottom-0 mt-5 flex gap-3 border-t border-line bg-white py-4">
              <AccountControls mobile />
            </div>
          </div>
        </dialog>
      </header>
    </>
  );
}
