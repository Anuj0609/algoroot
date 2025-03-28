import { useRouter } from "next/router";
import React, { useState } from "react";

function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    setUser({ name: "", email: "", password: "", confirmPassword: "" });

    console.log(user);
    router.push("/Login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={user.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-md hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-white">
          Already have an account?{" "}
          <a
            onClick={() => router.push("/Login")}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
