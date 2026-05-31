import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });
  const [payment, setPayment] = useState("upi");

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully! 🎉");
    navigate("/");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = cart.length * 500;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Steps */}
        <div className="flex mb-8 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div
            className={`flex-1 text-center py-3 font-semibold transition-all ${
              step === 1 ? "bg-pink-600 text-white" : "text-gray-400"
            }`}
          >
            1. Address
          </div>
          <div
            className={`flex-1 text-center py-3 font-semibold transition-all ${
              step === 2 ? "bg-pink-600 text-white" : "text-gray-400"
            }`}
          >
            2. Payment
          </div>
        </div>

        {/* Step 1 - Address */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              Delivery Address
            </h2>

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={address.firstName}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={address.lastName}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
            </div>

            {/* Phone */}
            <div className="flex mb-3">
              <span className="border border-gray-200 border-r-0 px-3 py-3 rounded-l-xl bg-gray-50 text-gray-600 text-sm font-semibold">
                +91
              </span>
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                value={address.phone}
                onChange={handleChange}
                maxLength={10}
                className="w-full border border-gray-200 p-3 rounded-r-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
            </div>

            {/* Pincode */}
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleChange}
              maxLength={6}
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm mb-3"
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="House No, Building, Street, Area"
              value={address.address}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm mb-3"
            />

            {/* City + State */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Continue to Payment →
            </button>
          </div>
        )}

        {/* Step 2 - Payment */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              Payment Method
            </h2>

            {/* Payment Options */}
            <div className="flex flex-col gap-3 mb-6">
              <label
                className={`flex items-center gap-3 border-2 p-4 rounded-xl cursor-pointer transition-all ${
                  payment === "upi"
                    ? "border-pink-600 bg-pink-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={payment === "upi"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-pink-600"
                />
                <span className="text-xl">📱</span>
                <div>
                  <p className="font-semibold text-sm">UPI</p>
                  <p className="text-gray-700 text-xs">
                    Google Pay, PhonePe, Paytm
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 border-2 p-4 rounded-xl cursor-pointer transition-all ${
                  payment === "card"
                    ? "border-pink-600 bg-pink-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-pink-600"
                />
                <span className="text-xl">💳</span>
                <div>
                  <p className="font-semibold text-sm">Credit / Debit Card</p>
                  <p className="text-gray-700 text-xs">
                    Visa, Mastercard, Rupay
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 border-2 p-4 rounded-xl cursor-pointer transition-all ${
                  payment === "cod"
                    ? "border-pink-600 bg-pink-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-pink-600"
                />
                <span className="text-xl">💵</span>
                <div>
                  <p className="font-semibold text-sm">Cash on Delivery</p>
                  <p className="text-gray-700 text-xs">
                    Pay when your order arrives
                  </p>
                </div>
              </label>
            </div>

            {/* Order Summary */}
            <div className="border border-gray-100 rounded-xl p-4 mb-5 bg-gray-50">
              <h3 className="font-bold mb-3 text-gray-800">Order Summary</h3>
              {cart.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex justify-between mb-2 text-sm text-gray-600"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-2 space-y-1 text-sm">
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>− ₹{discount}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-base pt-1">
                  <span>Total</span>
                  <span className="text-pink-600">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-pink-600 text-pink-600 hover:bg-pink-50 py-3 rounded-xl font-semibold transition"
              >
                ← Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Place Order 🎉
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
