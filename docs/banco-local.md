
# Banco de Dados Local — Agende-se

## 1. Introdução

O aplicativo **Agende-se** utilizará o **SQLite** como sistema de gerenciamento de banco de dados local, permitindo armazenar e consultar informações diretamente no dispositivo Android.

A escolha do SQLite se deve à sua simplicidade, eficiência e capacidade de funcionamento sem conexão com a internet, atendendo aos requisitos do projeto.

## 2. Tecnologias Utilizadas

A implementação do banco de dados utilizará as seguintes tecnologias:

- **SQLite:** armazenamento relacional das informações no dispositivo.
- **Capacitor Community SQLite:** plugin responsável pela comunicação com o banco SQLite nativo.
- **Angular:** organização dos serviços responsáveis pelo acesso e manipulação dos dados.
- **TypeScript:** implementação das operações e regras de negócio.
- **Ionic Framework:** desenvolvimento da interface do aplicativo.

O plugin utilizado está disponível em:

https://github.com/capacitor-community/sqlite

## 3. Estrutura do Banco de Dados

O banco de dados será composto pelas quatro tabelas definidas no modelo ER:

- `usuarios`
- `prioridades`
- `status_tarefas`
- `tarefas`

A descrição dos campos, tipos de dados, chaves e relacionamentos está disponível no documento [Modelo Entidade-Relacionamento](modelo-er.md).

## 4. Inicialização do Banco de Dados

Ao iniciar o aplicativo, será executado um serviço responsável pela inicialização do SQLite.

O processo seguirá as seguintes etapas:

1. Estabelecer a conexão com o banco de dados local.
2. Verificar se as tabelas necessárias já existem.
3. Criar as tabelas na primeira execução do aplicativo.
4. Inserir os registros iniciais de prioridades e situações das tarefas, caso ainda não existam.
5. Disponibilizar a conexão para os serviços responsáveis pelas funcionalidades.

Esse processo permitirá que o aplicativo esteja preparado para armazenar informações desde sua primeira utilização.

## 5. Comunicação com o Banco de Dados

A comunicação com o SQLite será realizada por meio de serviços Angular, utilizando o Capacitor Community SQLite.

As telas do aplicativo não executarão comandos SQL diretamente. Elas utilizarão os serviços responsáveis por realizar as operações necessárias.

O funcionamento seguirá o seguinte fluxo:

**Interface Ionic → Serviços Angular → Capacitor Community SQLite → Banco SQLite**

Essa organização permitirá separar a interface visual das operações de persistência, facilitando a manutenção e a evolução do aplicativo.

## 6. Operações de Persistência

As informações serão manipuladas utilizando comandos SQL.

As principais operações serão:

- **INSERT:** cadastrar usuários e tarefas.
- **SELECT:** consultar registros, aplicar filtros e recuperar informações.
- **UPDATE:** atualizar dados, situações e informações das tarefas.
- **DELETE:** excluir registros quando permitido pelas regras de negócio.

A desativação de usuários e o arquivamento de tarefas serão realizados por meio de operações UPDATE, preservando as informações no banco.

As consultas utilizarão parâmetros para evitar a concatenação direta de valores fornecidos pelo usuário nos comandos SQL.

## 7. Funcionamento Offline

O Agende-se utilizará uma abordagem **offline-first**, mantendo os dados armazenados diretamente no dispositivo Android.

As funcionalidades principais estarão disponíveis mesmo sem conexão com a internet, incluindo:

- Cadastro e consulta de usuários.
- Cadastro e atualização de tarefas.
- Definição de responsáveis e prioridades.
- Acompanhamento das situações das tarefas.
- Consulta da agenda.
- Visualização dos indicadores de produtividade.

Nesta versão, o aplicativo não realizará sincronização com servidores externos ou outros dispositivos.

## 8. Persistência e Integridade

O banco SQLite será armazenado no espaço privado do aplicativo Android.

As informações permanecerão disponíveis após o fechamento e a reabertura do aplicativo.

Para preservar a integridade dos registros, serão utilizadas as restrições definidas no modelo ER, incluindo chaves primárias, chaves estrangeiras e validações de campos obrigatórios.

## 9. Consultas e Indicadores

O dashboard do Agende-se utilizará consultas SQL para obter informações sobre o andamento das atividades.

Serão utilizadas operações de filtragem e agregação para calcular indicadores como:

- Quantidade de tarefas por situação.
- Quantidade de tarefas atrasadas.
- Distribuição das tarefas por prioridade.
- Quantidade de tarefas por responsável.
- Percentual de tarefas concluídas.

Os indicadores serão calculados a partir dos registros armazenados localmente, sem necessidade de serviços externos.

## 10. Considerações Finais

A implementação do SQLite permitirá que o Agende-se ofereça armazenamento persistente e funcionamento offline.

A utilização do Capacitor Community SQLite, em conjunto com os serviços Angular, proporcionará uma estrutura organizada para acessar e manipular os dados.
