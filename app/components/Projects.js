"use client";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section id="projects" style={styles.section}>
      <h2 style={styles.title}>My Projects</h2>

      <div style={styles.projectList}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            style={styles.projectItem}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              style={styles.image}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 10px 30px rgba(0, 255, 255, 0.5)",
                rotate: 2,
                transition: { duration: 0.3 },
              }}
            />

            <motion.div
              style={styles.textContainer}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectText}>{project.description}</p>
              <div style={styles.projectTags}>
                {project.tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
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
    tags: ["NEXTJS", "TYPESCRIPT", "REACT"],
  },
  {
    title: "Smart Budget Manager",
    description: "Full-stack system used by students, lecturers, and staff.",
    image: "/2.jpg",
    tags: ["REACT", "REACT NATIVE", "MONGODB"],
  },
  {
    title: "EduSphere Learning Platform",
    description: "A dashboard to analyze crypto trends and market movements.",
    image: "/3.jpg",
    tags: ["PYTHON", "PANDAS", "DASH"],
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern UI/UX design.",
    image: "/4.jpg",
    tags: ["NEXTJS", "TAILWIND", "FRAMER-MOTION"],
  },
];

const styles = {
  section: {
    textAlign: "center",
    padding: "100px 20px",
    background: "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
    color: "white",
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
    gap: "100px",
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
    background: "#1e293b",
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
    color: "#ccc",
  },
  projectTags: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  tag: {
    background: "#374151",
    color: "white",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "0.9rem",
  },
};
