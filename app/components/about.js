"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext"; // 🔹 Import ThemeContext

export default function About() {
  const { theme } = useTheme(); // 🔹 Ambil tema dari context

  const textVariants = {
    hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0)",
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      }}
      viewport={{ once: true }}
      style={{
        ...styles.container,
        background: theme === "light"
          ? "radial-gradient(circle, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)"
          : "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
        color: theme === "light" ? "#1e293b" : "white",
      }}
    >
      {/* Garis Penghubung */}
      <motion.div
        style={{
          ...styles.connectorLine,
          background: theme === "light" ? "#1e293b" : "white",
        }}
        initial={{ height: 0 }}
        whileInView={{
          height: "80px",
          transition: { duration: 0.8, ease: "easeInOut" },
        }}
        viewport={{ once: true }}
      />

      {/* Judul */}
      <motion.h2
        style={styles.title}
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1, delay: 0.2 },
        }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      {/* Konten dengan Efek Teks Muncul */}
      {content.map((paragraph, index) => (
        <motion.p
          key={index}
          style={{
            ...styles.text,
            color: theme === "light" ? "#333" : "#ccc",
          }}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          whileInView={{ opacity: 1 }}
          transition={{ delay: (index + 1) * 1 }}
          viewport={{ once: true }}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.section>
  );
}

// 🔹 Data konten untuk paragraf
const content = [
  "I am a passionate and dedicated individual with a strong foundation in Information Systems, having completed my Master's degree in this field in 2017. After graduation, I chose to delve deeper into the world of programming, where I discovered my enthusiasm for creating impactful and scalable applications. I embarked on my journey as a full-stack web developer and have continued to grow in this field ever since.",
  "My expertise lies in working with React (Next.js) for front-end development and Node.js for back-end services. I take pride in writing clean, maintainable, and efficient code, ensuring that every project I work on is both functional and user-friendly. I am always learning and exploring new technologies to stay ahead of the curve.",
  "When I'm not coding, I enjoy farming, hiking, and camping, which provide me with a sense of balance and inspiration. These outdoor activities offer me a chance to unwind and recharge, allowing me to return to coding with a fresh perspective and creative ideas.",
  "In addition to my technical skills, I am passionate about problem-solving and innovative thinking. I always seek opportunities to challenge myself, build new projects, and contribute to meaningful initiatives.",
  "As a lifelong learner, I continuously seek to improve my skills through various channels, such as online courses, coding challenges, and collaborations with other developers. This helps me keep my knowledge up to date and apply the latest best practices in all my projects.",
];

// 🔹 CSS Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "100px 20px",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    position: "relative",
    transition: "background 0.3s, color 0.3s",
  },
  connectorLine: {
    width: "2px",
    position: "absolute",
    top: "-80px", // 🔹 Posisi di atas About, menghubungkan Hero & About
    height: "80px", // 🔹 Panjang garis
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    maxWidth: "700px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.2rem",
    maxWidth: "700px",
    lineHeight: "1.6",
    margin: "10px auto",
  },
};
