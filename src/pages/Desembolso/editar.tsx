/* eslint-disable react/destructuring-assignment */
import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { cDesembolso } from 'src/types/Desembolso';
import BancoSelect from 'src/components/Selects/selectBancos';
import { cMensagem } from 'src/types/Mensagem';

import { CampoNumeroFormat } from 'src/styles/GlobalStyles';
import { cHospitais } from 'src/types/Hospitais';
import { cBancos } from 'src/types/Bancos';
import { cCompetencia } from 'src/types/Competencia';
import Msgtoast from 'src/components/message/toast';

interface IProps {
  onConfirm: (vDesembolso: cDesembolso) => void;
  onClose: () => void;
  vItemDesembolso: cDesembolso | undefined;
  // eslint-disable-next-line react/require-default-props
  show?: boolean;
}

const EditarDesembolso: FC<IProps> = props => {
  const [messagem, setMessagem] = useState<cMensagem>();

  const [itemBanco, setItemBanco] = useState<cBancos>();
  const [itemCompetencia, setItemCompetencia] = useState<cCompetencia>();
  const [itemValor, setItemValor] = useState<string>();
  const [itemHospital, setItemHospital] = useState<cHospitais>();

  useEffect(() => {
    setItemBanco(props.vItemDesembolso?.banco);
    setItemHospital(props.vItemDesembolso?.hospital);
    setItemCompetencia(props.vItemDesembolso?.competencia);
    setItemValor(
      props.vItemDesembolso?.valor?.toString().replace('.', ',') || '0,00',
    );
  }, [props]);

  const handleClose = () => {
    props.onClose();
  };

  const handleAtualizar = () => {
    const vretorno: cDesembolso = {
      id: props.vItemDesembolso?.id || 0,
      competencia: itemCompetencia,
      hospital: itemHospital,
      banco: itemBanco,
      valor:
        parseFloat(
          itemValor?.replace('R$', '').replace('.', ' ').replace(',', '.') ||
            '0',
        ) || 0,
    };
    props.onConfirm(vretorno);
  };

  const handleSelectedeBanco = async (vBanco: cBancos) => {
    setItemBanco(vBanco);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div>
      <Msgtoast
        Mensagem={messagem?.Mensagem}
        TipoMensagem={messagem?.TipoMensagem}
      />
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
            {props.vItemDesembolso?.id === 0 ? 'Novo Item' : 'Editando Item'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="id"
              readOnly
              value={props.vItemDesembolso?.id}
              placeholder="Identificador"
            />
            <br />
            <Form.Label>Banco</Form.Label>
            <BancoSelect
              onChange={handleSelectedeBanco}
              onError={setMessagem}
              vValorAtual={itemBanco?.id?.toString() || '10'}
            />
            <br />
            <Form.Label>Valor</Form.Label>

            <CampoNumeroFormat
              value={itemValor}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              onChange={(e: {
                target: { value: React.SetStateAction<string | undefined> };
              }) => setItemValor(e.target.value)}
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

export default EditarDesembolso;
