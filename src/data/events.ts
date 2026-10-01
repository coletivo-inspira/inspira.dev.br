export interface CulturalEvent {
  id: string;
  title: string;
  eyebrow: string;
  location: string;
  when: string;
  description: string;
  status: "Confirmado" | "Em breve" | "Sazonal";
  href?: string;
}

/** Agenda cultural versionada — preparada para contrato dinâmico (INSP-003). */
export const culturalEvents: readonly CulturalEvent[] = [
  {
    id: "carnaboia",
    title: "Carnaboia",
    eyebrow: "Festa e ecoturismo",
    location: "Bonito-MS",
    when: "Temporada de carnaval",
    description:
      "Celebração que conecta música, comunidade e a energia da Capital do Ecoturismo.",
    status: "Sazonal",
  },
  {
    id: "meu-bloquinho",
    title: "Meu Bloquinho",
    eyebrow: "Carnaval de rua",
    location: "Belo Horizonte-MG",
    when: "Pré-carnaval e carnaval",
    description:
      "Identidade, produção e redes criativas que colocam o carnaval de rua em movimento.",
    status: "Sazonal",
  },
  {
    id: "olhares-show",
    title: "Olhares — mostra",
    eyebrow: "Imagem e memória",
    location: "Bonito-MS",
    when: "Em programação",
    description:
      "Narrativas visuais que registram pessoas, gestos e paisagens a partir de quem vive o território.",
    status: "Em breve",
  },
] as const;
