'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get('/api/livros');
        setLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchLivros();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/livros', {
        titulo,
        autor,
        descricao,
        urlImagem,
      });
      if (response.status === 201) {
        setLivros([...livros, response.data]);
        setTitulo('');
        setAutor('');
        setDescricao('');
        setUrlImagem('');
      }
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
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
    <div className="max-w-2xl mx-auto p-5">
      <form className="grid gap-3" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          value={urlImagem}
          onChange={(e) => setUrlImagem(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Adicionar Livro
        </button>
      </form>
      <div className="mt-5">
        {livros.map((livro) => (
          <div key={livro._id} className="mb-3">
            <h3>{livro.titulo}</h3>
            <p>ID: {livro._id}</p>
            <button
              onClick={() => handleDelete(livro._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}