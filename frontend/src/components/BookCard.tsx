import type { Book } from "../types/Book";
import { Link } from "react-router-dom";

export default function BookCard({ book, onDelete }: { book: Book; onDelete?: (id?: number) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
        <p className="text-gray-500 text-sm mt-1">by {book.author}</p>
        <p className="mt-3 text-gray-600 text-sm line-clamp-3">{book.description}</p>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          to={`/edit/${book.id}`}
          className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
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
  );
}
