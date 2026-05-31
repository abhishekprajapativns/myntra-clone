import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
      setSearch("");
    }
  };

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
      <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-2 gap-2 w-64 focus-within:border-pink-400 focus-within:bg-white transition-all duration-200 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for products, brands..."
          className="outline-none text-sm w-full bg-transparent text-gray-700 placeholder-gray-400"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Icons */}
      <div className="flex gap-6">
        <Link
          to="/auth"
          className="flex flex-col items-center text-sm text-gray-900 hover:text-pink-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span>Profile</span>
        </Link>

        <Link
          to="/wishlist"
          className="flex flex-col items-center text-sm text-gray-900 hover:text-pink-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span>Wishlist({totalWishlist})</span>
        </Link>

        <Link
          to="/bag"
          className="flex flex-col items-center text-sm text-gray-900 hover:text-pink-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span>Bag({totalItems})</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
