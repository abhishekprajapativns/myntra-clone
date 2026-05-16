import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Bag() {
  const { cart, totalPrice, increaseQty, decreaseQty, removeFromCart } =
    useCart();

  const navigate = useNavigate();

  return (
    <div className="px-6 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">🛍️ My Bag</h2>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-500">Your bag is empty!</p>
          <p className="text-gray-400 mt-2">
            Click "Add to Bag" on any product.
          </p>
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Left Side - Items List */}
          <div className="flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b py-4 items-center"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-pink-600 font-bold">₹{item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="border px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="border px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 ml-4"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Right Side - Total */}
          <div className="w-72 border rounded-lg p-4 h-fit">
            <h3 className="font-bold text-lg mb-4">Price Details</h3>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold text-pink-600">₹{totalPrice}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-pink-600 text-white py-2 rounded font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bag;
