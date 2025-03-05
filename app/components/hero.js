"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section 
      id="hero"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
      style={styles.container}
    >
      {/* Foto Profil */}
      <motion.img 
        src="/riz.jpg" 
        alt="Profile"
        style={styles.profilePic}
        whileHover={{ scale: 1.1 }}
      />

      {/* Teks Utama */}
      <motion.h1 style={styles.title}>
        Hello I'm <span style={styles.highlight}>Rizki Febriyan</span>. <br />
        I'm a <strong>full-stack developer</strong> <br />
        with <span style={styles.experience}>2 years</span> of experience. <br />
        I enjoy building <em>sites & apps.</em> <br />
        My focus is <a href="#" style={styles.link}>React (Next.js)</a>.
      </motion.h1>

      {/* Tombol Aksi */}
      <motion.div style={styles.buttons}>
        <motion.a 
          href="#contact" 
          style={{ ...styles.button, ...styles.primary }}
          whileHover={{ scale: 1.05 }}
        >
          Contact me here →
        </motion.a>
        
        <motion.a 
          href="/cv.pdf" 
          style={{ ...styles.button, ...styles.secondary }}
          download
          whileHover={{ scale: 1.05 }}
        >
          Download CV ↓
        </motion.a>
      </motion.div>
    </motion.section>
  );
}

// 🔹 CSS Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "120px 20px",
    background: "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
    color: "white",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  profilePic: {
    width: "150px", // 📌 Diperbesar dari 110px ke 150px
    height: "150px",
    borderRadius: "50%",
    border: "3px solid white",
    objectFit: "cover",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    maxWidth: "700px",
    lineHeight: "1.4",
    textAlign: "center",
  },
  highlight: { color: "#ffcc00" },
  experience: { color: "#00ffaa" },
  link: { color: "#42a5f5", textDecoration: "none", fontWeight: "bold" },
  buttons: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  button: {
    padding: "12px 22px",
    borderRadius: "12px",
    fontSize: "1rem",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s ease-in-out",
  },
  primary: {
    background: "#2563eb",
    color: "white",
  },
  secondary: {
    background: "#1f2937",
    color: "white",
  }
};
