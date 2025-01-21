import React, { useEffect, useState } from "react";
import { loadCart, deleteItem } from "../../utils/CartFunctions";
import toast from "react-hot-toast";
import ShoppingCartCard from "../../components/ShoppingCartCard";
import axios from "axios";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartItems(loadCart());
    console.log(loadCart());
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
      orderedItems: loadCart()
    })
    .then((res) => {
      console.log(res.data);
     
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
    <div className="w-full h-full overflow-y-scroll flex flex-col items-end bg-gray-50 p-6">
      <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 font-medium">
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
        <tbody className="text-gray-800">
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

      <div className="mt-6 flex justify-end w-full">
        <button
          onClick={() => {
           // toast.success("Proceeding to checkout");
          }}
          className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-300"
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
