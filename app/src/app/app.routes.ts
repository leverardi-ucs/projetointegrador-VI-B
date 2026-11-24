
import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tarefas',
    pathMatch: 'full',
  },
  {
    path: 'tarefas',
    loadComponent: () =>
      import('./pages/tarefas/tarefas.page').then(
        (m) => m.TarefasPage
      ),
  },
  {
    path: 'calendario',
    loadComponent: () =>
      import('./pages/calendario/calendario.page').then(
        (m) => m.CalendarioPage
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then(
        (m) => m.DashboardPage
      ),
  },
  {
    path: 'integrantes',
    loadComponent: () =>
      import('./pages/integrantes/integrantes.page').then(
        (m) => m.IntegrantesPage
      ),
  },
  {
    path: 'tarefa-form',
    loadComponent: () =>
      import('./pages/tarefa-form/tarefa-form.page').then(
        (m) => m.TarefaFormPage
      ),
  },
  {
    path: 'tarefa-form/:id',
    loadComponent: () =>
      import('./pages/tarefa-form/tarefa-form.page').then(
        (m) => m.TarefaFormPage
      ),
  },
  {
    path: 'tarefa-detalhes/:id',
    loadComponent: () =>
      import('./pages/tarefa-detalhes/tarefa-detalhes.page').then(
        (m) => m.TarefaDetalhesPage
      ),
  },
  {
    path: '**',
    redirectTo: 'tarefas',
  },
];
