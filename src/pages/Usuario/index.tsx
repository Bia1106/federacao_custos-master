import React, { useState, useEffect, useMemo } from 'react';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { cMensagem } from 'src/types/Mensagem';
import { cUsuario } from 'src/types/Usuarios';
import Title from 'src/components/Title';
import Msgtoast from 'src/components/message/toast';
import * as C from '../../styles/GlobalStyles';
import EditarUsuario from './editar';

const Usuario: React.FC = () => {
  const [lisUsuario, setlisUsuario] = useState<cUsuario[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ItemcUsuario, setItemcUsuario] = useState<cUsuario>();
  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();

  const [showEditar, setShowEditar] = useState(false);
  const [busca, setBusca] = useState('');

  const handleClose = () => {
    setShowEditar(false);
  };

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };
  useEffect(() => {
    handleCarregarTela();
    setBusca(' ');
    setBusca('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UsuariosFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return lisUsuario.filter(listausuario =>
      listausuario.fullName.toLocaleLowerCase().includes(lowerBusca),
    );
  }, [busca, lisUsuario]);

  const handleCarregarTela = async () => {
    setlisUsuario([]);
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = '/users/getAll';
    const tokenStr = sessionUser.token;

    await api
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(result => {
        const { data } = result;
        setlisUsuario(data);
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

  const editarUsuario = async (item: cUsuario) => {
    setItemcUsuario(item);
    setShowEditar(true);
    setLoading(false);
  };

  // atualizar o critério
  const handleAtualizar = async (vUsuario: cUsuario) => {
    // setLoading(true);

    // recupera dados da requisição
    const webApiUrl = `/users?idUsuario=${vUsuario.id}`;
    const tokenStr = sessionUser.token;

    const payload = {
      id: vUsuario.id,
      fullName: vUsuario.fullName,
      username: vUsuario.username,
      email: vUsuario.email,
      active: vUsuario.active,
      hospitalPrincipal: vUsuario.hospitalPrincipal,
      roles: vUsuario.roles,
      hospitais: vUsuario.hospitais,
      senha: '',
    };

    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .put(webApiUrl, payload, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(result => {
        const { data } = result;

        setShowEditar(false);

        setLoading(true);
        handleMensagem({
          Mensagem: 'Item Gravado com sucesso' || data,
          TipoMensagem: 'success',
        });
        handleCarregarTela();
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          setLoading(true);
          handleMensagem({
            Mensagem: `#erro ao salvar: código do erro ${error.response.status} ${payload}`,
            TipoMensagem: 'danger',
          });
        }
      });
  };

  return (
    <div>
      <Title Mensagem="Cadastro de Usuarios" TipoMensagem="secondary" />

      {loading && (
        <Msgtoast
          Mensagem={messagem?.Mensagem || ''}
          TipoMensagem={messagem?.TipoMensagem || ''}
        />
      )}
      <input
        type="text"
        value={busca}
        onChange={ev => setBusca(ev.target.value)}
      />
      <C.Table className="table100-body js-pscroll">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Usuario</th>
            <th>E-Mail</th>
            <th>Ativo?</th>
            <th>
              Ações{' '}
              <C.BotaoNovo>
                <FontAwesomeIcon icon={faPlusSquare} />
              </C.BotaoNovo>
            </th>
          </tr>
        </thead>
        <tbody>
          {UsuariosFiltrados.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fullName}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.active ? 'Sim' : 'Não'}</td>
              <td>
                <C.BotaoEditar
                  variant="info"
                  onClick={() => editarUsuario(item)}
                  type="button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </C.BotaoEditar>
                <C.BotaoApagar variant="danger">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </C.BotaoApagar>
              </td>
            </tr>
          ))}
        </tbody>
      </C.Table>

      <EditarUsuario
        onConfirm={handleAtualizar}
        onClose={handleClose}
        itemUsuario={
          ItemcUsuario || {
            id: 99904,
            fullName: 'Alisson Amaral',
            username: 'aafonsoamaral@gmail.com',
            email: 'aafonsoamaral@gmail.com',
            active: true,
            senha: '123456',
          }
        }
        show={showEditar}
      />
    </div>
  );
};
export default Usuario;
