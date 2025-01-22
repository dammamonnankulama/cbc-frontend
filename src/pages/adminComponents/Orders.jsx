import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token retrieval method
          },
        });
        setOrders(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Orders</h1>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Order ID: {order.orderId}</h2>
            <p className="text-gray-700 mb-4">Customer Name: {order.name}</p>
            <p className="text-gray-600 mb-4">Address: {order.address}</p>
            <p className="text-gray-600 mb-4">Phone: {order.phone}</p>
            <p className="text-gray-600 mb-4">Total: ${order.totalPrice}</p>
            <p className="text-gray-600 mb-4">Status: {order.status}</p>
            <div className="text-gray-600">
              <h3 className="font-bold mb-2">Items:</h3>
              <ul>
                {Array.isArray(order.Items) && order.Items.length > 0 ? (
                  order.items.map((item) => (
                    <li key={item.productId}>
                      {item.productName} x {item.quantity}
                    </li>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
