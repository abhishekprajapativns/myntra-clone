import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

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

const BagIcon = (
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
      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
    />
  </svg>
);

const CheckIcon = (
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
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const RemoveIcon = (
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
);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const existing = cart.find(
      (item) => (item._id || item.id) === (product._id || product.id),
    );

    if (existing) {
      toast("Quantity updated!", { icon: CheckIcon, style: toastStyle });
      setCart((prev) =>
        prev.map((item) =>
          (item._id || item.id) === (product._id || product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      toast("Added to Bag!", { icon: BagIcon, style: toastStyle });
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => (item._id || item.id) !== id));
    toast("Removed from Bag", { icon: RemoveIcon, style: toastStyle });
  }

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          (item._id || item.id) === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
