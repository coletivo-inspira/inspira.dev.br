# Camada de Dados Estáticos (`src/data/`)

Esta é a nossa pseudo base de dados. Quando a aplicação React não possui um servidor ou um banco de dados SQL como Postgres acoplado, mantemos os dados textuais do site (textos ricos, listas infinitas de links, atributos das entidades) totalmente isolados da interface em arquivos estáticos `.ts`.

Isso tem um enorme benefício: Quando um redator ou alguém não-técnico do Coletivo Inspira precisar alterar a descrição de um projeto, eles só precisam abrir esse arquivo e mudar o texto sem medo de quebrar um HTML mal fechado nos componentes.

## Descrição dos Arquivos de Dados

### `projects.ts`
- É um array (lista) de objetos, em que cada objeto representa um projeto ativo (ex: `Carnaboia`, `Meu Bloquinho`, etc).
- **Campos Estáticos Guardados:** ID único gerado, Título, Descrição em texto, Categoria vinculada (para que o filtro inteligente funcione perfeitamente) e o Status.
- Ele atende o componente mestre da seção de `ProjectsSection.tsx`, que apenas pega essa lista, filtra o que não bater com a tab atual, e renderiza os "cards" bonitinhos por cima desses dados usando a função `.map()`.

### `navigation.ts`
- É aqui que guardamos duas entidades vitais e que mudam frequentemente num site corporativo: os links do header e os das mídias sociais.
- **`MAIN_NAVIGATION`**: Contém o texto (Label) e a âncora (Href, ex `#sobre`). Quando precisamos adicionar um menu novo, alteramos aqui e o header repinta automaticamente sem você abrir o código principal do Header.
- **`SOCIAL_LINKS`**: Contém a âncora pra onde a seta aponta (link do Instagram, etc). Usado primordialmente no componente de `Footer`.
