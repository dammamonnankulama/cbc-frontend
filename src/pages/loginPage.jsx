import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";



const LoginPage = () => {
  return (
   
    <div className="flex items-center justify-center min-h-screen bg-gray-100">


      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input type="text" id="username" name="username" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input type="password" id="password" name="password" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
        
        <div className="flex justify-center mt-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700"><FaHome />
           
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;