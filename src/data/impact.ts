export interface ImpactMetric {
  value: string;
  label: string;
  description: string;
}

/** Indicadores versionados de transparência/impacto (fallback estático). */
export const impactMetrics: readonly ImpactMetric[] = [
  {
    value: "02",
    label: "Frentes regionais",
    description: "Bonito-MS e Belo Horizonte-MG",
  },
  {
    value: "03",
    label: "Pilares conectados",
    description: "Social, Tecnologia e Cultura",
  },
  {
    value: "06",
    label: "Iniciativas no hub",
    description: "Ativas ou em desenvolvimento",
  },
] as const;
