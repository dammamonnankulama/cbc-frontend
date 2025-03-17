import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/category/${category}`)
      .then((res) => {
        if (isMounted) {
          setProducts(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load products. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Category Title */}
      <h1 className="text-3xl font-bold text-gray-800 capitalize mb-6 border-b-2 pb-2">
        {category.replace("-", " ")}
      </h1>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-lg font-semibold text-center">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="border p-4 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
              onClick={() => navigate(`/productInfo/${product.productId}`)}
            >
              <div className="w-full h-55 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.productImages?.[0] || "fallback-image.jpg"}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                  onError={(e) => (e.target.src = "fallback-image.jpg")}
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mt-3">
                {product.productName || "Unknown Product"}
              </h2>
              <p className="text-gray-700 font-medium">LKR {product.price?.toFixed(2) || "N/A"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">No products found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
