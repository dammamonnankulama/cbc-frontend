import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ShoppingCartCard({ productId, qty, deleteItem, setCartItems, loadCart }) {
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
    <tr className="hover:bg-green-100 border-b">
      <td className="py-4 px-4">
        <img
          src={product?.productImages[0]}
          alt={product?.productName}
          className="w-[80px] h-[80px] object-cover rounded-md mx-auto"
        />
      </td>
      <td className="py-4 px-4 text-center">{product?.productName}</td>
      <td className="py-4 px-4 text-center">{productId}</td>
      <td className="py-4 px-4 text-center">{qty}</td>
      <td className="py-4 px-4 text-center">LKR. {product?.lastPrice?.toFixed(2)}</td>
      <td className="py-4 px-4 text-center">
        LKR. {(product?.lastPrice * qty).toFixed(2)}
      </td>
      <td className="py-4 px-4 text-center">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded shadow hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ShoppingCartCard;
