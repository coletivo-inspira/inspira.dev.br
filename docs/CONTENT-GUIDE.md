# Guia de conteúdo do hub

## Onde editar

Todo conteúdo recorrente do hub fica em `src/data/hub.ts`.

- `hubConfig`: endereços oficiais, redes e destino do HUDI Pages.
- `pillars`: os três pilares apresentados na home.
- `projects`: destaques e demais iniciativas.

Os componentes apenas apresentam esses dados. Não replique cards manualmente em
arquivos TSX.

## Adicionar um projeto

Inclua um novo objeto em `projects`:

```ts
{
  id: "slug-unico",
  title: "Nome do projeto",
  eyebrow: "Categoria curta",
  pillar: "Social",
  description: "Descrição objetiva do projeto.",
  location: "Cidade-UF",
  status: "Em desenvolvimento",
  featured: false,
  href: "https://endereco-opcional.example",
}
```

Use apenas os pilares `Social`, `Tecnologia` ou `Cultura`. A ordem no arquivo é a
ordem na página. Defina `featured: true` para aplicar o destaque visual.

## Checklist editorial

1. Título com grafia oficial e até 40 caracteres.
2. Descrição com uma ideia principal e até 180 caracteres.
3. Local e status atualizados.
4. Link público revisado, quando existir.
5. Execute `npm test`, `npm run typecheck` e `npm run build`.

