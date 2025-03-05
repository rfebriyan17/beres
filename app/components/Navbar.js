"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "experience", "contact"];
      let currentSection = "home";

      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tambahkan CSS langsung ke halaman di dalam useEffect
  useEffect(() => {
    if (typeof document !== "undefined") {
      const styles = `
        .navbar {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          padding: 12px 24px;
          border-radius: 40px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }

        .navbar ul {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .navbar li {
          display: inline-block;
        }

        .navbar button {
          background: none;
          border: none;
          color: white;
          font-weight: bold;
          font-size: 16px;
          padding: 10px 15px;
          border-radius: 20px;
          transition: 0.3s ease-in-out;
          cursor: pointer;
        }

        .navbar button.active {
          background: #8a8d96;
          color: black;
        }

        .navbar button:hover {
          background: #555;
        }
      `;

      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }
  }, []);

  // Function buat smooth scroll pas klik navbar
  const scrollToSection = (section) => {
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Untuk scroll ke atas
    } else {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setActiveSection(section);
  };

  return (
    <nav className="navbar">
      <ul>
        {["home", "about", "projects", "skills", "experience", "contact"].map((section) => (
          <li key={section}>
            <button
              className={activeSection === section ? "active" : ""}
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
