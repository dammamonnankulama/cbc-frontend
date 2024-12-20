import React from 'react'
import { FaReact, FaShoppingCart, FaHeadset, FaApple } from 'react-icons/fa';

function NavBar() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold">MyApp</span>
        </div>

        {/* Navbar Links */}
        <nav className="space-x-6">
         
           
          
          <Link 
            to="/about" 
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
          >
            About
          </Link>
          <Link 
            to="/services" 
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>

  )
}

export default NavBar