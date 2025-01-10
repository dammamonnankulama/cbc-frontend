import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function ProductNotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">
              Sorry, the product you are looking for does not exist or has been removed.
            </p>
            <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaHome className="mr-2" />
              Go to Homepage
            </Link>
          </div>
        </div>
      );
}

export default ProductNotFound