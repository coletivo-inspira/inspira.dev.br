# Camada de Roteamento e Estilos (`src/app/`)

Esta camada utiliza o **App Router** do Next.js (introduzido a partir do Next 13/14). Ela é a porta de entrada da sua aplicação e quem orquestra como as páginas HTML são formadas e enviadas ao navegador.

## Arquivos Principais

### `layout.tsx`
- **Função:** É o **Root Layout**. Ele engloba todas as páginas do site com a estrutura base do HTML (`<html>` e `<body>`).
- **Detalhe Técnico:** É responsável por importar o CSS global, definir metadados globais (para SEO, como título e descrição da página).

### `page.tsx`
- **Função:** A rota principal (home, equivalente a `/`).
- **Detalhe Técnico:** Este arquivo age apenas como um Server Component básico (por padrão no Next.js) que importa e renderiza o componente principal cliente `HomePageClient`. Isso deixa a configuração de SEO intacta no servidor e delega a interatividade.

### `HomePageClient.tsx`
- **Função:** O cérebro da página inicial. Como a interface precisa de estado para a filtragem dos projetos (ex: filtrar por "Festas", "Arte", etc.), este arquivo contém a diretiva `"use client"` do Next.js.
- **Detalhe Técnico:** Ele une todos os blocos principais visuais da pasta `components/` (Header, Hero, History, Projects, Community, Footer) e gerencia o estado `selectedProjectFilter` que é propagado para baixo (props) na árvore de componentes.

### `globals.css`
- **Função:** O nosso **Design System Vanilla**.
- **Detalhe Técnico:** Ao invés de usar frameworks de utilitários como Tailwind ou Bootstrap de forma intrusiva, a estilização aqui usa o poder nativo do CSS através de variáveis (ex: `--color-night`, `--spacing-md`).
- Todas as definições visuais básicas (`.btn-primary`, tipografia, reset CSS, e gradiente do background de tela inteira `.bg-pattern`) estão centralizadas aqui. Qualquer modificação de tema ou cor deve ser feita nas variáveis deste arquivo.
