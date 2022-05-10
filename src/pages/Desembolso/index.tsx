/* eslint-disable @typescript-eslint/no-explicit-any */
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
  GridValueGetterParams,
  ptBR,
  GridToolbar,
} from '@mui/x-data-grid';

import ConfirmaApagar from 'src/components/confirmaApagar/ConfirmaApagar';
import { cCompetencia } from 'src/types/Competencia';
import { cAno } from 'src/types/Ano';
import BarraMeses from 'src/components/Outros/barraMeses';
import EditarDesembolso from './editar';

const Desembolso: React.FC = () => {
  const { sessionUser } = useAuth();

  const [lisDesembolso, setLisDesembolso] = useState<cDesembolso[]>([]);

  const [itemDesembolso, setitemDesembolso] = useState<cDesembolso>();
  const [itemCompetencia, setitemCompetencia] = useState<cCompetencia>();
  const [messagem, setMessagem] = useState<cMensagem>();
  const [ItemAno, setItemAno] = useState<cAno>();
  const [itemLinha, SetItemLinha] = useState<string>('');
  const [competencia, SetCompetencia] = useState<string>();
  const [showapagar, setshowapagar] = useState<boolean>(false);
  const [showEditar, setShowEditar] = useState<boolean>(false);
  const [vTotal, SetvTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);

  useEffect(() => {
    CarregaTela();
  }, [itemCompetencia, ItemAno]);

  const handleCompetencia = (vComp: cCompetencia) => {
    if (vComp !== undefined) {
      setitemCompetencia(vComp);
      SetCompetencia(vComp.mesAno);
    }
  };
  const handleSelecionaAno = async (Ano: cAno) => {
    setItemAno(Ano);
  };

  const CarregaTela = async () => {
    setLisDesembolso([]);
    // setLoading(true);
    setMessagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });
    if (itemCompetencia !== undefined) {
      const webApiUrl = `/desembolso/byCompetencia?idCompetencia=${itemCompetencia?.id?.toString()}&idHospital=${
        sessionUser.DefaultHospital?.cnes
      }`;
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
        setLisDesembolso(json);

        // const vRedutor = 0;
        let vValor = 0;

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < json.length; i++) {
          vValor += json[i].valor;
          // vRedutor += json[i].vlReceita;
        }

        SetvTotal(vValor);
      }
    }
  };

  function getFullName(params: GridValueGetterParams) {
    return params.row.hospital.fantasia;
  }

  function getBanco(params: GridValueGetterParams) {
    return params.row.banco.nmBanco || '';
  }

  function getCompetencia(params: GridValueGetterParams) {
    return params.row.competencia.mesAno;
  }

  const handleDeleteClick = (id: any) => {
    SetItemLinha(id);
    setshowapagar(true);
  };

  const handleEditClick = (id: any) => {
    const ObjDesembolso: cDesembolso = {
      id: 0,
      competencia: itemCompetencia,
      hospital: sessionUser.DefaultHospital,
      banco: {
        id: 1,
        codBanco: '246',
        nmBanco: 'Banco ABC Brasil S.A.',
      },
      valor: 0.0,
    };

    const vresult = lisDesembolso.filter(vdesem => vdesem.id === id);
    setitemDesembolso(vresult[0] || ObjDesembolso);
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
      field: 'hospital.fantasia',
      headerName: 'Hospital',
      width: 250,
      editable: false,
      valueGetter: getFullName,
    },
    {
      field: 'Banco',
      headerName: 'Banco',
      width: 250,
      editable: false,
      valueGetter: getBanco,
    },
    {
      field: 'valor',
      headerName: 'Valor',
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

  const handleConfirma = async (payload: cDesembolso) => {
    const webApiUrl = '/desembolso';
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
      setMessagem({
        Mensagem: 'Gravado com sucesso',
        TipoMensagem: 'success',
      });
      CarregaTela();
      setshowapagar(false);
      setShowEditar(false);
    }
  };

  const handleConfirmaApagar = async () => {
    const webApiUrl = `/desembolso?idDesembolso=${itemLinha}`;
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
          <Col sm={8}>
            <Title Mensagem="Cadastro de Desembolso" TipoMensagem="primary" />
          </Col>
          <Col sm={4}>
            <Title
              Mensagem={`Valor Total :${currencyFormatter.format(
                Number(vTotal.toString()),
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
            rows={lisDesembolso}
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
            <code>Hospital: {sessionUser.DefaultHospital?.fantasia}</code>
            <p />
            <code>linha: {itemLinha}</code>
          </p>
        </Alert>
      </Container>

      <EditarDesembolso
        onConfirm={handleConfirma}
        onClose={handleClose}
        vItemDesembolso={itemDesembolso}
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

export default Desembolso;
