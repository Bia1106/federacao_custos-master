/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { ccHospitalCentroNovo} from 'src/Objetos/hospital';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cCentroHospital } from 'src/types/CentroCustoHospital';

import { cMensagem } from 'src/types/Mensagem';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (Item:cCentroHospital ) => void;
  onError: (msgErro: cMensagem) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  vValorAtual: string | undefined;
}

const CentroCustoHospitalSelect: React.FC<IProps> = props => {
  const [ItemCCHospitalSimples, setItemCCHospitalSimples] = useState<cCentroHospital[]>([]);
  const { sessionUser } = useAuth();
  const [lstOpcoes, setlstOpcoes] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();

  
  const CarregaTela = async () => {
    setItemCCHospitalSimples([]);

    
    
    const webApiUrl = `/centroPadrao/centroHospital?cnes=${sessionUser.DefaultHospital?.cnes}`;
    

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
      const jsonn: cCentroHospital[] = json.sort((a: { nomeCentro: string; },b: { nomeCentro: string; }) => (a.nomeCentro > b.nomeCentro) ? 1 : ((b.nomeCentro > a.nomeCentro) ? -1 : 0)) 
      
      setItemCCHospitalSimples(jsonn);

      
      
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    ItemCCHospitalSimples.map(item =>
      ObjOpcoes.push({
        value: item.id?.toString() || '0',
        label: `${item.centroCusto.nomeCentro}`,
        color: '#FF5630',
      }),

    );
    setlstOpcoes(ObjOpcoes);

    
    const vresult = ItemCCHospitalSimples.filter(vItem => vItem.id?.toString() === props.vValorAtual);
    if ( vresult.length > 0  ) {
    const vhosp: cCentroHospital = vresult[0]; 
     setoptionDefault({
      value: vhosp.id?.toString() || '1',
      label: vhosp.centroCusto.nomeCentro?.toString() ||  '-', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemCCHospitalSimples]);

  useEffect(() => {
    CarregaTela();
    
  }, []);

  const handleChange = (selectedOptions: any) => {
    if (selectedOptions === null) {
      setoptionDefault(selectedOptions)
      props.onChange(ccHospitalCentroNovo)
      
    } else  {
      setoptionDefault(selectedOptions)
      
      const idprocurado = selectedOptions.value.toString();
      const idNUmber = parseInt(idprocurado, 10);
      const result = ItemCCHospitalSimples.filter(vitem => vitem.id === idNUmber);
       props.onChange(result[0])
    }


  }


  return (
    <div>
       <Select options={lstOpcoes} onChange={handleChange} 
       placeholder="Selecione o Componente de Centro de Custo"
       value={optionDefault}
       isClearable
       />

    </div>
  );
};

export default CentroCustoHospitalSelect;
