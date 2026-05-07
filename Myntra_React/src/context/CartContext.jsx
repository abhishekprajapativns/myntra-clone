import { createContext, useState, useContext } from "react";

// Creating a "box"
// where the cart data will be stored

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add product to cart

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // Already exists → increase quantity

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // New item → Add it

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // remove item from cart

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // Increase the quantity

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  // Decrease Quantity

  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // Total items count

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price

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
