"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Formulario = styled.form`
  display: grid;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const ListaLivros = styled.div`
  margin-top: 20px;
`;

const LivroItem = styled.div`
  margin-bottom: 10px;
`;

const Deletar = styled.button`
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  padding: 5px;
  width: 100px;
  color: white;
`;

export default function AdminPage() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');

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

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/livros", {
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
    <Container>
      <Formulario onSubmit={handleAdd}>
        <Input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Input
          type="text"
          placeholder="URL da Imagem"
          value={urlImagem}
          onChange={(e) => setUrlImagem(e.target.value)}
        />
        <Button type="submit">Adicionar Livro</Button>
      </Formulario>
      <ListaLivros>
        {livros.map((livro) => (
          <LivroItem key={livro._id}>
            <h3>{livro.titulo}</h3>
            <p>ID: {livro._id}</p> {/* Exibindo apenas o título e o ID */}
            <Deletar onClick={() => handleDelete(livro._id)}>Deletar</Deletar>
          </LivroItem>
        ))}
      </ListaLivros>
    </Container>
  );
}
