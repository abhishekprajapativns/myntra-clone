import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-3 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <div>
        <Link to="/">
          <h1 className="text-pink-600 font-bold text-3xl italic">Myntra</h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8">
        <Link
          to="/products"
          className="font-semibold hover:text-pink-600 transition"
        >
          Men
        </Link>
        <Link
          to="/products"
          className="font-semibold hover:text-pink-600 transition"
        >
          Women
        </Link>
        <Link
          to="/products"
          className="font-semibold hover:text-pink-600 transition"
        >
          Kids
        </Link>
        <Link
          to="/products"
          className="font-semibold hover:text-pink-600 transition"
        >
          Beauty
        </Link>
      </div>

      {/* Icons */}
      <div className="flex gap-6 text-2xl">
        <Link to="/">🔍</Link>
        <Link to="/auth">👤</Link>
        <Link to="/wishlist">❤️</Link>
        <Link to="/bag">🛍️</Link>
      </div>
    </nav>
  );
}

export default Navbar;
