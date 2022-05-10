/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { cCentroCusto } from 'src/types/CentroCusto';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import { cCriterio } from '../../types/Criterio';

interface IProps {
  onConfirm: (itemCC: cCentroCusto) => void;
  onClose: () => void;
  itemCC: cCentroCusto;
  // eslint-disable-next-line react/require-default-props
  show?: boolean;
}

const EditarCentroCustos: FC<IProps> = props => {
  const [lisCriterio, setlisCriterio] = useState<cCriterio[]>([]);
  const { sessionUser } = useAuth();
  const [itemNomeCentro, setItemNomeCentro] = useState('');
  const [itemDescricao, setItemDescricao] = useState('');
  const [itemAtivo, setItemAtivo] = useState<boolean>(true);
  const [itemCriterio, setIitemCriterio] = useState<cCriterio>();

  useEffect(() => {
    handleCarregarCriterios();
    setItemNomeCentro(props.itemCC.nomeCentro || '');
    setItemDescricao(props.itemCC.descricao || '');
    setIitemCriterio(props.itemCC.criterio);
    setItemAtivo(props.itemCC.ativo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleCarregarCriterios = async () => {
    setlisCriterio([]);
    const webApiUrl = '/centroPadrao/criterio';
    const tokenStr = sessionUser.token;

    await api
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(result => {
        const { data } = result;
        setlisCriterio(data);
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const json = error.response.status;
        }
      });
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleAtualizar = () => {
    props.onConfirm({
      ativo: itemAtivo,
      descricao: itemDescricao,
      idCentro: props.itemCC.idCentro,
      nomeCentro: itemNomeCentro,
      criterio: itemCriterio,
    });
  };

  const onChangeFunc = (optionSelected: string) => {
    const idprocurado = optionSelected.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = lisCriterio.filter(crit => crit.id === idNUmber);
    setIitemCriterio(result[0]);
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
          <Form>
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="id"
              readOnly
              value={props.itemCC.idCentro || 0}
              placeholder="Identificador"
            />
            <br />
            <Form.Label>Centro de Custos</Form.Label>
            <Form.Control
              type="text"
              name="CentroCusto"
              placeholder="Centro de Custos"
              value={itemNomeCentro}
              onChange={e => setItemNomeCentro(e.target.value)}
            />
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              name="Descricao"
              placeholder="Descrição"
              value={itemDescricao}
              onChange={e => setItemDescricao(e.target.value)}
            />
            <br />
            <Form.Label>Critério</Form.Label>
            <Form.Select
              aria-label="Selecione o critério"
              value={itemCriterio?.id}
              onChange={e => onChangeFunc(e.target.value)}
            >
              {lisCriterio.map(item => (
                <option value={item.id}>{item.dsCriterio}</option>
              ))}
            </Form.Select>
            <Form.Check
              type="checkbox"
              label="Ativo"
              id="ativo"
              checked={itemAtivo}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChange={e => setItemAtivo(!setItemAtivo)}
            />
          </Form>
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
export default EditarCentroCustos;
