/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { cCentroCusto } from 'src/types/CentroCusto';
import {
  cCentroCustoHospitalSimples,
  cCentroHospital,
} from 'src/types/CentroCustoHospital';
import { cCriterio } from 'src/types/Criterio';
import { cHospitais } from 'src/types/Hospitais';
import { cTipoRecurso } from 'src/types/TipoRecurso';

export const hospitalNovo: cHospitais = {
  bairro: '',
  cnes: 0,
  codCep: 0,
  compleme: '',
  cpfCnpj: 0,
  fantasia: '',
  fax: '',
  leitosSus: 0,
  leitosTotal: 0,
  logradou: '',
  nomeCidade: '',
  numEnd: '',
  telefone: '',
};

export const ccHospitalSimplesNovo: cCentroCustoHospitalSimples = {
  id: 0,
  idCentroCusto: 0,
  nomeCentro: '',
  nmHospital: '',
  idHospital: 0,
};

export const ccCriterioNovo: cCriterio = {
  id: 0,
  dsCriterio: '',
  ativo: false,
};

export const ccCentroCustoNovo: cCentroCusto = {
  idCentro: 0,
  nomeCentro: '',
  criterio: ccCriterioNovo,
  ativo: false,
  descricao: '',
};

export const ccHospitalCentroNovo: cCentroHospital = {
  id: 0,
  centroCusto: ccCentroCustoNovo,
};

export const cTipoRecursoNovo: cTipoRecurso = {
  id: 0,
  dsTipoRecurso: 'Não Selecionado',
};
