export type ProjectPillar = "Social" | "Tecnologia" | "Cultura";

export type ProjectFilter = "Todos" | ProjectPillar;

export type ProjectStatus = "Ativo" | "Em desenvolvimento" | "Concluído";

export interface Project {
  id: string;
  title: string;
  description: string;
  pillar: ProjectPillar;
  eyebrow: string;
  location: string;
  status: ProjectStatus;
  featured: boolean;
  href?: string;
}
