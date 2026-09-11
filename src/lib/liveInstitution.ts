import { learnUrl } from "@/lib/site";

export type LiveCourse = {
  course_id: string;
  title: string;
  enrolment_policy: "open_free" | "open_paid" | "admission";
  price: string;
  currency: string;
  classification: string;
  start: string | null;
  end: string | null;
  image: string;
  about_url: string;
};

export type LiveInstitution = {
  code: string;
  name: string;
  host: string;
  website: string;
  country: string;
  logo: string;
  courses: LiveCourse[];
};

/** Institutions onboarded through the partner queue; the LMS is the source of truth. */
export async function getLiveInstitution(code: string): Promise<LiveInstitution | null> {
  if (!/^[a-z0-9]{2,16}$/i.test(code)) return null;
  try {
    const res = await fetch(`${learnUrl}/edulage/api/v1/institutions/${code.toLowerCase()}/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as LiveInstitution;
  } catch {
    return null;
  }
}

export function ctaLabel(course: LiveCourse) {
  if (course.enrolment_policy === "open_free") return "Enrol now — free";
  if (course.enrolment_policy === "open_paid") {
    const amount = Number(course.price).toLocaleString("en-NG", { maximumFractionDigits: 0 });
    return `Enrol now — ${course.currency === "NGN" ? "₦" : `${course.currency} `}${amount}`;
  }
  return "Apply";
}
