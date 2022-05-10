import React, { useState, useEffect } from 'react';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import Mensagem from 'src/components/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { cMensagem } from 'src/types/Mensagem';
import Title from 'src/components/Title';
import apiFuncoes from 'src/services/apiFuncoes';
import * as C from '../../styles/GlobalStyles';
import { cCriterio } from '../../types/Criterio';
import ConfirmaApagar from './ConfirmaApagar';
import EditarCriterio from './editar';

const Criterio: React.FC = () => {
  const [lisCriterio, setlisCriterio] = useState<cCriterio[]>([]);
  const [criterio, setCriterio] = useState<cCriterio>();
  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();

  const [showEditar, setShowEditar] = useState(false);
  const [showApagar, setShowApagar] = useState(false);

  const handleClose = () => {
    setShowEditar(false);
    setShowApagar(false);
  };

  // funcção para buscar todos os critérios ativos cadastrados
  const handleCarregarTela = async () => {
    setlisCriterio([]);
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = '/centroPadrao/criterio';
    const tokenStr = sessionUser.token;

    const json = await apiFuncoes.getDadosApi(webApiUrl, tokenStr);
    if (json.error) {
      handleMensagem({
        Mensagem: `error: ${json.error} -
      path:  ${json.path} - 
      status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      setLoading(false);
      setlisCriterio(json);
    }
  };

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  // atualizar o critério
  const handleAtualizar = async (vCriterio: cCriterio) => {
    // setLoading(true);

    // recupera dados da requisição
    const webApiUrl = '/centroPadrao/criterio';
    const tokenStr = sessionUser.token;

    // monta o paylod para enviar na api
    const idCriterio = vCriterio?.id === 0 ? null : vCriterio?.id;

    const payload = {
      ativo: vCriterio.ativo,
      dsCriterio: vCriterio.dsCriterio,
      id: idCriterio,
    };

    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .post(webApiUrl, payload, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(result => {
        const { data } = result;

        setShowEditar(false);
        setShowApagar(false);
        handleCarregarTela();
        setLoading(true);
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

  // const apagarCriterio = async (idcriterio: number) => {};

  useEffect(() => {
    handleCarregarTela();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editarCriterio = async (item: cCriterio) => {
    setCriterio(item);
    setShowEditar(true);
    setLoading(false);
  };

  const apagarItem = async (item: cCriterio) => {
    setCriterio(item);
    setShowApagar(true);
    setLoading(false);
  };

  return (
    <div>
      <Title Mensagem="Cadastro de Critérios" TipoMensagem="Secondary" />

      {loading && (
        <Mensagem
          Mensagem={messagem?.Mensagem || ''}
          TipoMensagem={messagem?.TipoMensagem || ''}
        />
      )}
      <hr />
      <C.Table className="table100-body js-pscroll">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Ativo?</th>
            <th>
              Ações{' '}
              <C.BotaoNovo
                tooltip="teste"
                onClick={() =>
                  editarCriterio({
                    id: 0,
                    dsCriterio: '',
                    ativo: true,
                  })
                }
              >
                <FontAwesomeIcon icon={faPlusSquare} />
              </C.BotaoNovo>
            </th>
          </tr>
        </thead>
        <tbody>
          {lisCriterio.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dsCriterio}</td>
              <td>{item.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <C.BotaoEditar
                  variant="info"
                  onClick={() => editarCriterio(item)}
                  type="button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </C.BotaoEditar>
                <C.BotaoApagar
                  onClick={() => apagarItem(item)}
                  variant="danger"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </C.BotaoApagar>
              </td>
            </tr>
          ))}
        </tbody>
      </C.Table>

      <EditarCriterio
        onConfirm={handleAtualizar}
        onClose={handleClose}
        itemCriterio={
          criterio || {
            id: 0,
            dsCriterio: '',
            ativo: true,
          }
        }
        show={showEditar}
      />

      <ConfirmaApagar
        mensagem="Deseja Apagar o critério?"
        onConfirm={handleAtualizar}
        onClose={handleClose}
        ItemCriterio={
          criterio || {
            id: 0,
            dsCriterio: '',
            ativo: true,
          }
        }
        showApagar={showApagar}
      />
    </div>
  );
};
export default Criterio;
