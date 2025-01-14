"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/livros", {
        titulo,
        autor,
        valor: Number(valor),
        descricao,
        urlImagem,
      });
      if (response.status === 201) {
        setLivros([...livros, response.data]);
        setTitulo("");
        setAutor("");
        setValor("");
        setDescricao("");
        setUrlImagem("");
      }
    } catch (error) {
      console.error("Erro ao adicionar o livro:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/livros?id=${id}`);
      if (response.status === 200) {
        setLivros(livros.filter((livro) => livro._id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Catálogo de Livros</h1>

      {/* Formulário de adição de livros */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Autor</label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input
            type="text"
            value={urlImagem}
            onChange={(e) => setUrlImagem(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Adicionar Livro
        </button>
      </form>

      {/* Lista de livros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {livros.map((livro) => (
          <div key={livro._id} className="border p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold">{livro.titulo}</h2>
            <button
              onClick={() => handleDelete(livro._id)}
              className="bg-red-500 text-white p-2 rounded mt-2"
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}