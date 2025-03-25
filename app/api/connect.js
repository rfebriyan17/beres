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
  } catch (error) {
    console.error("❌ Gagal terhubung ke MongoDB:", error);
  } finally {
    await client.close();
  }
}

connectDB();
