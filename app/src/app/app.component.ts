import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { DatabaseService } from './services/database';
import { TarefasService } from './services/tarefas';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private readonly databaseService = inject(DatabaseService);
  private readonly tarefasService = inject(TarefasService);

  constructor() {
    void this.inicializarAplicativo();
  }

  private async inicializarAplicativo(): Promise<void> {
    try {
      await this.databaseService.aguardarInicializacao();

      await this.tarefasService.carregarTarefas();

      console.log('Tarefas carregadas do SQLite:', this.tarefasService.tarefas);

      console.log('Agende-se inicializado!');
    } catch (erro) {
      console.error('Erro ao inicializar o Agende-se:', erro);
    }
  }
}
