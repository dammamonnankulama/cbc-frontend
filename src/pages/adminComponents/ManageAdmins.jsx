import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/customers?type=admin");
        setAdmins(response.data);  // Directly set admins as the filtering is done on the backend
      } catch (error) {
        console.error("Error fetching admins:", error);
        setErrorMessage(error.response?.data?.message || "Failed to load admins.");
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admins List</h2>

        {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}

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
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin._id} className="text-center">
                  <td className="border border-gray-300 p-2">
                    <img src={admin.profilePicture || "/default-profile.png"} alt={`${admin.firstName}'s profile`} className="w-10 h-10 rounded-full mx-auto object-cover" />
                  </td>
                  <td className="border border-gray-300 p-2">{admin.firstName}</td>
                  <td className="border border-gray-300 p-2">{admin.lastName}</td>
                  <td className="border border-gray-300 p-2">{admin.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No admins found.</td>
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
