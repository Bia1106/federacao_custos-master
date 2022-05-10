/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
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
import { cCentroCusto } from 'src/types/CentroCusto';
import Title from 'src/components/Title';
import apiFuncoes from 'src/services/apiFuncoes';
import { BotaoApagar, BotaoEditar, Table } from '../../styles/GlobalStyles';
import { TD } from './styles';
import { cCriterio } from '../../types/Criterio';
import ApagarCentroCusto from './apagarCentroCusto';
import EditarCentroCustos from './editarCentroCusto';

const CentroCusto: React.FC = () => {
  const [lisCentroCusto, setlisCentroCusto] = useState<cCentroCusto[]>([]);
  const [ItemCentroCusto, setItemCentroCusto] = useState<cCentroCusto>();

  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  const handleCarregarCentroCusto = async () => {
    setlisCentroCusto([]);
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = '/centroPadrao';
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
      setlisCentroCusto(json);
    }
  };

  useEffect(() => {
    handleCarregarCentroCusto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // atualizar o critério
  const handleAtualizar = async (vCentroCusto: cCentroCusto) => {
    // const handleAtualizar = async () => {
    // setLoading(true);

    // recupera dados da requisição
    const webApiUrl = '/centroPadrao';
    const tokenStr = sessionUser.token;

    // monta o paylod para enviar na api
    const idCentroCusto =
      vCentroCusto?.idCentro === 0 ? null : vCentroCusto?.idCentro;

    const payload = {
      idCentro: idCentroCusto,
      nomeCentro: vCentroCusto.nomeCentro,
      criterio: vCentroCusto.criterio,
      descricao: vCentroCusto.descricao,
      ativo: vCentroCusto.ativo,
    };

    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .post(webApiUrl, payload, {
        headers: {
          Authorization: `Bearer ${tokenStr}`,
          'Content-Type': 'application/json',
        },
      })
      .then(result => {
        const { data } = result;

        setShowEditar(false);
        setShowApagar(false);
        handleCarregarCentroCusto();
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

  const editarCentroCustos = async (item: cCentroCusto) => {
    setItemCentroCusto(item);
    setShowEditar(true);
    setLoading(false);
  };

  const [showEditar, setShowEditar] = useState(false);
  const [showApagar, setShowApagar] = useState(false);

  const handleClose = () => {
    setShowEditar(false);
    setShowApagar(false);
  };

  const apagarItem = async (item: cCentroCusto) => {
    setItemCentroCusto(item);
    setShowApagar(true);
    setLoading(false);
  };

  return (
    <div>
      <Title Mensagem="Centro de Custo" TipoMensagem="secondary" />

      {loading && (
        <Mensagem
          Mensagem={messagem?.Mensagem || ''}
          TipoMensagem={messagem?.TipoMensagem || ''}
        />
      )}

      <Table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Centro de Custos</th>
            <th>Criterio</th>
            <th>Descrição</th>
            <th>Ativo?</th>
            <th>
              Ações{' '}
              <Button
                onClick={() =>
                  editarCentroCustos({
                    idCentro: 0,
                    nomeCentro: '',
                    ativo: true,
                    descricao: '',
                  })
                }
                type="button"
              >
                <FontAwesomeIcon icon={faPlusSquare} />
                {' Novo'}
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {lisCentroCusto.map(item => (
            <tr key={item.idCentro}>
              <td>{item.idCentro}</td>
              <td>{item.nomeCentro}</td>
              <td>{item.criterio?.dsCriterio}</td>
              <td>{item.descricao}</td>
              <td>{item.ativo ? 'Sim' : 'Não'}</td>

              <TD>
                <BotaoEditar
                  className="botao"
                  onClick={() => editarCentroCustos(item)}
                  type="button"
                  tooltip="Apagar"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </BotaoEditar>
                <BotaoApagar onClick={() => apagarItem(item)} variant="danger">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </BotaoApagar>
              </TD>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditarCentroCustos
        onConfirm={handleAtualizar}
        onClose={handleClose}
        itemCC={
          ItemCentroCusto || {
            ativo: false,
            descricao: '',
            idCentro: 0,
            nomeCentro: '',
          }
        }
        show={showEditar}
      />

      <ApagarCentroCusto
        mensagem="Deseja Apagar o Centro de Custos?"
        onConfirm={handleAtualizar}
        onClose={handleClose}
        itemCC={
          ItemCentroCusto || {
            ativo: false,
            descricao: '',
            idCentro: 0,
            nomeCentro: '',
          }
        }
        showApagar={showApagar}
      />
    </div>
  );
};
export default CentroCusto;
