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
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: updatedCart,
      })
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
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center font-serif mb-6">
          Shopping Cart
        </h1>

        {/* Cart Items */}
<div className="bg-white shadow-md rounded-lg overflow-hidden">
  {cartItems.length > 0 ? (
    cartItems.map((item) => (
      <ShoppingCartCard
        key={item.productId}
        productId={item.productId}
        qty={item.qty}
        deleteItem={handleDeleteItem}
        setCartItems={setCartItems}
        loadCart={loadCart}
      />
    ))
  ) : (
    <div className="p-6 text-center text-gray-500">
      <p>Your cart is empty.</p>
    </div>
  )}
</div>

        {/* Summary Section */}
        {cartItems.length > 0 && (
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  LKR {labeledTotalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">
                  -LKR {(labeledTotalPrice - totalPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-lg font-semibold text-indigo-600">
                  LKR {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onOrderCheckOut}
              className="w-full mt-6 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
