import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-semibold text-xl tracking-wide text-gray-700">
          Expernetic Library
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="hidden md:block text-gray-600 hover:text-gray-800">
            Books
          </Link>

          {token ? (
            <>
              <Link
                to="/create"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Add Book
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
