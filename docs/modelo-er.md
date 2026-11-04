# 🗄️ Modelo Entidade-Relacionamento (ER) - Agende-se

O aplicativo **Agende-se** utiliza uma arquitetura de dados relacional normalizada, projetada para suportar o armazenamento local (offline-first), a gestão de tarefas e a alimentação de dashboards.

## 1. Diagrama Entidade-Relacionamento
Abaixo está representado o modelo conceitual e lógico das entidades do sistema:

![Diagrama ER](modeloER_bancoDeDados.png)

## 2. Dicionário de Dados

### Tabela: `usuarios`
- **id** (INTEGER, PK): Identificador único.
- **nome** (VARCHAR 100): Nome completo.
- **email** (VARCHAR 100): E-mail corporativo (único).
- **cargo** (VARCHAR 50): Função na empresa.

### Tabela: `prioridades`
- **id** (INTEGER, PK): Identificador único.
- **nivel** (VARCHAR 50): Descrição (ex: Alta, Média, Baixa).
- **cor_hex** (VARCHAR 7): Código da cor correspondente.
- **ordem** (INTEGER): Peso numérico para ordenação.

### Tabela: `status_tarefas`
- **id** (INTEGER, PK): Identificador único.
- **nome_status** (VARCHAR 50): Estágio atual.
- **is_concluida** (BOOLEAN): Indicador se o status finaliza a tarefa.

### Tabela: `tarefas` (Entidade Central)
- **id** (INTEGER, PK): Identificador único.
- **titulo** / **descricao**: Informações textuais da atividade.
- **data_hora_inicio** / **data_hora_prazo**: Janela temporal.
- **solicitante_id** & **responsavel_id** (INTEGER, FK -> `usuarios.id`): Vínculos de autoria e execução.
- **prioridade_id** (INTEGER, FK -> `prioridades.id`): Classificação de urgência.
- **status_id** (INTEGER, FK -> `status_tarefas.id`): Estado atual.
- **sync_status** (VARCHAR 20): Flag de controlo para operações offline.
