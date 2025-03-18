import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
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
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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
        if (res.data.type !== "admin") {
          toast.error("You are not authorized to access this page.");
          navigate("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.");
        navigate("/login");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-500 border-b-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-purple-500 text-white">
      <header className=" bg-purple-500 p-4 flex justify-between items-center md:hidden shadow-lg">
        <span className="text-xl font-bold">Admin Panel</span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          <FaBars />
        </button>
      </header>

      {menuOpen && (
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-16 left-0 w-full bg-indigo-800 text-white flex flex-col p-4 space-y-2 md:hidden">
          <Link className="py-2 px-4 rounded hover:bg-indigo-600 transition" to="/admin/dashboard"> <FaTachometerAlt className="mr-2" /> Dashboard </Link>
          <Link className="py-2 px-4 rounded hover:bg-indigo-600 transition" to="/admin/products"> <FaBox className="mr-2" /> Products </Link>
          <Link className="py-2 px-4 rounded hover:bg-indigo-600 transition" to="/admin/orders"> <FaShoppingCart className="mr-2" /> Orders </Link>
          <Link className="py-2 px-4 rounded hover:bg-indigo-600 transition" to="/admin/customers"> <FaUsers className="mr-2" /> Customers </Link>
          <Link className="py-2 px-4 rounded hover:bg-indigo-600 transition" to="/admin/admins"> <FaUsers className="mr-2" /> Website Admins </Link>
          <Link className="py-2 px-4 rounded hover:bg-indigo-600 transition mt-auto" to="/"> <FaHome className="mr-2" /> Back to HomePage </Link>
        </motion.nav>
      )}

      <div className="flex">
        <motion.aside initial={{ x: -200 }} animate={{ x: 0 }} className="hidden md:flex md:w-64 bg-indigo-900 text-white flex-col h-screen p-6 space-y-4 shadow-2xl">
          <h2 className="text-2xl font-semibold text-center mb-4">Admin Panel</h2>
          <Link className="py-3 px-5 rounded hover:bg-indigo-700 transition flex items-center" to="/admin/dashboard"> <FaTachometerAlt className="mr-2" /> Dashboard </Link>
          <Link className="py-3 px-5 rounded hover:bg-indigo-700 transition flex items-center" to="/admin/products"> <FaBox className="mr-2" /> Products </Link>
          <Link className="py-3 px-5 rounded hover:bg-indigo-700 transition flex items-center" to="/admin/orders"> <FaShoppingCart className="mr-2" /> Orders </Link>
          <Link className="py-3 px-5 rounded hover:bg-indigo-700 transition flex items-center" to="/admin/customers"> <FaUsers className="mr-2" /> Customers </Link>
          <Link className="py-3 px-5 rounded hover:bg-indigo-700 transition flex items-center" to="/admin/admins"> <FaUsers className="mr-2" /> Website Admins </Link>
          <Link className="py-3 px-5 rounded hover:bg-indigo-700 transition flex items-center mt-auto" to="/"> <FaHome className="mr-2" /> Back to HomePage </Link>
        </motion.aside>

        <main className="flex-1 p-10 bg-white text-gray-900 rounded-tl-xl shadow-lg">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/addProducts" element={<AddProductForm />} />
            <Route path="products/editProducts" element={<EditProductForm />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="admins" element={<ManageAdmins />} />
            <Route path="admins/createAdmin" element={<CreateAdmin />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminHomePage;
