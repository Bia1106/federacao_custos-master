import React from 'react';
import { AuthContextProvider } from './auth';

const ContextsProvider: React.FC = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default ContextsProvider;
