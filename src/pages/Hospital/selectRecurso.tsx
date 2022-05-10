import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import Mensagem from 'src/components/message';
import { cMensagem } from 'src/types/Mensagem';
import { cRecurso } from 'src/types/Recurso';
import { Option } from 'src/Objetos/options';
import apiFuncoes from 'src/services/apiFuncoes';

const animatedComponents = makeAnimated();

export default function SelectRecurso() {
  const [selectedOptions, setSelectedOptions] = useState<readonly any[]>([]);
  const [recursos, setRecursos] = useState<cRecurso[]>([]);
  const [optionsRecursos, setOptionsRecursos] = useState<Option[]>([]);
  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();

  const handleClic = () => {
    selectedOptions.map(item => console.log(item.value));
  };

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  const CarregaOpcoes = () => {
    const obj: { value: string; label: string }[] = [];
    recursos.map(item =>
      obj.push({ value: item.id.toString(), label: item.dsRecurso }),
    );
    setOptionsRecursos(obj);
  };

  useEffect(() => {
    handleCarregaRecursos();
  }, []);

  const handleCarregaRecursos = async () => {
    setRecursos([]);
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = '/recurso';
    const tokenStr = sessionUser.token;

    const json = await apiFuncoes.getDadosApi(webApiUrl, tokenStr);
    if (json.error) {
      handleMensagem({
        Mensagem: `error: ${json.error} -
      path:  ${json.path} - 
      status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      setLoading(false);
      setRecursos(json);
      CarregaOpcoes();
    }
  };

  return (
    <div>
      {loading && (
        <Mensagem
          Mensagem={messagem?.Mensagem || ''}
          TipoMensagem={messagem?.TipoMensagem || ''}
        />
      )}

      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        // defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={optionsRecursos}
        onChange={setSelectedOptions}
        value={selectedOptions}
      />
      <Button onClick={handleClic}>teste</Button>
    </div>
  );
}
