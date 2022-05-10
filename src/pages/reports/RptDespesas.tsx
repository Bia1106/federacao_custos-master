/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AnoSelect from 'src/components/Selects/selectAno';
import CentroCustoSelect from 'src/components/Selects/selectCentroCusto';

import ItemDespesaSelect from 'src/components/Selects/SelectItemDespesa';
import { useAuth } from 'src/contexts/auth';
import {
  ccCentroCustoNovo,
  cTipoRecursoNovo,
  ccHospitalCentroNovo,
} from 'src/Objetos/hospital';
import { AnoNovo, ItemDespesaNovo } from 'src/Objetos/Meses';
import { PainelRelarioDespesa } from 'src/services/metabase';
import { cAno } from 'src/types/Ano';
import { cCentroCusto } from 'src/types/CentroCusto';
import { cItemDespesa } from 'src/types/ItemDespesa';
import { cMensagem } from 'src/types/Mensagem';
import CentroCustoHospitalSelect from 'src/components/Selects/selectCentroCustoHospital';
import { cCentroHospital } from 'src/types/CentroCustoHospital';
import { ContainerAlt } from './styles';

const RptDespesas: React.FC = () => {
  const { sessionUser } = useAuth();
  const [vLink, setvLink] = useState<string>();
  const [messagem, setMessagem] = useState<cMensagem>();
  const [ItemAno, setItemAno] = useState<cAno>(AnoNovo);
  // const [itemCCusto, setitemCCusto] = useState<cCentroCusto>(ccCentroCustoNovo);
  const [ItemCentroCusto, setItemCentroCusto] = useState<cCentroHospital>();
  const [ItemDespesa, setItemDespesa] = useState<cItemDespesa>(ItemDespesaNovo);

  useEffect(() => {
    handleCarregaLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemAno, ItemCentroCusto, ItemDespesa]);

  const handleSelecionaAno = async (Ano: cAno) => {
    setItemAno(Ano);
  };

  const handleTrocaCentroCusto = async (vItem: cCentroHospital) => {
    setItemCentroCusto(vItem || ccHospitalCentroNovo);
  };

  const handleTrocaItemDespesa = async (item: cItemDespesa) => {
    setItemDespesa(item);
  };

  const linkHospital = `phospital=${sessionUser.DefaultHospital?.cnes}`;
  const linkUsuario = `pusuario=${sessionUser.user.id}`;
  const hideParametres =
    '#hide_parameters=phospital,pusuario,pano,pcentrocusto,ptiporecurso,pitemdespesa';
  const linkAno = ItemAno.idAno === 0 ? '' : `pano=${ItemAno?.ano}`;

  const linkItemDespesa =
    ItemDespesa.id === 0 ? '' : `pitemdespesa=${ItemDespesa?.id.toString()}`;

  const linkCCHospital =
    ItemCentroCusto?.centroCusto.idCentro === undefined ||
    ItemCentroCusto?.centroCusto.idCentro === 0
      ? ''
      : `pcentrocusto=${ItemCentroCusto?.centroCusto.idCentro.toString()}`;

  const handleCarregaLink = async () => {
    const link = `${PainelRelarioDespesa}?${linkHospital}&${linkAno}&${linkUsuario}&${linkCCHospital}&${linkItemDespesa}${hideParametres}`;
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
            vValorAtual={
              ItemCentroCusto?.centroCusto.idCentro.toString() || '0'
            }
          />
        </Col>
        <Col>
          <ItemDespesaSelect
            onChange={handleTrocaItemDespesa}
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

export default RptDespesas;
