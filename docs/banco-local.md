# Agende-se — Banco de Dados Local

## 1. Introdução

O aplicativo **Agende-se** utiliza o **SQLite** como sistema de gerenciamento de banco de dados local, permitindo armazenar e consultar informações diretamente no dispositivo Android.

A escolha do SQLite se deve à sua simplicidade, eficiência e capacidade de funcionamento sem conexão com a internet, atendendo aos requisitos do projeto.

## 2. Tecnologias Utilizadas

A implementação do banco de dados utiliza as seguintes tecnologias:

- **SQLite:** armazenamento relacional das informações no dispositivo.
- **Capacitor Community SQLite:** plugin responsável pela comunicação com o banco SQLite nativo.
- **Angular:** organização dos serviços responsáveis pelo acesso e manipulação dos dados.
- **TypeScript:** implementação das operações e regras de negócio.
- **Ionic Framework:** desenvolvimento da interface do aplicativo.

O plugin utilizado está disponível em:

https://github.com/capacitor-community/sqlite

## 3. Estrutura do Banco de Dados

O banco de dados é composto pelas quatro tabelas definidas no modelo ER:

- `usuarios`
- `prioridades`
- `status_tarefas`
- `tarefas`

A descrição dos campos, tipos de dados, chaves e relacionamentos está disponível no documento [Modelo Entidade-Relacionamento](modelo-er.md).

## 4. Inicialização do Banco de Dados

Ao iniciar o aplicativo, é executado um serviço responsável pela inicialização do SQLite.

O processo segue as seguintes etapas:

1. Estabelecer a conexão com o banco de dados local.
2. Verificar se as tabelas necessárias já existem.
3. Criar as tabelas caso ainda não existam.
4. Inserir os registros iniciais de usuários, prioridades, situações e tarefas de demonstração, evitando a duplicação dos registros existentes.
5. Disponibilizar a conexão para os serviços responsáveis pelas funcionalidades.

Esse processo permite que o aplicativo esteja preparado para armazenar informações desde sua primeira utilização.

## 5. Comunicação com o Banco de Dados

A comunicação com o SQLite é realizada por meio de serviços Angular, utilizando o Capacitor Community SQLite.

Os principais serviços implementados são:

- **DatabaseService (`database.ts`):** responsável pela inicialização, conexão e execução dos comandos SQL.
- **TarefasService (`tarefas.ts`):** responsável pelo gerenciamento das tarefas e pela comunicação com o serviço de banco de dados.

As telas do aplicativo não executam comandos SQL diretamente. Elas utilizam os serviços responsáveis por realizar as operações necessárias.

O funcionamento segue o seguinte fluxo:

**Interface Ionic → Serviços Angular → Capacitor Community SQLite → Banco SQLite**

Essa organização permite separar a interface visual das operações de persistência, facilitando a manutenção e a evolução do aplicativo.

## 6. Operações de Persistência

As informações são manipuladas utilizando comandos SQL.

As principais operações implementadas são:

- **INSERT:** cadastrar usuários e tarefas.
- **SELECT:** consultar registros e recuperar informações.
- **UPDATE:** atualizar dados, situações e informações das tarefas.

A exclusão de tarefas é realizada de forma lógica, utilizando uma operação UPDATE no campo `arquivada`. Dessa forma, os registros são preservados no banco de dados, mas deixam de ser apresentados nas listagens do aplicativo.

As operações que recebem dados do usuário utilizam parâmetros para evitar a concatenação direta de valores nos comandos SQL.

## 7. Funcionamento Offline

O Agende-se utiliza uma abordagem **offline-first**, mantendo os dados armazenados diretamente no dispositivo Android.

As funcionalidades principais estão disponíveis mesmo sem conexão com a internet, incluindo:

- Cadastro e consulta de usuários.
- Cadastro, edição e exclusão lógica de tarefas.
- Definição de responsáveis, solicitantes e prioridades.
- Alteração e acompanhamento das situações das tarefas.
- Consulta da agenda.
- Visualização dos indicadores de produtividade.

Nesta versão, o aplicativo não realiza sincronização com servidores externos ou outros dispositivos.

## 8. Persistência e Integridade

O banco SQLite é armazenado no espaço privado do aplicativo Android.

As informações permanecem disponíveis após o fechamento e a reabertura do aplicativo.

Para preservar a integridade dos registros, são utilizadas as restrições definidas no modelo ER, incluindo chaves primárias, chaves estrangeiras e campos obrigatórios.

Além disso, os formulários possuem validações para evitar o cadastro de informações inválidas ou incompletas.

## 9. Consultas e Indicadores

Os dados das tarefas são recuperados do SQLite por meio de consultas SQL, incluindo relacionamentos entre as tabelas.

As informações recuperadas são processadas pela aplicação utilizando TypeScript, permitindo a
