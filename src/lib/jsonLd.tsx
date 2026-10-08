import type { Institution, Programme } from "@/data/types";
import { PRODUCTION_URL, siteUrl } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function JsonLdScript({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organisationJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EduLage",
  alternateName: "The Global Education Village",
  url: PRODUCTION_URL,
  logo: `${PRODUCTION_URL}/brand/edulage-logo.png`,
  description:
    "EduLage is a multi-tenant open and online education platform connecting learners with programmes from reputable tertiary institutions, trainers and Global Open Education Centers (GOE Centers).",
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: "support@edulage.org", url: `${PRODUCTION_URL}/contact` }],
};

export const websiteJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EduLage",
  url: PRODUCTION_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${PRODUCTION_URL}/programmes?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export function institutionJsonLd(institution: Institution): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: institution.name,
    url: `${siteUrl}/institutions/${institution.slug}`,
    logo: `${siteUrl}${institution.logo}`,
    image: `${siteUrl}${institution.campusImage}`,
    description: institution.about,
    foundingDate: String(institution.founded),
    address: { "@type": "PostalAddress", addressLocality: institution.city, addressCountry: institution.countryCode },
  };
}

export function programmeJsonLd(programme: Programme, institution: Institution): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programme.title,
    url: `${siteUrl}/programmes/${programme.slug}`,
    description: `${programme.credential} in ${programme.discipline} from ${institution.name}: ${programme.durationMonths} months, ${programme.studyMode.toLowerCase()}, ${programme.deliveryMode.toLowerCase()}.`,
    image: `${siteUrl}${programme.image}`,
    inLanguage: programme.language,
    educationalCredentialAwarded: programme.credential,
    provider: { "@type": "CollegeOrUniversity", name: institution.name, url: `${siteUrl}/institutions/${institution.slug}` },
    offers: {
      "@type": "Offer",
      category: "Tuition",
      price: programme.tuitionFrom,
      priceCurrency: programme.tuitionCurrency,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/programmes/${programme.slug}`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: programme.deliveryMode === "Fully online" ? "Online" : "Blended",
      courseWorkload: `P${programme.durationMonths}M`,
      startDate: programme.nextIntake,
    },
  };
}
