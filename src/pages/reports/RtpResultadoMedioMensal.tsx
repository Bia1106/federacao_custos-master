/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AnoSelect from 'src/components/Selects/selectAno';
import CentroCustoSelect from 'src/components/Selects/selectCentroCusto';
import { useAuth } from 'src/contexts/auth';
import { ccCentroCustoNovo } from 'src/Objetos/hospital';
import { AnoNovo } from 'src/Objetos/Meses';
import {
  PainelRelarioReceita,
  ResultadoMedioMensao,
} from 'src/services/metabase';
import { cAno } from 'src/types/Ano';
import { cCentroCusto } from 'src/types/CentroCusto';
import { cMensagem } from 'src/types/Mensagem';
import { ContainerAlt } from './styles';

const RptResultadoMedioMensal: React.FC = () => {
  const { sessionUser } = useAuth();
  const [vLink, setvLink] = useState<string>();
  const [messagem, setMessagem] = useState<cMensagem>();
  const [ItemAno, setItemAno] = useState<cAno>(AnoNovo);
  const [itemCCusto, setitemCCusto] = useState<cCentroCusto>(ccCentroCustoNovo);

  useEffect(() => {
    handleCarregaLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemAno, itemCCusto]);

  const handleSelecionaAno = async (Ano: cAno) => {
    setItemAno(Ano);
  };

  const handleTrocaCentroCusto = async (item: cCentroCusto) => {
    setitemCCusto(item);
  };

  const linkHospital = `hospital=${sessionUser.DefaultHospital?.cnes}`;
  const linkUsuario = `usuario=${sessionUser.user.id}`;
  const hideParametres =
    '#hide_parameters=hospital,usuario,ano,pcentrocusto,ptiporecurso';
  const linkAno = ItemAno.idAno === 0 ? '' : `ano=${ItemAno?.idAno}`;

  const linkCCHospital =
    itemCCusto.idCentro === 0
      ? ''
      : `pcentrocusto=${itemCCusto?.idCentro.toString()}`;

  const handleCarregaLink = async () => {
    const link = `${ResultadoMedioMensao}?${linkHospital}&${linkAno}&${linkUsuario}&${linkCCHospital}${hideParametres}`; //

    setvLink(link);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <AnoSelect
            onChange={handleSelecionaAno}
            onError={setMessagem}
            vAnoAtual=""
          />
        </Col>
        {/* <Col>
          <CentroCustoSelect
            onChange={handleTrocaCentroCusto}
            onError={setMessagem}
            vValorAtual=""
          />
        </Col> */}
      </Row>
      <Row>
        <Col>
          <iframe
            src={vLink}
            frameBorder="0"
            width="100%"
            height="800"
            allowTransparency
            allowFullScreen
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RptResultadoMedioMensal;
