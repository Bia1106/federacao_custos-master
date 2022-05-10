import React, { FormEvent, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { ImKey } from 'react-icons/im';
import { CgDanger } from 'react-icons/cg';
import { Helmet } from 'react-helmet';
import { useAuth } from 'src/contexts/auth';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

const Login: React.FC = () => {
  const { errorAuth, signIn } = useAuth();
  const history = useHistory();
  const [signInCredentials, setSignInCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await signIn(signInCredentials);
    history.push('/inicio');
  };

  return (
    <>
      <Helmet>
        <title>Login - Custos</title>
      </Helmet>
      <Container>
        <main className="container">
          <div className="d-flex flex-wrap logos-container mt-4 justify-content-end">
            <img
              className="img-fluid"
              src="/images/logo_federassantas1.png"
              alt="Logo Federassantas"
            />
            <img
              className="img-fluid"
              src="/images/logo_federassantas2.png"
              alt="Novo logo Federassantas"
            />
          </div>
          <div className="d-flex justify-content-center container-card">
            <div className="card">
              <div className="card-header p-3">
                <h3 className="m-0">Entrar</h3>
              </div>
              <div className="card-body">
                <form
                  className="d-flex flex-column justify-content-between h-100"
                  onSubmit={handleSubmit}
                >
                  <section className="d-flex flex-column">
                    <div className="input-group mb-4 mt-4">
                      <div className="input-group-prepend d-flex">
                        <span className="input-group-text d-flex justify-content-center">
                          <FaUserAlt color="white" />
                        </span>
                      </div>
                      <input
                        type="email"
                        name="username"
                        onChange={e =>
                          setSignInCredentials({
                            ...signInCredentials,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="E-mail"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend d-flex">
                        <span className="input-group-text d-flex justify-content-center">
                          <ImKey color="white" />
                        </span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        onChange={e =>
                          setSignInCredentials({
                            ...signInCredentials,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Senha"
                      />
                    </div>
                    {errorAuth && (
                      <div className="d-flex align-items-center">
                        <CgDanger
                          size={16}
                          color="DC3545"
                          className="form-text"
                        />
                        <span className="text-danger form-text ms-2">
                          {errorAuth}
                        </span>
                      </div>
                    )}
                  </section>

                  <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn float-right login-btn">
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </>
  );
};

export default Login;
