/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { ccHospitalSimplesNovo, cTipoRecursoNovo } from 'src/Objetos/hospital';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cCentroCustoHospitalSimples } from 'src/types/CentroCustoHospital';

import { cMensagem } from 'src/types/Mensagem';
import { cTipoRecurso } from 'src/types/TipoRecurso';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (Item:cTipoRecurso ) => void;
  onError: (msgErro: cMensagem) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  vValorAtual: string | undefined;
}

const TipodeRecursoSelect: React.FC<IProps> = props => {
  const [itemTipoRecurso, setitemTipoRecurso] = useState<cTipoRecurso[]>([]);
  const { sessionUser } = useAuth();
  const [lstOpcoes, setlstOpcoes] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();

  
  const CarregaTela = async () => {
    setitemTipoRecurso([]);

    
    const webApiUrl = `/recurso/tipo`;
    

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
      setitemTipoRecurso(json);
      
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    itemTipoRecurso.map(item =>
      ObjOpcoes.push({
        value: item.id?.toString() || '0',
        label: `${item.dsTipoRecurso}`,
        color: '#FF5630',
      }),

    );
    setlstOpcoes(ObjOpcoes);

    
    const vresult = itemTipoRecurso.filter(vItem => vItem.id?.toString() === props.vValorAtual);
    if ( vresult.length > 0  ) {
    const vRetorno: cTipoRecurso = vresult[0]; 
     setoptionDefault({
      value: vRetorno.id?.toString() || '1',
      label: vRetorno.dsTipoRecurso?.toString() ||  '-', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemTipoRecurso]);

  useEffect(() => {
    CarregaTela();
    
  }, []);

  const handleChange = (selectedOptions: any) => {
    if (selectedOptions === null) {
      setoptionDefault(selectedOptions)
      props.onChange(cTipoRecursoNovo)
      
    } else  {
      setoptionDefault(selectedOptions)
      
      const idprocurado = selectedOptions.value.toString();
      const idNUmber = parseInt(idprocurado, 10);
      const result = itemTipoRecurso.filter(vitem => vitem.id === idNUmber);
       props.onChange(result[0])
    }


  }


  return (
    <div>
       <Select options={lstOpcoes} onChange={handleChange} 
       placeholder="Selecione o tipo de Receita"
       value={optionDefault}
       isClearable
       />

    </div>
  );
};

export default TipodeRecursoSelect;
