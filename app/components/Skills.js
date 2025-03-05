"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaCss3Alt, FaJs, FaPhp, FaGitAlt } from "react-icons/fa";
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
  return (
    <motion.section 
      id="skills" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      viewport={{ once: false, amount: 0.1 }}
      style={styles.container}
    >
      <h2 style={styles.title}>My Skills</h2>
      
      <div style={styles.skillsContainer}>
        {skills.map(({ name, icon: Icon }, index) => (
          <motion.div 
            key={index} 
            style={styles.skillBox} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
            viewport={{ once: false, amount: 0.1 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
          >
            <span style={styles.icon}>{Icon && <Icon />}</span>
            {name}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// 🔹 CSS Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    background: "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
    color: "white",
    width: "100vw",
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
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
    maxWidth: "800px",
    margin: "auto",
  },
  skillBox: {
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  icon: {
    fontSize: "1.2rem",
  }
};
