/* eslint-disable react/destructuring-assignment */
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAuth } from 'src/contexts/auth';
import { Meses } from 'src/Objetos/Meses';
import apiFuncoes from 'src/services/apiFuncoes';
import { cAno } from 'src/types/Ano';
import { cCompetencia } from 'src/types/Competencia';
import { cMensagem } from 'src/types/Mensagem';

import AnoSelect from '../Selects/selectAno';

// import { Container } from './styles';
interface IProps {
  onChangeYear: (Ano: cAno) => void;
  onChangeComp: (Competencia: cCompetencia) => void;
  vCompAtual: cCompetencia | undefined;
}

const BarraMeses: React.FC<IProps> = props => {
  const [lisCompetencia, setlisCompetencia] = useState<cCompetencia[]>([]);
  const [messagem, setMessagem] = useState<cMensagem>();
  const [ItemAno, setItemAno] = useState<cAno>();
  const [competencia, SetCompetencia] = useState<string>();
  const { sessionUser } = useAuth();

  const handleSelecionaAno = async (Ano: cAno) => {
    setItemAno(Ano);
    props.onChangeYear(Ano);
  };

  useEffect(() => {
    carregacompetencia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemAno]);

  const carregacompetencia = async () => {
    setlisCompetencia([]);
    setMessagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = `/ano/competencias?ano=${
      ItemAno?.ano.toString() || new Date().getFullYear()
    }`;
    const tokenStr = sessionUser.token;
    const json = await apiFuncoes.getDadosApi(webApiUrl, tokenStr);
    if (json.error) {
      setMessagem({
        Mensagem: `error: ${json.error} -
      path:  ${json.path} - 
      status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      setlisCompetencia(json);
      const ano = new Date().getFullYear();
      const Mes = new Date().getMonth() + 1;
      const vcomp = `${Mes}/${ano}`;
      const result = json.filter(
        (vitem: { mesAno: string }) => vitem.mesAno === vcomp,
      );
      props.onChangeComp(result[0]);
    }
  };

  const TrocaCompetencia = (vCompetencia: string) => {
    SetCompetencia(vCompetencia);

    const result = lisCompetencia.filter(
      vitem => vitem.mesAno === vCompetencia,
    );

    // setitemCompetencia(result[0]);
    props.onChangeComp(result[0]);
  };

  const handleCompetencia = (
    event: React.MouseEvent<HTMLElement>,
    newItem: string,
  ) => {
    const vcomp = `${newItem}/${ItemAno?.ano.toString() || '2022'}`;
    TrocaCompetencia(vcomp);
  };

  return (
    <div>
      <Row>
        <Col sm>
          <AnoSelect
            onChange={handleSelecionaAno}
            onError={setMessagem}
            vAnoAtual={ItemAno?.ano.toString() || '2022'}
          />
        </Col>
      </Row>
      <p />
      <Row>
        {Meses.map(item => (
          <Col>
            <ToggleButtonGroup
              value={competencia}
              color="primary"
              exclusive
              onChange={handleCompetencia}
            >
              <ToggleButton
                selected={item.value === props.vCompAtual?.mes?.toString()}
                value={item.value}
                aria-label="left aligned"
              >
                {item.label}
              </ToggleButton>

              {item.label}
            </ToggleButtonGroup>{' '}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BarraMeses;
