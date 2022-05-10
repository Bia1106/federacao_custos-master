/* eslint-disable react/destructuring-assignment */
import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { cMensagem } from 'src/types/Mensagem';

import { CampoNumeroFormat } from 'src/styles/GlobalStyles';
import { cHospitais } from 'src/types/Hospitais';

import { cCompetencia } from 'src/types/Competencia';
import { cBalancete, cBalanceteSimples } from 'src/types/Balancete';
import ComponenteCustosSelect from 'src/components/Selects/selectComponenteCustos';
import { cComponenteCustos } from 'src/types/ComponenteCustos';

interface IProps {
  onConfirm: (vBalancete: cBalanceteSimples) => void;
  onClose: () => void;
  vItemBalancete: cBalancete | undefined;
  // eslint-disable-next-line react/require-default-props
  show?: boolean;
}

const EditarItem: FC<IProps> = props => {
  const [messagem, setMessagem] = useState<cMensagem>();

  const [ItemCompontenteCusto, setItemCompontenteCusto] =
    useState<cComponenteCustos>();
  const [itemCompetencia, setItemCompetencia] = useState<cCompetencia>();
  const [ItemValorBalancete, setItemValorBalancete] = useState<string>();
  const [ItemValorRedutora, setItemValorRedutora] = useState<string>();
  const [ItemDescricao, setItemDescricao] = useState<string>();

  const [itemHospital, setItemHospital] = useState<cHospitais>();

  useEffect(() => {
    setItemCompontenteCusto(props.vItemBalancete?.componenteCusto);
    setItemHospital(props.vItemBalancete?.hospital);
    setItemCompetencia(props.vItemBalancete?.competencia);
    setItemDescricao(props.vItemBalancete?.dsLancamento);
    setItemValorBalancete(
      props.vItemBalancete?.vlBalancete?.toString().replace('.', ',') || '0,00',
    );
    setItemValorRedutora(
      props.vItemBalancete?.vlRedutor?.toString().replace('.', ',') || '0,00',
    );
  }, [props]);

  const handleClose = () => {
    props.onClose();
  };

  const handleAtualizar = () => {
    const vretorno: cBalanceteSimples = {
      id: props.vItemBalancete?.id || 0,
      cnes: itemHospital?.cnes || 0,
      idCompetencia: itemCompetencia?.id || 0,
      idComponenteCusto: ItemCompontenteCusto?.id || 0,
      vlBalancete:
        parseFloat(
          ItemValorBalancete?.replace('R$', '')
            .replace('.', ' ')
            .replace(',', '.') || '0',
        ) || 0,
      vlRedutor:
        parseFloat(
          ItemValorRedutora?.replace('R$', '')
            .replace('.', ' ')
            .replace(',', '.') || '0',
        ) || 0,
      dsLancamento: ItemDescricao || '',
    };
    props.onConfirm(vretorno);
  };

  const handleChangeOptions = async (vItem: cComponenteCustos) => {
    setItemCompontenteCusto(vItem);
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.vItemBalancete?.id === 0 ? 'Novo Item' : 'Editando Item'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="id"
              readOnly
              value={props.vItemBalancete?.id}
              placeholder="Identificador"
            />
            <br />
            <Form.Label>Componente</Form.Label>
            <ComponenteCustosSelect
              onChange={handleChangeOptions}
              onError={setMessagem}
              vValorAtual={ItemCompontenteCusto?.id?.toString() || '10'}
            />
            <br />
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="CentroCusto"
              placeholder="Descrição"
              value={ItemDescricao}
              onChange={e => setItemDescricao(e.target.value)}
            />

            <Form.Label>Valor Balancete</Form.Label>

            <CampoNumeroFormat
              value={ItemValorBalancete}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              onChange={(e: {
                target: { value: React.SetStateAction<string | undefined> };
              }) => setItemValorBalancete(e.target.value)}
            />

            <br />

            <Form.Label>Valor Redutor</Form.Label>

            <CampoNumeroFormat
              value={ItemValorRedutora}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              onChange={(e: {
                target: { value: React.SetStateAction<string | undefined> };
              }) => setItemValorRedutora(e.target.value)}
            />

            <br />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Fechar</Button>

          <Button onClick={handleAtualizar}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditarItem;
