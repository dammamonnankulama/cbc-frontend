import React from 'react'
import { Link } from 'react-router-dom';
import { FaReact, FaShoppingCart, FaHeadset, FaApple } from 'react-icons/fa';


function NavBar() {
  return (
    <header className="bg-indigo-700 text-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-md">
  <div className="flex items-center space-x-3 mb-4 md:mb-0">
    <FaReact className="text-4xl" />
    <span className="text-2xl font-semibold">BeautyCare</span>
  </div>
  <nav className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5 items-center">
    <Link to="/" className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
      <span className="mr-2">Home</span>
    </Link>
    <Link to="/products" className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all">
      <span className="mr-2">Products</span>
    </Link>
    <Link to="/get-app" className="flex items-center bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all">
      <span className="mr-2">Get App</span>
    </Link>
    <Link to="/login" className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all">
      <span className="mr-2">Login</span>
    </Link>
    <Link to="/signup" className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
      <span className="mr-2">Sign Up</span>
    </Link>
    <Link to="/cart" className="flex items-center bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-all">
      <FaShoppingCart className="mr-2" />
      
    </Link>
  </nav>
</header>


  )
}

export default NavBar