"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext"; // Import ThemeContext

export default function Projects() {
  const router = useRouter();
  const { theme } = useTheme(); // Gunakan theme dari context

  return (
    <section
      id="projects"
      style={{
        ...styles.section,
        background:
          theme === "light"
            ? "radial-gradient(circle, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)"
            : "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
        color: theme === "light" ? "#1e293b" : "white",
      }}
    >
      <h2 style={styles.title}>My Projects</h2>
      <div style={styles.projectList}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            style={{
              ...styles.projectItem,
              background: theme === "light" ? "#e2e8f0" : "#1e293b",
              color: theme === "light" ? "#333" : "white",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: theme === "light"
                ? "0px 8px 20px rgba(0, 0, 0, 0.2)"
                : "0px 8px 20px rgba(0, 255, 255, 0.4)",
              transition: { duration: 0.3 },
              cursor: "pointer",
            }}
            onClick={() => router.push(`/portfolio/${index}`)}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              style={styles.image}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            />
            <div style={styles.textContainer}>
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectText}>{project.description}</p>
              <p style={styles.clickHint}>(Click for more details)</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    title: "Creative Web Solutions",
    description: "Prototyping Website based on NextJS13 and TypeScript.",
    image: "/1.jpg",
  },
  {
    title: "Smart Budget Manager",
    description: "Full-stack system used by students, lecturers, and staff.",
    image: "/2.jpg",
  },
  {
    title: "EduSphere Learning Platform",
    description: "A dashboard to analyze crypto trends and market movements.",
    image: "/3.jpg",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern UI/UX design.",
    image: "/4.jpg",
  },
];

const styles = {
  section: {
    textAlign: "center",
    padding: "100px 20px",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "50px",
  },
  projectList: {
    display: "flex",
    flexDirection: "column",
    gap: "60px",
    width: "80%",
    maxWidth: "900px",
  },
  projectItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "20px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out",
  },
  image: {
    width: "90%",
    borderRadius: "10px",
  },
  textContainer: {
    width: "80%",
  },
  projectTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  projectText: {
    fontSize: "1rem",
  },
  clickHint: {
    fontSize: "0.9rem",
    marginTop: "5px",
  },
};
