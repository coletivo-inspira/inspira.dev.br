# Camada de Lógica Especializada (`src/hooks/`)

Nesta pasta ficam os **Custom Hooks** do React. O objetivo desta camada é separar as **regras de negócio** e a manipulação assíncrona dos componentes de apresentação. Se algum componente precisa fazer chamadas de rede (Fetch) ou cálculos pesados contínuos, ele usará um hook daqui.

## Detalhe Interno do `useGitHubRepos.ts`

Esse é o principal cérebro lógico por trás da "Seção da Comunidade" do Coletivo Inspira. Ele abstrai toda a complexidade de ir até a internet buscar perfis e tratá-los para a UI.

### Fluxo de Execução (O que ele faz?)

1. **Estado Inicial:** O Hook cria um estado de `loading: true` e `data: null`, o que permite ao UI `RepoGrid` renderizar Skeletons bonitos para o usuário.
2. **Fetch Controlado:** Dentro de um `useEffect`, ele faz chamadas ao endereço da **API Rest do GitHub**.
3. **Mapeamento de Tipos:** Ele transforma a resposta "suja" em formato JSON do GitHub para um formato estritamente tipado que só contém o que importa usando os contratos gerados na camada `src/types/github.ts` (ex: só nome, descrição, estrelas e HTML da página).
4. **Tratamento de Erros:** Caso o GitHub rejeite a chamada (ex: bloqueio de API Rate Limiting, sem internet, ou erro 500), ele captura (catch) e emite a bandeira `error: "Mensagem de erro"` para os componentes tratarem sem "quebrar" a tela em branco pro usuário final.
5. **Teste e Validação:** Você encontrará nesta mesma pasta o arquivo `useGitHubRepos.test.ts`, que usa as bibliotecas do Testing Library e do Vitest para verificar se todos esses estágios de Promise (resolvido, carregando e rejeitado) estão comportando-se da forma esperada, criando um mock da API.
