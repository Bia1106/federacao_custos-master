export type cItemDespesa = {
  id: number;
  dsItemDespesa: string;
  editavel: boolean;
  hiearquia: number;
  subItem: cItemDespesa[];
};
