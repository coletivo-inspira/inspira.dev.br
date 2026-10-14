# Direção A — Coletivo Inspira

Memória de interface do hub e do Brand Book. Sessões seguintes seguem estas regras.

## Fundação

- 60% claro: off-white `#F7F7F4` com malha pontilhada (1px a cada 20–24px, floresta a ~18% de opacidade).
- 30% arquitetura: verde floresta `#133824` como tinta, contorno e bloco de contraste. Menta `#A3E5C2` e lima `#BAFF29` como superfícies modulares.
- 10% ação: mostarda `#E5A93C`, laranja `#F05D23`, rosa `#E5007C`. Só em CTA, status, sticker e acento.

## Ativos oficiais da marca

- `public/image/logo/logo.svg`: logo completa `+INSPIRA COLETIVO` (viewBox `0 0 1000 1000`) com fundo `#F6F6F3` e malha pontilhada `#D2D4D0`. Também é o favicon.
- `public/image/logo/logo-transparent.svg`: sem fundo, viewBox `120 185 760 635`. Para Header, Footer e selos.
- `public/image/logo/logo-animated.svg`: variante animada para o Brand Book.
- Cores da logo: bloco do `+` em lima `#BAFF29`, letras `INS / PIRA` e `COLETIVO` em floresta `#133824`, 31 nós e alças de Bézier em menta `#A3E5C2`.
- No portal, use sempre `<InspiraLogo />` (`src/components/Logo/InspiraLogo.tsx`): SVG inline com `variant="full" | "transparent" | "badge"`, `animated` e `showSubtitle`. Não usar `<img>` para a logo.
- Proibido voltar aos rasters antigos (`logo.png`, `versao1.png`, `versao2.png`, `versao3.jpg`, `Laranja-Terracota.jpg`); foram removidos do repositório.

## Tipografia

- Display: Syne (Bold 700 / ExtraBold 800), leading 100–110%, alinhamento à esquerda.
- Corpo: DM Sans, leading 140–160%.
- Escala de referência no Brand Book: H1 48px, corpo 16px. O hero do portal pode ser maior, mantendo a razão display/corpo.

## Superfície

```css
--color-bg-primary: #F7F7F4;
--color-forest: #133824;
--color-lime: #BAFF29;
--color-mint: #A3E5C2;
--color-mustard: #E5A93C;
--color-orange: #F05D23;
--color-pink: #E5007C;
--border-hairline: 1px solid rgba(19, 56, 36, 0.16);
--shadow-inspira-soft: 4px 4px 0px rgba(19, 56, 36, 0.12);
--shadow-inspira-lime: 4px 4px 0px #BAFF29;
```

`.surface-dot-grid` usa o fundo off-white e pontos radiais. `.surface-mint-dot-grid` usa menta.

## Movimento

- Reveal no scroll, stagger do wordmark, hover tátil e rotação lenta do selo.
- `prefers-reduced-motion: reduce` desliga loops, stagger e transições longas.

## Não fazer

- Dark mode, glassmorphism, cream com serif, roxo genérico, dashboards densos.
- Cards flutuantes empilhados no hero. Um acento por região.
- Paletas Solar, Pop e Tropical são variações de projeto no Brand Book. A home do hub usa só a base clara.

## Componentes do hub

- Hero claro com foto do Rio Formoso, nós digitais sutis e um Starburst lima.
- Quatro pilares em abas de pasta.
- História com rota topográfica Bonito–BH.
- Vitrine e repositórios em grade hairline 1px, filtros em pílulas `+` / `×`.
- Métricas bipartidas. Anel de contribuidores só com contagem real da API.
- Selo “Feito com +INSPIRA” aponta para `/solucoes/`.
