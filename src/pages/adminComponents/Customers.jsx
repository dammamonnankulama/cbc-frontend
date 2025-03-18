import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingUserId, setLoadingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Unauthorized: Please log in.");
          return;
        }

        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL +
            "/api/users/customers?type=customer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response?.status === 401) {
          setErrorMessage("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect user to login
        } else {
          setErrorMessage(
            error.response?.data?.message || "Failed to load users."
          );
        }
      }
    };

    fetchUsers();
  }, []);

  const toggleBlockStatus = async (userId, isBlocked) => {
    setLoadingUserId(userId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Unauthorized: No token provided");
        return;
      }

      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/block/" + userId,
        { isBlocked: !isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );
      setErrorMessage(response.data.message);
    } catch (error) {
      console.error("Error updating block status:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update status."
      );
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Customers List
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
        )}

        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border-b p-3">Profile Pic</th>
              <th className="border-b p-3">First Name</th>
              <th className="border-b p-3">Last Name</th>
              <th className="border-b p-3">Email</th>
              <th className="border-b p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center hover:bg-gray-50 transition-colors duration-300">
                  <td className="border-b p-3">
                    <img
                      src={user.profilePicture || "/default-profile.png"}
                      alt={`${user.firstName}'s profile`}
                      className="w-12 h-12 rounded-full mx-auto object-cover"
                    />
                  </td>
                  <td className="border-b p-3">{user.firstName}</td>
                  <td className="border-b p-3">{user.lastName}</td>
                  <td className="border-b p-3">{user.email}</td>
                  <td className="border-b p-3">
                    <button
                      onClick={() => toggleBlockStatus(user._id, user.isBlocked)}
                      disabled={loadingUserId === user._id}
                      className={`px-6 py-2 rounded-full text-white transition duration-300 transform ${
                        user.isBlocked
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      } ${
                        loadingUserId === user._id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {loadingUserId === user._id
                        ? "Processing..."
                        : user.isBlocked
                        ? "Unblock"
                        : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
