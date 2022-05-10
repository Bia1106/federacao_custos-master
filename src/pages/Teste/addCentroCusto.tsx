/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { cCentroCustoHospital } from 'src/types/CentroCustoHospital';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import { cCentroCusto } from 'src/types/CentroCusto';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Mensagem from 'src/components/message';
import { cMensagem } from 'src/types/Mensagem';
import { cRecurso } from 'src/types/Recurso';
import { cHospitais } from 'src/types/Hospitais';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ConfirmaApagar from 'src/components/confirmaApagar/ConfirmaApagar';
import { Option } from 'src/Objetos/options';
import * as C from '../../styles/GlobalStyles';

interface IProps {
  onClose: (show: boolean) => void;
  itemHospital: cHospitais;
  // eslint-disable-next-line react/require-default-props
  showModal?: boolean;
}

const animatedComponents = makeAnimated();

const AddCentroCusto: React.FC<IProps> = props => {
  const [lisCentroCusto, setlisCentroCusto] = useState<cCentroCusto[]>([]);
  const [itemCentroCusto, setitemCentroCusto] = useState<cCentroCusto>();
  const { sessionUser } = useAuth();
  const [itemCnes, setitemCnes] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedOptions, setSelectedOptions] = useState<readonly any[]>([]);
  const [recursos, setRecursos] = useState<cRecurso[]>([]);
  const [optionsRecursos, setOptionsRecursos] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [messagem, setMessagem] = useState<cMensagem>();
  const [itemID, setItemID] = useState<number>(0);
  const [listaCCustoHospital, setlistaCCustoHospital] = useState<
    cCentroCustoHospital[]
  >([]);
  const handleClose = () => {
    // eslint-disable-next-line react/destructuring-assignment
    props.onClose(false);
  };

  const hancleCloseApagar = () => {
    setShowConfirm(false);
  };

  const handleshowApagar = (idCentroCustoHospital: number) => {
    setItemID(idCentroCustoHospital);
    setShowConfirm(true);
  };

  // Carrega os centros de custos e Recursos vinculados ao Hospital
  const CarregaCentroCustoVinculado = async () => {
    setlistaCCustoHospital([]);
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = `hospitais/centroCustos?cnes=${itemCnes}`;
    const tokenStr = sessionUser.token;

    await api
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(result => {
        const { data } = result;
        setlistaCCustoHospital(data);

        setLoading(false);
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          // json = error.response.status;
          handleMensagem({
            Mensagem: error.response.status,
            TipoMensagem: 'danger',
          });
        }
      });
  };

  const handleGravarCentroCustoRecurso = async () => {
    const payload: {
      cnesHospital: number;
      idCentroCutos: number;
      idRecurso: number;
    }[] = [];

    // eslint-disable-next-line react/destructuring-assignment
    const vCnes: number = itemCnes || 0;
    const vCCusto: number = itemCentroCusto?.idCentro || 0;

    selectedOptions.map(item =>
      payload.push({
        cnesHospital: vCnes,
        idCentroCutos: vCCusto,
        idRecurso: item.value,
      }),
    );

    // recupera dados da requisição
    const webApiUrl = '/hospitais/centroCustos';
    const tokenStr = sessionUser.token;

    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .post(webApiUrl, payload, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(result => {
        const { data } = result;

        setLoading(true);
        handleMensagem({
          Mensagem: 'Item Gravado com sucesso' || data,
          TipoMensagem: 'success',
        });
        CarregaCentroCustoVinculado();
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          setLoading(true);
          handleMensagem({
            Mensagem: `#erro ao salvar: código do erro ${error.response.status}`,
            TipoMensagem: 'danger',
          });
        }
      });
  };

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  // carrega os recursos para select
  const handleApagar = async () => {
    // recupera dados da requisição
    const webApiUrl = `/hospitais/centroCustos?idCcHospRec=${itemID}`;

    const tokenStr = sessionUser.token;

    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .delete(webApiUrl, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(result => {
        const { data } = result;

        setLoading(true);
        setShowConfirm(false);
        CarregaCentroCustoVinculado();
        handleMensagem({
          Mensagem: 'Item Gravado com sucesso' || data,
          TipoMensagem: 'success',
        });
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          setLoading(true);
          handleMensagem({
            Mensagem: `#erro ao salvar: código do erro ${error.response.status}`,
            TipoMensagem: 'danger',
          });
        }
      });
  };

  // carrega os recursos para select
  const handleCarregaRecursos = () => {
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });
    const webApiUrl = '/recurso';
    const tokenStr = sessionUser.token;
    api
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(result => {
        const { data } = result;

        setRecursos(data);
        setLoading(false);
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          const jsoon = error.response.status;
          handleMensagem({ Mensagem: jsoon, TipoMensagem: 'danger' });
        }
      });
  };

  // carrega centro de custo para select
  const handleCarregaCentroCusto = () => {
    const webApiUrl = '/centroPadrao';
    const tokenStr = sessionUser.token;
    api
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(result => {
        const { data } = result;
        setlisCentroCusto(data);
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          const jsoon = error.response.status;
          handleMensagem({ Mensagem: jsoon, TipoMensagem: 'danger' });
        }
      });
  };

  // carrega objetos da tela
  useEffect(() => {
    handleCarregaRecursos();
    handleCarregaCentroCusto();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setitemCnes(props.itemHospital.cnes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    // Carrega os centros de custos e Recursos vinculados ao Hospital
    if (itemCnes !== null) {
      CarregaCentroCustoVinculado();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCnes]);

  useEffect(() => {
    // monta objeto com opções para react-select
    const ObjOpcoes: { value: string; label: string; color: string }[] = [];
    recursos.map(item =>
      ObjOpcoes.push({
        value: item.id.toString(),
        label: `${item.tipoRecurso?.dsTipoRecurso}/${item.dsRecurso}`,
        color: '#FF5630',
      }),
    );
    setOptionsRecursos(ObjOpcoes);
    /// ============================================================\\\
    // eslint-disable-next-line react/destructuring-assignment
    setitemCnes(props.itemHospital.cnes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recursos]);

  // recupera o item selecionado no select do centro de custo
  const onChangeFunc = (optionSelected: string) => {
    const idprocurado = optionSelected.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = lisCentroCusto.filter(
      ccusto => ccusto.idCentro === idNUmber,
    );
    setitemCentroCusto(result[0]);
  };

  return (
    <div>
      <Modal
        dialogClassName="modal-dialog modal-xl"
        // eslint-disable-next-line react/destructuring-assignment
        show={props.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Gerenciamento de Centro de Custos</Modal.Title>
          {loading && (
            <Mensagem
              Mensagem={messagem?.Mensagem || ''}
              TipoMensagem={messagem?.TipoMensagem || ''}
            />
          )}
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Container>
                <Row>
                  <Col sm={11}>
                    <Form.Select
                      aria-label="Selecione o Centro de Custo"
                      onChange={e => onChangeFunc(e.target.value)}
                    >
                      <option value={-1}>Selecione o Centro de Custo</option>
                      {lisCentroCusto.map(item => (
                        <option value={item.idCentro}>{item.nomeCentro}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col sm={11}>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={optionsRecursos}
                      onChange={setSelectedOptions}
                      value={selectedOptions || ''}
                      placeholder="Selecione os Recursos"
                    />
                  </Col>
                  <Col sm={1}>
                    {' '}
                    <Button onClick={handleGravarCentroCustoRecurso}>
                      <AddBoxRoundedIcon />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
            <Table className="table100-body js-pscroll">
              <thead>
                <tr>
                  <th>Centro de Custo</th>
                  <th>Recurso</th>
                  <th>Tipo Recurso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listaCCustoHospital.map(item => (
                  <tr key={item.id}>
                    <td>{item.centroCusto.nomeCentro}</td>
                    <td>{item.recurso.dsRecurso}</td>
                    <td>{item.recurso.tipoRecurso?.dsTipoRecurso}</td>
                    <td>
                      <C.BotaoApagar
                        variant="danger"
                        onClick={() => handleshowApagar(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </C.BotaoApagar>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <hr />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmaApagar
        onClose={hancleCloseApagar}
        onConfirm={handleApagar}
        showApagar={showConfirm}
        mensagem="Deseja realmente apagar esse Centro de Custo / Recurso?"
      />
    </div>
  );
};

export default AddCentroCusto;
