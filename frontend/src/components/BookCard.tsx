import type { Book } from "../types/Book";
import { Link } from "react-router-dom";

export default function BookCard({ book, onDelete }: { book: Book; onDelete?: (id?: number) => void }) {
  return (
    <div className="border p-4 rounded bg-white shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="mt-2 text-sm">{book.description}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link to={`/edit/${book.id}`} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</Link>
        {onDelete && (
          <button onClick={() => onDelete(book.id)} className="px-3 py-1 bg-red-600 text-white rounded">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
