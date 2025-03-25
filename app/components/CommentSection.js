import { useState, useEffect } from 'react';
import { db } from '../lib/firebase'; // Import firebase
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isDosenMode, setIsDosenMode] = useState(false); // Untuk mode dosen

  // Mendapatkan komentar dari Firestore
  const fetchComments = async () => {
    const querySnapshot = await getDocs(collection(db, 'comments'));
    const fetchedComments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(fetchedComments);
  };

  // Menambahkan komentar baru ke Firestore
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (newComment.trim() === '') return;

    try {
      await addDoc(collection(db, 'comments'), {
        comment: newComment,
        timestamp: serverTimestamp(),
        mode: isDosenMode ? 'Dosen' : 'User',
      });
      setNewComment(''); // Reset form
      fetchComments(); // Ambil komentar terbaru
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  // Mengubah mode (Dosen/User)
  const toggleMode = () => {
    setIsDosenMode(prevMode => !prevMode);
  };

  // Memuat komentar ketika komponen pertama kali dipasang
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <div>
        <button onClick={toggleMode}>
          {isDosenMode ? 'Switch to User Mode' : 'Switch to Dosen Mode'}
        </button>
      </div>
      <div>
        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar..."
          />
          <button type="submit">Kirim Komentar</button>
        </form>
      </div>
      <div>
        <h3>Daftar Komentar</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <strong>{comment.mode}</strong>:
              <p>{comment.comment}</p>
              <small>{comment.timestamp?.toDate()?.toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentSection;
