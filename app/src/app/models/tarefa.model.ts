export interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;

  responsavelId: number;
  solicitanteId: number;
  prioridadeId: number;

  dataInicio: string;
  horaInicio: string;
  dataPrazo: string;
  horaPrazo: string;

  situacao: 'pendente' | 'andamento' | 'concluida';
}
