"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { learnLinks } from "@/lib/site";
import { useLearnerSession } from "@/lib/useLearnerSession";
import { Button } from "./ui/Button";

const menuItems = [
  ["My learning", learnLinks.myLearning],
  ["Account", learnLinks.account],
  ["Help & support", "/help"],
];

export function AccountControls({ mobile = false }: { mobile?: boolean }) {
  const session = useLearnerSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (!session) {
    return (
      <>
        <Button
          href={learnLinks.signIn}
          variant="secondary"
          className={mobile ? "flex-1" : "px-3 py-2"}
        >
          Sign in
        </Button>
        <Button href="/get-started" className={mobile ? "flex-1" : "px-3 py-2"}>
          Get started
        </Button>
      </>
    );
  }

  const initials = session.username.slice(0, 2).toUpperCase();

  if (mobile) {
    return (
      <>
        <Button href={learnLinks.myLearning} variant="secondary" className="flex-1">
          My learning
        </Button>
        <Button href={learnLinks.signOut} className="flex-1">
          Sign out
        </Button>
      </>
    );
  }

  return (
    <>
      <Button href={learnLinks.myLearning} variant="secondary" className="px-3 py-2">
        My learning
      </Button>
      <div ref={ref} className="relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls="account-menu"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-navy-800 bg-navy-800 px-3 py-2 text-sm font-semibold text-white hover:bg-navy-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-full bg-white/15 text-[11px] font-bold"
          >
            {initials}
          </span>
          <span className="max-w-[10rem] truncate">{session.username}</span>
          <ChevronDown
            size={15}
            className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>
        {menuOpen && (
          <div
            id="account-menu"
            role="menu"
            className="absolute right-0 top-full z-50 mt-3 w-56 rounded-xl border border-line bg-white p-2 shadow-xl"
          >
            {menuItems.map(([label, href]) => (
              <a
                key={label}
                role="menuitem"
                href={href}
                className="block rounded-lg px-3 py-2.5 text-sm text-ink-600 hover:bg-surface hover:text-navy-800 focus-visible:bg-surface focus-visible:text-navy-800 focus-visible:outline-none"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 border-t border-line pt-2">
              <a
                role="menuitem"
                href={learnLinks.signOut}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-800 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
