"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Contact() {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          });
        } else {
          controls.start({
            opacity: 0,
            y: 30,
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      style={styles.contactSection}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
    >
      <div style={styles.container}>
        <h2 style={styles.heading}>📩 Get In Touch</h2>
        <p style={styles.subText}>
          Feel free to reach out via email at{" "}
          <a href="mailto:rfebriyan99@gmail.com" style={styles.email}>
            rfebriyan99@gmail.com
          </a>{" "}
          or send a message below! 💬
        </p>

        <form style={styles.form}>
          <motion.input
            type="email"
            placeholder="Your Email"
            style={styles.input}
            whileFocus={{ scale: 1.05 }}
          />
          <motion.textarea
            placeholder="Your Message"
            style={styles.textarea}
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            type="submit"
            style={styles.submitButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message 🚀
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
}

// 🎨 **CSS (Sama dengan Skills Section)**
const styles = {
  contactSection: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 5px 20px rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.05)",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  subText: {
    fontSize: "1rem",
    color: "#bbb",
    marginBottom: "20px",
  },
  email: {
    color: "#ffcc00",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  input: {
    width: "80%",
    maxWidth: "400px",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid transparent",
    outline: "none",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    transition: "all 0.3s ease",
  },
  textarea: {
    width: "80%",
    maxWidth: "400px",
    height: "100px",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid transparent",
    outline: "none",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    resize: "none",
    transition: "all 0.3s ease",
  },
  submitButton: {
    background: "linear-gradient(45deg, #ffcc00, #ffdd44)",
    color: "black",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 10px rgba(255, 204, 0, 0.4)",
  },
};

// 💻 **Responsiveness**
styles["@media screen and (max-width: 768px)"] = {
  input: { width: "90%" },
  textarea: { width: "90%" },
};
