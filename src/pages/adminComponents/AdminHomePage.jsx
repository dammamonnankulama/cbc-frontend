import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaHome,
  FaBars,
} from "react-icons/fa";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Orders from "./Orders";
import Customers from "./Customers";
import AddProductForm from "./AddProductForm";
import ManageAdmins from "./ManageAdmins";
import EditProductForm from "./EditProductForm";
import axios from "axios";
import toast from "react-hot-toast";
import CreateAdmin from "./CreateAdmin";

function AdminHomePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Track loading state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar toggle
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.type !== "admin") {
          toast.error("You are not authorized to access this page.");
          navigate("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
        navigate("/login");
      })
      .finally(() => setIsLoading(false)); // ✅ Set loading to false after request
  }, []);

  // ✅ Show a loading spinner until authentication is complete
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-500 border-b-blue-500"></div>
      </div>
    );
  }

  // ✅ Prevent unauthorized users from seeing admin UI
  if (!user) {
    return null; // Return nothing if no user data
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 🔹 Sidebar Navigation */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-blue-800 text-white flex flex-col fixed h-full transition-all sm:w-64 md:w-48 sm:w-32 sm:relative sm:top-0 sm:left-0 sm:h-auto sm:min-h-0 sm:rounded-none sm:bg-transparent sm:shadow-none`}
      >
        <div className="p-4 text-center font-bold text-xl">Admin Panel</div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded"
            to="/admin/dashboard"
          >
            <FaTachometerAlt className="mr-2" /> Dashboard
          </Link>
          <Link
            className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded"
            to="/admin/products"
          >
            <FaBox className="mr-2" /> Products
          </Link>
          <Link
            className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded"
            to="/admin/orders"
          >
            <FaShoppingCart className="mr-2" /> Orders
          </Link>
          <Link
            className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded"
            to="/admin/customers"
          >
            <FaUsers className="mr-2" /> Customers
          </Link>
          <Link
            className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded"
            to="/admin/admins"
          >
            <FaUsers className="mr-2" /> Website Admins
          </Link>

          <Link
            className="flex items-center bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded mt-auto"
            to="/"
          >
            <FaHome className="mr-2" /> Back to HomePage
          </Link>
        </nav>
      </aside>

      {/* 🔹 Mobile Toggle Button */}
      <div className="sm:hidden absolute top-4 left-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-blue-600 p-2 rounded-full"
        >
          <FaBars />
        </button>
      </div>

      {/* 🔹 Main Content Area */}
      <div
        className={`flex-1 p-8 transition-all ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-0 sm:mt-16 sm:p-4`}
      >
        <Routes>
          {/* Specific Routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/addProducts" element={<AddProductForm />} />
          <Route path="products/editProducts" element={<EditProductForm />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="admins" element={<ManageAdmins />} />
          <Route path="admins/createAdmin" element={<CreateAdmin />} />
          
          {/* Default Route (Redirects to Dashboard) */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminHomePage;
