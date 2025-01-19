import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteItem } from "../utils/CartFunctions";
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
            deleteItem(productId);
          }
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }
  }, [loaded, productId, deleteItem]);

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
      <td className="py-4 px-4 text-center">LKR. {product?.lastPrice.toFixed(2)}</td>
      <td className="py-4 px-4 text-center">LKR. {(product?.lastPrice * qty).toFixed(2)}</td>
      <td className="py-4 px-4 text-center">
        <button
          onClick={() => {
            deleteItem(productId);
            setCartItems(loadCart()); // Updates the cart
            toast.success("Item removed from cart");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default ShoppingCartCard;
