/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cBancos } from 'src/types/Bancos';
import { cMensagem } from 'src/types/Mensagem';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (Banco:cBancos ) => void;
  onError: (msgErro: cMensagem) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  vValorAtual: string | undefined;
}

const BancoSelect: React.FC<IProps> = props => {
  const [Bancos, setBancos] = useState<cBancos[]>([]);
  const { sessionUser } = useAuth();
  const [optionsAno, setOptionsAno] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();
  
  const CarregaAno = async () => {
    setBancos([]);

    const webApiUrl = `/banco/all`;
    const tokenStr = sessionUser.token;
    const json = await apiFuncoes.getDadosApi(webApiUrl, tokenStr);
    if (json.error) {
      // eslint-disable-next-line react/destructuring-assignment
      props.onError({
        Mensagem: `error: ${json.error} -
      path:  ${json.path} - 
      status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      setBancos(json);
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    Bancos.map(item =>
      ObjOpcoes.push({
        value: item.id?.toString() || '0',
        label: `${item.codBanco?.toString()} - ${item.nmBanco?.toString()} `,
        color: '#FF5630',
      }),

    );
    setOptionsAno(ObjOpcoes);

    
    const vresult = Bancos.filter(vbancos => vbancos.id?.toString() === props.vValorAtual);
    if ( vresult.length > 0  ) {
    const vBanco: cBancos = vresult[0]; 
     setoptionDefault({
      value: vBanco.id?.toString() || '1',
      label:   `${vBanco.codBanco?.toString()} - ${vBanco.nmBanco?.toString()} `  ||  'BANCO NÃO ENCONTRADO', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Bancos]);

  useEffect(() => {
    CarregaAno();
  }, []);

  const handleChange = (selectedOptions: any) => {
    setoptionDefault(selectedOptions)
    const idprocurado = selectedOptions.value.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = Bancos.filter(vbancos => vbancos.id === idNUmber);
    props.onChange(result[0])
  }


  return (
    <div>
       <Select options={optionsAno} onChange={handleChange} 
       placeholder="Selecione o banco"
       value={optionDefault}
       />
    </div>
  );
};

export default BancoSelect;
