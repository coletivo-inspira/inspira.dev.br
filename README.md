# Coletivo Inspira — inspira.dev.br

Portal web e landing page do **Coletivo Inspira** (`inspira.dev.br`): Social, Tecnologia (LINO/B2B) e Cultura.

## Stack

- Next.js (App Router) com `output: "export"` (SSG estático)
- React 19 + TypeScript
- CSS Modules + tokens do [brand-book](https://github.com/coletivo-inspira/brand-book)
- Vitest + Testing Library
- Deploy: GitHub Pages via Actions

## Desenvolvimento

```bash
npm ci
npm run dev
```

Outros comandos:

- `npm run typecheck` — validação TypeScript
- `npm test` — testes
- `npm run build` — gera estáticos em `out/`

## Conteúdo editável

| Arquivo | Uso |
|---|---|
| `src/data/hub.ts` | Pilares, projetos/vitrine, ofertas de `/solucoes` |
| `src/data/events.ts` | Agenda cultural |
| `src/data/impact.ts` | Métricas de impacto (fallback) |
| `src/data/navigation.ts` | Links do header |

Métricas remotas (opcional): defina `NEXT_PUBLIC_IMPACT_URL` apontando para JSON. Em falha, o site usa `src/data/impact.ts`.

## Rotas

- `/` — Home (Hero, impacto, pilares, vitrine, agenda)
- `/manifesto/` — Manifesto institucional
- `/solucoes/` — Vitrine de soluções (destino do selo de rodapé)

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy-pages.yml` em push na `main`:

1. `npm ci` → typecheck → test → build
2. Publica `out/` no GitHub Pages

Configuração manual no repositório:

1. **Settings → Pages → Source:** GitHub Actions
2. Domínio customizado alinhado ao `CNAME` (`inspira.dev.br`)

### Cutover a partir de `coletivo-inspira/.github`

O portal histórico vivia no repositório org `.github` com o mesmo CNAME. Após o primeiro deploy verde neste repo:

1. Confirmar Pages + DNS apontando para **este** repositório
2. Desativar o workflow de Pages em `.github` (manter só profile/templates)
3. Evitar dois hosts competindo por `inspira.dev.br`

## Issue

Implementação alinhada a [INSP-001](https://github.com/coletivo-inspira/inspira.dev.br/issues/1).
