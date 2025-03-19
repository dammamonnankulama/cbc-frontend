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
    <div className="w-full h-full overflow-y-auto flex flex-col bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-center font-serif text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => handleRowClick(order)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Order #{order.orderId}</h2>
                <span className={`px-3 py-1 text-sm rounded-lg ${order.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>{order.status}</span>
              </div>
              <p className="text-gray-600 text-sm">{order.name}</p>
              <p className="text-gray-500 text-sm">{order.address}</p>
              <p className="text-gray-700 font-semibold mt-2">Total: Rs.{order.orderedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 transform transition-all">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Notes:</strong> {selectedOrder.notes || "N/A"}</p>
            <p className="mb-4"><strong>Total:</strong> Rs.{selectedOrder.orderedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</p>
            <h3 className="text-xl font-semibold mb-2">Ordered Items</h3>
            <ul className="mb-4">
              {selectedOrder.orderedItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-lg">
                  <div>
                    <strong>{item.name}</strong> - {item.qty} x Rs.{item.price.toFixed(2)}
                  </div>
                  <div className="font-semibold">Rs.{(item.qty * item.price).toFixed(2)}</div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseModal}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all"
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
