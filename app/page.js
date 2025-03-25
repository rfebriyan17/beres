"use client";

import { useTheme } from "@/context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Rating from "@/components/rating";
import Chatbot from "@/components/Chatbot"; // Import Chatbot
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#111827",
        color: theme === "light" ? "#000000" : "#ffffff",
        minHeight: "100vh",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Rating />
      <div id="chatbot" style={{ marginTop: "50px" }}>
        <Chatbot />
      </div>
      <ThemeToggle />
    </div>
  );
}
