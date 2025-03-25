"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const Chatbot = () => {
  const { theme } = useTheme(); // Ambil tema dari context
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply || "Maaf, saya tidak mengerti." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Terjadi kesalahan, coba lagi nanti." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        ...styles.container,
        background: theme === "light" ? "#ffffff" : "#1e293b",
        color: theme === "light" ? "#1e293b" : "white",
      }}
    >
      <h3 style={styles.title}>🤖 Chatbot</h3>
      <div style={{
        ...styles.chatBox,
        background: theme === "light" ? "#f9f9f9" : "#334155",
        borderColor: theme === "light" ? "#ddd" : "#475569",
      }}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              transition={{ duration: 0.3 }}
              style={msg.sender === "user" ? styles.userMessage : styles.botMessage}
            >
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
            </motion.p>
          ))}
        </AnimatePresence>
        {loading && <motion.p style={styles.loading}>Bot sedang mengetik...</motion.p>}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          style={{
            ...styles.input,
            background: theme === "light" ? "#fff" : "#1e293b",
            color: theme === "light" ? "#000" : "white",
            borderColor: theme === "light" ? "#ccc" : "#475569",
          }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage} 
          style={{
            ...styles.button,
            background: theme === "light" ? "#007bff" : "#1d4ed8",
          }}
        >
          Kirim
        </motion.button>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
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
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  chatBox: {
    maxWidth: "600px",
    maxHeight: "300px",
    overflowY: "auto",
    padding: "10px",
    borderRadius: "5px",
    width: "80%",
  },
  userMessage: {
    textAlign: "right",
    color: "#007bff",
    margin: "5px 0",
  },
  botMessage: {
    textAlign: "left",
    color: "#ffffff",
    margin: "5px 0",
  },
  loading: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
    width: "80%",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 15px",
    marginLeft: "5px",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Chatbot;
