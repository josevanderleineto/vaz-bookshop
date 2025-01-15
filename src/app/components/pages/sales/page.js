'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Article = styled.article`
  padding: 1rem;
  max-width: 72rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Description = styled.p`
  color: #4a5568;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1rem;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Author = styled.p`
  color: #4a5568;
`;

const DescriptionText = styled.p`
  color: #718096;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  color: #38a169;
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #38a169;
  color: white;
  border-radius: 0.25rem;
`;

export default function SalesPage() {
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

  const formatPrice = (price) => {
    return `R$ ${(Number(price) || 0).toFixed(2)}`;
  };

  const handleWhatsAppClick = (livro) => {
    const message = `Olá, estou interessado no livro "${livro.titulo}" que custa ${formatPrice(livro.valor)}.`;
    const url = `https://wa.me/5571984498113?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Article>
        <Title>Catálogo de Livros</Title>
        <Description>Aqui você encontra livros de medicina e áreas da saúde em geral. Todos são usados, mas estão bem conservados, e nossos preços são acessíveis para garantir que você encontre o que precisa sem pesar no bolso!</Description>
        <Grid>
          {livros.map((livro) => (
            <Card key={livro._id}>
              <div>
                <Image src={livro.url_imagem} alt={livro.titulo} />
                <CardTitle>{livro.titulo}</CardTitle>
                <Author>{livro.autor}</Author>
                <DescriptionText>{livro.descricao}</DescriptionText>
              </div>
              <div>
                <Price>{formatPrice(livro.valor)}</Price>
                <Button onClick={() => handleWhatsAppClick(livro)}>Cobrar pelo WhatsApp</Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Article>
    </Container>
  );
}