import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";


function UserProfile() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.type === "admin") {
        setIsAdmin(true);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleViewOrders = () => {
    navigate("/orders");
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center transform transition duration-500 hover:scale-105"
      >
        <motion.img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
          whileHover={{ scale: 1.1 }}
        />
        <h2 className="text-3xl font-bold mt-4 text-gray-800">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-600 text-lg">{user.email}</p>
        <span className="inline-block bg-blue-200 text-blue-700 px-4 py-2 mt-2 rounded-full text-sm font-semibold shadow">
          {user.type.toUpperCase()}
        </span>

        <div className="mt-6 flex flex-col space-y-4">
          <motion.button
            onClick={handleViewOrders}
            className="w-full flex justify-center items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 shadow-md transform transition duration-300 hover:scale-105"
            whileTap={{ scale: 0.95 }}
          >
            View Orders
          </motion.button>

          <motion.button
            onClick={handleLogout}
            className="w-full flex justify-center items-center bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow-md transform transition duration-300 hover:scale-105"
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </motion.button>
        </div>

        {isAdmin && (
          <motion.div className="mt-6" whileHover={{ scale: 1.05 }}>
            <button
              onClick={() => navigate("/admin")}
              className="w-full flex justify-center items-center bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 shadow-md transform transition duration-300"
            >
              <FaUserShield className="mr-2" /> Admin Panel
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default UserProfile;
