import { cCentroCustoHospital } from './CentroCustoHospital';
import { cCompetencia } from './Competencia';
import { cHospitais } from './Hospitais';
import { cUsuario } from './Usuarios';

export type CReceita = {
  id: number;
  hospital: cHospitais;
  centroCustoHospital?: cCentroCustoHospital;
  competencia: cCompetencia;
  usuario: cUsuario;
  dataInclusao: Date;
  vlReceita: number;
};

export type CReceitaSimplificado = {
  id: number;
  cnes: number;
  dataInclusao: string;
  idCcHospRecurso: number;
  idCompetencia: number;
  idUsuario: number;
  vlReceita: number;
};
