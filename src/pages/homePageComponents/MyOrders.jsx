import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to view your orders.");
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full text-left border-collapse bg-white shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b">Order ID</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Address</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Total (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-100">
                <td className="p-4 border-b">{order.orderId}</td>
                <td className="p-4 border-b">{order.name}</td>
                <td className="p-4 border-b">{order.address}</td>
                <td className="p-4 border-b">{order.status}</td>
                <td className="p-4 border-b">
                  Rs.{order.orderedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyOrders;
