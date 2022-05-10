/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Modal, Nav, Navbar as NavComp } from 'react-bootstrap';
import { useAuth } from 'src/contexts/auth';
import { cHospitais } from 'src/types/Hospitais';
import { hospitalNovo } from 'src/Objetos/hospital';
import { cSessionUser } from 'src/types/SessionUser';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { Container } from './styles';

const Navbar: React.FC = () => {
  const { sessionUser, signOut, trocarHospital } = useAuth();
  const history = useHistory();
  const { user } = sessionUser;
  const [lisHospitais, setlisHospitais] = useState<cHospitais[]>([]);
  const [hospDefault, sethospDefault] = useState('teste');
  const [ItemhospDefault, setItemhospDefault] = useState<cHospitais>();

  const [mostrarPopup, setmostrarPopup] = useState(false);

  const handleClose = () => {
    setmostrarPopup(false);
  };

  const handleTrocaHospital = () => {
    setmostrarPopup(true);
  };

  function handleLogOut() {
    signOut();
    history.push('/');
  }

  useEffect(() => {
    setlisHospitais(sessionUser.user.hospitais || [hospitalNovo]);
    sethospDefault(sessionUser.DefaultHospital?.cnes.toString() || '0');
    setItemhospDefault(sessionUser.DefaultHospital || hospitalNovo);
    // handleCarregarHospitais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFunc = (optionSelected: string) => {
    const idprocurado = optionSelected.toString();
    const idNUmber = parseInt(idprocurado, 10);
    const result = lisHospitais.filter(crit => crit.cnes === idNUmber);
    sethospDefault(result[0].cnes.toString());
    setItemhospDefault(result[0] || hospitalNovo);

    const vNovaSessao: cSessionUser = {
      token: sessionUser.token,
      user: sessionUser.user,
      DefaultHospital: result[0],
    };

    trocarHospital(vNovaSessao);
  };

  return (
    <Container className="navbar ps-3 pe-3" expand="lg">
      <Link className="navbar-brand mb-0 p-0 logo-container" to="/inicio">
        <img src="/images/logo_federassantas1.png" alt="Logo Federassantas" />
      </Link>
      <NavComp.Toggle aria-controls="basic-navbar-nav" />

      <NavComp.Collapse
        className="collapse navbar-collapse"
        id="basic-navbar-nav"
      >
        <Nav className="navbar-nav me-auto text-center mb-2 mb-lg-0">
          <li className="nav-item ">
            <Link to="/inicio" className="nav-link active p-3 nav-btn">
              DASHBOARD
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/hospitalCentro" className="nav-link p-3 nav-btn">
              CENTRO
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link p-3 nav-btn nav-btn-dropdown">
              RECEITA
            </span>
            <div className="nav-dropdown">
              <Link to="/receita" className="p-2 btn-dropdown">
                CADASTRAR RECEITA
              </Link>

              <Link to="/" className="p-2 btn-dropdown">
                IMPORTAR RECEITA
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <span className="nav-link p-3 nav-btn">DESPESA</span>
            <div className="nav-dropdown">
              <Link to="/despesa" className="p-2 btn-dropdown">
                CADASTRAR DESPESA
              </Link>

              <Link to="/balancete" className="p-2 btn-dropdown">
                CADASTRAR BALANCETE
              </Link>

              <Link to="/desembolso" className="p-2 btn-dropdown">
                CADASTRAR DESEMBOLSO
              </Link>

              <Link to="/inicio" className="p-2 btn-dropdown">
                IMPORTAR DESPESA
              </Link>

              <Link to="/inicio" className="p-2 btn-dropdown">
                IMPORTAR BALANCETE
              </Link>

              <Link to="/inicio" className="p-2 btn-dropdown">
                IMPORTAR DESEMBOLSO
              </Link>

              <Link to="/inicio" className="p-2 btn-dropdown">
                IMPORTAR PROCEDIMENTOS
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <span className="nav-link p-3 nav-btn">RELATÓRIO</span>
            <div className="nav-dropdown">
              <Link to="/reportReceita" className="p-2 btn-dropdown">
                Receitas
              </Link>

              <Link to="/reportDespesa" className="p-2 btn-dropdown">
                Despesas
              </Link>
              <Link to="/RptResultadoMedioMensal" className="p-2 btn-dropdown">
                Resultado Médio Mensal
              </Link>
              <Link to="/RtpDinamicaDespesa" className="p-2 btn-dropdown">
                Dinâmica Despesa
              </Link>
              <Link to="/RtpDinamicaReceita" className="p-2 btn-dropdown">
                Dinâmica Receita
              </Link>
            </div>
          </li>

          <li className="nav-item">
            <span className="nav-link p-3 nav-btn">ADMIN</span>
            <div className="nav-dropdown">
              <Link to="/usuarios" className="p-2 btn-dropdown">
                USUÁRIO
              </Link>
              <Link to="/centroCustos" className="p-2 btn-dropdown">
                CENTRO DE CUSTOS
              </Link>
              <Link to="/hosptais" className="p-2 btn-dropdown">
                HOSPITAL
              </Link>
              <Link to="/criterio" className="p-2 btn-dropdown">
                CRITERIO
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <span
              onClick={() => handleLogOut()}
              className="nav-link p-3 nav-btn"
              role="button"
            >
              SAIR
            </span>
          </li>
        </Nav>
        <div className="user-container">
          <p className="m-0 info-user">
            {user?.fullName} ({user?.username})
          </p>
          <p>
            <Button
              variant="secondary"
              style={{ fontSize: 9 }}
              onClick={handleTrocaHospital}
            >
              <PublishedWithChangesIcon />
              {`- ${ItemhospDefault?.cnes.toString()} - ${
                ItemhospDefault?.fantasia
              }`}
            </Button>
          </p>
          <p className="m-0 info-user" />
        </div>
      </NavComp.Collapse>

      <Modal
        show={mostrarPopup}
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
          <Form>
            <Form.Select
              aria-label="Selecione o hospital"
              value={hospDefault}
              onChange={e => onChangeFunc(e.target.value)}
            >
              {lisHospitais.map(item => (
                <option value={item.cnes}>{item.fantasia}</option>
              ))}
            </Form.Select>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            {' '}
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Navbar;
