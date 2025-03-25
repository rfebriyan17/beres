// pages/api/comments.js
import { connectToDatabase } from "../../lib/mongodb";

const commentsCollectionName = "comments";

// GET untuk mengambil komentar
const getComments = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const comments = await db.collection(commentsCollectionName).find({}).toArray();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

// POST untuk menambahkan komentar baru
const addComment = async (req, res) => {
  const { name, message, timestamp } = req.body;
  if (!name || !message) {
    return res.status(400).json({ message: "Name and message are required" });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection(commentsCollectionName).insertOne({
      name,
      message,
      timestamp,
    });

    res.status(201).json({
      id: result.insertedId,
      name,
      message,
      timestamp,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// DELETE untuk menghapus komentar
const deleteComment = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Comment ID is required" });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection(commentsCollectionName)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export default async (req, res) => {
  if (req.method === "GET") {
    return getComments(req, res);
  }
  if (req.method === "POST") {
    return addComment(req, res);
  }
  if (req.method === "DELETE") {
    return deleteComment(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
};
