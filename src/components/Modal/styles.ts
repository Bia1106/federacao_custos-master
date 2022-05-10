import styled from 'styled-components';

export const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 50;
  justify-content: center;
  align-itens: center;
`;

export const ModalArea = styled.div`
  background: #fff;
  position: fixed;
  padding: 30px;
  z-index: 10000;
  border-radius: 5px;
  box-shadow: 0, 0, 8px, #111;
  height: 90%;
  min-width: 1000px;
  max-height: calc(100vh - 210px);
  overflow-y: auto;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ddd = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
`;

export const ModalHeader = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
`;

export const ModalFooter = styled.div`
  background-color: #ccc;
  border-radius: 4px;
  padding: 10px;
`;
