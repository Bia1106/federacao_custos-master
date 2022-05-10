import { cAno } from 'src/types/Ano';
import { cItemDespesa } from 'src/types/ItemDespesa';

export const Meses = [
  { value: '1', label: 'Jan' },
  { value: '2', label: 'Fev' },
  { value: '3', label: 'Mar' },
  { value: '4', label: 'Abr' },
  { value: '5', label: 'Mai' },
  { value: '6', label: 'Jun' },
  { value: '7', label: 'Jul' },
  { value: '8', label: 'Ago' },
  { value: '9', label: 'Set' },
  { value: '10', label: 'Out' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dez' },
];

export const AnoNovo: cAno = {
  idAno: 0,
  ano: 1900,
};

export const ItemDespesaNovo: cItemDespesa = {
  id: 0,
  dsItemDespesa: '',
  editavel: false,
  hiearquia: 0,
  subItem: [],
};
