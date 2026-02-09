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
    <div className="min-h-screen bg-gradient-to-br from-[#67B2D8] via-[#5A9BC4] to-[#4A8AB0] p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              📚 My Library
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
              <p className="text-white text-lg font-semibold">Loading your books...</p>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-12 border border-white/30 shadow-xl">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-white mb-2">No books yet</h2>
              <p className="text-white/90 mb-6">Start building your library by adding your first book!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl transform animate-scaleIn border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Confirm Delete
              </h2>
            </div>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Are you sure you want to delete this book? This action cannot be undone and the book will be permanently removed from your library.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition-all duration-300 font-medium text-gray-700 shadow-md hover:shadow-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={handleDelete}
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
