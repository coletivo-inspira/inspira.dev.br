import type { ProjectFilter } from "@/types/project";

export interface NavLink {
  label: string;
  href: string;
}

export interface ProjectFilterLink extends NavLink {
  filter: ProjectFilter;
}

/** Header público: Social, Tecnologia, Cultura e Manifesto (INSP-001). */
export const mainNavLinks: readonly NavLink[] = [
  { label: "Social", href: "/#pilares" },
  { label: "Tecnologia", href: "/#vitrine" },
  { label: "Cultura", href: "/#agenda" },
  { label: "Manifesto", href: "/manifesto/" },
] as const;

export const projectFilterLinks: readonly ProjectFilterLink[] = [
  { label: "Todos", href: "/#vitrine", filter: "Todos" },
  { label: "Social", href: "/#vitrine", filter: "Social" },
  { label: "Tecnologia", href: "/#vitrine", filter: "Tecnologia" },
  { label: "Cultura", href: "/#vitrine", filter: "Cultura" },
] as const;
