import { cHospitais } from './Hospitais';
import { cUsuario } from './Usuarios';

export type cSessionUser = {
  token: string;
  user: cUsuario;
  DefaultHospital?: cHospitais;
};
