import styled, { createGlobalStyle } from 'styled-components';
import { Button } from 'react-bootstrap';
import ReactInputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';

export default createGlobalStyle`
  :root{
    --color-primary: #024f52;
    --color-background-login: #059dd442; 
  }
  *{
    font-family: "Roboto", sans-serif;
  }
`;

export const BotaoNovo = styled(Button)`
  background-color: #fff;
  color: #dcd035;
  padding: 5px 8px;
  border: 1px solid #dcd035;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  :hover {
    background-color: #dcd035;
    color: #fff;
  }
`;

export const BotaoEditar = styled(Button)`
  background-color: #fff;
  color: #198754;
  padding: 5px 8px;
  border: 1px solid #198754;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  :hover {
    background-color: #198754;
    color: #fff;
  }
`;

export const BotaoInfo = styled(Button)`
  background-color: #fff;
  color: #192d87;
  padding: 5px 8px;
  border: 1px solid #192d87;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  :hover {
    background-color: #192d87;
    color: #fff;
  }
`;

export const BotaoApagar = styled(Button)`
  background-color: #fff;
  color: #ff0000;
  padding: 5px 8px;
  border: 1px solid #ff0000;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  :hover {
    background-color: #ff0000;
    color: #fff;
  }
`;

export const Table = styled.table`
  margin: 1px 1px;
  width: 100%;

  th {
    background-color: #007281;
    padding: 0px;
    color: #f1f1f1;
  }
  td {
    box-sizing: border-box;
    color: #3e3e3e;
    padding: 0px;
    justify-content: center;
    align-itens: center;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr {
    border: solid 1px #d8d8d8;
    background-color: #fff;
    transition: background-color 150ms ease-out;
    :hover {
      background-color: #ccc;
    }
  }
`;

export const CampoMascara = styled(ReactInputMask)`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 4px;
  height: 40px;
  margin: 0px 0px;
  text-align: right;
  padding: 10px;
  :focus {
    border-color: rgba(0, 123, 255, 0.25);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: 0 none;
`;

export const CampoNumeroFormat = styled(NumberFormat)`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 4px;
  height: 40px;
  margin: 0px 0px;
  text-align: right;
  padding: 10px;
  :focus {
    border-color: rgba(0, 123, 255, 0.25);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: 0 none;
`;
