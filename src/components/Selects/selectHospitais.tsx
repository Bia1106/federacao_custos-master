/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { useAuth } from 'src/contexts/auth';
import { hospitalNovo } from 'src/Objetos/hospital';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';
import { cHospitais } from 'src/types/Hospitais';
import { cMensagem } from 'src/types/Mensagem';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (Ano:string ) => void;
  onError: (msgErro: cMensagem) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  vValorAtual: string | undefined;
}

const HospitaisSelect: React.FC<IProps> = props => {
  const [Hospitais, setHospitais] = useState<cHospitais[]>([]);
  const { sessionUser } = useAuth();
  const [optionsAno, setOptionsAno] = useState<Option[]>([]);
  const [optionDefault, setoptionDefault] = useState<Option>();
  
  const CarregaAno = async () => {
    setHospitais([]);

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
      setHospitais(json);
    }
  };

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    Hospitais.map(item =>
      ObjOpcoes.push({
        value: item.cnes?.toString() || '0',
        label: `${item.fantasia}`,
        color: '#FF5630',
      }),

    );
    setOptionsAno(ObjOpcoes);

    
    const vresult = Hospitais.filter(vhosp => vhosp.cnes?.toString() === props.vValorAtual);
    if ( vresult.length > 0  ) {
    const vhosp: cHospitais = vresult[0]; 
     setoptionDefault({
      value: vhosp.cnes?.toString() || '1',
      label: vhosp.fantasia?.toString() ||  'HOSPITAL NÃO ENCONTRADO', 
      color: '#FF5630',
    }); 
    }
    /// ============================================================\\\

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Hospitais]);

  useEffect(() => {
    // CarregaAno();
    setHospitais(sessionUser.user.hospitais || [hospitalNovo]);
  }, []);

  const handleChange = (selectedOptions: any) => {
    setoptionDefault(selectedOptions)
    props.onChange(selectedOptions.value)
  }


  return (
    <div>
       <Select options={optionsAno} onChange={handleChange} 
       placeholder="Selecione o Hospital"
       value={optionDefault}
       />
    </div>
  );
};

export default HospitaisSelect;
