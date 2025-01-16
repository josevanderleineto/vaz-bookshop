'use client';  // Adicione esta linha no topo do arquivo

import React, { createContext, useContext } from 'react';

const FooterContext = createContext();

const Footer = () => (
  <div className="bg-teal-900 text-white py-4 text-center">
    <p>&copy; {new Date().getFullYear()} Vaz Comércio Books. Todos os direitos reservados.</p>
  </div>
);

export default Footer;
