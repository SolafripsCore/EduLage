export type TenantStatus = "active" | "provisional" | "suspended";
export type Credential =
  | "BSc"
  | "BEng"
  | "LLB"
  | "MSc"
  | "MBA"
  | "MPH"
  | "PhD"
  | "PGD"
  | "Professional Certificate";
export type StudyLevel = "Undergraduate" | "Postgraduate" | "Doctoral" | "Professional";
export type StudyMode = "Part-time" | "Full-time";
export type DeliveryMode = "Fully online" | "Online + OEC exams";

export type Institution = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  countryCode: string;
  region: string;
  founded: number;
  accreditationBody: string;
  accreditationStatus: string;
  tenantStatus: TenantStatus;
  about: string;
  admissionsPortalUrl: string;
  accent: string;
  logo: string;
  campusImage: string;
};

export type Programme = {
  id: string;
  slug: string;
  institutionId: string;
  title: string;
  discipline: string;
  credential: Credential;
  level: StudyLevel;
  durationMonths: number;
  studyMode: StudyMode;
  deliveryMode: DeliveryMode;
  language: string;
  nextIntake: string;
  tuitionFrom: number;
  tuitionCurrency: string;
  tuitionPeriod: string;
  tuitionNote: string;
  entryRequirements: string[];
  modules: string[];
  assessmentNote: string;
  requiresOecExam: boolean;
  image: string;
  trending?: boolean;
};

export type Discipline = {
  name: string;
  slug: string;
  icon: string;
  image: string;
};

export type Center = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  region: string;
  facilities: string[];
  seats: number;
  status: string;
};
