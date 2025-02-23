import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Function to update the user name from localStorage
    const updateUser = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setUserName(userData.firstName || userData.name);
      } else {
        setUserName(null);
      }
    };

    // Check localStorage on initial load
    updateUser();

    // Listen for changes in localStorage
    window.addEventListener("storage", updateUser);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white text-black p-4 md:p-6 flex flex-wrap justify-between items-center shadow-lg w-full">
      {/* Logo Section */}
      <div className="flex items-center w-full md:w-auto justify-between mb-4 md:mb-0 space-x-6">
        <Link to="/">
          <img
            src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//Logo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>
        <Link
          to="/products"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Shop All
        </Link>
        <Link
          to="/category/makeup"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Makeup
        </Link>
        <Link
          to="/category/hair-body"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Hair & Body
        </Link>
        <Link
          to="/category/skin-care"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Skin Care
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap md:flex-row space-y-3 md:space-y-0 md:space-x-5 items-center w-full md:w-auto justify-center md:justify-end">
        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all shadow-md"
          >
            <FaUser className="mr-2" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 rounded-t-lg transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 rounded-b-lg transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Cart & User Profile */}
        <div className="flex items-center space-x-3">
          <Link
            to="/cart"
            className="flex items-center bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-all shadow-md"
          >
            <FaShoppingCart className="mr-2" />
          </Link>

          {userName && (
            <Link
              to="/profile"
              className="bg-white text-indigo-700 font-semibold text-sm px-3 py-1 rounded-full shadow-md hover:bg-indigo-200 transition-all cursor-pointer"
            >
              {userName}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
