"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Rating() {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("/api/rating")
      .then((res) => res.json())
      .then((data) => {
        setAverageRating(data.averageRating);
        setTotalVoters(data.totalVoters);
      });
  }, []);

  const handleSubmit = async () => {
    if (rating === 0) return;

    const res = await fetch("/api/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: rating }),
    });

    if (res.ok) {
      const data = await res.json();
      setAverageRating(data.averageRating);
      setTotalVoters(data.totalVoters);
      setSubmitted(true);

      // Reset submit state after 2 seconds
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <motion.section 
      id="rating"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
      style={{
        ...styles.container,
        background: theme === "light" 
          ? "radial-gradient(circle, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)"
          : "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(20,25,45,1) 50%, rgba(10,10,20,1) 100%)",
        color: theme === "light" ? "#1e293b" : "white",
      }}
    >
      <h2 style={styles.title}>⭐ Rate This Website</h2>
      <div style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.span
            key={star}
            onClick={() => setRating(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
              fontSize: "50px",
              transition: "color 0.3s ease",
            }}
            whileHover={{ scale: 1.2 }}
          >
            ★
          </motion.span>
        ))}
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={rating === 0 || submitted}
        whileTap={{ scale: 0.9 }}
        style={{
          ...styles.button,
          backgroundColor: rating === 0 || submitted ? "gray" : "#4CAF50",
          cursor: rating === 0 || submitted ? "not-allowed" : "pointer",
        }}
      >
        {submitted ? "Thank You! ✅" : "Submit Rating"}
      </motion.button>

      <p style={styles.ratingText}>
        Rating <strong>{averageRating.toFixed(1)}</strong> (from {totalVoters} voters)
      </p>
    </motion.section>
  );
}

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
    fontSize: "2.2rem",
    fontWeight: "bold",
    maxWidth: "700px",
    lineHeight: "1.4",
    textAlign: "center",
  },
  stars: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    fontSize: "50px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    marginTop: "20px",
    transition: "all 0.3s",
    color: "white",
  },
  ratingText: {
    fontSize: "1.5rem",
    marginTop: "10px",
  },
};
