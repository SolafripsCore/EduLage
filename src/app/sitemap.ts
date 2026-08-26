import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/programmes", "/study-types", "/institutions", "/open-education-centers", "/for-institutions", "/goe", "/verify", "/about"];
  return routes.map((route) => ({ url: `https://edulage.org${route}`, lastModified: new Date() }));
}
