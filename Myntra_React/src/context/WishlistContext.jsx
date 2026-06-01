import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

const toastStyle = {
  borderRadius: "20px",
  background: "#fff",
  color: "#333",
  border: "1px solid #eee",
  fontWeight: "500",
  fontSize: "14px",
  padding: "10px 18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function getId(item) {
    return item._id || item.id;
  }

  function addToWishlist(product) {
    const productId = getId(product);
    const exists = wishlist.find((item) => getId(item) === productId);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => getId(item) !== productId));
      toast("Removed from Wishlist", {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ),
        style: toastStyle,
      });
    } else {
      setWishlist((prev) => [...prev, product]);
      toast("Added to Wishlist!", {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
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
        ),
        style: toastStyle,
      });
    }
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => getId(item) !== id));
    toast("Removed from Wishlist", {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      style: toastStyle,
    });
  }

  const totalWishlist = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, totalWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
