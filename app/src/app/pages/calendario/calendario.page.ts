import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar } from '@ionic/angular';

import { TarefasService } from '../../services/tarefas';
import { NavegacaoComponent } from '../../components/navegacao/navegacao.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  imports: [CommonModule, RouterLink, IonContent, IonHeader, IonToolbar, NavegacaoComponent],
})
export class CalendarioPage {
  private tarefasService = inject(TarefasService);

  dataAtual = new Date();
  dataSelecionada = new Date();

  get nomeMes(): string {
    return this.dataAtual.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });
  }

  get diasCalendario(): (number | null)[] {
    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    const dias: (number | null)[] = Array(primeiroDia).fill(null);

    for (let dia = 1; dia <= totalDias; dia++) {
      dias.push(dia);
    }

    return dias;
  }

  selecionarDia(dia: number): void {
    this.dataSelecionada = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth(), dia);
  }

  get tarefasDoDia() {
    const ano = this.dataSelecionada.getFullYear();
    const mes = String(this.dataSelecionada.getMonth() + 1).padStart(2, '0');
    const dia = String(this.dataSelecionada.getDate()).padStart(2, '0');

    const data = `${ano}-${mes}-${dia}`;

    return this.tarefasService.tarefas.filter((tarefa) => tarefa.dataPrazo === data);
  }

  diaSelecionado(dia: number): boolean {
    return (
      this.dataSelecionada.getDate() === dia &&
      this.dataSelecionada.getMonth() === this.dataAtual.getMonth() &&
      this.dataSelecionada.getFullYear() === this.dataAtual.getFullYear()
    );
  }

  prioridadesDoDia(dia: number): string[] {
    const ano = this.dataAtual.getFullYear();
    const mes = String(this.dataAtual.getMonth() + 1).padStart(2, '0');
    const data = `${ano}-${mes}-${String(dia).padStart(2, '0')}`;

    return this.tarefasService.tarefas.filter((tarefa) => tarefa.dataPrazo === data).map((tarefa) => tarefa.prioridade);
  }

  mesAnterior(): void {
    this.dataAtual = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() - 1, 1);

    this.dataSelecionada = new Date(this.dataAtual);
  }

  proximoMes(): void {
    this.dataAtual = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() + 1, 1);

    this.dataSelecionada = new Date(this.dataAtual);
  }
}
