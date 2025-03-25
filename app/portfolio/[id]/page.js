"use client";
import { useParams } from "next/navigation";

const projects = [
  {
    title: "Creative Web Solutions",
    description: "Prototyping Website based on NextJS13 and TypeScript.",
    longDescription:
      "Creative Web Solutions adalah proyek inovatif yang berfokus pada pengembangan website modern dengan teknologi Next.js dan TypeScript. " +
      "Proyek ini dikembangkan untuk memberikan pengalaman pengguna yang responsif, cepat, dan scalable. " +
      "Fitur utama meliputi desain UI yang interaktif, sistem otentikasi pengguna, serta integrasi API untuk mengambil data secara real-time.",
    image: "/1.jpg",
    tags: ["NEXTJS", "TYPESCRIPT", "REACT"],
  },
  {
    title: "Smart Budget Manager",
    description: "Full-stack system used by students, lecturers, and staff.",
    longDescription:
      "Smart Budget Manager adalah sistem keuangan berbasis web yang membantu mahasiswa, dosen, dan staf dalam mengelola keuangan mereka secara efisien. " +
      "Aplikasi ini memungkinkan pengguna untuk mencatat pemasukan dan pengeluaran, mengkategorikan transaksi, serta membuat perencanaan anggaran yang lebih baik. " +
      "Dengan fitur analisis visual berbasis grafik, pengguna dapat memahami kebiasaan pengeluaran mereka dengan lebih mudah.",
    image: "/2.jpg",
    tags: ["REACT", "REACT NATIVE", "MONGODB"],
  },
  {
    title: "EduSphere Learning Platform",
    description: "A dashboard to analyze crypto trends and market movements.",
    longDescription:
      "EduSphere Learning Platform adalah platform edukasi berbasis web yang dirancang untuk mendukung pembelajaran daring. " +
      "Dengan fitur seperti kursus interaktif, kuis otomatis, dan sistem diskusi berbasis forum, pengguna dapat belajar dengan cara yang lebih fleksibel. " +
      "Platform ini juga menyediakan dasbor analitik untuk memantau perkembangan belajar pengguna secara real-time.",
    image: "/3.jpg",
    tags: ["PYTHON", "PANDAS", "DASH"],
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern UI/UX design.",
    longDescription:
      "Portfolio Website adalah proyek pengembangan website pribadi untuk menampilkan karya dan pengalaman seorang profesional. " +
      "Website ini menggunakan Next.js dan Tailwind CSS untuk memberikan tampilan yang modern dan responsif. " +
      "Dilengkapi dengan efek animasi menggunakan Framer Motion, serta fitur dark mode agar nyaman di berbagai kondisi pencahayaan.",
    image: "/4.jpg",
    tags: ["NEXTJS", "TAILWIND", "FRAMER-MOTION"],
  },
];

export default function PortfolioDetail() {
  const { id } = useParams();
  const project = projects[id] ?? null; // Cari berdasarkan index

  if (!project) {
    return <h1 style={styles.notFound}>🚫 Project Not Found</h1>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{project.title}</h1>
      <img src={project.image} alt="Project image" style={styles.image} />
      <p style={styles.description}>{project.description}</p>
      <p style={styles.longDescription}>{project.longDescription}</p>
      <div style={styles.tags}>
        {project.tags.map((tag, i) => (
          <span key={i} style={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    color: "white",
    backgroundColor: "#111827",
    minHeight: "100vh",
    maxWidth: "800px",
    margin: "auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  image: {
    width: "80%",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fbbf24",
  },
  longDescription: {
    fontSize: "1rem",
    marginTop: "10px",
    lineHeight: "1.6",
    textAlign: "justify",
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  tag: {
    background: "#374151",
    color: "white",
    padding: "5px 12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
  },
  notFound: {
    color: "white",
    textAlign: "center",
    marginTop: "50px",
  },
};
