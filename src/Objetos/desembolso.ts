import { cDesembolso } from 'src/types/Desembolso';

export const ObjDesembolso: cDesembolso = {
  id: 1,
  competencia: { id: 0, mes: 1, mesAno: '1/2022' },
  hospital: {
    cnes: 2200457,
    cpfCnpj: 2147483647,
    fantasia: 'ASSOCIACAO MARIO PENNA',
    nomeCidade: 'BELO HORIZONTE',
    logradou: 'RUA GENTIOS',
    numEnd: '1350',
    compleme: '',
    bairro: 'LUXEMBURGO',
    codCep: 30380472,
    telefone: '3133309108',
    fax: '',
    leitosTotal: 299,
    leitosSus: 177,
  },
  banco: {
    id: 1,
    codBanco: '246',
    nmBanco: 'Banco ABC Brasil S.A.',
  },
  valor: 125.55,
};
