import { cCriterio } from './Criterio';

export type cCentroCusto = {
  idCentro: number;
  nomeCentro?: string;
  criterio?: cCriterio;
  ativo: boolean;
  descricao?: string;
};

export type cCentroCustoHospital = {
  idCentroCusto: number;
  nomeCentro: string;
  nmHospital: string;
  idHospital: number;
  id?: number;
};
