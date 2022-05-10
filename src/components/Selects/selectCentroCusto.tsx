/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { ccCentroCustoNovo } from 'src/Objetos/hospital';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cCentroCusto } from 'src/types/CentroCusto';


import { cMensagem } from 'src/types/Mensagem';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (Item:cCentroCusto ) => void;
  onError: (msgErro: cMensagem) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  vValorAtual: string | undefined;
}

const CentroCustoSelect: React.FC<IProps> = props => {
  const [CentroCusto, setCentroCusto] = useState<cCentroCusto[]>([]);
  const { sessionUser } = useAuth();
  const [optTipoSelect, setoptTipoSelect] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();

  
  const CarregaTela = async () => {
    setCentroCusto([]);

    const webApiUrl = '/centroPadrao/all';
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
      const jsonn: cCentroCusto[] = json.sort((a: { nomeCentro: string; },b: { nomeCentro: string; }) => (a.nomeCentro > b.nomeCentro) ? 1 : ((b.nomeCentro > a.nomeCentro) ? -1 : 0)) 
      setCentroCusto(jsonn);
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    CentroCusto.map(item =>
      ObjOpcoes.push({
        value: item.idCentro?.toString() || '0',
        label: `${item.nomeCentro}`,
        color: '#FF5630',
      }),

    );
    setoptTipoSelect(ObjOpcoes);

    
    const vresult = CentroCusto.filter(vItemCC => vItemCC.idCentro?.toString() === props.vValorAtual);
    if ( vresult.length > 0  ) {
    const vItemCC: cCentroCusto = vresult[0]; 
     setoptionDefault({
      value: vItemCC.idCentro?.toString() || '1',
      label: vItemCC.nomeCentro?.toString() ||  'HOSPITAL NÃO ENCONTRADO', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CentroCusto]);

  useEffect(() => {
    CarregaTela();
    
  }, []);

  const handleChange = (selectedOptions: any) => {
    if (selectedOptions === null) {
      setoptionDefault(selectedOptions)
      props.onChange(ccCentroCustoNovo)
      
    } else  {    
    setoptionDefault(selectedOptions)
    const idprocurado = selectedOptions.value.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = CentroCusto.filter(vitem => vitem.idCentro === idNUmber);
    props.onChange(result[0])
    }
  }


  return (
    <div>
       <Select options={optTipoSelect} onChange={handleChange} 
       placeholder="Selecione o Centro de Custo"
       value={optionDefault}
       isClearable
       />

    </div>
  );
};

export default CentroCustoSelect;
