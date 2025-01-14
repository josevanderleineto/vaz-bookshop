'use client';

import { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get("/api/livros");
        setLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchLivros();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Livros</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {livros.map((livro) => (
          <div key={livro._id} className="border p-4">
            <img src={livro.url_imagem} alt={livro.titulo} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-xl font-bold">{livro.titulo}</h2>
            <p className="text-gray-700">{livro.autor}</p>
            <p className="text-green-600 font-bold">
              R$ {(Number(livro.valor) || 0).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}