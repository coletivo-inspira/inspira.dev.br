import type { Project, ProjectPillar } from "@/types/project";

export interface Pillar {
  id: ProjectPillar;
  number: `0${1 | 2 | 3}`;
  title: string;
  description: string;
  accent: "orange" | "pink" | "mustard";
}

export interface ParticipationPath {
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: "orange" | "pink" | "mustard";
}

export const hubConfig = {
  name: "Coletivo Inspira",
  location: "Bonito-MS + Belo Horizonte-MG",
  hudiPagesUrl: "https://coletivo-inspira.github.io/hudi-pg/",
  githubUrl: "https://github.com/coletivo-inspira",
  instagramUrl: "https://instagram.com/coletivo_inspira",
  whatsappUrl: "https://chat.whatsapp.com/LHMN8hm8a4ILdZGbatRv7G",
  solucoesPath: "/solucoes/",
  manifestoPath: "/manifesto/",
} as const;

export const pillars: readonly Pillar[] = [
  {
    id: "Social",
    number: "01",
    title: "Impacto social",
    description:
      "Acolhimento, autonomia e redes de cuidado que transformam encontros em caminhos coletivos.",
    accent: "orange",
  },
  {
    id: "Tecnologia",
    number: "02",
    title: "Tecnologia útil",
    description:
      "LINO, portfólios e soluções B2B acessíveis para dar presença, organização e novas oportunidades a pessoas e negócios.",
    accent: "mustard",
  },
  {
    id: "Cultura",
    number: "03",
    title: "Cultura viva",
    description:
      "Experiências, imagens e festas que preservam memória, movimentam territórios e aproximam pessoas.",
    accent: "pink",
  },
] as const;

export const participationPaths: readonly ParticipationPath[] = [
  {
    label: "Portfólio",
    title: "Dê um endereço ao seu trabalho.",
    description:
      "Crie e publique gratuitamente seu smartfólio para apresentar sua trajetória, seus serviços e seus projetos.",
    cta: "Criar meu portfólio gratuito",
    href: hubConfig.hudiPagesUrl,
    accent: "mustard",
  },
  {
    label: "Negócio local",
    title: "Transforme um desafio em solução.",
    description:
      "Aproxime seu comércio, pousada, hotel ou projeto do público com soluções digitais feitas para a sua realidade.",
    cta: "Conversar sobre meu negócio",
    href: hubConfig.instagramUrl,
    accent: "orange",
  },
  {
    label: "Comunidade",
    title: "Venha construir com a gente.",
    description:
      "Conheça projetos abertos, compartilhe ideias e conecte-se a quem faz parte do ecossistema Inspira.",
    cta: "Entrar na comunidade",
    href: hubConfig.whatsappUrl,
    accent: "pink",
  },
] as const;

export const solutionsOffers = [
  {
    id: "smartfolios",
    title: "Portfólios gratuitos",
    description:
      "Publique sua presença digital no ecossistema Inspira com o construtor HUDI Pages.",
    cta: "Criar portfólio",
    href: hubConfig.hudiPagesUrl,
  },
  {
    id: "lino-b2b",
    title: "LINO e soluções B2B",
    description:
      "Automação, presença e produtos digitais para negócios locais e equipes que precisam de velocidade.",
    cta: "Falar sobre tecnologia",
    href: hubConfig.instagramUrl,
  },
  {
    id: "cultura-eventos",
    title: "Cultura e eventos",
    description:
      "Produção, identidade e experiências que conectam território, memória e celebração.",
    cta: "Ver agenda cultural",
    href: "/#agenda",
  },
] as const;

// Edite esta lista para atualizar os destaques e a ordem exibida no hub.
export const projects: readonly Project[] = [
  {
    id: "canto-dos-passaros",
    title: "Canto dos Pássaros",
    eyebrow: "Experiência e território",
    pillar: "Social",
    description:
      "Um espaço para valorizar escuta, natureza e pertencimento por meio de encontros com identidade local.",
    location: "Bonito-MS",
    status: "Em desenvolvimento",
    featured: true,
    href: "/#participe",
  },
  {
    id: "olhares",
    title: "Olhares",
    eyebrow: "Imagem e memória",
    pillar: "Cultura",
    description:
      "Narrativas visuais que registram pessoas, gestos e paisagens a partir de quem vive o território.",
    location: "Bonito-MS",
    status: "Em desenvolvimento",
    featured: true,
    href: "/#participe",
  },
  {
    id: "hudi-pages",
    title: "HUDI Pages",
    eyebrow: "Smartfolios gratuitos",
    pillar: "Tecnologia",
    description:
      "Um editor modular para qualquer pessoa criar e publicar gratuitamente seu portfólio no ecossistema Inspira.",
    location: "Digital",
    status: "Ativo",
    featured: true,
    href: hubConfig.hudiPagesUrl,
  },
  {
    id: "carnaboia",
    title: "Carnaboia",
    eyebrow: "Festa e ecoturismo",
    pillar: "Cultura",
    description:
      "Uma celebração que conecta música, comunidade e a energia singular da Capital do Ecoturismo.",
    location: "Bonito-MS",
    status: "Ativo",
    featured: false,
    href: "/#agenda",
  },
  {
    id: "meu-bloquinho",
    title: "Meu Bloquinho",
    eyebrow: "Carnaval de rua",
    pillar: "Cultura",
    description:
      "Identidade, produção e redes criativas que colocam o carnaval de rua em movimento.",
    location: "Belo Horizonte-MG",
    status: "Ativo",
    featured: false,
    href: "/#agenda",
  },
  {
    id: "coletivo-cuida",
    title: "Coletivo Cuida",
    eyebrow: "Rede de acolhimento",
    pillar: "Social",
    description:
      "Conexões de cuidado e desenvolvimento pensadas para fortalecer pessoas e iniciativas locais.",
    location: "Rede Inspira",
    status: "Em desenvolvimento",
    featured: false,
    href: "/#participe",
  },
] as const;
