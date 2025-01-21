import React, { useEffect, useState } from "react";
import { loadCart, deleteItem } from "../../utils/CartFunctions";
import toast from "react-hot-toast";
import ShoppingCartCard from "../../components/ShoppingCartCard";
import axios from "axios";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
 const [labeledTotalPrice, setLabeledTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  

  useEffect(() => {
    setCartItems(loadCart());
    console.log(loadCart());
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
      orderedItems: loadCart()
    })
    .then((res) => {
      console.log(res.data);
      setLabeledTotalPrice(res.data.labeledTotalPrice);
      setTotalPrice(res.data.totalPrice);
      
     
    })
    .catch((error) => {
      console.error("There was an error processing your request:", error);
      toast.error("Failed to fetch the quote. Please try again later.");
    });

  }, []);

  function onOrderCheckOut  ()  {
    toast.success("Proceeding to checkout");
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
          {cartItems.map((item) => (
            <ShoppingCartCard
              key={item.productId}
              productId={item.productId}
              qty={item.qty}
              deleteItem={deleteItem}
              setCartItems={setCartItems} // Pass setCartItems
              loadCart={loadCart} // Pass loadCart
            />
          ))}
        </tbody>
      </table>
  
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
          onClick={() => {
            toast.success("Proceeding to checkout");
          }}
          className="px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          Checkout
        </button>
      </div>
    </div>
  );
  
}

export default ShoppingCart;

/*
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
                  <th className="p-3 text-gray-600 font-medium">Product Name</th>

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
                    <td className="p-3 text-gray-800">{item.productName}</td>
                    <td className="p-3 text-gray-800">{item.qty}</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => {
                          deleteItem(item.productId);
                          setCartItems(loadCart());
                          toast.success("Item removed from cart");
                        }}
                     
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
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
*/
