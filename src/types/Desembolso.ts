import { cBancos } from './Bancos';
import { cCompetencia } from './Competencia';
import { cHospitais } from './Hospitais';

export type cDesembolso = {
  id?: number;
  competencia?: cCompetencia;
  hospital?: cHospitais;
  banco?: cBancos;
  valor?: number;
};
