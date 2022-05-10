import { cCentroCusto } from './CentroCusto';

export type cHospitais = {
  cnes: number;
  cpfCnpj: number;
  fantasia: string;
  nomeCidade: string;
  logradou: string;
  numEnd: string;
  compleme: string;
  bairro: string;
  codCep: number;
  telefone: string;
  fax: string;
  leitosTotal: number;
  leitosSus: number;
  centroCustos?: cCentroCusto;
};
