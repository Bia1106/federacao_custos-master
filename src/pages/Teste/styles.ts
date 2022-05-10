import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';

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

export const FormCuston = styled(Form)`
  Form.Check {
    width: 25px;
    height: 25px;
  }
`;

export const FormCheck = styled(Form.Check)`
  width: 25px;
  height: 25px;
`;
