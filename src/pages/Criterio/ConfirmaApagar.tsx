import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { cCriterio } from 'src/types/Criterio';

type props = {
  onConfirm: (itemCrit: cCriterio) => void;
  onClose: () => void;
  ItemCriterio: cCriterio;
  mensagem: string;
  // eslint-disable-next-line react/require-default-props
  showApagar?: boolean;
};

const ConfirmaApagar = ({
  onClose,
  onConfirm,
  mensagem,
  showApagar = false,
  ItemCriterio,
}: props): JSX.Element => {
  const handleClose = () => {
    onClose();
  };
  const handleConfirm = () => {
    onConfirm({
      ativo: false,
      dsCriterio: ItemCriterio.dsCriterio,
      id: ItemCriterio.id,
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
          <Modal.Title>Editando Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{mensagem}</p>
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
export default ConfirmaApagar;
