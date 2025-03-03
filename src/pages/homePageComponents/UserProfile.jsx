import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt, FaUserShield } from "react-icons/fa";

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
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleViewOrders = () => {
    navigate("/orders"); // Navigate to the orders page
  };

  if (!user) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center transform transition duration-500 hover:scale-105">
        <img 
          src={user.profilePicture || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500 shadow-lg"
        />
        <h2 className="text-3xl font-bold mt-4 text-gray-800">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-600 text-lg">{user.email}</p>
        <span className="inline-block bg-indigo-200 text-indigo-700 px-4 py-2 mt-2 rounded-full text-sm font-semibold shadow">
          {user.type.toUpperCase()}
        </span>

        <div className="mt-6 flex justify-center space-x-4">
          <button onClick={handleViewOrders} className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 shadow-md transform transition duration-300 hover:scale-105">
            View Orders
          </button>

          <button onClick={handleLogout} className="flex items-center bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow-md transform transition duration-300 hover:scale-105">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>

        {isAdmin && (
          <div className="mt-6 flex justify-center">
            <button onClick={() => navigate("/admin")} className="flex items-center bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 shadow-md transform transition duration-300 hover:scale-105">
              <FaUserShield className="mr-2" /> Admin Panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
