/* eslint-disable react/destructuring-assignment */
import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { api } from 'src/services/api';
import { useAuth } from 'src/contexts/auth';
import { cHospitais } from 'src/types/Hospitais';
import { cMensagem } from 'src/types/Mensagem';
import Mensagem from 'src/components/message';

interface IProps {
  // eslint-disable-next-line react/no-unused-prop-types
  onConfirm: (itemHospital: cHospitais) => void;
  onClose: () => void;
  show: boolean;
}

const AddHospital: FC<IProps> = props => {
  const [lisHospitais, setlisHospitais] = useState<cHospitais[]>([]);
  const [hospital, sethospital] = useState<cHospitais>();
  const { sessionUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messagem, setMessagem] = useState<cMensagem>();

  const handleCarregarHospitais = async () => {
    setlisHospitais([]);
    setLoading(true);
    handleMensagem({ Mensagem: 'Carregando', TipoMensagem: 'info' });

    const webApiUrl = '/hospitais';
    const tokenStr = sessionUser.token;

    await api
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(result => {
        const { data } = result;

        setlisHospitais(data);
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error.response) {
          const jsonn = error.response.status;
          // json = error.response.status;
          handleMensagem({
            Mensagem: jsonn,
            TipoMensagem: 'danger',
          });
        }
      });
  };

  const handleMensagem = async (item: cMensagem) => {
    setMessagem(item);
  };

  useEffect(() => {
    handleCarregarHospitais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {
    props.onConfirm(
      hospital || {
        cnes: 0,
        cpfCnpj: 0,
        fantasia: '',
        nomeCidade: '',
        logradou: '',
        numEnd: '',
        compleme: '',
        bairro: '',
        codCep: 0,
        telefone: '',
        fax: '',
        leitosTotal: 0,
        leitosSus: 0,
      },
    );
  };

  const handleClose = () => {
    props.onClose();
  };

  const onChangeFunc = (optionSelected: string) => {
    const idprocurado = optionSelected.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = lisHospitais.filter(crit => crit.cnes === idNUmber);
    sethospital(result[0]);
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Selecione um Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {loading && (
              <Mensagem
                Mensagem={messagem?.Mensagem || ''}
                TipoMensagem={messagem?.TipoMensagem || ''}
              />
            )}

            <Form>
              <Form.Select
                aria-label="Selecione o hospital"
                onChange={e => onChangeFunc(e.target.value)}
              >
                <option value={-1}>Selecione um hospital</option>
                {lisHospitais.map(item => (
                  <option value={item.cnes}>{item.fantasia}</option>
                ))}
              </Form.Select>
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleAdd}>
            {' '}
            Adicionar
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            {' '}
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddHospital;
