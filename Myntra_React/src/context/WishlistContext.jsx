import { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

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
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => getId(item) !== id));
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
