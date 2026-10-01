# Camada de Tipagem (`src/types/`)

O **TypeScript** existe para adicionar "tipos" ao Javascript, prevenindo uma enorme categoria de bugs gerada por dados não definidos, de chaves erradas a typos (erros de digitação). A pasta de `types/` centraliza a biblioteca de tipagens usadas globalmente.

A regra fundamental aqui é que todos os "Contratos" (o que cada componente deve receber) estão escritos nesses arquivos e exportados, criando uma dependência limpa com os módulos que os utilizam.

## Visão Técnica dos Arquivos

### `project.ts`
Define a fundação estática dos nossos projetos comunitários.
- **`ProjectFilter`**: Ele é um *Union Type* (um tipo especial literal: `"Todos" | "Festas" | "Saúde" | "Arte"`). Isso impede que em algum lugar do código você escreva acidentalmente `"festas"` e quebre o filtro. O TypeScript bloqueará na hora.
- **`Project`**: A interface que modela cada objeto encontrado lá na nossa pasta de dados (`src/data/projects.ts`). Exige as propriedades cruciais para que o `ProjectCard` desenhe a tela.

### `github.ts`
Define os contratos da nossa comunicação com o backend assíncrono (A API do GitHub).
- **`GitHubRepo`**: Esta é a interface exata de um repositório como o Hook `useGitHubRepos` deverá tratar. Ele não pega tudo o que a API manda. O *payload* enorme da web é encurtado, garantindo somente o que vamos usar: `id`, `name`, `description`, `html_url`, `stargazers_count` e afins.
- Quando o `RepoGrid` e o `RepoCard` consomem o Hook, o TypeScript do lado do frontend "sabe" quais teclas autocompletar porque estão todas validadas aqui.
