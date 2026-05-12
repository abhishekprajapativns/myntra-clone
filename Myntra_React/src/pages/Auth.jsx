import { useState } from "react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // Login API call

        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        alert(res.data.message);
      } else {
        // Signup API call

        const res = await axios.post(
          "http://localhost:5000/api/auth/signup",
          formData,
        );

        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Toggle Buttons */}

        <div className="flex mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              });
            }}
            className={`flex-1 py-2 font-semibold ${isLogin ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-400"}`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setIsLogin(false);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              });
            }}
            className={`flex-1 py-2 font-semibold ${!isLogin ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-400"}`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}

        {isLogin ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4 outline-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-pink-600 text-white py-2 rounded font-semibold"
            >
              Login
            </button>
            <p className="text-center mt-3 text-sm">
              New here?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-pink-600 cursor-pointer"
              >
                Create Account
              </span>
            </p>
          </div>
        ) : (
          /* Signup form */
          <div>
            <h2 className="text-xl font-bold mb-4">Create Account</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4 outline-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-pink-600 text-white py-2 rounded font-semibold"
            >
              Create Account
            </button>
            <p className="text-center mt-3 text-sm">
              Already have account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-pink-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
