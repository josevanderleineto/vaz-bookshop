import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    background-color: #034a4b;
    color: white;
    padding: 1rem 0;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto; /* Centraliza o conteúdo e remove o espaço nas laterais */
    text-align: center;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <p>&copy; {new Date().getFullYear()} Vaz Comércio Books. Todos os direitos reservados.</p>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;
