import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('livraria');
const collection = db.collection('livros');

// Rota GET - Buscar todos os livros
export async function GET() {
  try {
    await client.connect();
    const livros = await collection.find({}).toArray();
    return NextResponse.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

// Rota POST - Adicionar um novo livro
export async function POST(req) {
  try {
    await client.connect();
    const livro = await req.json();

    // Validando os campos recebidos
    if (!livro.titulo || !livro.autor || !livro.descricao || !livro.url_imagem) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    const result = await collection.insertOne(livro);

    if (result.acknowledged) {
      return NextResponse.json(result, { status: 201 });
    }
    throw new Error('Erro ao adicionar livro');
  } catch (error) {
    console.error('Erro ao adicionar livro:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

// Rota DELETE - Deletar um livro
export async function DELETE(req) {
  try {
    await client.connect();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Livro deletado com sucesso' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
