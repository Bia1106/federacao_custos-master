import { cHospitais } from './Hospitais';
import { cRoles } from './Roles';

export type cUsuario = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  active: boolean;
  senha?: string;
  roles?: cRoles;
  hospitais?: cHospitais[];
  hospitalPrincipal?: cHospitais;
};
