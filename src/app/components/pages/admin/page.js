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
  gap: 20px;
  margin-bottom: 20px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ListaLivros = styled.div`
  margin-top: 20px;
`;

const LivroItem = styled.div`
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonExcluir = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const AdminPage = () => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Carregar a lista de livros ao carregar a página
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get('/api/livros');
        setLivros(response.data); // Atualiza a lista de livros
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    };

    fetchLivros();
  }, []); // Chama a função apenas uma vez quando a página carregar

  // Adicionar um novo livro
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/livros', {
        titulo,
        autor,
        descricao,
        url_imagem: urlImagem,
      });

      console.log('Resposta da API:', response.data);

      if (response.status === 201) {
        if (response.data.ops && response.data.ops[0]) {
          const addedLivro = response.data.ops[0];
          setMensagem(`Livro "${addedLivro.titulo}" adicionado com sucesso!`);

          // Atualiza a lista de livros com o novo livro
          setLivros((prevLivros) => [
            ...prevLivros,
            { _id: addedLivro._id, titulo: addedLivro.titulo },
          ]);

          // Limpar os campos
          setTitulo('');
          setAutor('');
          setDescricao('');
          setUrlImagem('');
        } else {
          setMensagem('Resposta da API não contém os dados esperados.');
        }
      }
    } catch (error) {
      setMensagem('Erro ao adicionar livro.');
      console.error('Erro ao adicionar livro:', error);
    }
  };

  // Excluir livro
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/livros?id=${id}`);
      if (response.status === 200) {
        setMensagem(`Livro com ID: ${id} deletado com sucesso!`);

        // Remover o livro da lista de livros
        setLivros(livros.filter((livro) => livro._id !== id));
      }
    } catch (error) {
      setMensagem('Erro ao deletar livro.');
      console.error('Erro ao deletar livro:', error);
    }
  };

  return (
    <Container>
      <h1>Adicionar Livro</h1>

      {/* Formulário para adicionar livro */}
      <Formulario onSubmit={handleAdd}>
        <div>
          <label>Título:</label>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <Input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL Imagem:</label>
          <Input
            type="text"
            value={urlImagem}
            onChange={(e) => setUrlImagem(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Adicionar Livro</Button>
      </Formulario>

      {/* Mensagem de status */}
      {mensagem && <p>{mensagem}</p>}

      {/* Lista de livros */}
      <h2>Livros Adicionados</h2>
      <ListaLivros>
        {livros.length > 0 ? (
          livros.map((livro) => (
            <LivroItem key={livro._id}>
              <div>
                {livro.titulo} (ID: {livro._id})
              </div>
              <ButtonExcluir onClick={() => handleDelete(livro._id)}>
                Excluir
              </ButtonExcluir>
            </LivroItem>
          ))
        ) : (
          <p>Nenhum livro adicionado ainda.</p>
        )}
      </ListaLivros>
    </Container>
  );
};

export default AdminPage;
// The AdminPage component is a React component that allows you to add new books to the database and delete existing books. It uses the useState and useEffect hooks to manage the component's state and fetch the list of books when the page loads.
