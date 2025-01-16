import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./ProductNotFound";
import ImageSlider from "../../components/ImageSlider";
import { addToCart } from "../../utils/CartFunctions";
import toast from "react-hot-toast";

function ProductInfo() {
  // useParams is a hook that allows you to access the URL parameters in your component.
  const params = useParams();

  const productId = params.id; // Access the id parameter from the URL

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log("Product ID:", productId);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data);

        if (res.data == null) {
          setStatus("not-found");
        }

        if (res.data != null) {
          setProduct(res.data);
          setStatus("found");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  function onAddToCartClick() {
    addToCart(product.productId, 1);
    toast.success(product.productId  +"Added to Cart");


  }

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-gray-50">
      {/* Loading State */}
      {status === "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-b-primary"></div>
        </div>
      )}

      {/* Not Found State */}
      {status === "not-found" && <ProductNotFound />}

      {/* Found State */}
      {status === "found" && (
        <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-[28%] h-[30%] lg:h-full flex justify-center items-center p-4">
            <ImageSlider images={product.productImages} />
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-[65%] h-full p-4 bg-white rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {product.productName}
            </h1>
            <h2 className="text-2xl text-gray-500 mb-4">
              {product.altNames.join(" | ")}
            </h2>

            <p className="text-xl font-semibold text-primary mb-2">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500 mr-2">
                  LKR {product.price.toFixed(2)}
                </span>
              )}
              LKR {product.lastPrice.toFixed(2)}
            </p>

            <p className="text-lg text-gray-600 line-clamp-3 mb-4">
              {product.description}
            </p>
            <button onClick={onAddToCartClick} className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
