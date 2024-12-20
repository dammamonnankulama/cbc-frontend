import React from 'react';
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function SignUpPage  () {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input type="text" id="username" name="username" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input type="password" id="password" name="password" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
      </form>
      <div className="absolute top-4 left-4">
        <Link to="/">
          <button className="flex items-center bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaHome className="text-gray-700" />
          </button>
        </Link>
      </div>
         
           
          
        
    </div>
  );
};
