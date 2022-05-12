/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEditRowsModel,
  GridToolbar,
  GridValueGetterParams,
  ptBR,
} from '@mui/x-data-grid';

import { CReceita, CReceitaSimplificado } from 'src/types/Receita';
import { Alert } from '@mui/material';
import ConfirmaApagar from 'src/components/confirmaApagar/ConfirmaApagar';
import { Col, Container, Row } from 'react-bootstrap';
import Mensagem from 'src/components/message';
import apiFuncoes from 'src/services/apiFuncoes';
import { cMensagem } from 'src/types/Mensagem';

import { cAno } from 'src/types/Ano';
import Title from 'src/components/Title';
import { cCompetencia } from 'src/types/Competencia';
import BarraMeses from 'src/components/Outros/barraMeses';
import { cCentroHospital } from 'src/types/CentroCustoHospital';
import { ccHospitalCentroNovo } from 'src/Objetos/hospital';
import CentroCustoHospitalSelect from 'src/components/Selects/selectCentroCustoHospital';

// import { Container } from './styles';

const Receita: React.FC = () => {
  const [lisReceitas, setlisReceitas] = useState<CReceita[]>([]);

  const [editVlReceita, setEditVlReceita] = useState<string>();
  const [editDataInclusao, setEditDataInclusao] = useState<string>();
  const [showapagar, setshowapagar] = useState<boolean>(false);
  const [competencia, SetCompetencia] = useState<string>('1/2022');

  const [vTotalReceita, SetvTotalReceita] = useState<number>(0);
  const [itemCompetencia, setitemCompetencia] = useState<cCompetencia>();

  const [messagem, setMessagem] = useState<cMensagem>();
  const [loading, setLoading] = useState(true);
  const { sessionUser } = useAuth();
  const [itemApagar, SetItemApagar] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(25);

  const [ItemCentroCusto, setItemCentroCusto] = useState<cCentroHospital>();

  useEffect(() => {
    CarregaTela();
  }, [itemCompetencia, sessionUser.DefaultHospital, ItemCentroCusto]);

  const CarregaTela = async () => {
    setlisReceitas([]);

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1);
    const vcomp = `${mes}/${ano}`;

    setMessagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = `/receita?cnes=${
      sessionUser.DefaultHospital?.cnes
    }&competencia=${itemCompetencia?.mesAno || vcomp}`;
    const tokenStr = sessionUser.token;
    const json = await apiFuncoes.getDadosApi(webApiUrl, tokenStr);
    if (json.error) {
      setMessagem({
        Mensagem: `error: ${json.error} -
          path:  ${json.path} - 
          status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      setLoading(false);
      setlisReceitas(json);
      AtualizaValorTotal(json);
    }
  };

  const AtualizaValorTotal = async (vReceitas: CReceita[]) => {
    let total = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < vReceitas.length; i++) {
      total += parseFloat(vReceitas[i].vlReceita.toString());
    }

    SetvTotalReceita(total);
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSelecionaAno = async (Ano: cAno) => {};

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  const handleAtualizar = async (vReceita: CReceitaSimplificado) => {
    const webApiUrl = `/receita?id=${vReceita.id}`;
    const tokenStr = sessionUser.token;

    const payload = {
      cnes: vReceita.cnes,
      dataInclusao: vReceita.dataInclusao,
      idCcHospRecurso: vReceita.idCcHospRecurso,
      idCompetencia: vReceita.idCompetencia,
      idUsuario: vReceita.idUsuario,
      vlReceita: vReceita.vlReceita,
    };
    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .put(webApiUrl, payload, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(result => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data } = result;

        //    CarregaTela();
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

  const handleClose = async () => {
    setshowapagar(false);
  };

  const handleConfirma = async () => {
    setshowapagar(false);

    const webApiUrl = `/receita?idReceita=${itemApagar}`;
    const tokenStr = sessionUser.token;

    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .delete(webApiUrl, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(result => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data } = result;

        CarregaTela();
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

  function getCompetencia(params: GridValueGetterParams) {
    return params.row.competencia.mesAno;
  }

  function getCentroCusto(params: GridValueGetterParams) {
    // return ItemCentroCusto?.centroCusto.idCentro ===
    //   params.row.centroCustoHospital.centroCusto.idCentro
    //   ? params.row.centroCustoHospital.centroCusto.nomeCentro
    //   : '';
    return params.row.centroCustoHospital.centroCusto.nomeCentro;
    // params.row.recurso.dsRecurso
  }

  function getRecurso(params: GridValueGetterParams) {
    return params.row.centroCustoHospital.recurso.dsRecurso;
    // params.row.recurso.dsRecurso
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteClick = (id: any) => {
    SetItemApagar(id);
    setshowapagar(true);
  };

  const columns: GridColumns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: 'id', headerName: 'ID', width: 45 },
    {
      field: 'Competencia',
      headerName: 'Competencia',
      width: 120,
      editable: false,
      valueGetter: getCompetencia,
    },
    {
      field: 'CentroCusto',
      headerName: 'Centro de Custos',
      width: 200,
      editable: false,
      valueGetter: getCentroCusto,
    },
    {
      field: 'Recurso',
      headerName: 'Recurso',
      width: 200,
      editable: false,
      valueGetter: getRecurso,
    },

    {
      field: 'vlReceita',
      headerName: 'Valor Receita',
      width: 200,
      editable: true,
      type: 'number',
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    },
  ];

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleTrocaCentroCusto = async (vItem: cCentroHospital) => {
    setItemCentroCusto(vItem || ccHospitalCentroNovo);
  };

  const handleEditRowsModelChange = React.useCallback(
    (model: GridEditRowsModel) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const arr = Object.keys(model).map(item => {
        if (model[item].vlReceita) {
          setEditVlReceita(model[item].vlReceita.value?.toString() || '0');
          return model[item].vlReceita.value;
        }
        if (model[item].dataInclusao) {
          setEditDataInclusao(
            model[item].dataInclusao.value?.toString() || '0',
          );
          return model[item].dataInclusao.value;
        }
        return [];
      });
    },
    [],
  );

  const Atualiza = async (params: GridValueGetterParams) => {
    // const newDate = new Date().toLocaleString();
    const valor: string = editVlReceita || '0';
    const vData: string = editDataInclusao || '0';

    const payload: CReceitaSimplificado = {
      id: params.row.id,
      cnes: params.row.centroCustoHospital.hospital.cnes,
      dataInclusao: Date.parse(vData).toString(),
      idCcHospRecurso: params.row.centroCustoHospital?.id,
      idCompetencia: params.row.competencia.id,
      idUsuario: sessionUser.user.id,
      vlReceita: Number.parseFloat(valor),
    };

    const items: CReceita[] = lisReceitas;
    const objIndex = lisReceitas.findIndex(obj => obj.id === params.row.id);
    items[objIndex].vlReceita = Number.parseFloat(valor);
    AtualizaValorTotal(items);
    setlisReceitas(items);

    handleAtualizar(payload);
    // await handleAtualizar(params.row);
  };

  const handleCompetencia = (vComp: cCompetencia) => {
    setitemCompetencia(vComp);
    // const vcomp = `${vComp.mesAno}`;
    // SetCompetencia(vcomp);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Container fluid>
        <Row>
          <Col sm={8}>
            <Title Mensagem="Cadastro de Receitas" TipoMensagem="primary" />
          </Col>
          <Col sm={4}>
            <Title
              Mensagem={`Valor Total :${currencyFormatter.format(
                Number(vTotalReceita.toString()),
              )}`}
              TipoMensagem="primary"
            />
          </Col>
        </Row>
        {/* {loading && (
          <Mensagem
            Mensagem={messagem?.Mensagem || ''}
            TipoMensagem={messagem?.TipoMensagem || ''}
          />
        )} */}

        {/* <CentroCustoHospitalSelect
          onChange={handleTrocaCentroCusto}
          onError={setMessagem}
          vValorAtual={ItemCentroCusto?.centroCusto.idCentro.toString() || '0'}
        /> */}
        <p />

        <p />
        <Row>
          <BarraMeses
            onChangeComp={handleCompetencia}
            onChangeYear={handleSelecionaAno}
            vCompAtual={itemCompetencia}
          />
        </Row>
      </Container>
      <p />
      <Container fluid>
        <div style={{ height: 400, width: '100%', margin: '5px 0px' }}>
          <DataGrid
            rows={lisReceitas}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            pagination
            disableSelectionOnClick
            onCellEditStop={Atualiza}
            onEditRowsModelChange={handleEditRowsModelChange}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              height: 400,
              width: 1,
              boxShadow: 2,
              border: 1,
              '& .MuiDataGrid-cell--editable': {
                bgcolor: theme =>
                  theme.palette.mode === 'dark'
                    ? '#376331'
                    : 'rgb(217 243 190)',
              },
            }}
          />
        </div>
      </Container>

      <Alert severity="info" style={{ marginTop: 8 }}>
        <p>
          <code>Mês: {competencia}</code> {' - '}
          <code>Hospital: {sessionUser.DefaultHospital?.fantasia}</code>
        </p>
      </Alert>

      <ConfirmaApagar
        onClose={handleClose}
        onConfirm={handleConfirma}
        mensagem="Deseja apagar esse item?"
        showApagar={showapagar}
      />
    </div>
  );
};

export default Receita;
