/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { ItemDespesaNovo } from 'src/Objetos/Meses';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cItemDespesa } from 'src/types/ItemDespesa';

import { cMensagem } from 'src/types/Mensagem';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (Item:cItemDespesa ) => void;
  onError: (msgErro: cMensagem) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  vValorAtual: string | undefined;
}

const ItemDespesaSelect: React.FC<IProps> = props => {
  const [ItemDespesa, setItemDespesa] = useState<cItemDespesa[]>([]);
  const { sessionUser } = useAuth();
  const [optionsAno, setOptionsAno] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();

  
  const CarregaTela = async () => {
    setItemDespesa([]);

    const webApiUrl = '/despesa/item';
    const tokenStr = sessionUser.token;
    const json = await apiFuncoes.getDadosApi(webApiUrl, tokenStr);
    if (json.error) {
      props.onError({
        Mensagem: `error: ${json.error} -
      path:  ${json.path} - 
      status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      // eslint-disable-next-line no-nested-ternary
      // const jsonn: cItemDespesa[] = json.sort((a: { dsItemDespesa: string; },b: { dsItemDespesa: string; }) => (a.dsItemDespesa > b.dsItemDespesa) ? 1 : ((b.dsItemDespesa > a.dsItemDespesa) ? -1 : 0)) 
      setItemDespesa(json);
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    ItemDespesa.map(item =>
      ObjOpcoes.push({
        value: item.id?.toString() || '0',
        label: `${item.dsItemDespesa}`,
        color: '#FF5630',
      }),

    );
    setOptionsAno(ObjOpcoes);

    
    const vresult = ItemDespesa.filter(vItem => vItem.id?.toString() === props.vValorAtual);
    if ( vresult.length > 0  ) {
    const vhosp: cItemDespesa = vresult[0]; 
     setoptionDefault({
      value: vhosp.id?.toString() || '1',
      label: vhosp.dsItemDespesa?.toString() ||  'HOSPITAL NÃO ENCONTRADO', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemDespesa]);

  useEffect(() => {
    CarregaTela();
    
  }, []);

  const handleChange = (selectedOptions: any) => {
    if (selectedOptions === null) {
      setoptionDefault(selectedOptions)
      props.onChange(ItemDespesaNovo)
      
    } else  {    
    setoptionDefault(selectedOptions)
    const idprocurado = selectedOptions.value.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = ItemDespesa.filter(vitem => vitem.id === idNUmber);
    props.onChange(result[0])
    }
  }


  return (
    <div>
       <Select options={optionsAno} onChange={handleChange} 
       placeholder="Selectione um Item de Despesa"
       value={optionDefault}
       isClearable

       />

    </div>
  );
};

export default ItemDespesaSelect;
