import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonToolbar } from '@ionic/angular';

import { TarefasService, type PrioridadeTarefa, type SituacaoTarefa } from '../../services/tarefas';
import { DatabaseService } from '../../services/database';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  templateUrl: './tarefa-form.page.html',
  styleUrls: ['./tarefa-form.page.scss'],
  imports: [CommonModule, FormsModule, RouterLink, IonButton, IonContent, IonHeader, IonToolbar],
})
export class TarefaFormPage {
  private readonly tarefasService = inject(TarefasService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly databaseService = inject(DatabaseService);
  private readonly cdr = inject(ChangeDetectorRef);

  usuarios: { id: number; nome: string }[] = [];
  modoEdicao = false;
  idTarefa: number | null = null;
  mensagemErro = '';

  formulario: {
    titulo: string;
    descricao: string;
    responsavel: string;
    solicitante: string;
    dataInicio: string;
    horaInicio: string;
    dataPrazo: string;
    horaPrazo: string;
    prioridade: PrioridadeTarefa;
    situacao: SituacaoTarefa;
  } = {
    titulo: '',
    descricao: '',
    responsavel: '',
    solicitante: '',
    dataInicio: '',
    horaInicio: '',
    dataPrazo: '',
    horaPrazo: '',
    prioridade: 'media',
    situacao: 'pendente',
  };

  prioridades: {
    valor: PrioridadeTarefa;
    nome: string;
  }[] = [
    { valor: 'baixa', nome: 'Baixa' },
    { valor: 'media', nome: 'Média' },
    { valor: 'alta', nome: 'Alta' },
    { valor: 'urgente', nome: 'Urgente' },
  ];

  carregarTarefa(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      return;
    }

    this.modoEdicao = true;
    this.idTarefa = Number(id);
    const tarefa = this.tarefasService.buscarPorId(this.idTarefa);

    if (!tarefa) {
      this.mensagemErro = 'Tarefa não encontrada.';
      return;
    }

    this.formulario = {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      responsavel: tarefa.responsavel,
      solicitante: tarefa.solicitante,
      dataInicio: tarefa.dataInicio,
      horaInicio: tarefa.horaInicio,
      dataPrazo: tarefa.dataPrazo,
      horaPrazo: tarefa.horaPrazo,
      prioridade: tarefa.prioridade,
      situacao: tarefa.situacao,
    };
  }

  async ionViewWillEnter(): Promise<void> {
    this.mensagemErro = '';

    await this.carregarUsuarios();

    this.carregarTarefa();

    this.cdr.detectChanges();
  }

  async salvar(): Promise<void> {
    this.mensagemErro = '';

    const dados = this.formulario;

    if (
      !dados.titulo.trim() ||
      !dados.responsavel.trim() ||
      !dados.solicitante.trim() ||
      !dados.dataInicio ||
      !dados.horaInicio ||
      !dados.dataPrazo ||
      !dados.horaPrazo
    ) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const inicio = new Date(`${dados.dataInicio}T${dados.horaInicio}`);

    const prazo = new Date(`${dados.dataPrazo}T${dados.horaPrazo}`);

    if (!Number.isFinite(inicio.getTime()) || !Number.isFinite(prazo.getTime()) || prazo < inicio) {
      this.mensagemErro = 'O prazo deve ser igual ou posterior ao início.';
      return;
    }

    const dadosValidados = {
      ...dados,
      titulo: dados.titulo.trim(),
      responsavel: dados.responsavel.trim(),
      solicitante: dados.solicitante.trim(),
      descricao: dados.descricao.trim(),
    };

    if (this.modoEdicao && this.idTarefa !== null) {
      const atualizado = await this.tarefasService.atualizarTarefa(this.idTarefa, dadosValidados);

      if (!atualizado) {
        this.mensagemErro = 'Não foi possível atualizar a tarefa.';
        return;
      }

      void this.router.navigate(['/tarefa-detalhes', this.idTarefa]);
    } else {
      try {
        const novaTarefa = await this.tarefasService.adicionarTarefa(dadosValidados);

        await this.router.navigate(['/tarefa-detalhes', novaTarefa.id]);
      } catch (erro) {
        console.error('Erro ao cadastrar tarefa:', erro);
        this.mensagemErro = erro instanceof Error ? erro.message : 'Não foi possível cadastrar a tarefa.';
      }
    }
  }

  async carregarUsuarios(): Promise<void> {
    try {
      this.usuarios = await this.databaseService.listarUsuarios();
    } catch (erro) {
      console.error('Erro ao carregar usuários:', erro);
    }
  }
}
