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
    <nav className="bg-[#5A0E24] shadow-lg py-3 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-2xl tracking-wide text-white"
        >
          Expernetic Library
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="bg-[#BF124D] hover:bg-[#76153C] text-white px-4 py-2 rounded-lg text-sm md:text-base transition"
          >
            Books
          </Link>

          {token ? (
            <>
              <Link
                to="/create"
                className="bg-[#BF124D] hover:bg-[#76153C] text-white px-4 py-2 rounded-lg text-sm md:text-base transition"
              >
                Add Book
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-white rounded-lg text-white hover:bg-[#76153C] transition text-sm md:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-[#BF124D] hover:bg-[#76153C] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-[#BF124D] hover:bg-[#76153C] text-white rounded-lg transition"
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
