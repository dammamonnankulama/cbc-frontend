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
    if (!cart.length) {
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
      .catch(() => {
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

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        { orderedItems: cart, name, address, phone, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to place the order. Please try again.");
      });
  };

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-center bg-gray-50 p-4 md:p-8">
      <Toaster />

      {/* Cart Items */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 md:p-6 mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 text-center md:text-left">
          Order Summary
        </h1>
        <div className="space-y-6">
          {cart.length > 0 ? (
            cart.map((item) => (
              <ShoppingCartCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Order Details Form */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 md:p-6 mt-6">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-700 mb-4">
          Shipping Details
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 md:p-6 mt-6">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-700 mb-4">
          Summary
        </h1>
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="font-bold">
              LKR {labeledTotalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span className="font-bold">
              -LKR {(labeledTotalPrice - totalPrice).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-indigo-600 text-lg border-t pt-2">
            <span>Grand Total:</span>
            <span>LKR {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 w-full max-w-4xl flex justify-center">
        <button
          onClick={handleOrderCreation}
          className="w-full md:w-auto px-10 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShippingPage;
