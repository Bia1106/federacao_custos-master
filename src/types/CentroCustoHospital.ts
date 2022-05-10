import { cCentroCusto } from './CentroCusto';
import { cHospitais } from './Hospitais';
import { cRecurso } from './Recurso';

export type cCentroCustoHospital = {
  id: number;
  recurso: cRecurso;
  centroCusto: cCentroCusto;
  ativo: boolean;
  hospital?: cHospitais;
};

export type cCentroCustoHospitalSimples = {
  id: number;
  idCentroCusto: number;
  nomeCentro: string;
  nmHospital: string;
  idHospital: number;
};

export type cPaiFilhoSoma = {
  id: number;
  idItemDespesaPai: number;
  idFilho: number[];
  Valor: number;
};

export type cCentroHospital = {
  id: number;
  centroCusto: cCentroCusto;
};
