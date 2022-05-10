/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import * as C from 'src/styles/GlobalStyles';
import { FormCuston } from './styles';
import { cUsuario } from '../../types/Usuarios';
import { cRoles } from '../../types/Roles';
import { cHospitais } from '../../types/Hospitais';
import AddHospital from './addHospital';

interface IProps {
  onConfirm: (itemUsuario: cUsuario) => void;
  onClose: () => void;
  itemUsuario: cUsuario;
  // eslint-disable-next-line react/require-default-props
  show: boolean;
}
const EditarUsuario: FC<IProps> = props => {
  const [itemFullName, setitemFullName] = useState<string>();
  const [itemUserName, setItemUserName] = useState<string>();
  const [itemEmail, setItemEmail] = useState<string>();
  const [itemHospital, setItemHospital] = useState<cHospitais>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itemRoles, setitemRoles] = useState<cRoles[] | null | any>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itemHospitais, setitemHospitais] = useState<cHospitais[] | null | any>(
    [],
  );

  const [itemAtivo, setItemAtivo] = useState<boolean>(props.itemUsuario.active);
  const [showaddHospital, setshowaddHospital] = useState(false);

  const handleClose = () => {
    props.onClose();
  };

  const handleCloseAddHospital = () => {
    setshowaddHospital(false);
  };

  const handleAddHospitalNovo = (vHosp: cHospitais) => {
    const dataUpdate = [...itemHospitais];
    const index = dataUpdate.findIndex(x => x.cnes === vHosp.cnes);

    if (index === -1) {
      dataUpdate.push(vHosp);
      setitemHospitais([...dataUpdate]);
      setshowaddHospital(false);
    }
  };

  const handleRemoverHospital = (vHosp: cHospitais) => {
    const datadelete = [...itemHospitais];
    const index = datadelete.findIndex(x => x.cnes === vHosp.cnes);

    datadelete.splice(index, 1);

    setitemHospitais([...datadelete]);
    setshowaddHospital(false);
  };

  useEffect(() => {
    setItemEmail(props.itemUsuario.email);
    setitemFullName(props.itemUsuario.fullName);
    setItemUserName(props.itemUsuario.username);
    setItemHospital(props.itemUsuario.hospitalPrincipal);
    setitemRoles(props.itemUsuario.roles);
    setitemHospitais(props.itemUsuario.hospitais);
    setItemAtivo(props.itemUsuario.active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleAdicionarHospital = () => {
    setshowaddHospital(true);
  };

  const handleAtualizar = () => {
    props.onConfirm({
      id: props.itemUsuario.id,
      fullName: itemFullName || '',
      username: itemUserName || '',
      email: itemEmail || '',
      active: itemAtivo,
      hospitalPrincipal: itemHospital || {
        cnes: 2126796,
        cpfCnpj: 2147483647,
        fantasia: 'HOSPITAL SAO VICENTE DE PAULO DE ABAETE',
        nomeCidade: 'ABAETE',
        logradou: 'RUA FREI ORLANDO',
        numEnd: '300',
        compleme: '',
        bairro: 'CENTRO',
        codCep: 35620000,
        telefone: '(37)35411144',
        fax: '',
        leitosTotal: 49,
        leitosSus: 37,
      },
      roles: itemRoles,
      hospitais: itemHospitais,
    });
  };

  const onChangeFunc = (optionSelected: string) => {
    const idprocurado = optionSelected.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = itemHospitais.filter(
      (crit: { cnes: number }) => crit.cnes === idNUmber,
    );
    setItemHospital(result[0]);
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editando Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCuston>
            <Container>
              <Row>
                <Col>
                  {' '}
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={props.itemUsuario?.id}
                    placeholder="Identificador"
                  />
                </Col>
                <Col>
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Nome Completo"
                    value={itemFullName}
                    onChange={e => setitemFullName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  {' '}
                  <Form.Label>E-Mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    placeholder="seuemail@federasantas.com.br"
                    value={itemEmail}
                    onChange={e => setItemEmail(e.target.value)}
                  />
                </Col>
                <Col>
                  {' '}
                  <Form.Label>Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    name="usuario"
                    placeholder="Nome de Usuário"
                    value={itemUserName}
                    onChange={e => setItemUserName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Hospital Principal</Form.Label>
                  <Form.Select
                    aria-label="Selecione o hospital"
                    value={itemHospital?.cnes}
                    onChange={e => onChangeFunc(e.target.value)}
                  >
                    <option value={-1}>Selecione um hospital</option>
                    {itemHospitais?.map(
                      (item: { cnes: number; fantasia: string }) => (
                        <option value={item.cnes}>{item.fantasia}</option>
                      ),
                    )}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Ativo"
                    checked={itemAtivo}
                    onChange={e => setItemAtivo(e.target.checked)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </Container>{' '}
          </FormCuston>

          <Tabs
            defaultActiveKey="hospitais"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="hospitais" title="Hospitais">
              <C.Table className="table100-body js-pscroll">
                <thead>
                  <tr>
                    <th>Cnes</th>
                    <th>Nome</th>
                    <th>
                      Ações{' '}
                      <C.BotaoNovo>
                        <FontAwesomeIcon
                          onClick={handleAdicionarHospital}
                          icon={faPlusSquare}
                        />
                      </C.BotaoNovo>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemHospitais &&
                    itemHospitais.map(
                      (itemhsp: {
                        cnes: number;
                        cpfCnpj: number;
                        fantasia: string;
                        nomeCidade: string;
                        logradou: string;
                        numEnd: string;
                        compleme: string;
                        bairro: string;
                        codCep: number;
                        telefone: string;
                        fax: string;
                        leitosTotal: number;
                        leitosSus: number;
                      }) => (
                        <tr key={itemhsp.cnes}>
                          <td>{itemhsp.cnes}</td>
                          <td>{itemhsp.fantasia}</td>
                          <td>
                            {' '}
                            <C.BotaoApagar variant="danger">
                              <FontAwesomeIcon
                                onClick={() => handleRemoverHospital(itemhsp)}
                                icon={faTrashAlt}
                              />
                            </C.BotaoApagar>
                          </td>
                        </tr>
                      ),
                    )}
                </tbody>
              </C.Table>
            </Tab>
            <Tab eventKey="Roles" title="Roles">
              <C.Table className="table100-body js-pscroll">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>authority</th>
                    <th>
                      Ações{' '}
                      <C.BotaoNovo>
                        <FontAwesomeIcon icon={faPlusSquare} />
                      </C.BotaoNovo>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemRoles &&
                    itemRoles.map(
                      (itemRles: {
                        id: number;
                        name: string;
                        authority: string;
                      }) => (
                        <tr key={itemRles.id}>
                          <td>{itemRles.id}</td>
                          <td>{itemRles.name}</td>
                          <td>{itemRles.authority}</td>
                          <td>
                            {' '}
                            <C.BotaoApagar variant="danger">
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </C.BotaoApagar>
                          </td>
                        </tr>
                      ),
                    )}
                </tbody>
              </C.Table>
            </Tab>
          </Tabs>
          <AddHospital
            onConfirm={handleAddHospitalNovo}
            onClose={handleCloseAddHospital}
            show={showaddHospital}
          />
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
export default EditarUsuario;
