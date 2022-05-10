import React, { useState, useEffect, useMemo } from 'react';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import Mensagem from 'src/components/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faPlusSquare,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';

import { cMensagem } from 'src/types/Mensagem';
import { cHospitais } from 'src/types/Hospitais';
import Title from 'src/components/Title';
import { hospitalNovo } from 'src/Objetos/hospital';
import apiFuncoes from 'src/services/apiFuncoes';
import * as C from '../../styles/GlobalStyles';
import { BotaoApagar, Table } from '../../styles/GlobalStyles';
import EditarHospital from './editarHospital';
import AddCentroCusto from './addCentroCusto';

const Hospitais: React.FC = () => {
  const [lisHospitais, setlisHospitais] = useState<cHospitais[]>([]);
  const [ItemHospital, setItemHospital] = useState<cHospitais>();

  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();
  const [showEditar, setShowEditar] = useState(false);
  const [showAddCCusto, setShowAddCCusto] = useState(false);
  // const [showApagar, setShowApagar] = useState(false);
  const [busca, setBusca] = useState('');

  const HospitaisFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return lisHospitais.filter(listaHospital =>
      listaHospital.fantasia.toLocaleLowerCase().includes(lowerBusca),
    );
  }, [busca, lisHospitais]);

  // retorna os daodos do hospital
  const handleCarregarHospitais = async () => {
    setlisHospitais([]);
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = '/hospitais/ativos';
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
      setlisHospitais(json);
    }

    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });
  };

  const handleAtualizar = async (vHospital: cHospitais) => {
    // const handleAtualizar = async () => {
    // setLoading(true);

    // recupera dados da requisição
    const webApiUrl = '/hospitais';
    const tokenStr = sessionUser.token;

    // monta o paylod para enviar na api
    const vCnes = vHospital?.cnes === 0 ? null : vHospital?.cnes;

    const payload = {
      ativo: true,
      bairro: vHospital.bairro,
      cnes: vCnes,
      codCep: vHospital.codCep,
      compleme: vHospital.compleme,
      cpfCnpj: vHospital.cpfCnpj,
      fantasia: vHospital.fantasia,
      fax: vHospital.fax,
      leitosSus: vHospital.leitosSus,
      leitosTotal: vHospital.leitosTotal,
      logradou: vHospital.logradou,
      nomeCidade: vHospital.nomeCidade,
      numEnd: vHospital.numEnd,
      telefone: vHospital.telefone,
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
        handleCarregarHospitais();
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

  const handleClose = () => {
    setShowEditar(false);
  };

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  useEffect(() => {
    handleCarregarHospitais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editarHospital = async (item: cHospitais) => {
    setItemHospital(item);
    setShowEditar(true);
    setLoading(false);
  };

  const addCCusto = async (item: cHospitais) => {
    setItemHospital(item);
    setShowAddCCusto(true);
    setLoading(false);
  };

  return (
    <div>
      <Title Mensagem="Cadastro de Hospitais" TipoMensagem="secondary" />

      {loading && (
        <Mensagem
          Mensagem={messagem?.Mensagem || ''}
          TipoMensagem={messagem?.TipoMensagem || ''}
        />
      )}
      <input
        type="text"
        value={busca}
        onChange={ev => setBusca(ev.target.value)}
      />

      <hr />
      <Table className="table100-body js-pscroll">
        <thead>
          <tr>
            <th>cnes</th>
            <th>Cnpj</th>
            <th>Fantasia</th>
            <th>Cidade</th>
            <th>Total Leitos</th>
            <th>Leitos Sus</th>

            <th>
              Ações
              <C.BotaoNovo
                variant="primary"
                onClick={() => editarHospital(hospitalNovo)}
                type="button"
              >
                <FontAwesomeIcon icon={faPlusSquare} />
              </C.BotaoNovo>
            </th>
          </tr>
        </thead>
        <tbody>
          {HospitaisFiltrados.map(item => (
            <tr key={item.cnes}>
              <td>{item.cnes}</td>
              <td>{item.cpfCnpj}</td>
              <td>{item.fantasia}</td>
              <td>{item.nomeCidade}</td>
              <td>{item.leitosTotal}</td>
              <td>{item.leitosSus}</td>
              <td>
                <C.BotaoInfo
                  variant="primary"
                  onClick={() => addCCusto(item)}
                  type="button"
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </C.BotaoInfo>

                <C.BotaoEditar
                  variant="info"
                  onClick={() => editarHospital(item)}
                  type="button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </C.BotaoEditar>

                <BotaoApagar variant="danger">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </BotaoApagar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditarHospital
        onConfirm={handleAtualizar}
        onClose={handleClose}
        itemHospital={
          ItemHospital || {
            cnes: 0,
            cpfCnpj: 0,
            fantasia: '',
            nomeCidade: '',
            logradou: '',
            numEnd: '',
            compleme: '',
            bairro: '',
            codCep: 0,
            telefone: '',
            fax: '',
            leitosTotal: 0,
            leitosSus: 0,
          }
        }
        show={showEditar}
      />

      {showAddCCusto && (
        <AddCentroCusto
          onClose={setShowAddCCusto}
          showModal={showAddCCusto}
          itemHospital={
            ItemHospital || {
              cnes: 0,
              cpfCnpj: 0,
              fantasia: '',
              nomeCidade: '',
              logradou: '',
              numEnd: '',
              compleme: '',
              bairro: '',
              codCep: 0,
              telefone: '',
              fax: '',
              leitosTotal: 0,
              leitosSus: 0,
            }
          }
        />
      )}
    </div>
  );
};
export default Hospitais;
