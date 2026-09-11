import { learnUrl } from "@/lib/site";

export type CatalogueCourse = {
  course_id: string;
  title: string;
  enrolment_policy: "open_free" | "open_paid";
  price: string;
  currency: string;
  classification: string;
  institution: string;
  institution_name: string;
  institution_logo: string;
  start: string | null;
  image: string;
  about_url: string;
};

export type CatalogueInstitution = {
  code: string;
  name: string;
  host: string;
  country: string;
  logo: string;
};

export type Catalogue = {
  counts: { institutions: number; courses: number; open_courses: number; countries: number };
  institutions: CatalogueInstitution[];
  open_courses: CatalogueCourse[];
};

/** Live institutions and open-enrolment courses from the LMS; null when it cannot be reached. */
export async function getCatalogue(): Promise<Catalogue | null> {
  try {
    const res = await fetch(`${learnUrl}/edulage/api/v1/catalogue/`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as Catalogue;
  } catch {
    return null;
  }
}

export function priceLabel(course: CatalogueCourse) {
  if (course.enrolment_policy === "open_free") return "Free";
  const amount = Number(course.price).toLocaleString("en-NG", { maximumFractionDigits: 0 });
  return course.currency === "NGN" ? `₦${amount}` : `${course.currency} ${amount}`;
}

export function enrolUrl(course: CatalogueCourse) {
  return `${learnUrl}/edulage/enrol/${course.course_id}/`;
}
