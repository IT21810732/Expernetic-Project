import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";
import { AuthContext } from "../context/AuthContext";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

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

  const handleDelete = async () => {
    if (!selectedBookId) return;

    try {
      await api.delete(`/books/${selectedBookId}`);
      setBooks((prev) => prev.filter((b) => b.id !== selectedBookId));
      setShowDeleteModal(false);
      setSelectedBookId(null);
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedBookId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-[#67B2D8]/80 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Books</h1>
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((b) => (
              <BookCard
                key={b.id}
                book={b}
                onDelete={() => openDeleteModal(b.id!)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800">
              Confirm Delete
            </h2>
            <p className="mt-3 text-gray-600">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
