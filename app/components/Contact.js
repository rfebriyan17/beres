import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useContext(ThemeContext);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State loading untuk feedback

  // Mengambil komentar dari API ketika komponen dimuat
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/comments");
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        } else {
          throw new Error("Failed to fetch comments");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment = { name, message, timestamp: Date.now() };

    try {
      setLoading(true);
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (res.ok) {
        const data = await res.json();
        setComments([...comments, data]);
        setName("");
        setMessage("");
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/comments?id=${id}`, { method: "DELETE" });

      if (res.ok) {
        setComments(comments.filter((comment) => comment.id !== id));
      } else {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Penyesuaian warna sesuai tema (mode terang / gelap)
  const isDarkMode = theme === "dark";
  const backgroundColor = isDarkMode ? "#0f172a" : "#f9f9f9";
  const textColor = isDarkMode ? "#f1f5f9" : "#1e293b";
  const inputBg = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "white";
  const commentBg = isDarkMode ? "#1e293b" : "#e2e8f0";
  const borderColor = isDarkMode ? "#334155" : "#cbd5e1";

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      style={{
        textAlign: "center",
        padding: "120px 20px",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: backgroundColor,
        color: textColor,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: "20px" }}>📩 Leave a Comment</h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "450px",
          width: "100%",
          padding: "15px",
          background: commentBg,
          borderRadius: "10px",
          boxShadow: isDarkMode ? "0px 0px 10px rgba(255,255,255,0.1)" : "0px 0px 10px rgba(0,0,0,0.1)",
          border: `1px solid ${borderColor}`,
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: inputBg,
            color: textColor,
            border: `1px solid ${borderColor}`,
            fontSize: "16px",
          }}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="4"
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: inputBg,
            color: textColor,
            border: `1px solid ${borderColor}`,
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: "#ffcc00",
            fontWeight: "bold",
            color: "#1e293b",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </motion.form>

      <div style={{ maxWidth: "600px", width: "100%", marginTop: "20px" }}>
        <h3 style={{ marginBottom: "10px" }}>📝 Comments</h3>
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                background: commentBg,
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
                color: textColor,
                border: `1px solid ${borderColor}`,
                boxShadow: isDarkMode ? "0px 0px 8px rgba(255,255,255,0.1)" : "0px 0px 8px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{comment.name}</strong>
                <p style={{ margin: "5px 0" }}>{comment.message}</p>
                <small>{new Date(comment.timestamp).toLocaleString()}</small>
              </div>
              <button
                onClick={() => handleDelete(comment.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🗑
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
