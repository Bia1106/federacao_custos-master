/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AnoSelect from 'src/components/Selects/selectAno';
import CentroCustoSelect from 'src/components/Selects/selectCentroCusto';
import TipodeRecursoSelect from 'src/components/Selects/selectTipoRecurso';
import { useAuth } from 'src/contexts/auth';
import {
  ccCentroCustoNovo,
  cTipoRecursoNovo,
  ccHospitalCentroNovo,
} from 'src/Objetos/hospital';
import { AnoNovo } from 'src/Objetos/Meses';
import { PainelRelarioReceita } from 'src/services/metabase';
import { cAno } from 'src/types/Ano';
import { cCentroCusto } from 'src/types/CentroCusto';
import { cMensagem } from 'src/types/Mensagem';
import { cTipoRecurso } from 'src/types/TipoRecurso';
import CentroCustoHospitalSelect from 'src/components/Selects/selectCentroCustoHospital';
import { cCentroHospital } from 'src/types/CentroCustoHospital';
import { ContainerAlt } from './styles';

const RptReceitas: React.FC = () => {
  const { sessionUser } = useAuth();
  const [vLink, setvLink] = useState<string>();
  const [messagem, setMessagem] = useState<cMensagem>();
  const [ItemAno, setItemAno] = useState<cAno>(AnoNovo);
  // const [itemCCusto, setitemCCusto] = useState<cCentroCusto>(ccCentroCustoNovo);
  const [itemTipoRecurso, setitemTipoRecurso] =
    useState<cTipoRecurso>(cTipoRecursoNovo);

  const [ItemCentroCusto, setItemCentroCusto] = useState<cCentroHospital>();

  useEffect(() => {
    handleCarregaLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemAno, ItemCentroCusto, sessionUser.DefaultHospital, itemTipoRecurso]);

  const handleSelecionaAno = async (Ano: cAno) => {
    setItemAno(Ano);
  };

  const handleTrocaCentroCusto = async (vItem: cCentroHospital) => {
    setItemCentroCusto(vItem || ccHospitalCentroNovo);
  };

  const handleTrocaTipoRecurso = async (item: cTipoRecurso) => {
    setitemTipoRecurso(item);
  };

  const linkHospital = `phospital=${sessionUser.DefaultHospital?.cnes}`;
  const linkUsuario = `pusuario=${sessionUser.user.id}`;
  const hideParametres =
    '#hide_parameters=phospital,pusuario,ano,pcentrocusto,ptiporecurso,pTipoRecurso';
  const linkAno = ItemAno.idAno === 0 ? '' : `ano=${ItemAno?.ano}`;

  const liktTipoRecurso =
    itemTipoRecurso.id === 0
      ? ''
      : `ptiporecurso=${itemTipoRecurso?.id.toString()}`;

  const linkCCHospital =
    ItemCentroCusto?.centroCusto.idCentro === undefined ||
    ItemCentroCusto?.centroCusto.idCentro === 0
      ? ''
      : `pcentrocusto=${ItemCentroCusto?.centroCusto.idCentro.toString()}`;

  const handleCarregaLink = async () => {
    const link = `${PainelRelarioReceita}?${linkHospital}&${linkAno}&${linkUsuario}&${linkCCHospital}&${liktTipoRecurso}&${hideParametres}`; // &${hideParametres}
    // console.log(ItemCentroCusto?.centroCusto.idCentro);

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
        <Col>
          <CentroCustoHospitalSelect
            onChange={handleTrocaCentroCusto}
            onError={setMessagem}
            vValorAtual=""
            // vValorAtual={
            //   ItemCentroCusto?.centroCusto.idCentro.toString() || '0'
            // }
          />
        </Col>
        <Col>
          <TipodeRecursoSelect
            onChange={handleTrocaTipoRecurso}
            onError={setMessagem}
            vValorAtual=""
          />
        </Col>
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

export default RptReceitas;
