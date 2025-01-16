'use client';  // Adicione esta linha no topo do arquivo

import React, { createContext, useContext } from 'react';
import styled from 'styled-components';

const FooterContext = createContext();

const FooterContainer = styled.div`
    background-color: #034a4b;
    color: white;
    padding: 1rem 0;
    text-align: center;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; {new Date().getFullYear()} Vaz Comércio Books. Todos os direitos reservados.</p>
  </FooterContainer>
);

export default Footer;
