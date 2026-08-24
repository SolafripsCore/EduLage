import type { ReactNode } from "react";
import { Banner } from "./ui/Banner";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return <><Banner /><div className="hidden h-9 bg-navy-900 text-xs text-white/80 md:block"><div className="container-page flex h-full items-center justify-between"><span>Global Education Village</span><div className="flex gap-5"><a href="/for-institutions">For Institutions</a><a href="/open-education-centers">Open Education Centers</a><a href="/goe">GOE Initiative</a><a href="/verify">Verify a credential</a></div></div></div><Header /><main className="flex-1">{children}</main><Footer /></>;
}
