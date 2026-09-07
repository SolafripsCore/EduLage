import type { Discipline } from "./types";

export const disciplines: Discipline[] = [
  { name: "Business & Management", slug: "business-management", icon: "BriefcaseBusiness", image: "/media/discipline-business.jpg" },
  { name: "Computer Science & IT", slug: "computer-science-it", icon: "Monitor", image: "/media/discipline-computing.jpg" },
  { name: "Data & AI", slug: "data-ai", icon: "BrainCircuit", image: "/media/discipline-data.jpg" },
  { name: "Engineering", slug: "engineering", icon: "Cog", image: "/media/discipline-engineering.jpg" },
  { name: "Health & Medical Sciences", slug: "health-medical-sciences", icon: "HeartPulse", image: "/media/discipline-health.jpg" },
  { name: "Education", slug: "education", icon: "GraduationCap", image: "/media/discipline-education.jpg" },
  { name: "Law", slug: "law", icon: "Scale", image: "/media/discipline-law.jpg" },
  { name: "Public Administration", slug: "public-administration", icon: "Landmark", image: "/media/discipline-publicadmin.jpg" },
  { name: "Social Sciences", slug: "social-sciences", icon: "Users", image: "/media/discipline-social.jpg" },
  { name: "Natural Sciences", slug: "natural-sciences", icon: "Atom", image: "/media/discipline-sciences.jpg" },
  { name: "Environment & Sustainability", slug: "environment-sustainability", icon: "Leaf", image: "/media/discipline-environment.jpg" },
  { name: "Agriculture & Food Security", slug: "agriculture-food-security", icon: "Sprout", image: "/media/discipline-agriculture.jpg" },
  { name: "Arts & Humanities", slug: "arts-humanities", icon: "Palette", image: "/media/discipline-arts.jpg" },
];

export const disciplineByName = new Map(disciplines.map((item) => [item.name, item]));
