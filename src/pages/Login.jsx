import { useRouter } from "next/router";
import React, { useState } from "react";

function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError("Both email and password are required!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found. Please sign up first!");
      return;
    }

    if (
      storedUser.email !== credentials.email ||
      storedUser.password !== credentials.password
    ) {
      setError("Invalid email or password!");
      return;
    }

    localStorage.setItem("session", JSON.stringify(storedUser));

    router.push("/Details");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <a
            onClick={() => router.push("/SignUp")}
            className="text-blue-500 cursor-pointer font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
