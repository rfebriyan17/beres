import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Silakan ketik sesuatu untuk bertanya!" });
    }

    const lowerMessage = message.toLowerCase();

    // Respon umum
    const responses = {
      "halo": "Halo! Ada yang bisa saya bantu?",
      "hai": "Hai juga! 😊",
      "siapa kamu": "Saya adalah chatbot AI yang siap membantu Anda!",
      "apa kabar": "Saya baik, terima kasih! Bagaimana dengan Anda?",
      "terima kasih": "Sama-sama! Senang bisa membantu 😊",
      "kamu bisa apa": "Saya bisa menjawab pertanyaan, memberikan informasi, dan menghibur Anda!",
      "berapa 2+2": "Jawabannya adalah 4!",
      "berapa umur kamu": "Saya tidak memiliki umur, tetapi saya selalu belajar hal baru!",
      "sebutkan nama planet di tata surya": "Planet di tata surya adalah Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus.",
      "siapa penemu lampu": "Thomas Alva Edison dikenal sebagai penemu bola lampu yang pertama kali sukses secara komersial!",
      "siapa penemu internet": "Internet dikembangkan oleh banyak ilmuwan, tetapi ARPANET yang dibuat oleh Leonard Kleinrock adalah cikal bakalnya!",
      "apa hukum gravitasi": "Hukum gravitasi Newton menyatakan bahwa setiap benda dengan massa akan menarik benda lain dengan gaya yang sebanding dengan massanya dan berbanding terbalik dengan kuadrat jaraknya.",
      "siapa presiden pertama indonesia": "Presiden pertama Indonesia adalah Ir. Soekarno, yang menjabat dari tahun 1945 hingga 1967.",
      "apa ibu kota jepang": "Ibu kota Jepang adalah Tokyo!",
      "berapa kecepatan cahaya": "Kecepatan cahaya adalah sekitar 299.792.458 meter per detik!",
      "apa kepanjangan dari HTML": "HTML adalah singkatan dari HyperText Markup Language, bahasa yang digunakan untuk membuat halaman web!",
      "apa kepanjangan dari CPU": "CPU adalah singkatan dari Central Processing Unit, yang berfungsi sebagai otak komputer!",
      "apa fungsi RAM": "RAM (Random Access Memory) digunakan untuk menyimpan data sementara agar proses komputasi lebih cepat!",
      "bagaimana cara sukses": "Sukses datang dari kerja keras, konsistensi, belajar dari kegagalan, dan terus berkembang! 🚀",
      "motivasi hari ini": "Jangan pernah menyerah! Setiap langkah kecil tetap membawa Anda lebih dekat ke tujuan Anda! 💪",
    };

    
    if (responses[lowerMessage]) {
      return NextResponse.json({ reply: responses[lowerMessage] });
    }

   
    if (lowerMessage.includes("jam berapa")) {
      const now = new Date();
      const waktu = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      return NextResponse.json({ reply: `Sekarang pukul ${waktu}.` });
    }

    if (lowerMessage.includes("tanggal berapa")) {
      const now = new Date();
      const tanggal = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      return NextResponse.json({ reply: `Hari ini adalah ${tanggal}.` });
    }

    
    const funFacts = [
      "Tahukah Anda? Jantung paus biru bisa seberat mobil kecil!",
      "Fakta menarik: Madu tidak akan pernah basi, bahkan setelah ribuan tahun!",
      "Tahukah Anda? Otak manusia lebih aktif di malam hari dibandingkan siang hari.",
      "Fakta keren: Air bisa mendidih dan membeku pada saat yang sama dalam kondisi tertentu.",
      "Tahukah Anda? Seekor gurita memiliki tiga hati!",
      "Fakta menarik: Lebah bisa mengenali wajah manusia!",
      "Tahukah Anda? Astronot tidak bisa menangis di luar angkasa karena air mata tidak bisa mengalir tanpa gravitasi.",
      "Fakta keren: Gunung Everest bertambah tinggi setiap tahunnya karena pergerakan tektonik!",
    ];

    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

    return NextResponse.json({ reply: `Maaf, saya tidak mengerti. Tapi tahukah Anda? ${randomFact}` });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses permintaan." }, { status: 500 });
  }
}
