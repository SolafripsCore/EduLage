import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";

const columns = [
  ["Learners", [["Browse programmes", "/programmes"], ["Institutions", "/institutions"], ["Find a center", "/open-education-centers"], ["Verify a credential", "/verify"]]],
  ["Institutions", [["Why Edulage", "/for-institutions"], ["Readiness requirements", "/for-institutions"], ["Apply to join", "/for-institutions"], ["Course production", "/for-institutions"]]],
  ["Open Education Centers", [["What is an OEC", "/open-education-centers"], ["Accreditation standards", "/open-education-centers"], ["Operate a center", "/open-education-centers"], ["Find a center", "/open-education-centers"]]],
  ["Initiative", [["GOE Initiative", "/goe"], ["Countries", "/goe"], ["Partners", "/goe"], ["Impact", "/goe"]]],
  ["Edulage", [["About", "/about"], ["Governance", "/about"], ["Contact", "/about"], ["Careers", "/about"]]],
];

export function Footer() {
  return <footer className="bg-navy-900 text-white"><Container>
    <div className="border-b border-white/15 py-14"><Image src="/brand/edulage-logo.png" alt="Edulage" width={140} height={51} className="h-[51px] w-[140px] object-contain object-left brightness-0 invert" /><p className="mt-5 max-w-md text-sm leading-6 text-white/65">Global education infrastructure connecting learners with accredited institutions and places to learn.</p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">{columns.map(([title, items]) => <div key={title as string}><h3 className="mb-4 text-sm font-semibold text-white">{title as string}</h3><ul className="space-y-3">{(items as string[][]).map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-white/60 hover:text-white">{label}</Link></li>)}</ul></div>)}</div>
    </div>
    <div className="flex flex-col gap-4 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between"><p>© 2026 Edulage.org. All rights reserved.</p><div className="flex flex-wrap gap-4"><Link href="/about">Privacy</Link><Link href="/about">Terms</Link><Link href="/about">Accessibility</Link><Link href="/about">Data protection</Link><span className="border-l border-white/20 pl-4">English</span></div></div>
  </Container></footer>;
}
