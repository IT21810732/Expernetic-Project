import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id?: number) => {
    if (!confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Books</h1>
        {token ? (
          <Link className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition" to="/create">
            Add Book
          </Link>
        ) : (
          <Link className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition" to="/login">
            Login to add
          </Link>
        )}
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((b) => (
            <BookCard key={b.id} book={b} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
