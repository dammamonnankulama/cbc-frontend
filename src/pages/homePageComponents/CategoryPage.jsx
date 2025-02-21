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
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">{category.replace("-", " ")}</h1>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="border p-4 rounded-lg shadow-lg bg-white cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/productInfo/${product.productId}`)} // Navigate to ProductInfo page
            >
              <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.productImages[0]}
                  alt={product.productName}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h2 className="text-lg font-medium mt-2">{product.productName}</h2>
              <p className="text-gray-700 font-semibold">LKR {product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
