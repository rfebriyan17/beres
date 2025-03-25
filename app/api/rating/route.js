import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Path ke database file JSON
const dbPath = path.join(process.cwd(), "db.json");

// Fungsi untuk membaca database
async function readDatabase() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // Jika file tidak ada atau error, return data default
    return { averageRating: 0, totalVoters: 0 };
  }
}

// Fungsi untuk menyimpan database
async function saveDatabase(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}

// ✅ **GET: Ambil data rating**
export async function GET() {
  try {
    const db = await readDatabase();
    return NextResponse.json({
      averageRating: db.averageRating || 0,
      totalVoters: db.totalVoters || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
}

// ✅ **POST: Simpan rating baru**
export async function POST(req) {
  try {
    const { value } = await req.json();

    // Cek apakah rating valid (1-5)
    if (typeof value !== "number" || value < 1 || value > 5) {
      return NextResponse.json({ error: "Invalid rating value" }, { status: 400 });
    }

    const db = await readDatabase();

    // Hitung rating baru
    const newTotalVoters = db.totalVoters + 1;
    const newAverageRating = (db.averageRating * db.totalVoters + value) / newTotalVoters;

    // Simpan ke database
    await saveDatabase({ averageRating: newAverageRating, totalVoters: newTotalVoters });

    return NextResponse.json({
      averageRating: newAverageRating,
      totalVoters: newTotalVoters,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save rating" }, { status: 500 });
  }
}
