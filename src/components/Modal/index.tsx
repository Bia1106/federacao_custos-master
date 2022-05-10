/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react';
import { ModalArea, ModalBackground } from './styles';

interface IProps {
  visible: boolean;
}

const Modal: FC<IProps> = props => {
  return (
    <>
      {props.visible && (
        <ModalBackground>
          <ModalArea>{props.children}</ModalArea>
        </ModalBackground>
      )}
    </>
  );
};

export default Modal;
