"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const sections = ["home", "about", "projects", "skills", "experience", "contact", "rating", "chatbot"];
        let currentSection = "home";

        sections.forEach((section) => {
          const sectionElement = document.getElementById(section);
          if (sectionElement) {
            const rect = sectionElement.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
              currentSection = section;
            }
          }
        });

        if (window.scrollY < 50) {
          setTimeout(() => setActiveSection("home"), 100);
        } else {
          setActiveSection(currentSection);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        setActiveSection(section);
        setMenuOpen(false); // Menutup menu setelah klik
      }, 300);
    }
  };

  return (
    <>
      <nav className="navbar">
        {/* Toggle menu (Hanya muncul di mode mobile) */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          {["home", "about", "projects", "skills", "experience", "contact", "rating", "chatbot"].map((section) => (
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
        .navbar {
          position: fixed;
          top: 10px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          padding: 12px 20px;
          backdrop-filter: blur(10px);
          z-index: 1000;
          border-radius: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
        }

        .menu {
          list-style: none;
          display: flex;
          gap: 15px;
          margin: 0;
          padding: 0;
        }

        .menu button {
          background: none;
          border: none;
          color: white;
          font-weight: bold;
          font-size: 14px;
          padding: 12px 18px;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }

        .menu button.active {
          background: rgba(255, 255, 255, 0.4);
          color: white;
        }

        .menu button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Mobile Mode */
        @media (max-width: 768px) {
          .navbar {
            right: 10px;
          }

          .menu-toggle {
            font-size: 24px;
            cursor: pointer;
            color: white;
            background: none;
            border: none;
            z-index: 1100; /* Menjaga agar tetap di atas */
            position: relative;
          }

          .menu {
            position: absolute;
            top: 50px;
            right: 0;
            width: 220px;
            background: rgba(0, 0, 0, 0.95);
            border-radius: 10px;
            padding: 10px 0;
            display: none;
            flex-direction: column;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            z-index: 1001; /* Pastikan lebih tinggi dari navbar */
          }

          .menu.open {
            display: flex;
          }

          .menu li {
            text-align: center;
          }

          .menu button {
            width: 100%;
            padding: 12px;
            font-size: 16px;
          }
        }

        /* Sembunyikan tombol hamburger di mode desktop */
        @media (min-width: 769px) {
          .menu-toggle {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
