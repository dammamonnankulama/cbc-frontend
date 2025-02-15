import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";

function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <img 
          src={user.profilePicture || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-600">{user.email}</p>
        <span className="inline-block bg-indigo-200 text-indigo-700 px-3 py-1 mt-2 rounded-full text-sm">
          {user.type.toUpperCase()}
        </span>

        <div className="mt-6 flex justify-center space-x-4">
          <button onClick={handleViewOrders} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Orders
          </button>

          <button onClick={handleLogout} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
