import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/programmes",
    "/study-types",
    "/institutions",
    "/open-education-centers",
    "/for-institutions",
    "/goe",
    "/verify",
    "/about",
    "/get-started",
    "/help",
    "/contact",
    "/quality-and-trust",
    "/privacy",
    "/terms",
    "/accessibility",
    "/data-protection",
  ];
  return routes.map((route) => ({
    url: `https://edulage.org${route}`,
    lastModified: new Date(),
  }));
}
