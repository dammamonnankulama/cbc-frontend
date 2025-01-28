import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [adminEdit, setAdminEdit] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedNotes, setUpdatedNotes] = useState("");

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
    setAdminEdit(false);
  };

  const handleEditClick = () => {
    setAdminEdit(true);
    setUpdatedStatus(selectedOrder.status);
    setUpdatedNotes(selectedOrder.notes || "");
  };

  const handleUpdateOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please log in as an admin.");
      return;
    }

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${selectedOrder.orderId}`,
        {
          status: updatedStatus,
          notes: updatedNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Order updated successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === selectedOrder.orderId ? res.data.order : order
          )
        );
        handleCloseModal();
      })
      .catch(() => {
        toast.error("Failed to update the order. Please try again.");
      });
  };

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
              <tr
                key={order.orderId}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(order)}
              >
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>Name:</strong> {selectedOrder.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Notes:</strong> {selectedOrder.notes || "N/A"}
            </p>
            <h3 className="text-lg font-bold mt-4">Ordered Items</h3>
            <ul className="mb-4">
              {selectedOrder.orderedItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.qty} x Rs.{item.price.toFixed(2)} = Rs.
                  {(item.qty * item.price).toFixed(2)}
                </li>
              ))}
            </ul>

            {!adminEdit ? (
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              >
                Edit Order
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">preparing</option>
                  <option value="completed">Completed</option>
                  <option value="delivered">Delivered</option>
                  <option value="paused">Paused</option>
                  <option value="canceled">Canceled</option>
                </select>
                <textarea
                  value={updatedNotes}
                  onChange={(e) => setUpdatedNotes(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Add any notes..."
                />
                <button
                  onClick={handleUpdateOrder}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            )}

            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
