"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes, FaWhatsapp, FaTelegram } from "react-icons/fa";

const HeaderContainer = styled.header`
    background-color: #034a4b;
    color: white;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 0 20px;
`;

const Logo = styled.h1`
    font-size: 1.5rem;
    margin: 0;
`;

const MenuIcon = styled.button`
    font-size: 2rem;
    cursor: pointer;
    background: none;
    border: none;
    color: white;

    @media (max-width: 768px) {
        display: block;
    }
    @media (min-width: 769px) {
        display: none;
    }
`;

const NavMenu = styled.nav`
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 250px;
        background-color: #034a4b;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
        transition: transform 0.3s ease-in-out;
        z-index: 999;
    }
`;

const NavItem = styled.a`
    color: white;
    text-decoration: none;
    font-size: 1.2rem;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin: 10px 0;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Overlay = styled.div`
    display: ${({ open }) => (open ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
`;

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <HeaderContainer>
                <Logo>Vaz Comércio Books</Logo>
                <MenuIcon
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </MenuIcon>
                <NavMenu open={menuOpen}>
                    <NavItem href="#sobre" onClick={closeMenu}>
                        Sobre
                    </NavItem>
                    <NavItem href="#livros" onClick={closeMenu}>
                        Livros
                    </NavItem>
                    <NavItem href="#whatsapp" onClick={closeMenu}>
                        <IconWrapper>
                            Whatsapp <FaWhatsapp size={24} />
                        </IconWrapper>
                    </NavItem>
                    <NavItem href="#telegram" onClick={closeMenu}>
                        <IconWrapper>
                            Telegram <FaTelegram size={24} />
                        </IconWrapper>
                    </NavItem>
                </NavMenu>
            </HeaderContainer>
            <Overlay open={menuOpen} onClick={closeMenu} />
        </>
    );
};

export default Header;
