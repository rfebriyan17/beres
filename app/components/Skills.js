"use client";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Pastikan path absolut
import { FaReact, FaNodeJs, FaCss3Alt, FaJs, FaPhp, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiRedux, SiMongodb, SiExpress, SiFramer, SiTailwindcss, SiMysql, SiChartdotjs, SiGamepad } from "react-icons/si";

const skills = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Git", icon: FaGitAlt },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redux", icon: SiRedux },
  { name: "Express", icon: SiExpress },
  { name: "Framer Motion", icon: SiFramer },
  { name: "PHP", icon: FaPhp },
  { name: "MySQL", icon: SiMysql },
  { name: "HTML & CSS", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "Chart.js", icon: SiChartdotjs },
  { name: "Gamification", icon: SiGamepad },
];

export default function Skills() {
  const themeContext = useContext(ThemeContext);

  // Cek apakah ThemeContext ada sebelum digunakan
  if (!themeContext) {
    console.error("ThemeContext is undefined. Make sure ThemeProvider wraps the app.");
    return null; // Menghindari error render
  }

  const { theme } = themeContext;
  const isDarkMode = theme === "dark";

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      viewport={{ once: false, amount: 0.1 }}
      style={{
        textAlign: "center",
        padding: "80px 20px",
        background: isDarkMode ? "#0f172a" : "#f8f9fa",
        color: isDarkMode ? "white" : "#333",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>My Skills</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "12px",
        maxWidth: "800px",
        margin: "auto",
      }}>
        {skills.map(({ name, icon: Icon }, index) => (
          <motion.div
            key={index}
            style={{
              background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "white" : "black",
              padding: "10px 18px",
              borderRadius: "10px",
              fontSize: "0.95rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
            viewport={{ once: false, amount: 0.1 }}
            whileHover={{
              scale: 1.1,
              boxShadow: isDarkMode ? "0px 4px 20px rgba(255, 255, 255, 0.3)" : "0px 4px 20px rgba(0, 0, 0, 0.3)",
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Pastikan Icon bukan undefined sebelum dirender */}
            {Icon && <Icon size={20} />}
            {name}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
