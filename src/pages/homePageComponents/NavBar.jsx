import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaReact, FaShoppingCart, FaUser } from 'react-icons/fa';

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-indigo-700 text-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-md">
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <FaReact className="text-4xl" />
        <span className="text-2xl font-semibold">BeautyCare</span>
      </div>
      <nav className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5 items-center">
        <Link
          to="/"
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          <span className="mr-2">Home</span>
        </Link>
        <Link
          to="/products"
          className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all"
        >
          <span className="mr-2">Products</span>
        </Link>
        <Link
          to="/get-app"
          className="flex items-center bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
        >
          <span className="mr-2">Get App</span>
        </Link>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
          >
            <FaUser className="mr-2" />
            
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 rounded-t-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 rounded-b-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/cart"
          className="flex items-center bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-all"
        >
          <FaShoppingCart className="mr-2" />
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;