import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <table className="w-full text-left border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 border-b">Order ID</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Address</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Notes</th>
              <th className="p-4 border-b">Total (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderId}
                className="hover:bg-blue-50 cursor-pointer transition-all duration-300"
                onClick={() => handleRowClick(order)}
              >
                <td className="p-4 border-b">{order.orderId}</td>
                <td className="p-4 border-b">{order.name}</td>
                <td className="p-4 border-b">{order.address}</td>
                <td className="p-4 border-b">{order.status}</td>
                <td className="p-4 border-b">{order.notes}</td>
                <td className="p-4 border-b">
                  Rs.{order.orderedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-all duration-300">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-2xl transform transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Notes:</strong> {selectedOrder.notes || "N/A"}</p>
            <p className="mb-4"><strong>Total:</strong> Rs.{selectedOrder.orderedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</p>
            <h3 className="text-xl font-semibold mb-2">Ordered Items</h3>
            <ul className="mb-4">
              {selectedOrder.orderedItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>{item.name}</strong> - {item.qty} x Rs.{item.price.toFixed(2)} = Rs.{(item.qty * item.price).toFixed(2)}
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
