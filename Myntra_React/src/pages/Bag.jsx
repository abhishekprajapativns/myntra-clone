import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Bag() {
  const { cart, totalPrice, increaseQty, decreaseQty, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  return (
    <div className="px-6 py-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">My Bag ({cart.length})</h2>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
            />
          </svg>
          <p className="text-xl text-gray-500 font-semibold">
            Your bag is empty!
          </p>
          <p className="text-gray-400 mt-2 mb-6">
            Add products to your bag to checkout
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Left Side - Items */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
            {cart.map((item) => (
              <div
                key={item.id || item._id}
                className="flex gap-4 border-b last:border-b-0 py-4 items-center"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-xl bg-gray-50 p-1"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-pink-600 font-bold">₹{item.price}</p>
                    <p className="text-gray-400 text-xs line-through">
                      ₹{item.price + 500}
                    </p>
                    <p className="text-green-600 text-xs font-semibold">
                      {Math.round((500 / (item.price + 500)) * 100)}% OFF
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id || item._id)}
                    className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-pink-600 hover:text-pink-600 font-bold transition"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id || item._id)}
                    className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-pink-600 hover:text-pink-600 font-bold transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id || item._id)}
                  className="ml-4 text-gray-400 hover:text-red-500 transition"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Right Side - Price Summary */}
          <div className="w-80">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-gray-800">
                Price Details
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Price ({cart.length} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>− ₹{cart.length * 500}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-800">
                <span>Total Amount</span>
                <span className="text-pink-600 text-lg">₹{totalPrice}</span>
              </div>

              <p className="text-green-600 text-xs mt-2 font-semibold">
                You will save ₹{cart.length * 500} on this order 🎉
              </p>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bag;
