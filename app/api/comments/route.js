import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Menggunakan UUID untuk ID yang unik

const filePath = path.join(process.cwd(), "db.json");

// Fungsi untuk membaca komentar dari database
async function readComments() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.comments || []; // Mengembalikan array komentar
  } catch (error) {
    console.error("Error reading comments:", error);
    return []; // Mengembalikan array kosong jika terjadi error
  }
}

// Fungsi untuk menulis komentar ke database
async function writeComments(comments) {
  try {
    const existingData = JSON.parse(await fs.readFile(filePath, "utf-8"));
    existingData.comments = comments; // Update bagian komentar
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
  } catch (error) {
    // Jika file tidak ada, buat file baru dengan data komentar
    await fs.writeFile(filePath, JSON.stringify({ comments }, null, 2));
  }
}

// ✅ Ambil semua komentar
export async function GET() {
  try {
    const comments = await readComments();
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Failed to get comments:", error);
    return new Response(JSON.stringify({ error: "Failed to read data" }), { status: 500 });
  }
}

// ✅ Tambah komentar baru
export async function POST(req) {
  try {
    const { name, message } = await req.json();

    // Validasi input
    if (!name || !message) {
      return new Response(
        JSON.stringify({ error: "Name and message are required" }),
        { status: 400 }
      );
    }

    const comments = await readComments();

    const newComment = {
      id: uuidv4(),  // Menggunakan UUID untuk ID unik
      name,
      message,
      timestamp: new Date().toISOString(),
    };

    comments.push(newComment);
    await writeComments(comments);

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("Error saving comment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save data" }),
      { status: 500 }
    );
  }
}

// ✅ Hapus komentar berdasarkan ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Validasi ID
    if (!id || typeof id !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid ID" }),
        { status: 400 }
      );
    }

    let comments = await readComments();
    const updatedComments = comments.filter((comment) => comment.id !== id);

    // Cek apakah komentar ditemukan dan dihapus
    if (updatedComments.length === comments.length) {
      return new Response(
        JSON.stringify({ error: "Comment not found" }),
        { status: 404 }
      );
    }

    await writeComments(updatedComments);

    return new Response(
      JSON.stringify({ message: "Deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete comment" }),
      { status: 500 }
    );
  }
}
