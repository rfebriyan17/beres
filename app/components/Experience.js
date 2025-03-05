"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const experiences = [
  { year: "2015", title: "Software Engineer", location: "Jakarta, Indonesia", description: "Worked on developing scalable web applications." },
  { year: "2017 - 2019", title: "IT Consultant", location: "Bandung, Indonesia", description: "Provided IT solutions for various clients in different industries." },
  { year: "2020", title: "Full-Stack Developer", location: "Yogyakarta, Indonesia", description: "Built full-stack applications using modern web technologies." },
  { year: "2021 - 2022", title: "UI/UX Designer", location: "Surabaya, Indonesia", description: "Designed and improved user interfaces for mobile and web applications." },
  { year: "2023 - Present", title: "Tech Lead", location: "Bali, Indonesia", description: "Leading a team of developers to build innovative software solutions." },
];

export default function Experience() {
  useEffect(() => {
    const handleScroll = () => {
      const line = document.querySelector(".timeline-line");
      const section = document.getElementById("experience");
      if (!line || !section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      const scrollProgress = Math.min(1, (windowHeight - rect.top) / sectionHeight);

      line.style.height = `${scrollProgress * 100}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section 
      id="experience"
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }} 
      viewport={{ once: false, amount: 0.1 }} 
      style={styles.section}
    >
      <h2 style={styles.title}>My Experience</h2>

      <div style={styles.timeline}>
        <div className="timeline-line" style={styles.timelineLine}></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.2 } }}
            viewport={{ once: false, amount: 0.3 }}
            style={{ ...styles.timelineItem, ...styles[index % 2 === 0 ? "left" : "right"] }}
          >
            <motion.div
              className="timeline-content"
              style={styles.content}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.15)" }}
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

const styles = {
  section: {
    padding: "80px 20px",
    background: "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
    color: "white",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
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
    height: "0%",
    background: "#4f46e5",
    transform: "translateX(-50%)",
    transition: "height 0.6s ease-out",
  },
  timelineItem: {
    position: "relative",
    width: "40%",
    marginBottom: "40px",
    padding: "20px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 2,
  },
  left: {
    textAlign: "right",
    marginRight: "55%",
  },
  right: {
    textAlign: "left",
    marginLeft: "55%",
  },
  content: {
    padding: "20px",
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    width: "100%",
    textAlign: "center",
    transition: "all 0.3s ease",
    zIndex: 1,
  },
  itemTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  itemLocation: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#ddd",
  },
  itemDesc: {
    fontSize: "1rem",
    color: "#bbb",
  },
  itemDate: {
    fontSize: "0.9rem",
    color: "#888",
  },
  "@media screen and (max-width: 768px)": {
    timelineItem: {
      width: "80%",
      marginLeft: "10%",
      textAlign: "center",
    },
    left: {
      marginLeft: "10%",
      marginRight: "10%",
    },
    right: {
      marginLeft: "10%",
      marginRight: "10%",
    },
  },
};
