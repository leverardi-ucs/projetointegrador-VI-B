import { inject, Injectable } from '@angular/core';
import { DatabaseService } from './database';

export type SituacaoTarefa = 'pendente' | 'andamento' | 'concluida';

export type PrioridadeTarefa = 'baixa' | 'media' | 'alta' | 'urgente';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  responsavel: string;
  solicitante: string;
  dataInicio: string;
  horaInicio: string;
  dataPrazo: string;
  horaPrazo: string;
  prazo?: string;
  prioridade: PrioridadeTarefa;
  situacao: SituacaoTarefa;
}

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  tarefas: Tarefa[] = [];
  private readonly databaseService = inject(DatabaseService);

  async carregarTarefas(): Promise<void> {
    const registros = await this.databaseService.listarTarefas();

    this.tarefas = registros.map((registro) => {
      const [dataInicio, horaInicio = '00:00'] = (registro.data_hora_inicio ?? '').split(' ');

      const [dataPrazo, horaPrazo = '00:00'] = (registro.data_hora_prazo ?? '').split(' ');

      const prioridades: Record<string, PrioridadeTarefa> = {
        Baixa: 'baixa',
        Média: 'media',
        Alta: 'alta',
        Urgente: 'urgente',
      };

      const situacoes: Record<string, SituacaoTarefa> = {
        Pendente: 'pendente',
        'Em andamento': 'andamento',
        Concluída: 'concluida',
      };

      return {
        id: registro.id,
        titulo: registro.titulo,
        descricao: registro.descricao ?? '',
        responsavel: registro.responsavel,
        solicitante: registro.solicitante,
        dataInicio,
        horaInicio: horaInicio.slice(0, 5),
        dataPrazo,
        horaPrazo: horaPrazo.slice(0, 5),
        prioridade: prioridades[registro.prioridade],
        situacao: situacoes[registro.situacao],
      };
    });
  }

  buscarPorId(id: number) {
    return this.tarefas.find((tarefa) => tarefa.id === id);
  }

  async atualizarSituacao(id: number, situacao: SituacaoTarefa): Promise<boolean> {
    const situacoes: Record<SituacaoTarefa, number> = {
      pendente: 1,
      andamento: 2,
      concluida: 3,
    };

    const atualizado = await this.databaseService.atualizarSituacaoTarefa(id, situacoes[situacao]);

    if (!atualizado) {
      return false;
    }

    const tarefa = this.buscarPorId(id);

    if (tarefa) {
      tarefa.situacao = situacao;
    }

    return true;
  }

  async adicionarTarefa(dados: Omit<Tarefa, 'id'>): Promise<Tarefa> {
    const solicitanteId = await this.databaseService.buscarUsuarioPorNome(dados.solicitante);

    const responsavelId = await this.databaseService.buscarUsuarioPorNome(dados.responsavel);

    if (solicitanteId === null || responsavelId === null) {
      throw new Error('Solicitante ou responsável não encontrado no banco.');
    }

    const prioridades: Record<PrioridadeTarefa, number> = {
      baixa: 1,
      media: 2,
      alta: 3,
      urgente: 4,
    };

    const situacoes: Record<SituacaoTarefa, number> = {
      pendente: 1,
      andamento: 2,
      concluida: 3,
    };

    const dataHoraInicio = `${dados.dataInicio} ${dados.horaInicio}:00`;
    const dataHoraPrazo = `${dados.dataPrazo} ${dados.horaPrazo}:00`;

    const novoId = await this.databaseService.inserirTarefa(
      dados.titulo,
      dados.descricao,
      dataHoraInicio,
      dataHoraPrazo,
      solicitanteId,
      responsavelId,
      prioridades[dados.prioridade],
      situacoes[dados.situacao],
    );

    if (!novoId) {
      throw new Error('Não foi possível obter o ID da nova tarefa.');
    }

    const novaTarefa: Tarefa = {
      ...dados,
      id: novoId,
    };

    this.tarefas.push(novaTarefa);

    return novaTarefa;
  }

  async atualizarTarefa(id: number, dados: Omit<Tarefa, 'id'>): Promise<boolean> {
    const solicitanteId = await this.databaseService.buscarUsuarioPorNome(dados.solicitante);

    const responsavelId = await this.databaseService.buscarUsuarioPorNome(dados.responsavel);

    if (solicitanteId === null || responsavelId === null) {
      throw new Error('Solicitante ou responsável não encontrado no banco.');
    }

    const prioridades: Record<PrioridadeTarefa, number> = {
      baixa: 1,
      media: 2,
      alta: 3,
      urgente: 4,
    };

    const situacoes: Record<SituacaoTarefa, number> = {
      pendente: 1,
      andamento: 2,
      concluida: 3,
    };

    const dataHoraInicio = `${dados.dataInicio} ${dados.horaInicio}:00`;
    const dataHoraPrazo = `${dados.dataPrazo} ${dados.horaPrazo}:00`;

    const atualizado = await this.databaseService.atualizarTarefa(
      id,
      dados.titulo,
      dados.descricao,
      dataHoraInicio,
      dataHoraPrazo,
      solicitanteId,
      responsavelId,
      prioridades[dados.prioridade],
      situacoes[dados.situacao],
    );

    if (atualizado) {
      const indice = this.tarefas.findIndex((tarefa) => tarefa.id === id);

      if (indice !== -1) {
        this.tarefas[indice] = {
          ...dados,
          id,
        };
      }
    }

    return atualizado;
  }

  async excluirTarefa(id: number): Promise<boolean> {
    const excluida = await this.databaseService.excluirTarefa(id);

    if (!excluida) {
      return false;
    }

    const indice = this.tarefas.findIndex((tarefa) => tarefa.id === id);

    if (indice !== -1) {
      this.tarefas.splice(indice, 1);
    }

    return true;
  }
}
