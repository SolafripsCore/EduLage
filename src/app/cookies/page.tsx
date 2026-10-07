import { PolicyPage } from "@/components/PolicyPage";
export const metadata = { title: "Cookie notice", description: "The cookies EduLage uses and how to control them." };
export default function Page() {
  return <PolicyPage eyebrow="Legal and privacy" title="Cookie notice" updated="7 October 2026" description="EduLage uses a small number of cookies, almost all of them necessary to keep you signed in and secure. This notice lists them and explains your choices." sections={[
    { title: "What cookies are", body: "Cookies are small text files stored by your browser. They let a website remember you between pages — for example that you have signed in — and protect requests from being forged by other sites." },
    { title: "Strictly necessary cookies", body: "These are required for the services to work and cannot be switched off.", points: ["Session cookies on edulage.org, the learning platform and Studio that keep you signed in", "Identity-provider cookies on auth.edulage.org that provide single sign-in across EduLage services", "CSRF tokens that protect forms and payments from cross-site request forgery", "A cookie recording that you have dismissed a notice or chosen a language"] },
    { title: "Preference cookies", body: "The learning platform stores preferences such as video playback speed, subtitle choice and the last course you opened so that you can continue where you left off." },
    { title: "Analytics and marketing", body: "We do not currently use advertising or third-party marketing cookies. If we introduce privacy-respecting analytics to understand how the services are used, we will update this notice and, where required, ask for your consent first." },
    { title: "Third parties", body: "When you pay, Paystack sets its own cookies on its payment pages to process the transaction securely. Embedded videos and interactive tools in some courses may set cookies from their providers; the course tells you where this applies." },
    { title: "Your choices", body: "You can delete or block cookies in your browser settings. Blocking strictly necessary cookies will prevent you from signing in or completing payments. Instructions for common browsers are available from their help pages." },
  ]} />;
}
