import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { TarefasService } from '../../services/tarefas';

@Component({
  selector: 'app-tarefa-detalhes',
  standalone: true,
  templateUrl: './tarefa-detalhes.page.html',
  styleUrls: ['./tarefa-detalhes.page.scss'],
  imports: [CommonModule, RouterLink, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonToolbar],
})
export class TarefaDetalhesPage {
  private route = inject(ActivatedRoute);
  private tarefasService = inject(TarefasService);
  private readonly router = inject(Router);
  private readonly alertController = inject(AlertController);
  private readonly cdr = inject(ChangeDetectorRef);

  tarefa?: TarefasService['tarefas'][number];

  constructor() {
    addIcons({ trashOutline });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tarefa = this.tarefasService.buscarPorId(id);
  }

  async alterarSituacao(
    situacao: 'pendente' | 'andamento' | 'concluida'
  ): Promise<void> {
    if (!this.tarefa) {
      return;
    }

    try {
      const atualizado = await this.tarefasService.atualizarSituacao(
        this.tarefa.id,
        situacao
      );

      if (atualizado) {
        this.tarefa.situacao = situacao;
        this.cdr.detectChanges();
      } else {
        console.error('Não foi possível atualizar a situação.');
      }
    } catch (erro) {
      console.error('Erro ao atualizar situação:', erro);
    }
  }

  async excluirTarefa(): Promise<void> {
    if (!this.tarefa) {
      return;
    }

    const id = this.tarefa.id;
    const alerta = await this.alertController.create({
      header: 'Excluir tarefa',
      message: 'Tem certeza que deseja excluir esta tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'destructive',
        },
      ],
    });

    await alerta.present();
    const { role } = await alerta.onDidDismiss();

    if (role === 'destructive') {
      try {
        const excluida = await this.tarefasService.excluirTarefa(id);

        if (excluida) {
          this.tarefa = undefined;
          await this.router.navigate(['/tarefas']);
        } else {
          console.error('Não foi possível excluir a tarefa.');
        }
      } catch (erro) {
        console.error('Erro ao excluir tarefa:', erro);
      }
    }
  }
}
