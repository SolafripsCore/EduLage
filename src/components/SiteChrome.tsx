import type { ReactNode } from "react";
import { Banner } from "./ui/Banner";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return <><Banner /><Header /><main className="flex-1">{children}</main><Footer /></>;
}
