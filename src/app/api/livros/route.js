import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("livraria");
const collection = db.collection("livros");

export async function GET() {
  try {
    await client.connect();
    const livros = await collection.find({}).toArray();
    return NextResponse.json(livros, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(req) {
  try {
    await client.connect();
    const livro = await req.json();
    const result = await collection.insertOne(livro);
    if (result.acknowledged) {
      return NextResponse.json(result, { status: 201 });
    } else {
      throw new Error("Erro ao adicionar livro");
    }
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(req) {
  try {
    await client.connect();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID do livro não fornecido!" }, { status: 400 });
    }
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Livro deletado com sucesso" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}