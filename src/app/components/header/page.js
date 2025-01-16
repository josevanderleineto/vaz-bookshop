"use client";

import React, { useState } from "react";
import { FaBars, FaTimes, FaWhatsapp, FaTelegram } from "react-icons/fa";

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
            <header className="bg-teal-800 text-white h-16 flex justify-between items-center fixed top-0 left-0 w-full z-50 px-5">
                <h1 className="text-xl m-0">Vaz Comércio Books</h1>
                <button
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    className="text-2xl cursor-pointer bg-none border-none text-white md:hidden"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
                <nav
                    className={`flex gap-5 md:flex ${menuOpen ? "fixed top-0 left-0 h-full w-64 bg-teal-800 flex-col items-center justify-start pt-20 p-5 transform translate-x-0 transition-transform duration-300 z-40" : "fixed top-0 left-0 h-full w-64 bg-teal-800 flex-col items-center justify-start pt-20 p-5 transform -translate-x-full transition-transform duration-300 z-40 md:relative md:translate-x-0 md:flex-row md:gap-5 md:p-0 md:h-auto md:w-auto"}`}
                >
                    <a href="#sobre" onClick={closeMenu} className="text-white no-underline text-lg hover:underline md:text-base md:m-0">
                        Sobre
                    </a>
                    <a href="#livros" onClick={closeMenu} className="text-white no-underline text-lg hover:underline md:text-base md:m-0">
                        Livros
                    </a>
                    <a href="#whatsapp" onClick={closeMenu} className="text-white no-underline text-lg hover:underline flex items-center gap-2 md:text-base md:m-0">
                        <span>Whatsapp</span> <FaWhatsapp size={24} />
                    </a>
                    <a href="#telegram" onClick={closeMenu} className="text-white no-underline text-lg hover:underline flex items-center gap-2 md:text-base md:m-0">
                        <span>Telegram</span> <FaTelegram size={24} />
                    </a>
                </nav>
            </header>
            {menuOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30" onClick={closeMenu}></div>}
        </>
    );
};

export default Header;
