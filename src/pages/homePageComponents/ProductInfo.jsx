import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();

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
    toast.success(product.productId + " Added to Cart");
  }

  function onBuyNowClick() {
    navigate("/shipping", {
      state: {
        items: [
          {
            productId: product.productId,
            qty: 1,
          },
        ],
      },
    });
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-gradient-to-b from-gray-50 to-gray-200">
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
        <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row gap-8 p-8">
          {/* Image Section */}
          <div className="w-full lg:w-[30%] h-auto flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <ImageSlider images={product.productImages} />
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-[65%] h-auto p-6 bg-white rounded-xl shadow-lg flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.productName}
            </h1>
            <h2 className="text-2xl text-gray-500 mb-6">
              {product.altNames.join(" | ")}
            </h2>

            <p className="text-xl font-semibold text-primary mb-4">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500 mr-2">
                  LKR {product.price.toFixed(2)}
                </span>
              )}
              LKR {product.lastPrice.toFixed(2)}
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={onAddToCartClick}
                className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>
              <button
                onClick={onBuyNowClick}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
