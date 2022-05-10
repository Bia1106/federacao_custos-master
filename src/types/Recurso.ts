import { cTipoRecurso } from './TipoRecurso';

export type cRecurso = {
  id: number;
  dsRecurso: string;
  dsObservacao: string;
  ativo: boolean;
  tipoRecurso?: cTipoRecurso;
};
