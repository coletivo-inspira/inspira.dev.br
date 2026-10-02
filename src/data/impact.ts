export interface ImpactMetric {
  value: string;
  label: string;
  description: string;
  tone?: "mint" | "lime";
}

/** Indicadores versionados de transparência/impacto (fallback estático). */
export const impactMetrics: readonly ImpactMetric[] = [
  {
    value: "02",
    label: "Territórios conectados",
    description: "Bonito-MS e Belo Horizonte-MG",
    tone: "mint",
  },
  {
    value: "04",
    label: "Pilares de impacto",
    description: "Tecnologia, cultura, saúde e diversidade",
    tone: "lime",
  },
  {
    value: "06",
    label: "Iniciativas no hub",
    description: "Ativas ou em desenvolvimento",
    tone: "mint",
  },
] as const;
