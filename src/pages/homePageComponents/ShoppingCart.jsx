import React, { useEffect, useState } from "react";
import { loadCart, deleteItem } from "../../utils/CartFunctions";
import toast from "react-hot-toast";
import ShoppingCartCard from "../../components/ShoppingCartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [labeledTotalPrice, setLabeledTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const items = loadCart();
    setCartItems(items);
    recalculateCart(items);
  }, []);

  const recalculateCart = (updatedCart) => {
    if (updatedCart.length === 0) {
      setLabeledTotalPrice(0);
      setTotalPrice(0);
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", { orderedItems: updatedCart })
      .then((res) => {
        setLabeledTotalPrice(res.data.labeledTotalPrice);
        setTotalPrice(res.data.totalPrice);
      })
      .catch(() => toast.error("Failed to recalculate totals."));
  };

  const handleDeleteItem = (productId) => {
    deleteItem(productId);
    const updatedCart = loadCart();
    setCartItems(updatedCart);
    recalculateCart(updatedCart);
    toast.success("Item removed from the cart!");
  };

  const onOrderCheckOut = () => {
    navigate("/shipping", { state: { items: cartItems } });
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center bg-gray-100 p-4 md:p-8">
      {/* Desktop Table */}
      <div className="hidden md:block w-full">
        <table className="w-full table-auto border-collapse bg-white shadow-xl rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-center">Product Name</th>
              <th className="py-3 px-4 text-center">Product ID</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Total</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 bg-white divide-y divide-gray-200">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <ShoppingCartCard key={item.productId} productId={item.productId} qty={item.qty} deleteItem={handleDeleteItem} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">Your cart is empty.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden w-full space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId} className="bg-white p-4 rounded-lg shadow-lg">
              <ShoppingCartCard productId={item.productId} qty={item.qty} deleteItem={handleDeleteItem} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>

      {/* Summary Section */}
      {cartItems.length > 0 && (
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
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="mt-8 w-full flex justify-center">
          <button
            onClick={onOrderCheckOut}
            className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
