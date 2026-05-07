import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src="/myntra_logo.webp" alt="Myntra Logo" className="h-10" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
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
        <Link
          to="/products"
          className="font-semibold hover:text-pink-600 transition"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="font-semibold hover:text-pink-600 transition"
        >
          Studio{" "}
          <span className="bg-pink-600 text-white text-xs px-1 rounded">
            NEW
          </span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded px-3 py-1 gap-2">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search for products..."
          className="outline-none text-sm w-48"
        />
      </div>

      {/* Icons */}
      <div className="flex gap-6">
        <Link to="/auth" className="flex flex-col items-center text-sm">
          <span>👤</span>
          <span>Profile</span>
        </Link>
        <Link to="/wishlist" className="flex flex-col items-center text-sm">
          <span>❤️</span>
          <span>Wishlist(0)</span>
        </Link>
        <Link to="/bag" className="flex flex-col items-center text-sm">
          <span>🛍️</span>
          <span>Bag({totalItems})</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
