import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast("Login successful!", {
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ),
          style: toastStyle,
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/auth/signup",
          formData,
        );
        toast("Account created! Please login.", {
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ),
          style: toastStyle,
        });
        resetForm();
        setIsLogin(true);
      }
    } catch (error) {
      toast(error.response?.data?.message || "Something went wrong!", {
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
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/myntra_logo.webp" alt="Myntra" className="h-10" />
        </div>

        {/* Toggle Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => {
              setIsLogin(true);
              resetForm();
            }}
            className={`flex-1 py-2 font-semibold transition-all ${
              isLogin
                ? "border-b-2 border-pink-600 text-pink-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              resetForm();
            }}
            className={`flex-1 py-2 font-semibold transition-all ${
              !isLogin
                ? "border-b-2 border-pink-600 text-pink-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <div>
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Welcome Back!
            </h2>
            <p className="text-gray-400 text-sm mb-5">
              Login to your Myntra account
            </p>

            <div className="relative mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
            </div>

            <div className="relative mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Login
            </button>

            <p className="text-center mt-4 text-sm text-gray-500">
              New here?{" "}
              <span
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                className="text-pink-600 cursor-pointer font-semibold hover:underline"
              >
                Create Account
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm mb-5">Join Myntra today!</p>

            <div className="flex gap-3 mb-3">
              <div className="relative flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
                />
              </div>
              <div className="relative flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
                />
              </div>
            </div>

            <div className="relative mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
            </div>

            <div className="relative mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition text-sm"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Create Account
            </button>

            <p className="text-center mt-4 text-sm text-gray-500">
              Already have account?{" "}
              <span
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                className="text-pink-600 cursor-pointer font-semibold hover:underline"
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
