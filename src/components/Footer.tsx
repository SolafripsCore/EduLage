import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";

const columns = [
  [
    "Explore",
    [
      ["Browse programmes", "/programmes"],
      ["Featured institutions", "/institutions"],
      ["Study options", "/study-types"],
      ["Find an OEC", "/open-education-centers"],
    ],
  ],
  [
    "Institutions",
    [
      ["Why EduLage", "/for-institutions"],
      ["Readiness requirements", "/for-institutions"],
      ["Apply to join", "/for-institutions"],
      ["Course production", "/for-institutions"],
    ],
  ],
  [
    "Access & support",
    [
      ["Open Education Centers", "/open-education-centers"],
      ["OEC standards", "/open-education-centers"],
      ["Learner support", "/help"],
      ["Verify a credential", "/verify"],
    ],
  ],
  [
    "Global network",
    [
      ["GOE Initiative", "/goe"],
      ["Countries", "/institutions"],
      ["Governments & partners", "/goe"],
      ["Institutional network", "/institutions"],
    ],
  ],
  [
    "About EduLage",
    [
      ["Our model", "/about"],
      ["Quality and trust", "/quality-and-trust"],
      ["Governance", "/about"],
      ["Contact", "/contact"],
    ],
  ],
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <Container>
        <div className="border-b border-white/15 py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <Image
                src="/brand/edulage-logo.png"
                alt="EduLage"
                width={150}
                height={54}
                className="h-[54px] w-[150px] object-contain object-left brightness-0 invert"
              />
              <p className="mt-5 max-w-md text-sm leading-6 text-white/65">
                The Global Education Village—connecting learners to quality open
                and online education from reputable tertiary institutions
                worldwide.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">
                Need help finding the right pathway?
              </p>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Explore programmes, participating institutions and supported
                access options.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/programmes"
                  className="rounded-md bg-teal-500 px-4 py-2 text-xs font-bold text-navy-900"
                >
                  Explore programmes
                </Link>
                <Link
                  href="/help"
                  className="rounded-md border border-white/20 px-4 py-2 text-xs font-bold text-white"
                >
                  Help & support
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {columns.map(([title, items]) => (
              <div key={title as string}>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  {title as string}
                </h3>
                <ul className="space-y-3">
                  {(items as string[][]).map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-white/60 hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 EduLage.org. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/data-protection">Data protection</Link>
            <Link href="/contact">Contact</Link>
          <span aria-label="Current site language">English (default)</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
