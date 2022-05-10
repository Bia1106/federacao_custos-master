import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { api } from 'src/services/api';
import { cUsuario } from 'src/types/Usuarios';
import { cSessionUser } from 'src/types/SessionUser';

interface ISignInCredentials {
  username: string;
  password: string;
}

type IAuthProps = {
  sessionUser: cSessionUser;
  errorAuth: string;
  signIn(credentials: ISignInCredentials): void;
  signOut(): void;
  trocarHospital(session: cSessionUser): void;
};

export const AuthContext = createContext<IAuthProps>({} as IAuthProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const cookies = new Cookies();
  const [sessionUser, setSessionUser] = useState<cSessionUser>(
    {} as cSessionUser,
  );
  const [errorAuth, setErrorAuth] = useState<string>('');

  async function signIn({ username, password }: ISignInCredentials) {
    const credentials = new FormData();
    credentials.append('grant_type', 'password');
    credentials.append('username', username);
    credentials.append('password', password);

    try {
      const responseToken = await api.post('/oauth/token', credentials, {
        auth: {
          username: process.env.REACT_APP_AUTH_ID as string,
          password: process.env.REACT_APP_AUTH_SEC as string,
        },
      });
      const { access_token } = responseToken.data;

      cookies.set('_FC:TK', access_token, { path: '/' });
      api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      const responseUser = await api.get<cUsuario>('/users/getByToken');

      const { data } = responseUser;

      setSessionUser({
        token: access_token,
        user: data,
        DefaultHospital: data.hospitalPrincipal,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data) {
        setErrorAuth('Usuario ou senha incorretos');
      } else {
        setErrorAuth('Ocorreu um erro inesperado');
      }
    }
  }

  function signOut() {
    cookies.remove('_FC:TK', { path: '/' });
    delete api.defaults.headers.common.Authorization;
  }

  async function trocarHospital(session: cSessionUser) {
    setSessionUser(session);
  }

  async function checkSessionUser() {
    if (cookies.get('_FC:TK')) {
      const token = cookies.get('_FC:TK');
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const responseUser = await api.get<cUsuario>('/users/getByToken');
      const { data } = responseUser;

      setSessionUser({ token, user: data });
    }
  }

  useEffect(() => {
    checkSessionUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ sessionUser, errorAuth, signIn, signOut, trocarHospital }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'To use a auth context is necessary wrapper AuthContextProvider in index or app !',
    );
  }
  return context;
}
