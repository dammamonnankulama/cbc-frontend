import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingCartCard from "../../components/ShoppingCartCard";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { clearCart } from "../../utils/CartFunctions";

function ShippingPage() {
  const location = useLocation();
  const cart = location.state?.items || [];
  const navigate = useNavigate();

  const [labeledTotalPrice, setLabeledTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!cart) {
      toast.error("Your cart is empty. Redirecting to cart...");
      navigate("/cart");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cart,
      })
      .then((res) => {
        setLabeledTotalPrice(res.data.labeledTotalPrice);
        setTotalPrice(res.data.totalPrice);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        toast.error("Failed to fetch the quote. Please try again later.");
      });
  }, [cart, navigate]);

  const handleOrderCreation = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to checkout.");
      return;
    }

    if (!name || !address || !phone) {
      toast.error("Please fill out all fields.");
      return;
    }

    const payload = {
      orderedItems: cart,
      name,
      address,
      phone,
      totalPrice,
    };

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Failed to place the order. Please try again.");
      });
  };

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <Toaster />
      <table className="w-full table-auto border-collapse bg-white shadow-xl rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left uppercase tracking-wide">Image</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Product Name</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Product ID</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Qty</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Price</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Total</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 bg-white divide-y divide-gray-200">
          {cart.length > 0 ? (
            cart.map((item) => (
              <ShoppingCartCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="w-full bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Order Details</h1>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Address:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Phone:</label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="w-full bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h1>
        <div className="flex justify-between items-center text-lg mb-2">
          <span className="font-medium text-gray-600">Total:</span>
          <span className="font-bold text-gray-800">LKR {labeledTotalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg mb-2">
          <span className="font-medium text-gray-600">Discount:</span>
          <span className="font-bold text-green-600">-LKR {(labeledTotalPrice - totalPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg mb-4 border-t pt-4">
          <span className="font-medium text-gray-600">Grand Total:</span>
          <span className="font-bold text-indigo-600">LKR {totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-end w-full">
        <button
          className="px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          onClick={handleOrderCreation}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShippingPage;
