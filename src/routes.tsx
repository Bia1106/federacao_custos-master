/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Login from 'src/pages/Login';
import Criterio from 'src/pages/Criterio';
import CentroCusto from 'src/pages/CentroCusto';
import Hospitais from 'src/pages/Hospital';

import Home from 'src/pages/Home';

import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';
import HospitaisCentro from './pages/Hospital/IndexCentro';
import Usuario from './pages/Usuario';
import Navbar from './components/Navbar';
import PaginaTeste from './pages/Teste';
import Desembolso from './pages/Desembolso';
import Receita from './pages/Receita';
import Balancete from './pages/Balancete';
import Despesa from './pages/Despesa';
import RptReceitas from './pages/reports/RptReceitas';
import RptDespesas from './pages/reports/RptDespesas';
import RptResultadoMedioMensal from './pages/reports/RtpResultadoMedioMensal';
import RtpDinamicaDespesa from './pages/reports/RtpDinamicaDespesa';
import RtpDinamicaReceita from './pages/reports/RtpDinamicaReceita';

type PrivateRouteProps = {
  path: RouteProps['path'];
  exact: RouteProps['exact'];
  component: React.ElementType;
};

const Routes: React.FC = () => {
  const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
    component: Component,
    ...routeProps
  }) => {
    const cookies = new Cookies();
    const isSignedIn = cookies.get('_FC:TK');

    return (
      <Route
        {...routeProps}
        render={(props: RouteProps) =>
          isSignedIn ? (
            <>
              <Navbar />
              <Component {...props} />
            </>
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route component={Login} exact path="/" />
        <PrivateRoute component={Home} exact path="/inicio" />
        <PrivateRoute component={Criterio} exact path="/criterio" />
        <PrivateRoute component={CentroCusto} exact path="/centroCustos" />
        <PrivateRoute component={Hospitais} exact path="/hosptais" />
        <PrivateRoute
          component={HospitaisCentro}
          exact
          path="/hospitalCentro"
        />

        <PrivateRoute component={Usuario} exact path="/usuarios" />
        <PrivateRoute component={Desembolso} exact path="/desembolso" />
        <PrivateRoute component={PaginaTeste} exact path="/selectRecurso" />
        <PrivateRoute component={Receita} exact path="/receita" />
        <PrivateRoute component={Balancete} exact path="/balancete" />
        <PrivateRoute component={Despesa} exact path="/despesa" />
        <PrivateRoute component={RptReceitas} exact path="/reportReceita" />
        <PrivateRoute component={RptDespesas} exact path="/reportDespesa" />
        <PrivateRoute
          component={RptResultadoMedioMensal}
          exact
          path="/RptResultadoMedioMensal"
        />
        <PrivateRoute
          component={RtpDinamicaDespesa}
          exact
          path="/RtpDinamicaDespesa"
        />
        <PrivateRoute
          component={RtpDinamicaReceita}
          exact
          path="/RtpDinamicaReceita"
        />
      </Switch>
    </Router>
  );
};

export default Routes;
