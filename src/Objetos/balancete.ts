import { cBalancete } from 'src/types/Balancete';
import { competenciaNova } from './Competencia';
import { componenteCustosNova } from './ComponenteCustos';
import { hospitalNovo } from './hospital';

export const BalanceteNovo: cBalancete = {
  id: 0,
  hospital: hospitalNovo,
  competencia: competenciaNova,
  componenteCusto: componenteCustosNova,
  vlBalancete: 0,
  vlRedutor: 0,
  dsLancamento: '',
};
