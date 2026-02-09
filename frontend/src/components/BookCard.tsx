import { useState } from "react";
import type { Book } from "../types/Book";
import { Link } from "react-router-dom";

export default function BookCard({ book, onDelete }: { book: Book; onDelete?: (id?: number) => void }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        className="cursor-pointer bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border-2 border-white/50 hover:border-[#BF124D]/50 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 transform group"
        onClick={() => setShowModal(true)}
      >
        <div className="mb-4">
          <div className="w-full h-32 bg-gradient-to-br from-[#BF124D]/20 to-[#5A0E24]/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-[#BF124D]/30 group-hover:to-[#5A0E24]/30 transition-all duration-300">
            <span className="text-5xl">📖</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#5A0E24] transition-colors duration-300 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-[#BF124D] mt-2 text-sm font-semibold">by {book.author}</p>
        </div>
        
        <p className="mt-3 text-gray-700 text-sm line-clamp-3 leading-relaxed">
          {book.description || "No description available."}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3" onClick={(e) => e.stopPropagation()}>
          <Link
            to={`/edit/${book.id}`}
            className="flex-1 text-center bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] text-white py-2.5 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            ✏️ Edit
          </Link>

          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              className="flex-1 text-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#5A0E24] via-[#6B1A2F] to-[#5A0E24] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#BF124D]/30 transform animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{book.title}</h2>
                <p className="text-[#BF124D] text-lg font-semibold italic">by {book.author}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/70 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 max-h-96 overflow-y-auto pr-2 text-white leading-relaxed text-base custom-scrollbar">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                {book.description || "No description available for this book."}
              </div>
            </div>

            <button
              className="w-full mt-6 bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] text-white py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
