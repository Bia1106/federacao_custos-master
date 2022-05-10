import { cCentroCusto } from './CentroCusto';
import { cCentroCustoHospital } from './CentroCustoHospital';
import { cCompetencia } from './Competencia';
import { cHospitais } from './Hospitais';
import { cItemDespesa } from './ItemDespesa';

export type cDespesa = {
  id: number;
  hospital: cHospitais;
  competencia: cCompetencia;
  itemDespesa: cItemDespesa;
  valor: number;
};

export type CDesepesaSimples = {
  cnes: number;
  id: number;
  idCentroCusto: number;
  idCompetencia: number;
  itemDespesa: number;
  valor: number;
};

export type cDespesaCompleto = {
  id: number;
  centroCusto: cCentroCustoHospital;
  competencia: cCompetencia;
  itemDespesa: cItemDespesa;
  valor: number;
  editavel: boolean;
  hierarquia: number;
};
