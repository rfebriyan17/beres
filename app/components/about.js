"use client";
import { motion } from "framer-motion";

export default function About() {
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
      style={styles.container}
    >
      {/* Garis Penghubung */}
      <motion.div
        style={styles.connectorLine}
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

      {/* Konten dengan Efek Tulisaan Muncul */}
      <motion.p
        style={styles.text}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        I am a passionate and dedicated individual with a strong foundation in <strong>Information Systems</strong>,
        having completed my Master's degree in this field in 2017. After graduation, I chose to delve deeper into the world of 
        programming, where I discovered my enthusiasm for creating impactful and scalable applications. I embarked on my 
        journey as a <strong>full-stack web developer</strong> and have continued to grow in this field ever since.
      </motion.p>

      <motion.p
        style={styles.text}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        viewport={{ once: true }}
      >
        My expertise lies in working with <strong>React (Next.js)</strong> for front-end development and <strong>Node.js</strong> 
        for back-end services. I take pride in writing clean, maintainable, and efficient code, ensuring that every project I 
        work on is both functional and user-friendly. I am always learning and exploring new technologies to stay ahead of the curve.
      </motion.p>

      <motion.p
        style={styles.text}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        viewport={{ once: true }}
      >
        When I'm not coding, I enjoy <strong>farming, hiking, and camping</strong>, which provide me with a sense of balance 
        and inspiration. These outdoor activities offer me a chance to unwind and recharge, allowing me to return to coding with a fresh perspective and creative ideas. Whether it's hiking through nature trails or taking care of crops, these experiences help me stay grounded and motivated in my professional life.
      </motion.p>

      <motion.p
        style={styles.text}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        viewport={{ once: true }}
      >
        In addition to my technical skills, I am passionate about <strong>problem-solving</strong> and <strong>innovative thinking</strong>.
        I always seek opportunities to challenge myself, build new projects, and contribute to meaningful initiatives. My ultimate 
        goal is to build applications that solve real-world problems and provide value to users across different industries.
      </motion.p>

      <motion.p
        style={styles.text}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        viewport={{ once: true }}
      >
        As a lifelong learner, I continuously seek to improve my skills through various channels, such as online courses, coding challenges, and collaborations with other developers. This helps me keep my knowledge up to date and apply the latest best practices in all my projects.
      </motion.p>
    </motion.section>
  );
}

// 🔹 CSS Styles (Sama seperti Hero)
const styles = {
  container: {
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
    gap: "20px",
    position: "relative",
  },
  connectorLine: {
    width: "2px",
    background: "#ffffff",
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
    color: "#ccc",
    maxWidth: "700px",
    lineHeight: "1.6",
    margin: "10px auto",
  },
};
