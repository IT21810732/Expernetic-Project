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
    <nav className="bg-gradient-to-r from-[#5A0E24] via-[#6B1A2F] to-[#5A0E24] shadow-2xl py-4 sticky top-0 z-50 backdrop-blur-sm border-b border-[#BF124D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          to={token ? "/" : "/login"}
          className="font-bold text-2xl sm:text-3xl tracking-wide text-white hover:text-[#BF124D] transition-all duration-300 transform hover:scale-105"
        >
          <span className="bg-gradient-to-r from-white to-[#BF124D] bg-clip-text text-transparent">
            Expernetic Library
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {token && (
            <Link
              to="/"
              className="bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] text-white px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
            >
              📚 Books
            </Link>
          )}

          {token ? (
            <>
              <Link
                to="/create"
                className="bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] text-white px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
              >
                ➕ Add Book
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 border-2 border-white/80 rounded-lg text-white hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base font-medium backdrop-blur-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 font-medium text-sm md:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 font-medium text-sm md:text-base"
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
