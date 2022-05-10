/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap';
import { CampoMascara } from 'src/styles/GlobalStyles';
import { cHospitais } from 'src/types/Hospitais';

interface IProps {
  onConfirm: (itemHospital: cHospitais) => void;
  onClose: () => void;
  itemHospital: cHospitais;
  // eslint-disable-next-line react/require-default-props
  show?: boolean;
}

const EditarHospital: FC<IProps> = props => {
  const [itemCnes, setitemCnes] = useState<number>();
  const [itemCpfCnp, setitemCpfCnp] = useState<number>();
  const [itemFantasia, setitemFantasia] = useState<string>();
  const [itemNomeCidade, setitemNomeCidade] = useState<string>();
  const [itemLogradou, setitemLogradou] = useState<string>();
  const [itemNumEnd, setitemNumEnd] = useState<string>();
  const [ItemComplemento, setItemComplemento] = useState<string>();
  const [itemBairro, setitemBairro] = useState<string>();
  const [itemCodCep, setitemCodCep] = useState<number>();
  const [itemTelefone, setitemTelefone] = useState<string>();
  const [itemFax, setitemFax] = useState<string>();
  const [itemLeitosTotal, setitemLeitosTotal] = useState<number>();
  const [itemLeitosSus, setitemLeitosSus] = useState<number>();
  const handleClose = () => {
    props.onClose();
  };

  useEffect(() => {
    setitemCnes(props.itemHospital.cnes);
    setitemCpfCnp(props.itemHospital.cpfCnpj);
    setitemFantasia(props.itemHospital.fantasia);
    setitemNomeCidade(props.itemHospital.nomeCidade);
    setitemLogradou(props.itemHospital.logradou);
    setitemNumEnd(props.itemHospital.numEnd);
    setItemComplemento(props.itemHospital.compleme);
    setitemBairro(props.itemHospital.bairro);

    if (props.itemHospital.codCep > 0) {
      setitemCodCep(props.itemHospital.codCep);
    }

    setitemTelefone(props.itemHospital.telefone);
    setitemFax(props.itemHospital.fax);

    if (props.itemHospital.leitosTotal > 0) {
      setitemLeitosTotal(props.itemHospital.leitosTotal);
    }
    if (props.itemHospital.leitosSus > 0) {
      setitemLeitosSus(props.itemHospital.leitosSus);
    }
  }, [props]);

  const handleAtualizar = () => {
    props.onConfirm({
      cnes: itemCnes || 0,
      cpfCnpj: itemCpfCnp || 0,
      fantasia: itemFantasia || '',
      nomeCidade: itemNomeCidade || '',
      logradou: itemLogradou || '',
      numEnd: itemNumEnd || '',
      compleme: ItemComplemento || '',
      bairro: itemBairro || '',
      codCep: itemCodCep || 0,
      telefone: itemTelefone || '',
      fax: itemFax || '',
      leitosTotal: itemLeitosTotal || 0,
      leitosSus: itemLeitosSus || 0,
    });
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-dialog modal-xl"
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editando Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Container>
                <Row>
                  <Col>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      onChange={e => setitemCnes(parseFloat(e.target.value))}
                      value={itemCnes}
                      placeholder="Identificador"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Fantasia</Form.Label>
                    <Form.Control
                      type="text"
                      name="Fantasia"
                      placeholder="Nome Fantasia"
                      value={itemFantasia}
                      onChange={e => setitemFantasia(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control
                      type="text"
                      name="cnpj"
                      placeholder="Código CNPJ"
                      value={itemCpfCnp}
                      onChange={e => setitemCpfCnp(parseFloat(e.target.value))}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      name="Cidade"
                      placeholder="Nome Cidade"
                      value={itemNomeCidade}
                      onChange={e => setitemNomeCidade(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>Logradouro</Form.Label>
                    <Form.Control
                      type="text"
                      name="Logradouro"
                      placeholder="Logradouro"
                      value={itemLogradou}
                      onChange={e => setitemLogradou(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Endereco</Form.Label>
                    <Form.Control
                      type="text"
                      name="Endereco"
                      placeholder="Número Endereco"
                      value={itemNumEnd}
                      onChange={e => setitemNumEnd(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control
                      type="text"
                      name="Complemento"
                      placeholder="Complemento"
                      value={ItemComplemento}
                      onChange={e => setItemComplemento(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      name="Bairro"
                      placeholder="Bairro"
                      value={itemBairro}
                      onChange={e => setitemBairro(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Cep</Form.Label>
                    <CampoMascara
                      mask="99999999"
                      value={itemCodCep}
                      name="Cep"
                      placeholder="Número Cep"
                      onChange={e => setitemCodCep(parseFloat(e.target.value))}
                    />
                    {/* <Form.Control
                      type="text"
                      name="Cep"
                      placeholder="Número Cep"
                      value={itemCodCep}
                      onChange={e => setitemCodCep(parseFloat(e.target.value))}
                    /> */}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Telefone</Form.Label>
                    <CampoMascara
                      mask="(99) 9999-9999"
                      value={itemTelefone}
                      name="Telefone"
                      placeholder="(99) 9999-9999"
                      onChange={e => setitemTelefone(e.target.value)}
                    />
                    {/* <Form.Control
                      type="text"
                      name="Telefone"
                      placeholder="Telefone"
                      value={itemTelefone}
                      onChange={e => setitemTelefone(e.target.value)}
                    /> */}
                  </Col>
                  <Col>
                    <Form.Label>Fax</Form.Label>
                    <CampoMascara
                      mask="(99) 9999-9999"
                      name="Fax"
                      placeholder="(99) 9999-9999"
                      value={itemFax}
                      onChange={e => setitemFax(e.target.value)}
                    />
                    {/* <Form.Control
                      type="text"
                      name="Fax"
                      placeholder="Fax"
                      value={itemFax}
                      onChange={e => setitemFax(e.target.value)}
                    /> */}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>Numero Total de Leitos</Form.Label>
                    <CampoMascara
                      mask="9999"
                      name="Numero Total de Leitos"
                      placeholder="Numero Total de Leitos"
                      value={itemLeitosTotal}
                      onChange={e =>
                        setitemLeitosTotal(parseFloat(e.target.value))
                      }
                    />
                    {/* <Form.Control
                      type="text"
                      name="Numero Total de Leitos"
                      placeholder="Numero Total de Leitos"
                      value={itemLeitosTotal}
                      onChange={e =>
                        setitemLeitosTotal(parseFloat(e.target.value))
                      }
                    /> */}
                  </Col>
                  <Col>
                    <Form.Label>Leitos Sus</Form.Label>
                    <CampoMascara
                      mask="9999"
                      name="Número Total de Leitos"
                      placeholder="Número Total de Leitos Sus"
                      value={itemLeitosSus}
                      onChange={e =>
                        setitemLeitosSus(parseFloat(e.target.value))
                      }
                    />
                    {/* <Form.Control
                      type="text"
                      name="Fax"
                      placeholder="Fax"
                      value={itemLeitosSus}
                      onChange={e =>
                        setitemLeitosSus(parseFloat(e.target.value))
                      }
                    /> */}
                  </Col>
                </Row>
              </Container>
            </Form>
          </div>
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
export default EditarHospital;
