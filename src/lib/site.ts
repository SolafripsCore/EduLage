export const PRODUCTION_URL = "https://edulage.org";

export const isProduction = process.env.VERCEL_ENV === "production";

export const siteUrl = isProduction
  ? PRODUCTION_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
