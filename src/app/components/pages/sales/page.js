import { useState, useEffect } from "react";
import axios from "axios";

export default function SalesPage() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get("/api/livros");  // Consumindo sua API interna
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
    <div className="flex justify-center items-center min-h-screen">
      <article className="p-4 max-w-6xl w-full">
        <h2 className="text-4xl font-bold mb-6 text-center">Catálogo de Livros</h2>
        <p className="text-gray-700 text-center mb-6 text-xl">
          Aqui você encontra livros de medicina e áreas da saúde em geral. Todos são usados, mas estão bem conservados, e nossos preços são acessíveis para garantir que você encontre o que precisa sem pesar no bolso!
        </p>
        <div className="grid grid-cols-1 gap-4 justify-center md:grid-cols-3">
          {livros.map((livro) => (
            <div key={livro._id} className="border border-gray-300 p-4 bg-gray-100 flex flex-col justify-between">
              <div>
                <img src={livro.url_imagem} alt={livro.titulo} className="w-full h-40 object-cover mb-4" />
                <h2 className="text-xl font-bold">{livro.titulo}</h2>
                <p className="text-gray-700">{livro.autor}</p>
                <p className="text-gray-600 mb-4">{livro.descricao}</p>
              </div>
              <div>
                <p className="text-green-600 font-bold">{formatPrice(livro.valor)}</p>
                <button onClick={() => handleWhatsAppClick(livro)} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
                  Cobrar pelo WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
