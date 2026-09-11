export const PRODUCTION_URL = "https://edulage.org";

export const isProduction = process.env.VERCEL_ENV === "production";

export const siteUrl = isProduction
  ? PRODUCTION_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const learnUrl =
  process.env.NEXT_PUBLIC_LEARN_URL ?? "https://learn.edulage.org";
export const studioUrl =
  process.env.NEXT_PUBLIC_STUDIO_URL ?? "https://studio.edulage.org";

export const learnLinks = {
  signIn: `${learnUrl}/login?next=/dashboard`,
  register: `${learnUrl}/edulage/register/`,
  myLearning: `${learnUrl}/dashboard`,
  account: `${learnUrl}/account/settings`,
  signOut: `${learnUrl}/logout`,
  studio: `${studioUrl}/home`,
  admin: `${learnUrl}/admin/`,
  sessionApi: `${learnUrl}/edulage/api/v1/me/`,
};
