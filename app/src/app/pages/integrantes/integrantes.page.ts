import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonToolbar } from '@ionic/angular';

import { NavegacaoComponent } from '../../components/navegacao/navegacao.component';
import { TarefasService } from '../../services/tarefas';
import { DatabaseService } from '../../services/database';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-integrantes',
  standalone: true,
  templateUrl: './integrantes.page.html',
  styleUrls: ['./integrantes.page.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, NavegacaoComponent],
})
export class IntegrantesPage {
  private tarefasService = inject(TarefasService);
  private readonly databaseService = inject(DatabaseService);
  private readonly cdr = inject(ChangeDetectorRef);
  exibirCadastro = false;
  novoIntegrante = {
    nome: '',
    email: '',
    cargo: '',
  };
  mensagemErro = '';

  usuarios: { id: number; nome: string }[] = [];

  async ionViewWillEnter(): Promise<void> {
    try {
      await this.tarefasService.carregarTarefas();
      this.usuarios = await this.databaseService.listarUsuarios();

      this.cdr.detectChanges();
    } catch (erro) {
      console.error('Erro ao carregar integrantes:', erro);
    }
  }

  get integrantes() {
    return this.usuarios.map((usuario) => {
      const tarefas = this.tarefasService.tarefas.filter((tarefa) => tarefa.responsavel === usuario.nome);

      return {
        id: usuario.id,
        nome: usuario.nome,
        iniciais: usuario.nome
          .split(' ')
          .map((parte) => parte.charAt(0))
          .join('')
          .substring(0, 2)
          .toUpperCase(),
        total: tarefas.length,
        concluidas: tarefas.filter((tarefa) => tarefa.situacao === 'concluida').length,
        andamento: tarefas.filter((tarefa) => tarefa.situacao === 'andamento').length,
      };
    });
  }

  get totalIntegrantes(): number {
    return this.integrantes.length;
  }

  abrirCadastro(): void {
    this.exibirCadastro = true;
  }

  cancelarCadastro(): void {
    this.exibirCadastro = false;
    this.mensagemErro = '';

    this.novoIntegrante = {
      nome: '',
      email: '',
      cargo: '',
    };
  }

  async salvarIntegrante(): Promise<void> {
    this.mensagemErro = '';

    const nome = this.novoIntegrante.nome.trim();
    const email = this.novoIntegrante.email.trim().toLowerCase();
    const cargo = this.novoIntegrante.cargo.trim();

    if (!nome || !email || !cargo) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      this.mensagemErro = 'Informe um e-mail válido.';
      return;
    }

    if (this.usuarios.some((usuario) => usuario.nome.toLowerCase() === nome.toLowerCase())) {
      this.mensagemErro = 'Já existe um integrante com esse nome.';
      return;
    }

    try {
      const novoId = await this.databaseService.inserirUsuario(nome, email, cargo);

      if (!novoId) {
        this.mensagemErro = 'Não foi possível cadastrar o integrante.';
        return;
      }

      this.usuarios = await this.databaseService.listarUsuarios();

      this.cancelarCadastro();

      this.cdr.detectChanges();
    } catch (erro) {
      console.error('Erro ao cadastrar integrante:', erro);

      this.mensagemErro = 'Não foi possível cadastrar. Verifique se o e-mail já está em uso.';

      this.cdr.detectChanges();
    }
  }
}
