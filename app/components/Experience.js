"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const experiences = [
  { year: "2015", title: "Software Engineer", location: "Jakarta, Indonesia", description: "Worked on developing scalable web applications." },
  { year: "2017 - 2019", title: "IT Consultant", location: "Bandung, Indonesia", description: "Provided IT solutions for various clients in different industries." },
  { year: "2020", title: "Full-Stack Developer", location: "Yogyakarta, Indonesia", description: "Built full-stack applications using modern web technologies." },
  { year: "2021 - 2022", title: "UI/UX Designer", location: "Surabaya, Indonesia", description: "Designed and improved user interfaces for mobile and web applications." },
  { year: "2023 - Present", title: "Tech Lead", location: "Bali, Indonesia", description: "Leading a team of developers to build innovative software solutions." },
];

export default function Experience() {
  const { theme } = useTheme();
  const [lineHeight, setLineHeight] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("experience");
      const line = document.querySelector(".timeline-line");

      if (!section || !line) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(1, (windowHeight - rect.top) / rect.height);

      setLineHeight(`${scrollProgress * 100}%`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".timeline-item").forEach((item) => observer.observe(item));
  }, []);

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
      style={{
        ...styles.section,
        background: theme === "light"
          ? "radial-gradient(circle, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)"
          : "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
        color: theme === "light" ? "#1e293b" : "white",
      }}
    >
      <h2 style={styles.title}>My Experience</h2>

      <div style={styles.timeline}>
        <div
          className="timeline-line"
          style={{
            ...styles.timelineLine,
            background: theme === "light" ? "#4f46e5" : "#818cf8",
            transform: `scaleY(${parseFloat(lineHeight) / 100})`,
            transformOrigin: "top",
          }}
        ></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.2 } }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              ...styles.timelineItem,
              alignSelf: index % 2 === 0 ? "flex-end" : "flex-start",
            }}
          >
            <motion.div
              className="timeline-content"
              style={{
                ...styles.content,
                background: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.1)",
                color: theme === "light" ? "#1e293b" : "white",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: theme === "light"
                  ? "0px 10px 30px rgba(0, 0, 0, 0.2)"
                  : "0px 10px 30px rgba(255, 255, 255, 0.3)",
              }}
            >
              <h3 style={styles.itemTitle}>{exp.title}</h3>
              <strong style={styles.itemLocation}>{exp.location}</strong>
              <p style={styles.itemDesc}>{exp.description}</p>
              <span style={styles.itemDate}>{exp.year}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// 🔹 CSS Styles
const styles = {
  section: {
    textAlign: "center",
    padding: "120px 20px",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    transition: "background 0.3s, color 0.3s",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  timeline: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timelineLine: {
    position: "absolute",
    left: "50%",
    top: "0",
    width: "4px",
    height: "100%",
    transform: "scaleY(0)",
    transition: "transform 0.5s ease-in-out",
  },
  timelineItem: {
    position: "relative",
    width: "45%",
    marginBottom: "40px",
    padding: "20px",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 2,
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  },
  content: {
    padding: "20px",
    borderRadius: "8px",
    backdropFilter: "blur(12px)",
    width: "100%",
    textAlign: "center",
    transition: "all 0.3s ease",
    zIndex: 1,
  },
  itemTitle: { fontSize: "1.5rem", fontWeight: "bold" },
  itemLocation: { fontSize: "1.1rem", fontWeight: "bold" },
  itemDesc: { fontSize: "1rem" },
  itemDate: { fontSize: "0.9rem" },
};
