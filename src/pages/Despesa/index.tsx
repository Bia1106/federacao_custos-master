/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import Title from 'src/components/Title';
import { useAuth } from 'src/contexts/auth';
import { cMensagem } from 'src/types/Mensagem';
import { Col, Container, Row } from 'react-bootstrap';
import { cDesembolso } from 'src/types/Desembolso';
import apiFuncoes from 'src/services/apiFuncoes';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEditRowsModel,
  GridToolbar,
  GridValueGetterParams,
  ptBR,
} from '@mui/x-data-grid';

import ConfirmaApagar from 'src/components/confirmaApagar/ConfirmaApagar';
import { cCompetencia } from 'src/types/Competencia';
import { cAno } from 'src/types/Ano';
import BarraMeses from 'src/components/Outros/barraMeses';
import {
  CDesepesaSimples,
  cDespesa,
  cDespesaCompleto,
} from 'src/types/Despesa';
import { api } from 'src/services/api';
import { cCentroHospital, cPaiFilhoSoma } from 'src/types/CentroCustoHospital';
import { ccHospitalCentroNovo } from 'src/Objetos/hospital';
import CentroCustoHospitalSelect from 'src/components/Selects/selectCentroCustoHospital';

// import EditarItem from './editar';

const Despesa: React.FC = () => {
  const { sessionUser } = useAuth();

  const [LisDespesa, setLisDespesa] = useState<cDespesa[]>([]);
  const [ItemDespesa, setItemDespesa] = useState<cDespesa>();
  const [itemCompetencia, setitemCompetencia] = useState<cCompetencia>();
  const [messagem, setMessagem] = useState<cMensagem>();
  const [vTotalDespesa, SetvTotalDespesa] = useState<number>(0);
  const [itemLinha, SetItemLinha] = useState<string>('');
  const [competencia, SetCompetencia] = useState<string>('1/2022');
  const [showapagar, setshowapagar] = useState<boolean>(false);
  const [showEditar, setShowEditar] = useState<boolean>(false);
  const [editVlReceita, setEditVlReceita] = useState<string>();
  const [PaiFilhoSoma, setPaiFilhoSoma] = useState<cPaiFilhoSoma[]>([]);
  const [pageSize, setPageSize] = useState<number>(20);

  const [vConsole, SetvConsole] = useState<string>('');

  const [ItemCentroCusto, setItemCentroCusto] = useState<cCentroHospital>();

  useEffect(() => {
    CarregaTela();
  }, [itemCompetencia, sessionUser.DefaultHospital, ItemCentroCusto]);

  const handleCompetencia = (vComp: cCompetencia) => {
    if (vComp !== undefined) {
      setitemCompetencia(vComp);
      const vcomp = `${vComp.mesAno}`;
      SetCompetencia(vcomp);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSelecionaAno = async (Ano: cAno) => {};

  const CarregaPaiFilho = async (json: any) => {
    const vJosnDespesa: cDespesaCompleto[] = json;
    const ObjOpcoes: cPaiFilhoSoma[] = [];
    let ItemFilho: number[] = [];
    vJosnDespesa.map(function (item) {
      if (item.editavel === false) {
        if (item.itemDespesa.subItem.length > 0) {
          ItemFilho = [];
          item.itemDespesa.subItem.map((itemSubItem: { id: number }) =>
            ItemFilho.push(itemSubItem.id),
          );
          ObjOpcoes.push({
            id: item.id,
            idItemDespesaPai: item.itemDespesa.id,
            idFilho: ItemFilho,
            Valor: 0,
          });
        }
      }
      return item;
    });

    SomaPaiFilho(ObjOpcoes, json);
  };

  const SomaPaiFilho = async (ObjPaiFilho: cPaiFilhoSoma[], json: any) => {
    ObjPaiFilho.map(function (item) {
      //  eslint-disable-next-line prefer-const
      let valor = 0;
      item.idFilho.map(function (itemSubItem) {
        const vresult = json.filter(
          (vItem: cDespesaCompleto) =>
            vItem.itemDespesa.id.toString() === itemSubItem.toString(),
        );
        if (vresult[0] !== undefined) {
          valor += vresult[0].valor;
        }
        return itemSubItem;
      });
      // eslint-disable-next-line no-param-reassign
      item.Valor = valor;
      return item;
    });

    setPaiFilhoSoma(ObjPaiFilho);
  };

  const CarregaTela = async () => {
    setLisDespesa([]);
    // setLoading(true);
    setMessagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    if (ItemCentroCusto !== undefined) {
      const webApiUrl = `/despesa?cnes=${
        sessionUser.DefaultHospital?.cnes
      }&idCompetencia=${itemCompetencia?.id?.toString()}&idCentro=${
        ItemCentroCusto.id
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
        setLisDespesa(json);
        CarregaPaiFilho(json);
        AtualizaValorTotal(json);
        console.log(json);
      }
    }
  };

  const AtualizaValorTotal = async (vdespesas: cDespesa[]) => {
    let total = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < vdespesas.length; i++) {
      total += parseFloat(vdespesas[i].valor.toString());
    }

    SetvTotalDespesa(total);
  };

  function getItemDespesaPai(params: GridValueGetterParams) {
    return params.row.itemDespesa.dsItemDespesa;
  }

  function getValorLinha(params: GridValueGetterParams) {
    // console.log(params.row);

    if (params.row.editavel === false) {
      const vresult = PaiFilhoSoma.filter(
        // vitem => console.log(params.row.id),
        vItem => vItem.id?.toString() === params.row.id.toString(),
      );
      if (vresult.length === 0) {
        return 0;
      }
      // console.log(vresult[0].Valor);
      return vresult[0].Valor;
    }

    return params.row.valor;
  }

  function getItemDespesa(params: GridValueGetterParams) {
    return params.row.itemDespesa.dsItemDespesa;
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

    const vresult = LisDespesa.filter(vdesem => vdesem.id === id);
    setItemDespesa(vresult[0]);
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
            icon={<DeleteRoundedIcon />}
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
      field: 'ItemDespesa',
      headerName: 'Item Despesa',
      width: 400,
      editable: false,
      valueGetter: getItemDespesa,
    },
    {
      field: 'valor',
      headerName: 'Valor',
      width: 200,
      editable: true,
      type: 'number',
      valueGetter: getValorLinha,
      // valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
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

  const handleConfirma = async (payload: CDesepesaSimples) => {
    const webApiUrl = '/despesa';
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
    const webApiUrl = `/despesa?id=${itemLinha}`;
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

  const handleEditRowsModelChange = React.useCallback(
    (model: GridEditRowsModel) => {
      const arr = Object.keys(model).map(item => {
        if (model[item].valor) {
          setEditVlReceita(model[item].valor.value?.toString() || '0');

          return model[item].valor.value;
        }

        return [];
      });
    },
    [],
  );

  const Atualiza = async (params: GridValueGetterParams) => {
    // const newDate = new Date().toLocaleString();
    const valor: string = editVlReceita || '0';
    const payloads: CDesepesaSimples[] = [];

    const payload: CDesepesaSimples = {
      id: params.row.id,
      cnes: sessionUser.DefaultHospital?.cnes || 0,
      idCentroCusto: params.row.centroCusto?.id,
      idCompetencia: params.row.competencia.id,
      itemDespesa: params.row.itemDespesa.id,
      valor: Number.parseFloat(valor),
    };
    /// console.log(payload);
    payloads.push(payload);
    handleAtualizar(payload);

    /*
        // após gravar o item > atualiza o agregador na tela
          copia a lista para uma nova variável 
          procura o item que deve ser atualizado 
          atualiza campo valor do item 
          Chama Funcão Pai-Filho para atualizar a tela 
        */
    const items: cDespesa[] = LisDespesa;
    const objIndex = LisDespesa.findIndex(obj => obj.id === params.row.id);
    items[objIndex].valor = Number.parseFloat(valor);
    AtualizaValorTotal(items);

    // Atualiza a soma de Pai/Filho
    SomaPaiFilho(PaiFilhoSoma, items);
    PaiFilhoSoma.map(function (itemSubItem) {
      const vpayload: CDesepesaSimples = {
        id: itemSubItem.id,
        cnes: sessionUser.DefaultHospital?.cnes || 0,
        idCentroCusto: params.row.centroCusto?.id,
        idCompetencia: params.row.competencia.id,
        itemDespesa: itemSubItem.idItemDespesaPai,
        valor: itemSubItem.Valor,
      };
      payloads.push(vpayload);
      handleAtualizar(vpayload);
      return itemSubItem;
    });

    // handleAtualizar(payloads);
    // await handleAtualizar(params.row);
  };

  // atualizar o critério
  const handleAtualizar = async (vpayloads: CDesepesaSimples) => {
    // setLoading(true);

    // recupera dados da requisição
    const webApiUrl = '/despesa';
    const tokenStr = sessionUser.token;

    // faz chamada assincrona na api e manda atualizar ou gravar o item
    await api
      .post(webApiUrl, vpayloads, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(result => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data } = result;

        /*
        // após gravar o item > atualiza o agregador na tela
          copia a lista para uma nova variável 
          procura o item que deve ser atualizado 
          atualiza campo valor do item 
          Chama Funcão Pai-Filho para atualizar a tela 
        */
        const items: cDespesa[] = LisDespesa;
        const objIndex = LisDespesa.findIndex(obj => obj.id === data.id);
        items[objIndex].valor = data.valor;
        CarregaPaiFilho(items);
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          // setLoading(true);
          setMessagem({
            Mensagem: `#erro ao salvar: código do erro ${error.response.status}`,
            TipoMensagem: 'danger',
          });
        }
      });
  };

  const handleTrocaCentroCusto = async (vItem: cCentroHospital) => {
    setItemCentroCusto(vItem || ccHospitalCentroNovo);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={8}>
            <Title Mensagem="Cadastro de Despesa" TipoMensagem="primary" />
          </Col>
          <Col sm={4}>
            <Title
              Mensagem={`Valor Total : ${vTotalDespesa.toString()}`}
              TipoMensagem="primary"
            />
          </Col>
        </Row>

        <CentroCustoHospitalSelect
          onChange={handleTrocaCentroCusto}
          onError={setMessagem}
          vValorAtual={ItemCentroCusto?.id.toString() || '0'}
        />

        <BarraMeses
          onChangeComp={handleCompetencia}
          onChangeYear={handleSelecionaAno}
          vCompAtual={itemCompetencia}
        />
        <div style={{ height: 300, width: '100%', margin: '5px 0px' }}>
          <DataGrid
            rows={LisDespesa}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            pagination
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            onCellEditStop={Atualiza}
            onEditRowsModelChange={handleEditRowsModelChange}
            // initialState={{ pinnedColumns: { right: ['#'] } }}
            isCellEditable={params => params.row.itemDespesa.editavel}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            // autoPageSize
            // autoHeight
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

export default Despesa;
