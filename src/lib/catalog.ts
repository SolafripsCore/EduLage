import { centers } from "@/data/centers";
import { disciplines } from "@/data/disciplines";
import { institutions } from "@/data/institutions";
import { programmes } from "@/data/programmes";
import type { Programme } from "@/data/types";

export type ProgrammeFilters = Partial<Pick<Programme, "discipline" | "credential" | "deliveryMode" | "language" | "studyMode" | "level">> & { country?: string; query?: string };

export function getProgrammes(filters: ProgrammeFilters = {}) {
  return programmes.filter((programme) => {
    const institution = institutions.find((item) => item.id === programme.institutionId);
    const haystack = `${programme.title} ${programme.discipline} ${institution?.name ?? ""}`.toLowerCase();
    return (!filters.discipline || programme.discipline === filters.discipline)
      && (!filters.credential || programme.credential === filters.credential)
      && (!filters.deliveryMode || programme.deliveryMode === filters.deliveryMode)
      && (!filters.language || programme.language === filters.language)
      && (!filters.studyMode || programme.studyMode === filters.studyMode)
      && (!filters.level || programme.level === filters.level)
      && (!filters.country || institution?.country === filters.country)
      && (!filters.query || haystack.includes(filters.query.toLowerCase()));
  });
}

export function getProgrammeBySlug(slug: string) { return programmes.find((item) => item.slug === slug); }
export function getInstitutions(query?: string) {
  if (!query) return institutions;
  return institutions.filter((item) => `${item.name} ${item.country}`.toLowerCase().includes(query.toLowerCase()));
}
export function getInstitutionBySlug(slug: string) { return institutions.find((item) => item.slug === slug); }
export function getCenters() { return centers; }

export function getDisciplineCounts() {
  return disciplines.map((discipline) => ({
    ...discipline,
    count: programmes.filter((programme) => programme.discipline === discipline.name).length,
  }));
}

export function getMarketplaceStats() {
  return {
    institutions: institutions.length,
    programmes: programmes.length,
    countries: new Set(institutions.map((institution) => institution.country)).size,
    centers: centers.length,
  };
}

function spreadProgrammes(items: Programme[], limit = items.length) {
  const seen = new Set<string>();
  const spread = items.filter((programme) => {
    if (seen.has(programme.institutionId)) return false;
    seen.add(programme.institutionId);
    return true;
  });
  return [...spread, ...items.filter((programme) => !spread.includes(programme))].slice(0, limit);
}
export function getFeaturedProgrammes(limit: number) { return spreadProgrammes(programmes, limit); }
export function getTrendingProgrammes(limit: number) {
  const trending = programmes.filter((programme) => programme.trending);
  if (trending.length >= limit) return spreadProgrammes(trending, limit);
  return [...trending, ...spreadProgrammes(programmes.filter((programme) => !programme.trending), limit - trending.length)].slice(0, limit);
}
export function getProgrammesByLevel(level: Programme["level"], limit?: number) { return spreadProgrammes(getProgrammes({ level }), limit); }
export function getInstitutionProgrammes(id: string) { return programmes.filter((item) => item.institutionId === id); }
