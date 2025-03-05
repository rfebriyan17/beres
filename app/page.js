"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/Projects"; // Tambahkan import Projects
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
