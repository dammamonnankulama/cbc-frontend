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

  // Function to recalculate totals
  const recalculateCart = (updatedCart) => {
    if (updatedCart.length === 0) {
      setLabeledTotalPrice(0);
      setTotalPrice(0);
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: updatedCart,
      })
      .then((res) => {
        setLabeledTotalPrice(res.data.labeledTotalPrice);
        setTotalPrice(res.data.totalPrice);
      })
      .catch((error) => {
        console.error("Error recalculating totals:", error);
        toast.error("Failed to recalculate totals.");
      });
  };

  useEffect(() => {
    const items = loadCart();
    setCartItems(items);
    recalculateCart(items); // Calculate totals on load
  }, []);

  const handleDeleteItem = (productId) => {
    deleteItem(productId); // Remove the item
    const updatedCart = loadCart(); // Get the updated cart
    setCartItems(updatedCart); // Update state
    recalculateCart(updatedCart); // Recalculate totals
    toast.success("Item removed from the cart!");
  };

  const onOrderCheckOut = () => {
    navigate("/shipping", {
      state: {
        items: cartItems,
      },
    });
  };

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-end bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <table className="w-full table-auto border-collapse bg-white shadow-xl rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left uppercase tracking-wide">Image</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Product Name</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Product ID</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Qty</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Price</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Total</th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 bg-white divide-y divide-gray-200">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ShoppingCartCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
                deleteItem={handleDeleteItem}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {cartItems.length > 0 && (
        <>
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
              onClick={onOrderCheckOut}
              className="px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;