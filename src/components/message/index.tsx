/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';

interface IProps {
  Mensagem: string;
  TipoMensagem: string;
}

const Mensagem: FC<IProps> = props => {
  return (
    <div>
      <Alert variant={props.TipoMensagem}>{props.Mensagem}</Alert>
    </div>
  );
};

export default Mensagem;
