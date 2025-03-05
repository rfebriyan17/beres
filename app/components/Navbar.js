"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const sections = ["home", "about", "projects", "skills", "experience", "contact"];
        let currentSection = "home";

        sections.forEach((section) => {
          const sectionElement = document.getElementById(section);
          if (sectionElement) {
            const rect = sectionElement.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.25 && rect.bottom >= window.innerHeight * 0.25) {
              currentSection = section;
            }
          }
        });

        setActiveSection(currentSection);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    const sectionElement = document.getElementById(section);
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionElement) {
      const sectionTop = sectionElement.offsetTop - navbarHeight - 10;
      window.scrollTo({
        top: Math.max(0, sectionTop),
        behavior: "smooth",
      });
    }

    setActiveSection(section);
  };

  return (
    <>
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

      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .navbar {
          position: fixed;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: max-content;
          max-width: 100vw;
          background: rgba(0, 0, 0, 0.9);
          padding: 12px 20px;
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .navbar ul {
          list-style: none;
          display: flex;
          gap: 15px;
          margin: 0;
          padding: 0;
        }

        .navbar button {
          background: none;
          border: none;
          color: white;
          font-weight: bold;
          font-size: 14px;
          padding: 8px 15px;
          border-radius: 15px;
          cursor: pointer;
          transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
        }

        .navbar button.active {
          background: rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 15px;
          border-radius: 15px;
        }

        .navbar button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .navbar {
            width: 90%;
            padding: 10px;
          }

          .navbar ul {
            flex-wrap: wrap;
          }

          .navbar button {
            font-size: 12px;
            padding: 6px 10px;
          }
        }
      `}</style>
    </>
  );
}
