import React from 'react';
import Routes from 'src/routes';
import GlobalStyles from 'src/styles/GlobalStyles';
import ContextsProvider from './contexts';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <ContextsProvider>
      <Routes />
      <GlobalStyles />
    </ContextsProvider>
  );
};

export default App;
