import { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Toggle Buttons */}
        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 font-semibold ${isLogin ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-400"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
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
              placeholder="Email"
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded mb-4 outline-none"
            />
            <button className="w-full bg-pink-600 text-white py-2 rounded font-semibold">
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
          <div>
            <h2 className="text-xl font-bold mb-4">Create Account</h2>
            <input
              type="text"
              placeholder="First Name"
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded mb-3 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded mb-4 outline-none"
            />
            <button className="w-full bg-pink-600 text-white py-2 rounded font-semibold">
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
