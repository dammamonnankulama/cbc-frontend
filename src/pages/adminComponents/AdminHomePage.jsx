import React from 'react'
import { Link,Route,Routes } from 'react-router-dom'
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers,FaHome } from 'react-icons/fa';
import Dashboard from './Dashboard';
import Products from './Products';
import Orders from './Orders';
import Customers from './Customers';
import AddProductForm from './AddProductForm';
import ManageAdmins from './ManageAdmins';
import EditProductForm from './EditProductForm';


function AdminHomePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white flex flex-col fixed h-full">
        <div className="p-4 text-center font-bold text-xl">Admin Panel</div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded" to ="/admin/dashboard">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </Link>
          <Link className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded"to ="/admin/products">
            <FaBox className="mr-2" /> Products
          </Link>
          <Link className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded" to ="/admin/orders">
            <FaShoppingCart className="mr-2" /> Orders
          </Link>
          <Link className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded" to ="/admin/customers">
            <FaUsers className="mr-2" /> Customers
          </Link>
          <Link className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded" to ="/admin/admins">
            <FaUsers className="mr-2" /> Website Admins
          </Link>
          
          <Link className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded mt-auto" to ="/">
          <FaHome className="mr-2" /> Back to HomePage
          </Link>
          
        </nav>     
      </aside>
      <div className="flex-1 p-8 ml-64">
      <Routes>
          {/* Specific Routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/addProduct" element={<AddProductForm/>} />
          <Route path="products/editProducts" element={<EditProductForm/>} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="admins" element={<ManageAdmins />} />


          {/* Default Route (Redirects to Dashboard) */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminHomePage