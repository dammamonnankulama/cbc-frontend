import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import uploadMediaToSupabase from "../utils/MediaUpload";
import axios from "axios";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validatePasswords = (password, confirmPassword) => {
    return password === confirmPassword
      ? null
      : "Passwords do not match. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    const passwordError = validatePasswords(password, confirmPassword);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    try {
      // Upload profile picture if available
      let profilePicUrl = "";
      if (profilePicture) {
        profilePicUrl = await uploadMediaToSupabase(profilePicture);
      }

      // Create user object
      const user = {
        firstName,
        lastName,
        email,
        password,
        profilePicture: profilePicUrl,
      };

      // Axios POST request
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users",
        user
      );
      console.log("Response:", response.data);

      setSuccessMessage("User registered successfully!");
      setErrorMessage(""); // Clear error messages if successful
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
  
        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
        )}
  
        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4 text-center">
            {successMessage}
          </p>
        )}
  
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Profile Picture */}
        <div className="mb-6">
          <label htmlFor="profilePic" className="block text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
  
        <Link to="/login">
          <button
            type="button"
            className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Already have an account? Log In
          </button>
        </Link>
      </form>
  
      <div className="absolute top-4 left-4">
        <Link to="/">
          <button className="flex items-center bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaHome className="text-gray-700" />
          </button>
        </Link>
      </div>
    </div>
  );
  
}
