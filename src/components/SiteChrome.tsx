import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return <><a href="#main-content" className="sr-only z-[100] rounded-md bg-white px-4 py-3 text-sm font-bold text-navy-800 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a><Header /><main id="main-content" className="flex-1">{children}</main><Footer /></>;
}
