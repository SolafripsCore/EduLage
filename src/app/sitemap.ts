import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { programmes } from "@/data/programmes";
import { institutions } from "@/data/institutions";
import { getCatalogue } from "@/lib/liveCatalogue";

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/programmes", priority: 0.9, changeFrequency: "daily" },
  { path: "/institutions", priority: 0.9, changeFrequency: "weekly" },
  { path: "/study-types", priority: 0.7, changeFrequency: "monthly" },
  { path: "/open-education-centers", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-institutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/goe", priority: 0.6, changeFrequency: "monthly" },
  { path: "/verify", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/quality-and-trust", priority: 0.6, changeFrequency: "monthly" },
  { path: "/get-started", priority: 0.7, changeFrequency: "monthly" },
  { path: "/help", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refunds", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
  { path: "/data-protection", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  for (const p of programmes) {
    entries.push({ url: `${siteUrl}/programmes/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }
  const seen = new Set<string>();
  for (const i of institutions) {
    seen.add(i.slug);
    entries.push({ url: `${siteUrl}/institutions/${i.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }
  const live = await getCatalogue();
  for (const i of live?.institutions ?? []) {
    if (seen.has(i.code)) continue;
    entries.push({ url: `${siteUrl}/institutions/${i.code}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  }
  return entries;
}
