# Camada de Componentes (`src/components/`)

Esta é a camada de **UI (User Interface)** da aplicação. Cada pasta aqui dentro abriga um componente isolado com seu arquivo `.tsx` e, caso necessário, lógica local. Todos foram desenvolvidos usando React e exportados para montar a tela inicial no `HomePageClient`.

Abaixo você encontra uma descrição minuciosa do que cada bloco constrói:

## Estrutura dos Componentes Visuais

### `Header/`
- **Responsabilidade:** Menu de navegação fixo (navbar) no topo da tela.
- **Detalhes Internos:** 
  - Possui lógica de abertura e fechamento para o menu mobile (`useState`).
  - Carrega a lista de links extraída de `src/data/navigation.ts`.
  - Dispara o evento de clique nas categorias de projeto através da propriedade `onProjectFilter`, permitindo que a seleção na barra navegue até a seção de projetos e já aplique o filtro.

### `Hero/`
- **Responsabilidade:** Seção introdutória (banner) logo que o usuário abre a página.
- **Detalhes Internos:** Responsável pelo título gigante e os textos de impacto sobre Bonito-MS. Renderiza também os "glows" (efeitos brilhantes no fundo usando classes de CSS como `hero-glow`). Não possui estados complexos, sendo totalmente voltado para marcação HTML limpa.

### `SectionHistory/`
- **Responsabilidade:** Seção "Sobre Nós" ("Nossa História").
- **Detalhes Internos:** Um componente estático onde apresentamos a história dos fundadores, intercalando a narrativa com uma grade interativa de imagens dos eventos anteriores.

### `SectionBrandBook/`
- **Responsabilidade:** Seção com diretrizes da nova marca.
- **Detalhes Internos:** Reúne orientações de identidade visual, tom de voz e padronização para guiar a repaginação do site.

### `Projects/`
Aqui nós temos a maior interatividade de UI do site. Ele gerencia a filtragem da lista de iniciativas.
- **`ProjectsSection.tsx`**: O container mestre que cuida da seção de Projetos. Ele renderiza os botões (chips) de filtro no topo e passa os dados para renderização.
- **Renderização e Filtros:** Ele interage com o estado que vem da `HomePageClient`, mostrando um "Empty State" caso nenhum projeto bata com a categoria, ou listando os projetos compatíveis iterando através da propriedade estática `src/data/projects.ts`.

### `SectionCommunity/` (Integração com GitHub)
Esta é a seção onde os desenvolvedores da comunidade são homenageados. A UI é dividida em submódulos para manter tudo organizado:
- **`RepoGrid.tsx`:** Container que interage com o custom hook `useGitHubRepos`. Ele chama a lógica que bate na API do GitHub. Mostra *Skeletons* caso os dados estejam carregando e, ao terminar, renderiza uma grade de cartões.
- **`RepoCard.tsx`:** O UI visual ("cartão") para um único desenvolvedor/repositório. Recebe os dados de prop (estrelas, forks, linguagem).
- **`RepoModal.tsx`:** Um popup (Modal) criado via React Portals (ou exibição condicional simples) que abre os detalhes de um repositório da comunidade para leitura minuciosa quando clicado no `RepoCard`.

### `Footer/`
- **Responsabilidade:** O rodapé de todas as páginas.
- **Detalhes Internos:** Ele consome as informações de redes sociais localizadas em `src/data/navigation.ts` para injetar automaticamente os SVGs nativos (WhatsApp e Instagram) e desenhar a barra estática de fim de tela.
