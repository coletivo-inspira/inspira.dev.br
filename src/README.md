# Visão Geral da Arquitetura (`src/`)

Bem-vindo à pasta principal do código do **Coletivo Inspira**. 

A arquitetura do projeto foi pensada para isolar responsabilidades em **múltiplas camadas**, garantindo que o código se mantenha previsível, testável e fácil de expandir. O fluxo de dados obedece à regra de passagem de informações de cima para baixo (unidirecional) ou de isolamento através de hooks.

## 📂 Camadas Internas do Código

Aqui dentro você encontrará as seguintes subpastas organizadas por contexto técnico:

- **[`app/`](app/README.md)**: A camada mais externa da aplicação. Ela define as **rotas**, os **layouts HTML** e carrega o CSS global. Todo o fluxo do usuário se inicia e termina renderizando componentes aqui.
- **[`components/`](components/README.md)**: A camada visual da aplicação. Estes são componentes React focados em UI (User Interface). Muitos deles são reutilizáveis e recebem seus dados via propriedades (props) para garantir o encapsulamento.
- **[`hooks/`](hooks/README.md)**: A camada de lógica reaproveitável do React. Aqui ficam as requisições, gerenciamento de estado e ciclo de vida que abstraímos para fora dos componentes para manter a UI "limpa".
- **[`data/`](data/README.md)**: A camada de conteúdo estático ("mock data") e constantes. Como o projeto atualmente não possui um backend de banco de dados, os conteúdos do site (projetos, textos, categorias) estão isolados em arquivos nessa pasta para facilitar a edição pelo time de conteúdo sem precisarem tocar no código da interface.
- **[`types/`](types/README.md)**: A camada de definição estática do TypeScript. Aqui declaramos os contratos de dados da nossa aplicação (interfaces) garantindo que nenhum erro de digitação de propriedades ocorra em tempo de execução.

## Fluxo da Aplicação (Data Flow)

1. A página (`app/page.tsx`) é acessada e invoca o seu componente client-side (`app/HomePageClient.tsx`).
2. O Client Component lê os dados estáticos da pasta `data/` para popular as áreas de texto.
3. Se necessário fazer integrações externas (como a exibição dos repositórios GitHub), componentes chamam a lógica assíncrona da pasta `hooks/`.
4. Os dados retornados (validados pela tipagem forte da pasta `types/`) são então passados para os componentes modulares dentro de `components/` que renderizam a tela para o usuário.
