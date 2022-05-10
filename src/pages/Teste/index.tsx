/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import Mensagem from 'src/components/message';
import { cMensagem } from 'src/types/Mensagem';
import { cHospitais } from 'src/types/Hospitais';
import Title from 'src/components/Title';
import { hospitalNovo } from 'src/Objetos/hospital';
import { DataGrid, GridColumns, GridValueGetterParams } from '@mui/x-data-grid';
import EditarHospital from './editarHospital';
import AddCentroCusto from './addCentroCusto';

const Teste: React.FC = () => {
  const [lisHospitais, setlisHospitais] = useState<cHospitais[]>([]);
  const [ItemHospital, setItemHospital] = useState<cHospitais>();
  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();
  const [showEditar, setShowEditar] = useState(false);
  const [showAddCCusto, setShowAddCCusto] = useState(false);
  const [vCnes, setvCnes] = useState<number>(0);

  const [showApagar, setShowApagar] = useState(false);

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

  useEffect(() => {
    setlisHospitais(sessionUser.user.hospitais || [hospitalNovo]);
    console.log(sessionUser.user.hospitais);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editarHospital = async (item: any) => {
    const vresult = lisHospitais.filter(vdesem => vdesem.cnes === item);
    setItemHospital(vresult[0] || hospitalNovo);
    setShowEditar(true);

    // setItemHospital(item);
    // setShowEditar(true);
    setLoading(false);
  };

  const addCCusto = async (item: cHospitais) => {
    setItemHospital(item);
    setShowAddCCusto(true);
    setLoading(false);
  };

  function getIdField(params: GridValueGetterParams) {
    return params.row.cnes;
  }

  const columns: GridColumns = [
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Ações',
    //   width: 100,
    //   cellClassName: 'actions',
    //   getActions: ({ id }) => {
    //     return [
    //       <GridActionsCellItem
    //         icon={<AddBoxRoundedIcon />}
    //         label="Novo"
    //         onClick={() => editarHospital(0)}
    //         color="inherit"
    //       />,
    //       <GridActionsCellItem
    //         icon={<ModeEditOutlineRoundedIcon />}
    //         label="Delete"
    //         onClick={() => editarHospital(id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
    { field: 'cnes', headerName: 'ID', width: 90, valueGetter: getIdField },
    {
      field: 'cpfCnpj',
      headerName: 'Cnpj',
      width: 100,
      editable: false,
    },
    {
      field: 'hospital',
      headerName: 'fantasia',
      width: 250,
      editable: false,
    },
    {
      field: 'nomeCidade',
      headerName: 'Cidade',
      width: 250,
      editable: false,
    },
    {
      field: 'Total de Leitos',
      headerName: 'leitosTotal',
      width: 250,
      editable: false,
    },
  ];

  return (
    <div>
      <Title Mensagem="Cadastro de Hospitais" TipoMensagem="secondary" />
      {loading && (
        <Mensagem
          Mensagem={messagem?.Mensagem || ''}
          TipoMensagem={messagem?.TipoMensagem || ''}
        />
      )}

      <DataGrid
        rows={lisHospitais}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoPageSize
        autoHeight
      />
    </div>
  );
};

export default Teste;
