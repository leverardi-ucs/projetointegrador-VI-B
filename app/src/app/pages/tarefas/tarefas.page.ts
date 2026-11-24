import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonFooter } from '@ionic/angular';

import { NavegacaoComponent } from '../../components/navegacao/navegacao.component';
import { TarefasService } from '../../services/tarefas';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
  imports: [
    IonFooter,
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonFooter,
    RouterLink,
    NavegacaoComponent,
  ],
})
export class TarefasPage {
  filtroSelecionado = 'todas';

  selecionarFiltro(filtro: string): void {
    this.filtroSelecionado = filtro;
  }
  private tarefasService = inject(TarefasService);
  private readonly cdr = inject(ChangeDetectorRef);
  public hoje : any;

  get tarefas() {
    return this.tarefasService.tarefas;
  }

  get tarefasFiltradas() {
    if (this.filtroSelecionado === 'todas') {
      return this.tarefas;
    }

    return this.tarefas.filter((tarefa) => tarefa.situacao === this.filtroSelecionado);
  }

  async ionViewWillEnter(): Promise<void> {
    try {
      await this.tarefasService.carregarTarefas();

      this.cdr.detectChanges();
    } catch (erro) {
      console.error('Erro ao carregar tarefas:', erro);
    }
  }

  constructor() {
    this.hoje = new Date();
    this.hoje = this.hoje.getDate() + '/' + (this.hoje.getMonth() + 1) + '/' + this.hoje.getFullYear();
  }
}
