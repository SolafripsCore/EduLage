import { centers } from "@/data/centers";
import { disciplines } from "@/data/disciplines";
import { institutions } from "@/data/institutions";
import { programmes } from "@/data/programmes";
import type { Institution, Programme } from "@/data/types";

export type ProgrammeFilters = Partial<Pick<Programme, "discipline" | "credential" | "deliveryMode" | "language" | "studyMode" | "level" | "institutionId">> & { country?: string; query?: string };

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
      && (!filters.institutionId || programme.institutionId === filters.institutionId)
      && (!filters.country || institution?.country === filters.country)
      && (!filters.query || haystack.includes(filters.query.toLowerCase()));
  });
}

export function getProgrammeBySlug(slug: string) { return programmes.find((item) => item.slug === slug); }
export function getInstitutions(query?: string) {
  if (!query) return institutions;
  return institutions.filter((item) => `${item.name} ${item.country}`.toLowerCase().includes(query.toLowerCase()));
}
export function getFeaturedInstitutions(limit: number) {
  if (limit <= 0) return [];
  const grouped = new Map<string, Institution[]>();
  institutions.forEach((institution) => {
    const regionInstitutions = grouped.get(institution.region) ?? [];
    regionInstitutions.push(institution);
    grouped.set(institution.region, regionInstitutions);
  });
  const regions = [...grouped.values()];
  const featured: Institution[] = [];
  for (let index = 0; index < Math.max(...regions.map((region) => region.length)); index++) {
    regions.forEach((region) => {
      if (region[index] && featured.length < limit) featured.push(region[index]);
    });
  }
  return featured;
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
function spreadHomepageProgrammes(items: Programme[], limit: number, excludedIds = new Set<string>()) {
  const candidates = items.filter((programme) => !excludedIds.has(programme.id));
  const selected: Programme[] = [];
  const seenInstitutions = new Set<string>();
  const seenDisciplines = new Set<string>();
  const seenImages = new Set<string>();
  const add = (programme: Programme) => {
    selected.push(programme);
    seenInstitutions.add(programme.institutionId);
    seenDisciplines.add(programme.discipline);
    seenImages.add(programme.image);
  };
  candidates.forEach((programme) => {
    if (selected.length >= limit) return;
    if (!seenInstitutions.has(programme.institutionId) && !seenDisciplines.has(programme.discipline) && !seenImages.has(programme.image)) add(programme);
  });
  candidates.forEach((programme) => {
    if (selected.length >= limit) return;
    if (!selected.includes(programme) && !seenImages.has(programme.image)) add(programme);
  });
  return selected.slice(0, limit);
}
export function getTrendingProgrammes(limit: number) {
  const trending = programmes.filter((programme) => programme.trending);
  return spreadHomepageProgrammes([...trending, ...programmes.filter((programme) => !programme.trending)], limit);
}
export function getProgrammesByLevel(level: Programme["level"], limit?: number) { return spreadProgrammes(getProgrammes({ level }), limit); }
export function getHomepageProgrammeSections() {
  const trending = getTrendingProgrammes(6);
  const used = new Set(trending.map((programme) => programme.id));
  const degreePools = ["Undergraduate", "Postgraduate", "Doctoral"].map((level) =>
    getProgrammes({ level: level as Programme["level"] }),
  );
  const degree: Programme[] = [];
  const degreeImages = new Set<string>();
  const degreeInstitutions = new Set<string>();
  const degreeDisciplines = new Set<string>();
  const addDegreeProgramme = (programme: Programme) => {
    degree.push(programme);
    degreeImages.add(programme.image);
    degreeInstitutions.add(programme.institutionId);
    degreeDisciplines.add(programme.discipline);
    used.add(programme.id);
  };
  const selectDegreeFromPool = (pool: Programme[], limit: number) => {
    const candidates = pool.filter((programme) => !used.has(programme.id));
    const preferred = candidates.filter((programme) =>
      !degreeImages.has(programme.image)
      && !degreeInstitutions.has(programme.institutionId)
      && !degreeDisciplines.has(programme.discipline),
    );
    const fallback = candidates.filter((programme) => !degreeImages.has(programme.image));

    [...preferred, ...fallback].forEach((programme) => {
      if (degree.length >= 6 || limit <= 0 || degree.includes(programme)) return;
      addDegreeProgramme(programme);
      limit -= 1;
    });
  };

  degreePools.forEach((pool) => selectDegreeFromPool(pool, 2));
  if (degree.length < 6) {
    degreePools.forEach((pool) => selectDegreeFromPool(pool, 6 - degree.length));
  }
  const professional = spreadHomepageProgrammes(getProgrammes({ level: "Professional" }), 6, used);
  return { trending, degree, professional };
}
export function getInstitutionProgrammes(id: string) { return programmes.filter((item) => item.institutionId === id); }
