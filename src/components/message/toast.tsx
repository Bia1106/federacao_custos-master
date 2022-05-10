/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  Mensagem: string | undefined;
  // eslint-disable-next-line react/no-unused-prop-types
  TipoMensagem: string | undefined;
}

const Msgtoast: FC<IProps> = props => {
  const [tpmsg, settpmsg] = useState<any>(props.TipoMensagem || 'info');
  const [mensagem, setmensagem] = useState<any>(props.Mensagem || '');

  const notify = () =>
    toast(mensagem, {
      position: 'bottom-right',
      type: tpmsg,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    settpmsg(props.TipoMensagem || 'info');
    setmensagem(props.Mensagem || 'info');
  }, []);

  useEffect(() => {
    notify();
  }, [tpmsg]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Msgtoast;
