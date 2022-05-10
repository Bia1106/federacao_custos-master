/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import Title from 'src/components/Title';
import { useAuth } from 'src/contexts/auth';
import { cMensagem } from 'src/types/Mensagem';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { Alert } from '@mui/material';

import { cDesembolso } from 'src/types/Desembolso';
import apiFuncoes from 'src/services/apiFuncoes';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridToolbar,
  GridValueGetterParams,
  ptBR,
} from '@mui/x-data-grid';

import ConfirmaApagar from 'src/components/confirmaApagar/ConfirmaApagar';

import { cCompetencia } from 'src/types/Competencia';
import { cAno } from 'src/types/Ano';
import { cBalancete, cBalanceteSimples } from 'src/types/Balancete';
import BarraMeses from 'src/components/Outros/barraMeses';
import { BalanceteNovo } from 'src/Objetos/balancete';
import { componenteCustosNova } from 'src/Objetos/ComponenteCustos';
import { competenciaNova } from 'src/Objetos/Competencia';
import { hospitalNovo } from 'src/Objetos/hospital';
import EditarItem from './editar';

const Balancete: React.FC = () => {
  const { sessionUser } = useAuth();

  const [LisBalancete, setLisBalancete] = useState<cBalancete[]>([]);
  const [ItemBancete, setItemBancete] = useState<cBalancete>();
  const [itemCompetencia, setitemCompetencia] = useState<cCompetencia>();
  const [messagem, setMessagem] = useState<cMensagem>();
  const [itemLinha, SetItemLinha] = useState<string>('');
  const [competencia, SetCompetencia] = useState<string>();
  const [showapagar, setshowapagar] = useState<boolean>(false);
  const [showEditar, setShowEditar] = useState<boolean>(false);

  const [vConsole, SetvConsole] = useState<string>('');
  const [vTotalBalancete, SetvTotalBalancete] = useState<number>(0);
  const [vTotalRedutor, SetvTotalRedutor] = useState<number>(0);
  const [vOperacional, SetvOperacional] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);

  // useEffect(() => {
  //   carregacompetencia();
  // }, []);

  useEffect(() => {
    CarregaTela();
  }, [itemCompetencia, sessionUser.DefaultHospital]);

  const handleCompetencia = (vComp: cCompetencia) => {
    if (vComp !== undefined) {
      setitemCompetencia(vComp);
      SetCompetencia(vComp.mesAno);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSelecionaAno = async (Ano: cAno) => {};

  const CarregaTela = async () => {
    setLisBalancete([]);
    // setLoading(true);
    setMessagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = `/balancete?idCompetencia=${itemCompetencia?.id?.toString()}&cnes=${
      sessionUser.DefaultHospital?.cnes
    }`;

    SetvConsole(webApiUrl);
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
      // setLoading(false);
      setLisBalancete(json);

      let vRedutor = 0;
      let vBalancete = 0;

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < json.length; i++) {
        vBalancete += json[i].vlBalancete;
        vRedutor += json[i].vlRedutor;
      }

      SetvTotalBalancete(vBalancete);
      SetvTotalRedutor(vRedutor);
      SetvOperacional(vBalancete + vRedutor);
    }
  };

  function getFullName(params: GridValueGetterParams) {
    return params.row.dsLancamento;
  }

  function getComponeteCustos(params: GridValueGetterParams) {
    return params.row.componenteCusto.descricao;
  }

  function getCompetencia(params: GridValueGetterParams) {
    return params.row.competencia.mesAno;
  }

  const handleDeleteClick = (id: any) => {
    SetItemLinha(id);
    setshowapagar(true);
  };

  const handleEditClick = (id: any) => {
    const vBalancete: cBalancete = {
      id: 0,
      hospital: sessionUser.DefaultHospital || hospitalNovo,
      competencia: itemCompetencia || competenciaNova,
      componenteCusto: componenteCustosNova,
      vlBalancete: 0,
      vlRedutor: 0,
      dsLancamento: '',
    };

    const vresult = LisBalancete.filter(vitem => vitem.id === id);
    setItemBancete(vresult[0] || vBalancete);
    setShowEditar(true);
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
            icon={<AddBoxRoundedIcon />}
            label="Novo"
            onClick={() => handleEditClick(0)}
            color="inherit"
          />,

          <GridActionsCellItem
            icon={<DeleteRoundedIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ModeEditOutlineRoundedIcon />}
            label="Delete"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Competencia',
      headerName: 'Competencia',
      width: 100,
      editable: false,
      valueGetter: getCompetencia,
    },
    {
      field: 'dsLancamento',
      headerName: 'Descrição',
      width: 250,
      editable: false,
      // valueGetter: getFullName,
    },
    // {
    //   field: 'componenteCusto',
    //   headerName: 'Componente Custo',
    //   width: 250,
    //   editable: false,
    //   valueGetter: getComponeteCustos,
    // },
    {
      field: 'vlBalancete',
      headerName: 'Valor Balancete',
      width: 150,
      editable: false,
      type: 'number',
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    },
    {
      field: 'vlRedutor',
      headerName: 'Valor Redutor',
      width: 150,
      editable: false,
      type: 'number',
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    },
  ];

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleClose = async () => {
    setshowapagar(false);
    setShowEditar(false);
  };

  const handleConfirma = async (payload: cBalanceteSimples) => {
    const webApiUrl = '/balancete';
    const tokenStr = sessionUser.token;

    const json = await apiFuncoes.Gravar(webApiUrl, tokenStr, payload);
    if (json.error) {
      setMessagem({
        Mensagem: `error: ${json.error} -
      path:  ${json.path} -
      status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      CarregaTela();
      setshowapagar(false);
      setShowEditar(false);
      setMessagem({
        Mensagem: 'Gravado com sucesso',
        TipoMensagem: 'success',
      });
    }
  };

  const handleConfirmaApagar = async () => {
    const webApiUrl = `/balancete?id=${itemLinha}`;
    const tokenStr = sessionUser.token;

    const json = await apiFuncoes.Apagar(webApiUrl, tokenStr);
    if (json.error) {
      setMessagem({
        Mensagem: `error: ${json.error} -
      path:  ${json.path} -
      status:  ${json.status} `,
        TipoMensagem: 'danger',
      });
    } else {
      setMessagem({
        Mensagem: 'Gravado com sucesso',
        TipoMensagem: 'success',
      });
      CarregaTela();
      setshowapagar(false);
      setShowEditar(false);
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Title Mensagem="Cadastro de Balancete" TipoMensagem="primary" />
          </Col>
          <Col sm={3}>
            <Title
              Mensagem={`Balancente :${currencyFormatter.format(
                Number(vTotalBalancete.toString()),
              )}`}
              TipoMensagem="primary"
            />
          </Col>
          <Col sm={3}>
            <Title
              Mensagem={`Redutor :${currencyFormatter.format(
                Number(vTotalRedutor.toString()),
              )}`}
              TipoMensagem="primary"
            />
          </Col>
          <Col sm={2}>
            <Title
              Mensagem={`Operacional :${currencyFormatter.format(
                Number(vOperacional.toString()),
              )}`}
              TipoMensagem="primary"
            />
          </Col>
        </Row>

        <Row>
          <Col sm={11}>
            <BarraMeses
              onChangeComp={handleCompetencia}
              onChangeYear={handleSelecionaAno}
              vCompAtual={itemCompetencia}
            />
          </Col>

          <Col
            sm={1}
            className="d-flex align-items-center justify-content-center"
          >
            <Button onClick={() => handleEditClick(0)}>
              <AddBoxRoundedIcon />
            </Button>
          </Col>
        </Row>
        <div style={{ height: 400, width: '100%', margin: '5px 0px' }}>
          <DataGrid
            rows={LisBalancete}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            pagination
            disableSelectionOnClick
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

        <Alert severity="info" style={{ marginTop: 8 }}>
          <p>
            <code>Mês: {competencia}</code> {' - '}
            <code>
              Hospital: {sessionUser.DefaultHospital?.cnes}{' '}
              {sessionUser.DefaultHospital?.fantasia}
            </code>
            <p />
            <code>linha: {vConsole}</code>
          </p>
        </Alert>
      </Container>

      <EditarItem
        onConfirm={handleConfirma}
        onClose={handleClose}
        vItemBalancete={ItemBancete}
        show={showEditar}
      />

      <ConfirmaApagar
        onClose={handleClose}
        onConfirm={handleConfirmaApagar}
        mensagem="Deseja apagar esse item?"
        showApagar={showapagar}
      />
      <p />
    </div>
  );
};

export default Balancete;
