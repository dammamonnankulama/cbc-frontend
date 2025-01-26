import React, { useEffect, useState } from "react";
import { loadCart, deleteItem, clearCart } from "../../utils/CartFunctions";
import toast from "react-hot-toast";
import ShoppingCartCard from "../../components/ShoppingCartCard";
import axios from "axios";


function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [labeledTotalPrice, setLabeledTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const items = loadCart();
    setCartItems(items);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: items,
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

 

  

  function onOrderCheckOut() {
    

    
    
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to checkout.");
      return;
    }

    const payload = {
      orderedItems: cartItems.map((item) => ({
        productId: item.productId,
        
        qty: item.qty,
      })),
      name: "John Doe",
      address: "123, Main Street, Colombo",
      phone: "0792345678",
      totalPrice: totalPrice,
    };

    console.log("Payload being sent:", payload); // Debugging log

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Order Response:", res.data);
        
        toast.success("Order placed successfully");
        clearCart();
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Failed to place the order. Please try again.");
      });
      
  }
  //testing branching
  
 
      
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-end bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <table className="w-full table-auto border-collapse bg-white shadow-xl rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left uppercase tracking-wide">
              Image
            </th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">
              Product Name
            </th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">
              Product ID
            </th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">
              Qty
            </th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">
              Price
            </th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">
              Total
            </th>
            <th className="py-3 px-4 text-center uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 bg-white divide-y divide-gray-200">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ShoppingCartCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
                deleteItem={deleteItem}
                setCartItems={setCartItems}
                loadCart={loadCart}
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

      <div className="w-full bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h1>
        <div className="flex justify-between items-center text-lg mb-2">
          <span className="font-medium text-gray-600">Total:</span>
          <span className="font-bold text-gray-800">
            LKR {labeledTotalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg mb-2">
          <span className="font-medium text-gray-600">Discount:</span>
          <span className="font-bold text-green-600">
            -LKR {(labeledTotalPrice - totalPrice).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg mb-4 border-t pt-4">
          <span className="font-medium text-gray-600">Grand Total:</span>
          <span className="font-bold text-indigo-600">
            LKR {totalPrice.toFixed(2)}
          </span>
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
    </div>
  );
}

export default ShoppingCart;
