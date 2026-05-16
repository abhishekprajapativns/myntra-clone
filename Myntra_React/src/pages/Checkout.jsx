import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart } = useCart();
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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Steps Tab */}
      <div className="flex mb-6">
        <div
          className={`flex-1 text-center py-2 font-semibold ${step === 1 ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-400"}`}
        >
          1. Address
        </div>
        <div
          className={`flex-1 text-center py-2 font-semibold ${step === 2 ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-400"}`}
        >
          2. Payment
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={address.firstName}
              onChange={handleChange}
              className="border p-2 rounded outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={address.lastName}
              onChange={handleChange}
              className="border p-2 rounded outline-none"
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            value={address.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded outline-none mt-3"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            className="w-full border p-2 rounded outline-none mt-3"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address.address}
            onChange={handleChange}
            className="w-full border p-2 rounded outline-none mt-3"
          />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              className="border p-2 rounded outline-none"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              className="border p-2 rounded outline-none"
            />
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full bg-pink-600 text-white py-2 rounded mt-4 font-semibold"
          >
            Continue to Payment →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <div className="flex flex-col gap-3 mb-6">
            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={payment === "upi"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>📱 UPI</span>
            </label>
            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={payment === "card"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>💳 Credit / Debit Card</span>
            </label>
            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>💵 Cash on Delivery</span>
            </label>
          </div>

          <div className="border rounded p-4 mb-4">
            <h3 className="font-bold mb-3">Order Summary</h3>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 font-bold flex justify-between">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border border-pink-600 text-pink-600 py-2 rounded font-semibold"
            >
              ← Back
            </button>
            <button className="flex-1 bg-pink-600 text-white py-2 rounded font-semibold">
              Place Order 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
