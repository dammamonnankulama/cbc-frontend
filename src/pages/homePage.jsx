import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Website Under Construction</h1>
        <p className="text-lg mb-6">We're working hard to bring you an amazing experience. Stay tuned!</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</Link>
          <Link to="/signup" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;