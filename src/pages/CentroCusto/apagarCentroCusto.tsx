import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { cCentroCusto } from 'src/types/CentroCusto';

type props = {
  onConfirm: (itemCrit: cCentroCusto) => void;
  onClose: () => void;
  itemCC: cCentroCusto;
  mensagem: string;
  // eslint-disable-next-line react/require-default-props
  showApagar?: boolean;
};

const ApagarCentroCusto = ({
  onClose,
  onConfirm,
  mensagem,
  showApagar = false,
  itemCC,
}: props): JSX.Element => {
  const handleClose = () => {
    onClose();
  };
  const handleConfirm = () => {
    onConfirm({
      ativo: false,
      criterio: itemCC.criterio,
      descricao: itemCC.descricao,
      idCentro: itemCC.idCentro,
      nomeCentro: itemCC.nomeCentro,
    });
  };

  return (
    <div>
      <Modal
        show={showApagar}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apagando Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{mensagem}</p>
          <p>Código: {itemCC.idCentro}</p>
          <p>Nome: {itemCC.descricao}</p>
          <p>Descrição: {itemCC.nomeCentro}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>

          <Button variant="primary" onClick={handleConfirm}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ApagarCentroCusto;
