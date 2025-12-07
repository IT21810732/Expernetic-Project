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
    <nav className="bg-white shadow p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">Expernetic Library</Link>

        <div className="flex items-center gap-3">
          <Link to="/" className="hidden md:block">Books</Link>
          {token ? (
            <>
              <Link to="/create" className="bg-green-600 text-white px-3 py-1 rounded">Add Book</Link>
              <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1">Login</Link>
              <Link to="/register" className="px-3 py-1">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
