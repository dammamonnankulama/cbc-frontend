import React from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import { FaReact, FaShoppingCart, FaHeadset, FaApple } from 'react-icons/fa';


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="bg-indigo-700 text-white p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FaReact className="text-4xl" />
          <span className="text-2xl font-semibold">BeautyCare</span>
        </div>
        <nav className="space-x-5 flex items-center">
          <Link to="/login" className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all">
            <span className="mr-2">Login</span>
          </Link>
          <Link to="/signup" className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
            <span className="mr-2">Sign Up</span>
          </Link>
          <Link to="/cart" className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all">
            <FaShoppingCart className="mr-2" />
            <span>Cart</span>
          </Link>
          <Link to="/help-center" className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
            <FaHeadset className="mr-2" />
            <span>Help Center</span>
          </Link>
          
          <Link to="/get-app" className="flex items-center bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all">
            <FaApple className="mr-2" />
            <span>Get App</span>
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet /> {/* This will render the matched nested route */}
      </main>
    </div>

  );
};

export default HomePage;