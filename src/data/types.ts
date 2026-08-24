export type TenantStatus = "active" | "provisional" | "suspended";
export type Credential = "BSc" | "MSc" | "PGD" | "Professional Certificate";
export type StudyMode = "Part-time" | "Full-time";
export type DeliveryMode = "Fully online" | "Online + OEC exams";

export type Institution = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  accreditationBody: string;
  accreditationStatus: string;
  tenantStatus: TenantStatus;
  about: string;
  admissionsPortalUrl: string;
  brandAccent?: string;
};

export type Programme = {
  id: string;
  slug: string;
  institutionId: string;
  title: string;
  discipline: string;
  credential: Credential;
  level: string;
  durationMonths: number;
  studyMode: StudyMode;
  deliveryMode: DeliveryMode;
  language: string;
  tuitionNote: string;
  entryRequirements: string[];
  modules: string[];
  assessmentNote: string;
  requiresOecExam: boolean;
};

export type Center = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  facilities: string[];
  status: string;
};
