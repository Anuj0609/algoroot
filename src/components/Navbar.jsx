import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("session"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("session");
    setUser(null);
    router.push("/Login");
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("session");
    setUser(null);
    router.push("/SignUp");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white relative w-full">
      <div className="text-2xl text-amber-600 font-bold">Algo Root</div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose size={28} /> : <FaBars size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 md:hidden z-50">
          {user ? (
            <>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 hover:bg-gray-700 w-full text-center"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-red-700 hover:bg-gray-700 w-full text-center"
              >
                Delete Account
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/Login")}
              className="text-blue-400 hover:underline"
            >
              Login
            </button>
          )}
        </div>
      )}

      <div className="hidden md:flex relative" ref={dropdownRef}>
        {user ? (
          <>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <FaUserCircle size={28} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <div className="p-3 border-b">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full text-left p-2 text-red-700 hover:bg-gray-100"
                >
                  Delete Account
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => router.push("/Login")}
            className="text-blue-400 hover:underline"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;