import React, { useState, useEffect } from "react";

function Sidebar({ setSelectedDetail }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-gray-800 text-white fixed top-4 left-4 z-50"
      >
        ☰ Menu
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-700"
        >
          ✖
        </button>
        <ul className="p-4 text-gray-700">
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedDetail("Chart Details");
              setIsOpen(false);
            }}
          >
            Chart Details
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
