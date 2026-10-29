
# Agende-se — Funcionalidades e Regras de Negócio

## 1. Visão Geral

O Agende-se é um aplicativo mobile destinado ao gerenciamento de tarefas empresariais, permitindo que gestores organizem atividades, estabeleçam prazos, atribuam responsabilidades e acompanhem a execução das demandas.

O sistema será dividido em módulos, proporcionando uma navegação simples e organizada.

## 2. Gerenciamento de Colaboradores

O aplicativo permitirá o cadastro e a manutenção dos colaboradores envolvidos nas atividades empresariais.

### Funcionalidades

- Cadastrar colaboradores informando nome e cargo.
- Consultar a lista de colaboradores cadastrados.
- Editar informações dos colaboradores.
- Ativar ou desativar colaboradores.
- Associar colaboradores às tarefas como responsáveis ou solicitantes.

### Regras de Negócio

- RN01: Todo colaborador deverá possuir um nome.
- RN02: Um colaborador poderá ser responsável por várias tarefas.
- RN03: Um colaborador poderá ser solicitante de várias tarefas.
- RN04: Apenas colaboradores ativos poderão ser associados a novas tarefas.
- RN05: A desativação de um colaborador não excluirá seu histórico de tarefas.

## 3. Gerenciamento de Tarefas

Este será o módulo principal do aplicativo, responsável pelo cadastro e acompanhamento das atividades empresariais.

### Funcionalidades

- Cadastrar tarefas com título e descrição.
- Definir data e horário previstos para execução.
- Selecionar o colaborador responsável.
- Selecionar o colaborador solicitante.
- Definir a prioridade da tarefa.
- Consultar tarefas cadastradas.
- Editar informações das tarefas.
- Atualizar a situação das tarefas.

### Prioridades

As tarefas poderão receber quatro níveis de prioridade:

- **Baixa:** atividades sem necessidade de execução imediata.
- **Média:** atividades de importância moderada.
- **Alta:** atividades importantes que exigem atenção.
- **Urgente:** atividades que necessitam de execução prioritária.

### Situações

As tarefas poderão apresentar as seguintes situações:

- **Pendente:** tarefa cadastrada, mas ainda não iniciada.
- **Em andamento:** tarefa cuja execução foi iniciada.
- **Concluída:** tarefa finalizada.
- **Cancelada:** tarefa que não será mais executada.

### Regras de Negócio

- RN10: Toda tarefa deverá possuir título e descrição.
- RN11: Toda tarefa deverá possuir data e horário previstos para execução.
- RN12: Toda tarefa deverá possuir responsável, solicitante e categoria.
- RN13: Toda tarefa deverá possuir uma prioridade válida.
- RN14: Toda tarefa será cadastrada inicialmente como pendente.
- RN15: A situação da tarefa poderá ser atualizada durante seu ciclo de vida.
- RN16: Ao concluir uma tarefa, o sistema registrará automaticamente a data e o horário da conclusão.
- RN17: Tarefas pendentes ou em andamento cujo prazo já passou serão consideradas atrasadas.
- RN18: Tarefas concluídas ou canceladas não serão consideradas atrasadas.
- RN19: O arquivamento de uma tarefa não excluirá seus dados do banco.
- RN20: As tarefas arquivadas não aparecerão nas consultas principais, mas permanecerão disponíveis no histórico.

## 4. Agenda de Tarefas

O aplicativo disponibilizará uma agenda para facilitar a visualização das atividades programadas.

### Funcionalidades

- Visualizar tarefas organizadas por data.
- Selecionar uma data para consultar suas tarefas.
- Consultar o horário previsto de cada atividade.
- Identificar a prioridade e a situação das tarefas.
- Acessar os detalhes de uma tarefa selecionada.

### Regras de Negócio

- RN21: As tarefas serão apresentadas conforme a data selecionada.
- RN22: As tarefas de uma mesma data serão organizadas por horário.
- RN23: A agenda utilizará as informações armazenadas no banco de dados local.

## 5. Consultas e Filtros

O aplicativo permitirá localizar tarefas utilizando diferentes critérios.

### Funcionalidades

- Consultar tarefas por título.
- Filtrar tarefas por responsável.
- Filtrar tarefas por prioridade.
- Filtrar tarefas por situação.
- Consultar tarefas por período.
- Visualizar tarefas atrasadas.

### Regras de Negócio

- RN24: Os filtros poderão ser utilizados individualmente ou em conjunto.
- RN25: As consultas deverão considerar as informações armazenadas no banco local.
- RN26: As tarefas arquivadas serão ocultadas das consultas principais.

## 6. Dashboard e Indicadores

O aplicativo disponibilizará um painel com informações que auxiliem os gestores no acompanhamento das atividades empresariais.

### Funcionalidades

- Exibir a quantidade total de tarefas.
- Exibir a quantidade de tarefas pendentes.
- Exibir a quantidade de tarefas em andamento.
- Exibir a quantidade de tarefas concluídas.
- Exibir a quantidade de tarefas atrasadas.
- Apresentar a distribuição de tarefas por prioridade.
- Apresentar a quantidade de tarefas concluídas por colaborador.
- Exibir o percentual de conclusão das tarefas.

### Regras de Negócio

- RN27: Os indicadores serão calculados com base nas informações armazenadas no banco de dados local.
- RN28: As tarefas atrasadas serão identificadas considerando o prazo previsto e a situação atual.
- RN29: O percentual de conclusão será calculado pela relação entre tarefas concluídas e o total de tarefas consideradas no indicador.
- RN30: Os indicadores serão atualizados após alterações nos dados das tarefas.

## 7. Funcionamento Offline

O Agende-se utilizará um banco de dados SQLite instalado localmente no dispositivo móvel.

### Funcionalidades

- Cadastrar e consultar informações sem conexão com a internet.
- Atualizar tarefas, colaboradores e categorias offline.
- Armazenar permanentemente os dados no dispositivo.
- Consultar relatórios utilizando os dados locais.

### Regras de Negócio

- RN34: As funcionalidades principais não dependerão de conexão com a internet.
- RN35: As informações serão armazenadas no banco SQLite do dispositivo.
- RN36: Os dados deverão permanecer disponíveis após o fechamento e a reabertura do aplicativo.
- RN37: Não haverá sincronização automática entre diferentes dispositivos nesta versão.

## 8. Informações do Aplicativo

O aplicativo contará com uma tela destinada à apresentação das informações acadêmicas do projeto.

### Funcionalidades

- Exibir o nome do aplicativo.
- Exibir o nome completo de todos os integrantes do grupo.

