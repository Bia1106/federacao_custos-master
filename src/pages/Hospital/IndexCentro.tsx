/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
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
import { cHospitais } from 'src/types/Hospitais';
import Title from 'src/components/Title';
import { hospitalNovo } from 'src/Objetos/hospital';
import * as C from '../../styles/GlobalStyles';
import {
  BotaoApagar,
  BotaoEditar,
  Table,
  BotaoNovo,
} from '../../styles/GlobalStyles';
import EditarHospital from './editarHospital';
import AddCentroCusto from './addCentroCusto';

const HospitaisCentro: React.FC = () => {
  const [lisHospitais, setlisHospitais] = useState<cHospitais[]>([]);
  const [ItemHospital, setItemHospital] = useState<cHospitais>();
  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();
  const [showEditar, setShowEditar] = useState(false);
  const [showAddCCusto, setShowAddCCusto] = useState(false);
  const [vCnes, setvCnes] = useState<number>(0);

  const [showApagar, setShowApagar] = useState(false);
  const [busca, setBusca] = useState('');

  const HospitaisFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return lisHospitais.filter(listaHospital =>
      listaHospital.fantasia.toLocaleLowerCase().includes(lowerBusca),
    );
  }, [busca, lisHospitais]);

  const handleAtualizar = async (vHospital: cHospitais) => {
    // setLoading(true);
  };

  const handleClose = () => {
    setShowEditar(false);
    setShowApagar(false);
  };

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  const [HospitalNovo, setHospitalNovo] = useState<cHospitais>({
    bairro: '',
    cnes: 0,
    codCep: 0,
    compleme: '',
    cpfCnpj: 0,
    fantasia: '',
    fax: '',
    leitosSus: 0,
    leitosTotal: 0,
    logradou: '',
    nomeCidade: '',
    numEnd: '',
    telefone: '',
  });

  useEffect(() => {
    setlisHospitais(sessionUser.user.hospitais || [HospitalNovo]);
    // handleCarregarHospitais();
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
      <Table className="table100-body js-pscroll">
        <thead>
          <tr>
            <th>cnes</th>
            <th>Cnpj</th>
            <th>Fantasia</th>
            <th>Cidade</th>
            <th>Total Leitos</th>
            <th>Leitos Sus</th>
            <th>Ações </th>
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
                <C.BotaoEditar
                  variant="info"
                  onClick={() => addCCusto(item)}
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                </C.BotaoEditar>

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
        itemHospital={ItemHospital || hospitalNovo}
        show={showEditar}
      />

      <AddCentroCusto
        onClose={setShowAddCCusto}
        showModal={showAddCCusto}
        itemHospital={ItemHospital || hospitalNovo}
      />
    </div>
  );
};
export default HospitaisCentro;
