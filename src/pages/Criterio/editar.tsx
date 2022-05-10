/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { cCriterio } from '../../types/Criterio';
import { FormCuston } from './styles';

interface IProps {
  onConfirm: (itemCrit: cCriterio) => void;
  onClose: () => void;
  itemCriterio: cCriterio;
  // eslint-disable-next-line react/require-default-props
  show?: boolean;
}

const EditarCriterio: FC<IProps> = props => {
  const [itemDescricao, setItemDescricao] = useState(
    props.itemCriterio.dsCriterio || '',
  );
  const [itemAtivo, setItemAtivo] = useState<boolean>(props.itemCriterio.ativo);
  const [itemcCriterio, setitemcCriterio] = useState<cCriterio>();

  useEffect(() => {
    setItemDescricao(props.itemCriterio.dsCriterio || '');
    setItemAtivo(props.itemCriterio.ativo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleClose = () => {
    props.onClose();
  };

  const handleAtualizar = () => {
    setitemcCriterio({
      ativo: itemAtivo,
      dsCriterio: itemDescricao,
      id: props.itemCriterio.id,
    });
    props.onConfirm(
      itemcCriterio || {
        id: props.itemCriterio.id,
        dsCriterio: itemDescricao,
        ativo: true,
      },
    );
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
          <Modal.Title>Editando Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCuston>
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="id"
              readOnly
              value={props.itemCriterio?.id || '0'}
              placeholder="Identificador"
            />
            <br />
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="dsCriterio"
              placeholder="Descrição do Critério"
              value={itemDescricao || props.itemCriterio.dsCriterio}
              onChange={e => setItemDescricao(e.target.value)}
            />
            <br />
            <Form.Check
              type="checkbox"
              label="Ativo"
              checked={itemAtivo}
              onChange={e => setItemAtivo(e.target.checked)}
            />

            <br />
          </FormCuston>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>

          <Button variant="primary" onClick={handleAtualizar}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default EditarCriterio;
