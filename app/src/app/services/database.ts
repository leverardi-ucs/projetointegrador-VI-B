import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  private inicializacao: Promise<void> | null = null;

  aguardarInicializacao(): Promise<void> {
    if (!this.inicializacao) {
      this.inicializacao = this.inicializarBanco();
    }

    return this.inicializacao;
  }

  async inicializarBanco(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      console.log('SQLite nativo não disponível no navegador.');
      return;
    }

    try {
      this.db = await this.sqlite.createConnection('agende_se', false, 'no-encryption', 1, false);

      await this.db.open();

      await this.db.execute('PRAGMA foreign_keys = ON;');

      await this.criarTabelas();

      await this.inserirDadosIniciais();

      console.log('Banco SQLite inicializado com sucesso!');
    } catch (erro) {
      console.error('Erro ao conectar ao SQLite:', erro);
      throw erro;
    }
  }

  obterConexao(): SQLiteDBConnection {
    if (!this.db) {
      throw new Error('O banco de dados ainda não foi inicializado.');
    }

    return this.db;
  }

  async criarTabelas(): Promise<void> {
    const db = this.obterConexao();

    const sql = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      cargo TEXT,
      ativo INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS prioridades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nivel TEXT NOT NULL,
      cor_hex TEXT NOT NULL,
      ordem INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS status_tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_status TEXT NOT NULL,
      is_concluida INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data_hora_inicio TEXT,
      data_hora_prazo TEXT NOT NULL,
      data_hora_conclusao TEXT,
      solicitante_id INTEGER NOT NULL,
      responsavel_id INTEGER NOT NULL,
      prioridade_id INTEGER NOT NULL,
      status_id INTEGER NOT NULL,
      arquivada INTEGER NOT NULL DEFAULT 0,

      FOREIGN KEY (solicitante_id)
        REFERENCES usuarios(id),

      FOREIGN KEY (responsavel_id)
        REFERENCES usuarios(id),

      FOREIGN KEY (prioridade_id)
        REFERENCES prioridades(id),

      FOREIGN KEY (status_id)
        REFERENCES status_tarefas(id)
    );
  `;

    await db.execute(sql);

    console.log('Tabelas criadas com sucesso!');
  }

  async inserirDadosIniciais(): Promise<void> {
    const db = this.obterConexao();

    const sql = `
    INSERT INTO prioridades (id, nivel, cor_hex, ordem)
    VALUES
      (1, 'Baixa', '#22C55E', 1),
      (2, 'Média', '#EAB308', 2),
      (3, 'Alta', '#F97316', 3),
      (4, 'Urgente', '#EF4444', 4)
    ON CONFLICT(id) DO NOTHING;

    INSERT INTO status_tarefas (id, nome_status, is_concluida)
    VALUES
      (1, 'Pendente', 0),
      (2, 'Em andamento', 0),
      (3, 'Concluída', 1)
    ON CONFLICT(id) DO NOTHING;

    INSERT INTO usuarios (id, nome, email, cargo)
    VALUES
      (1, 'Luis Eduardo Verardi', 'luiseduardo@exemplo.com', 'Diretoria'),
      (2, 'João Gabriel Silvestrin', 'joaogabriel@exemplo.com', 'Gestor'),
      (3, 'Thobias Cavalli', 'thobias@exemplo.com', 'Colaborador'),
      (4, 'Joe Sander dos Reis Marinho', 'joe@exemplo.com', 'Colaborador')
    ON CONFLICT(id) DO NOTHING;

    INSERT INTO tarefas (
      id,
      titulo,
      descricao,
      data_hora_inicio,
      data_hora_prazo,
      solicitante_id,
      responsavel_id,
      prioridade_id,
      status_id
    )
  VALUES
  (
    1,
    'Enviar proposta ao cliente',
    'Revisar valores e enviar a proposta final.',
    '2026-11-03 09:00:00',
    '2026-11-03 16:00:00',
    2, 1, 3, 2
  ),
  (
    2,
    'Conferir estoque semanal',
    'Conferir as quantidades em estoque.',
    '2026-11-02 08:00:00',
    '2026-11-02 09:00:00',
    1, 3, 2, 1
  ),
  (
    3,
    'Atualizar planilha de custos',
    'Atualizar os custos dos produtos.',
    '2026-11-06 09:00:00',
    '2026-11-06 14:30:00',
    2, 4, 1, 3
  ),
  (
    4,
    'Reunião de alinhamento',
    'Reunião para discutir as atividades da equipe.',
    '2026-11-07 09:00:00',
    '2026-11-07 10:00:00',
    2, 1, 2, 1
  )
