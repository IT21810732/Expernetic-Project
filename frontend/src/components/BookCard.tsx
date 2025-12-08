import { useState } from "react";
import type { Book } from "../types/Book";
import { Link } from "react-router-dom";

export default function BookCard({ book, onDelete }: { book: Book; onDelete?: (id?: number) => void }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        className="cursor-pointer bg-white/40 backdrop-blur-sm shadow-md rounded-xl p-5 border border-[#76153C] hover:shadow-lg hover:scale-[1.02] transition"
        onClick={() => setShowModal(true)}
      >
        <h3 className="text-xl font-semibold text-black">{book.title}</h3>
        <p className="text-[#BF124D] mt-1 text-sm">by {book.author}</p>
        <p className="mt-3 text-black text-sm line-clamp-3">{book.description}</p>

        {/* Buttons */}
        <div className="mt-5 flex gap-3" onClick={(e) => e.stopPropagation()}>
          <Link
            to={`/edit/${book.id}`}
            className="flex-1 text-center bg-[#BF124D] hover:bg-[#76153C] text-white py-2 rounded-lg transition"
          >
            Edit
          </Link>

          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#5A0E24] rounded-xl max-w-lg w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white">{book.title}</h2>
            <p className="text-[#BF124D] mt-1 italic">by {book.author}</p>

            <div className="mt-4 max-h-80 overflow-y-auto pr-2 text-white leading-relaxed">
              {book.description}
            </div>

            <button
              className="w-full mt-5 bg-[#BF124D] hover:bg-[#76153C] text-white py-2 rounded-lg transition"
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
