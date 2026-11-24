import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar } from '@ionic/angular';

import { NavegacaoComponent } from '../../components/navegacao/navegacao.component';
import { TarefasService } from '../../services/tarefas';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    NavegacaoComponent
  ]
})
export class DashboardPage {
  private tarefasService = inject(TarefasService);

  get tarefas() {
    const hoje = new Date();

    return this.tarefasService.tarefas.filter(tarefa => {
      const [ano, mes] = tarefa.dataPrazo
        .split('-')
        .map(Number);

      return (
        ano === hoje.getFullYear() &&
        mes === hoje.getMonth() + 1
      );
    });
  }

  get totalTarefas(): number {
    return this.tarefas.length;
  }

  get concluidas(): number {
    return this.tarefas.filter(
      tarefa => tarefa.situacao === 'concluida'
    ).length;
  }

  get andamento(): number {
    return this.tarefas.filter(
      tarefa => tarefa.situacao === 'andamento'
    ).length;
  }

  get atrasadas(): number {
    const hoje = new Date();

    return this.tarefas.filter(tarefa => {
      const prazo = new Date(
        `${tarefa.dataPrazo}T${tarefa.horaPrazo}`
      );

      return (
        prazo < hoje &&
        tarefa.situacao !== 'concluida'
      );
    }).length;
  }

  get taxaConclusao(): number {
    if (this.totalTarefas === 0) {
      return 0;
    }

    return Math.round(
      (this.concluidas / this.totalTarefas) * 100
    );
  }

  get prioridades() {
    return [
      {
        nome: 'Alta',
        classe: 'alta',
        quantidade: this.contarPrioridade('alta')
      },
      {
        nome: 'Média',
        classe: 'media',
        quantidade: this.contarPrioridade('media')
      },
      {
        nome: 'Baixa',
        classe: 'baixa',
        quantidade: this.contarPrioridade('baixa')
      }
    ];
  }

  contarPrioridade(prioridade: string): number {
    return this.tarefas.filter(
      tarefa => tarefa.prioridade === prioridade
    ).length;
  }

  percentual(quantidade: number): number {
    if (this.totalTarefas === 0) {
      return 0;
    }

    return Math.round(
      (quantidade / this.totalTarefas) * 100
    );
  }

  get desempenhoResponsaveis() {
    const responsaveis = [
      ...new Set(this.tarefas.map(tarefa => tarefa.responsavel))
    ];

    return responsaveis.map(nome => {
      const tarefas = this.tarefas.filter(
        tarefa => tarefa.responsavel === nome
      );

      const concluidas = tarefas.filter(
        tarefa => tarefa.situacao === 'concluida'
      ).length;

      return {
        nome,
        total: tarefas.length,
        concluidas,
        percentual: tarefas.length
          ? Math.round((concluidas / tarefas.length) * 100)
          : 0
      };
    });
  }
}