ON CONFLICT(id) DO NOTHING;
  `;

    console.log('Iniciando inserção dos dados iniciais...');

    const usuarios = await db.query('SELECT id, nome FROM usuarios ORDER BY id;');

    const prioridades = await db.query('SELECT id, nivel FROM prioridades ORDER BY id;');

    const status = await db.query('SELECT id, nome_status FROM status_tarefas ORDER BY id;');

    console.log('USUARIOS:', JSON.stringify(usuarios.values));
    console.log('PRIORIDADES:', JSON.stringify(prioridades.values));
    console.log('STATUS:', JSON.stringify(status.values));

    const comandos = sql
      .split(';')
      .map((comando) => comando.trim())
      .filter((comando) => comando.length > 0);

    for (const comando of comandos) {
      try {
        console.log('Executando SQL:', comando);
        await db.execute(`${comando};`);
      } catch (erro) {
        console.error('Erro no comando SQL:', comando);
        throw erro;
      }
    }

    console.log('Inserção dos dados iniciais concluída.');
    console.log('Dados iniciais inseridos com sucesso!');
  }

  async listarTarefas(): Promise<any[]> {
    await this.aguardarInicializacao();

    const db = this.obterConexao();

    const resultado = await db.query(`
    SELECT
      t.id,
      t.titulo,
      t.descricao,
      t.data_hora_inicio,
      t.data_hora_prazo,
      t.data_hora_conclusao,
      solicitante.nome AS solicitante,
      responsavel.nome AS responsavel,
      p.nivel AS prioridade,
      s.nome_status AS situacao
    FROM tarefas t
    INNER JOIN usuarios solicitante
      ON solicitante.id = t.solicitante_id
    INNER JOIN usuarios responsavel
      ON responsavel.id = t.responsavel_id
    INNER JOIN prioridades p
      ON p.id = t.prioridade_id
    INNER JOIN status_tarefas s
      ON s.id = t.status_id
    WHERE t.arquivada = 0
    ORDER BY t.data_hora_prazo ASC;
  `);

    return resultado.values ?? [];
  }

  async inserirTarefa(
    titulo: string,
    descricao: string,
    dataHoraInicio: string,
    dataHoraPrazo: string,
    solicitanteId: number,
    responsavelId: number,
    prioridadeId: number,
    statusId: number,
  ): Promise<number> {
    await this.aguardarInicializacao();

    const db = this.obterConexao();

    const resultado = await db.run(
      `INSERT INTO tarefas (
      titulo,
      descricao,
      data_hora_inicio,
      data_hora_prazo,
      solicitante_id,
      responsavel_id,
      prioridade_id,
      status_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, descricao, dataHoraInicio, dataHoraPrazo, solicitanteId, responsavelId, prioridadeId, statusId],
    );

    return resultado.changes?.lastId ?? 0;
  }

  async buscarUsuarioPorNome(nome: string): Promise<number | null> {
    await this.aguardarInicializacao();

    const db = this.obterConexao();

    const resultado = await db.query('SELECT id FROM usuarios WHERE nome = ? LIMIT 1;', [nome]);

    return resultado.values?.[0]?.id ?? null;
  }

  async atualizarTarefa(
    id: number,
    titulo: string,
    descricao: string,
    dataHoraInicio: string,
    dataHoraPrazo: string,
    solicitanteId: number,
    responsavelId: number,
    prioridadeId: number,
    statusId: number,
  ): Promise<boolean> {
    await this.aguardarInicializacao();

    const db = this.obterConexao();

    const resultado = await db.run(
      `UPDATE tarefas
     SET titulo = ?,
         descricao = ?,
         data_hora_inicio = ?,
         data_hora_prazo = ?,
         solicitante_id = ?,
         responsavel_id = ?,
         prioridade_id = ?,
         status_id = ?
     WHERE id = ?`,
      [titulo, descricao, dataHoraInicio, dataHoraPrazo, solicitanteId, responsavelId, prioridadeId, statusId, id],
    );

    return (resultado.changes?.changes ?? 0) > 0;
  }

  async atualizarSituacaoTarefa(
    id: number,
    statusId: number
  ): Promise<boolean> {
    await this.aguardarInicializacao();

    const db = this.obterConexao();

    const resultado = await db.run(
      'UPDATE tarefas SET status_id = ? WHERE id = ?;',
      [statusId, id]
    );

    return (resultado.changes?.changes ?? 0) > 0;
  }

  async excluirTarefa(id: number): Promise<boolean> {
    await this.aguardarInicializacao();

    const db = this.obterConexao();

    const resultado = await db.run('UPDATE tarefas SET arquivada = 1 WHERE id = ? AND arquivada = 0;', [id]);

    return (resultado.changes?.changes ?? 0) > 0;
  }

  async listarUsuarios(): Promise<{ id: number; nome: string }[]> {
    await this.aguardarInicializacao();

    const db = this.obterConexao();

    const resultado = await db.query('SELECT id, nome FROM usuarios ORDER BY nome ASC;');

    return (resultado.values ?? []) as {
      id: number;
      nome: string;
    }[];
  }

  async inserirUsuario(
  nome: string,
  email: string,
  cargo: string
): Promise<number> {
  await this.aguardarInicializacao();

  const db = this.obterConexao();

  const resultado = await db.run(
    `INSERT INTO usuarios (nome, email, cargo)
     VALUES (?, ?, ?);`,
    [nome, email, cargo]
  );

  return resultado.changes?.lastId ?? 0;
}
}
