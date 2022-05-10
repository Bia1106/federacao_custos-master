/* eslint-disable jsx-a11y/iframe-has-title */

import React from 'react';
import { useAuth } from 'src/contexts/auth';
import { PainelPrincipal } from 'src/services/metabase';
import { ContainerAlt } from './styles';

const Home: React.FC = () => {
  const { sessionUser } = useAuth();
  return (
    <ContainerAlt>
      <iframe
        src={`${PainelPrincipal}?hospital=${sessionUser.DefaultHospital?.cnes}#hide_parameters=hospital`}
        frameBorder="0"
        width="100%"
        height="800"
        allowTransparency
        allowFullScreen
      />
    </ContainerAlt>
  );
};

export default Home;
