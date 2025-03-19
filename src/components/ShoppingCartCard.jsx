import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ShoppingCartCard({
  productId,
  qty,
  deleteItem,
  setCartItems,
  loadCart,
}) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((res) => {
          if (res.data != null) {
            setProduct(res.data);
            setLoaded(true);
          } else {
            onDelete();
          }
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }
  }, [loaded, productId]);

  const onDelete = () => {
    deleteItem(productId); // Delete the item from local storage or backend
    const updatedCart = loadCart(); // Reload the cart items
    setCartItems(updatedCart); // Update the parent state with the updated cart items
    toast.error(`${product?.productName || "Item"} removed from the cart.`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-b last:border-b-0 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:bg-gray-50 transition duration-200">
      {/* Product Image */}
      <img
        src={product?.productImages[0]}
        alt={product?.productName}
        className="w-16 h-16 object-cover rounded-lg shadow-md"
      />

      {/* Product Details */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product?.productName}
        </h2>
        <p className="text-sm text-gray-500">ID: {productId}</p>
        <p className="text-sm text-gray-600">Qty: {qty}</p>

        {/* Price */}
        <p className="text-sm font-semibold text-gray-800 mt-2 sm:mt-0">
          LKR {product?.lastPrice?.toFixed(2)}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="bg-white text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
      >
        ✖
      </button>
    </div>
  );
}

export default ShoppingCartCard;
