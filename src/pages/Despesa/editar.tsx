/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
// import { Button } from '@mui/material';
// import { Form, Modal } from 'react-bootstrap';
// import { cMensagem } from 'src/types/Mensagem';

// import { CampoMascara } from 'src/styles/GlobalStyles';
// import { cHospitais } from 'src/types/Hospitais';

// import { cCompetencia } from 'src/types/Competencia';
// import Msgtoast from 'src/components/message/toast';
// import { CDesepesaSimples, cDespesa } from 'src/types/Despesa';
// import { cItemDespesa } from 'src/types/ItemDespesa';
// import ItemDespesaSelect from 'src/components/Selects/SelectItemDespesa';

// interface IProps {
//   onConfirm: (vBalancete: CDesepesaSimples) => void;
//   onClose: () => void;
//   vItemBalancete: cDespesa | undefined;
//   // eslint-disable-next-line react/require-default-props
//   show?: boolean;
// }

// const EditarItem: FC<IProps> = props => {
//   const [messagem, setMessagem] = useState<cMensagem>();

//   const [itemDespesa, setitemDespesa] = useState<cItemDespesa>();
//   const [itemCompetencia, setItemCompetencia] = useState<cCompetencia>();
//   const [ItemValor, setItemValor] = useState<string>();

//   const [itemHospital, setItemHospital] = useState<cHospitais>();

//   useEffect(() => {
//     setitemDespesa(props.vItemBalancete?.itemDespesa);
//     setItemHospital(props.vItemBalancete?.hospital);
//     setItemCompetencia(props.vItemBalancete?.competencia);
//     setItemValor(
//       props.vItemBalancete?.valor?.toString().replace('.', ',') || '0,00',
//     );
//   }, [props]);

//   const handleClose = () => {
//     props.onClose();
//   };

//   const handleAtualizar = () => {
//     const vretorno: CDesepesaSimples = {
//       id: props.vItemBalancete?.id || 0,
//       cnes: itemHospital?.cnes || 0,
//       idCompetencia: itemCompetencia?.id || 0,
//       itemDespesa: itemDespesa?.id || 0,
//       valor: parseFloat(ItemValor || '0') || 0,
//     };

//     props.onConfirm(vretorno);
//   };

//   const handleChangeOptions = async (vItem: cItemDespesa) => {
//     setitemDespesa(vItem);
//   };

//   return (
//     <div>
//       <Msgtoast
//         Mensagem={messagem?.Mensagem}
//         TipoMensagem={messagem?.TipoMensagem}
//       />

//       <Modal
//         show={props.show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         aria-labelledby="example-modal-sizes-title-lg contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {props.vItemBalancete?.id === 0 ? 'Novo Item' : 'Editando Item'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Label>Código</Form.Label>
//             <Form.Control
//               type="text"
//               name="id"
//               readOnly
//               value={props.vItemBalancete?.id}
//               placeholder="Identificador"
//             />
//             <br />
//             <Form.Label>Componente</Form.Label>
//             <ItemDespesaSelect
//               onChange={handleChangeOptions}
//               onError={setMessagem}
//               vValorAtual={itemDespesa?.id?.toString() || '10'}
//             />
//             <br />
//             <Form.Label>Valor Balancete</Form.Label>

//             <CampoMascara
//               mask={[
//                 '(',
//                 /[1-9]/,
//                 /\d/,
//                 /\d/,
//                 ')',
//                 ' ',
//                 /\d/,
//                 /\d/,
//                 /\d/,
//                 '-',
//                 /\d/,
//                 /\d/,
//                 /\d/,
//               ]}
//               value={ItemValor}
//               name="Cep"
//               placeholder="Insira o valor"
//               onChange={e => setItemValor(e.target.value)}
//             />
//             <br />
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button onClick={handleClose}>Fechar</Button>

//           <Button onClick={handleAtualizar}>Salvar</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default EditarItem;
