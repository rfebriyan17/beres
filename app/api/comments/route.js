import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

// Fungsi untuk membaca komentar dari database
async function readComments() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.comments || []; // Pastikan mengembalikan array
  } catch (error) {
    return []; // Jika error, return array kosong
  }
}

// Fungsi untuk menulis komentar ke database
async function writeComments(comments) {
  try {
    const existingData = JSON.parse(await fs.readFile(filePath, "utf-8"));
    existingData.comments = comments; // Hanya update bagian komentar
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
  } catch (error) {
    await fs.writeFile(filePath, JSON.stringify({ comments }, null, 2)); // Buat baru jika tidak ada
  }
}

// ✅ Ambil semua komentar
export async function GET() {
  try {
    const comments = await readComments();
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to read data" }), { status: 500 });
  }
}

// ✅ Tambah komentar baru
export async function POST(req) {
  try {
    const { name, message } = await req.json();
    if (!name || !message) {
      return new Response(JSON.stringify({ error: "Name and message are required" }), { status: 400 });
    }

    const comments = await readComments();

    const newComment = {
      id: Date.now(),
      name,
      message,
      timestamp: new Date().toISOString(),
    };

    comments.push(newComment);
    await writeComments(comments);

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save data" }), { status: 500 });
  }
}

// ✅ Hapus komentar berdasarkan ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    let comments = await readComments();
    const updatedComments = comments.filter((comment) => comment.id !== id);

    if (updatedComments.length === comments.length) {
      return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
    }

    await writeComments(updatedComments);

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete comment" }), { status: 500 });
  }
}
