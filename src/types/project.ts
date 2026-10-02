export type ProjectPillar = "Tecnologia" | "Cultura" | "Saude" | "Diversidade";

export type ShowcaseTag = "Festas" | "Arte" | "Saude" | "Portfolios";

export type ProjectFilter = "Todos" | ShowcaseTag;

export type ProjectStatus = "Ativo" | "Em desenvolvimento" | "Concluído";

export interface Project {
  id: string;
  title: string;
  description: string;
  pillar: ProjectPillar;
  showcase: ShowcaseTag;
  stack?: string;
  eyebrow: string;
  location: string;
  status: ProjectStatus;
  featured: boolean;
  href?: string;
}
