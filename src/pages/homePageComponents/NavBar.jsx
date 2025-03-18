import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // for toggling mobile menu
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Check if there is user data in localStorage on page load
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.firstName || userData.name);
    }
  }, []); // Empty dependency array ensures this runs only once on initial load

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-black text-2xl">
          {isMenuOpen ? "X" : "☰"}
        </button>
      </div>

      {/* Desktop Categories */}
      <div className="hidden md:flex md:space-x-6">
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
          to="/category/skin-care"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Skin Care
        </Link>
        <Link
          to="/category/hair"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Hair
        </Link>
        <Link
          to="/category/perfume"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Perfume
        </Link>
        <Link
          to="/category/nails"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Nails
        </Link>
        <Link
          to="/category/tools"
          className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
        >
          Tools
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden w-full items-center space-y-4 mt-4">
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
            Hair
          </Link>
          <Link
            to="/category/skin-care"
            className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
          >
            Skin Care
          </Link>
          <Link
            to="/category/perfume"
            className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
          >
            Perfume
          </Link>
          <Link
            to="/category/hair"
            className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
          >
            Hair
          </Link>
          <Link
            to="/category/nails"
            className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
          >
            Nails
          </Link>
          <Link
            to="/category/tools"
            className="text-black text-lg font-medium opacity-75 hover:opacity-100 transition hover:underline"
          >
            Tools
          </Link>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-wrap md:flex-row space-y-0 md:space-y-1 md:space-x-3 items-center w-full md:w-auto justify-center md:justify-end">
        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-slate-50 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all shadow-md"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//login.png"
              alt="User"
              className="w-6 h-6 mr-2"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-1 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
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
        <div className="flex items-center space-x-10 md:space-x-6">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="flex items-center bg-slate-50 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-all shadow-md"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//cart%20icon.png"
              alt="Cart"
              className="w-6 h-6"
            />
          </Link>

          {/* User Profile */}
          {userName ? (
            <Link
              to="/profile"
              className="flex items-center bg-white text-indigo-700 font-semibold text-sm px-6 py-2 rounded-full shadow-md hover:bg-indigo-200 transition-all cursor-pointer"
            >
              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//login%20(1).png"
                alt="User Profile"
                className="w-6 h-6 mr-2"
              />
              {userName}
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-white text-indigo-700 font-semibold text-sm px-6 py-2 rounded-full shadow-md hover:bg-indigo-200 transition-all cursor-pointer"
            >
              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//login.png"
                alt="Login"
                className="w-6 h-6 mr-2"
              />
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
