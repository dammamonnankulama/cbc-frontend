import React from 'react'
import { Link } from 'react-router-dom'
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';

function AdminHomePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
    <aside className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 text-center font-bold text-xl">Admin Panel</div>
      <nav className="flex flex-col p-4 space-y-2">
      <button className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </button>
          <button className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded">
            <FaBox className="mr-2" /> Products
          </button>
          <button className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded">
            <FaShoppingCart className="mr-2" /> Orders
          </button>
          <button className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded">
            <FaUsers className="mr-2" /> Customers
          </button>
      </nav>
    </aside>
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      
    </main>
  </div>
  )
}

export default AdminHomePage