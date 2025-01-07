import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';


export default function ManageAdmins() {
  const [users, setusers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch users on component mount
    const fetchusers = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users");
        const filteredusers = response.data.filter(
          (user) => user.type === "admin"
        );
        setusers(filteredusers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to load users."
        );
      }
    };

    fetchusers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admins List</h2>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}

        {/* users Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Profile Pic</th>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border border-gray-300 p-2">
                    <img
                      src={user.profilePicture || "/default-profile.png"}
                      alt={`${user.firstName}'s profile`}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.firstName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.lastName}
                  </td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Link to="" className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          <FaPlus className="text-2xl" />
        </Link>
        
        
        
      </div>
    </div>
  );
}
