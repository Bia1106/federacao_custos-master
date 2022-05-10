/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Title from '../Title';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: () => void;
  onClose: () => void;
  mensagem: string;
  // eslint-disable-next-line react/require-default-props
  showApagar?: boolean;
}

const ConfirmaApagar: React.FC<IProps> = props => {
  const handleClose = () => {
    props.onClose();
  };
  const handleConfirm = () => {
    props.onConfirm();
  };

  return (
    <div>
      <Modal
        show={props.showApagar}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        variant="danger"
        aria-labelledby="example-modal-sizes-title-lg contained-modal-title-vcenter danger"
        centered
      >
        <Modal.Body>
          <Title Mensagem={props.mensagem} TipoMensagem="danger" />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>

          <Button variant="danger" onClick={handleConfirm}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ConfirmaApagar;
