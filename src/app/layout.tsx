import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edulage.org"),
  title: {
    default: "EduLage | The Global Education Village",
    template: "%s | EduLage",
  },
  description: "Discover quality open and online education programmes from reputable tertiary institutions worldwide.",
  openGraph: {
    title: "EduLage | The Global Education Village",
    description: "A trusted global education ecosystem connecting learners with quality open and online education.",
    type: "website",
    url: "https://edulage.org",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
