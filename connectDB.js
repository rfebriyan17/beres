import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Memuat konfigurasi dari .env
dotenv.config();

const uri = process.env.MONGODB_URI;  // Menggunakan variabel dari .env
const client = new MongoClient(uri);

async function connectDB() {
  try {
    // Menghubungkan ke MongoDB
    await client.connect();
    console.log("✅ Berhasil terhubung ke MongoDB");

    // Buat atau pilih database
    const database = client.db("myDatabase");  // Ganti dengan nama database yang kamu inginkan
    
    // Buat atau pilih koleksi
    const collection = database.collection("comments");  // Ganti dengan nama koleksi yang kamu inginkan

    // Menambahkan komentar untuk menguji penyimpanan data
    const result = await collection.insertOne({
      name: "Rizki",
      message: "Hello, this is a test comment!",
      timestamp: new Date(),
    });

    console.log("Komentar disimpan dengan ID:", result.insertedId);
  } catch (error) {
    console.error("❌ Gagal terhubung ke MongoDB:", error);
  } finally {
    await client.close();
  }
}

connectDB();
