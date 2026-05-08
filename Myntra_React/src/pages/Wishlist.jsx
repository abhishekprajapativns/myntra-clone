import { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function addToWishlist(product) {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      // Already exists -> Remove (Toggle)

      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      // New -> Add

      setWishlist((prev) => [...prev, product]);
    }
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
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
