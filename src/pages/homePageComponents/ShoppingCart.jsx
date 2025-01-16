import React, { useEffect, useState } from "react";
import { clearCart, loadCart, saveCart } from "../../utils/CartFunctions";
import toast from "react-hot-toast";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  function handleClearCart() {
    clearCart();
    toast.success("Cart Cleared");
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="p-3 text-gray-600 font-medium">Product ID</th>
                  <th className="p-3 text-gray-600 font-medium">Quantity</th>
                  <th className="p-3 text-gray-600 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 transition"
                  >
                    <td className="p-3 text-gray-800">{item.productId}</td>
                    <td className="p-3 text-gray-800">{item.qty}</td>
                    <td className="p-3 text-right">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Clear Cart Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClearCart}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
