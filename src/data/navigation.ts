import type { ProjectFilter } from "@/types/project";

export interface NavLink {
  label: string;
  href: string;
}

export interface ProjectFilterLink extends NavLink {
  filter: ProjectFilter;
}

/** Header público: atalhos da home e Manifesto. */
export const mainNavLinks: readonly NavLink[] = [
  { label: "Social", href: "/#pilares" },
  { label: "Tecnologia", href: "/#vitrine" },
  { label: "Cultura", href: "/#agenda" },
  { label: "Manifesto", href: "/manifesto/" },
] as const;

export const projectFilterLinks: readonly ProjectFilterLink[] = [
  { label: "Todos", href: "/#vitrine", filter: "Todos" },
  { label: "Festas", href: "/#vitrine", filter: "Festas" },
  { label: "Arte", href: "/#vitrine", filter: "Arte" },
  { label: "Saúde", href: "/#vitrine", filter: "Saude" },
  { label: "Portfólios", href: "/#vitrine", filter: "Portfolios" },
] as const;
