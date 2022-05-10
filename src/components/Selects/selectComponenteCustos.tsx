/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cComponenteCustos } from 'src/types/ComponenteCustos';

import { cMensagem } from 'src/types/Mensagem';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (Item:cComponenteCustos ) => void;
  onError: (msgErro: cMensagem) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  vValorAtual: string | undefined;
}

const ComponenteCustosSelect: React.FC<IProps> = props => {
  const [ComponenteCustos, setComponenteCustos] = useState<cComponenteCustos[]>([]);
  const { sessionUser } = useAuth();
  const [optionsAno, setOptionsAno] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();

  
  const CarregaTela = async () => {
    setComponenteCustos([]);

    const webApiUrl = '/compcusto/all';
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
      setComponenteCustos(json);
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    ComponenteCustos.map(item =>
      ObjOpcoes.push({
        value: item.id?.toString() || '0',
        label: `${item.descricao}`,
        color: '#FF5630',
      }),

    );
    setOptionsAno(ObjOpcoes);

    
    const vresult = ComponenteCustos.filter(vhosp => vhosp.id?.toString() === props.vValorAtual);
    if ( vresult.length > 0  ) {
    const vhosp: cComponenteCustos = vresult[0]; 
     setoptionDefault({
      value: vhosp.id?.toString() || '1',
      label: vhosp.descricao?.toString() ||  'HOSPITAL NÃO ENCONTRADO', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ComponenteCustos]);

  useEffect(() => {
    CarregaTela();
    
  }, []);

  const handleChange = (selectedOptions: any) => {
    setoptionDefault(selectedOptions)
    const idprocurado = selectedOptions.value.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = ComponenteCustos.filter(vitem => vitem.id === idNUmber);
    props.onChange(result[0])
  }


  return (
    <div>
       <Select options={optionsAno} onChange={handleChange} 
       placeholder="Selecione o Componente de Centro de Custo"
       value={optionDefault}
       />

    </div>
  );
};

export default ComponenteCustosSelect;
