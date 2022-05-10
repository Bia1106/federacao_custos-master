import { cCompetencia } from './Competencia';
import { cComponenteCustos } from './ComponenteCustos';
import { cHospitais } from './Hospitais';

export type cBalancete = {
  id: number;
  hospital: cHospitais;
  competencia: cCompetencia;
  componenteCusto: cComponenteCustos;
  vlBalancete: number;
  vlRedutor: number;
  dsLancamento: string;
};

export type cBalanceteSimples = {
  cnes: number;
  id: number;
  idCompetencia: number;
  idComponenteCusto: number;
  vlBalancete: number;
  vlRedutor: number;
  dsLancamento?: string;
};
