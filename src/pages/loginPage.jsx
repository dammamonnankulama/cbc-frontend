import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use the navigate function to redirect to a different page
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      toast.error("Please fill in both email and password.");
      return;
    }
    setError(''); // Clear previous errors
    console.log("Email:", email);
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", { email, password })
      .then((res) => {
        if (res.data.user == null) {
          toast.error(res.data.message);
          return;
        }
        toast.success("Login success");
        localStorage.setItem("token", res.data.token);
        if (res.data.user.type === "admin") {
          //window.location.href = "/admin";
          // Use the navigate function to redirect to a different page
          navigate("/admin")
        } else {
         // window.location.href = "/";
          navigate("/products")
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed");
        toast.error(err.response?.data?.message || "An error occurred.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={login} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="flex justify-center mt-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700 flex items-center">
            <FaHome className="mr-2" />
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
