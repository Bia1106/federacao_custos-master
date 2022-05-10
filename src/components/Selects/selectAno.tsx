/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { AnoNovo } from 'src/Objetos/Meses';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cAno } from 'src/types/Ano';
import { cMensagem } from 'src/types/Mensagem';

interface IProps {
  onChange: (Ano:cAno ) => void;
  onError: (msgErro: cMensagem) => void;
  vAnoAtual: string | undefined;
}

const AnoSelect: React.FC<IProps> = props => {
  const [lisAno, setlisAno] = useState<cAno[]>([]);
  const { sessionUser } = useAuth();
  const [optionsAno, setOptionsAno] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();
  
  const CarregaAno = async () => {
    setlisAno([]);

    const webApiUrl = `/ano/all`;
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
      setlisAno(json);
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    lisAno.map(item =>
      ObjOpcoes.push({
        value: item.idAno.toString(),
        label: `${item.ano}`,
        color: '#FF5630',
      }),

    );
    setOptionsAno(ObjOpcoes);

    
    const vresult = lisAno.filter(vvAno => vvAno.ano.toString() === props.vAnoAtual);
    if ( vresult.length > 0  ) {
    const vAnoD: cAno = vresult[0]; 
     setoptionDefault({
      value: vAnoD.idAno.toString() || '5',
      label: vAnoD.ano.toString() ||  '2022', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lisAno]);

  useEffect(() => {
    CarregaAno();
  }, []);

  const handleChange = (selectedOptions: any) => {
    if (selectedOptions === null) {
      setoptionDefault(selectedOptions)
      props.onChange(AnoNovo)
      
    } else  {
    setoptionDefault(selectedOptions)
    const idprocurado = selectedOptions.value.toString();
    // eslint-disable-next-line radix
    const idNUmber = parseInt(idprocurado);
    const result = lisAno.filter(vItem => vItem.idAno === idNUmber);
    props.onChange(result[0]);
    }
  }


  return (
    <div>
       <Select options={optionsAno} onChange={handleChange} 
       placeholder="Selecione o Ano"
       value={optionDefault}
       isClearable
       />
    </div>
  );
};

export default AnoSelect;
