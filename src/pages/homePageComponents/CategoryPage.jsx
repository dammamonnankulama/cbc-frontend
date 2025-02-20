import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/products/category/${category}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">{category.replace("-", " ")}</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.productId} className="border p-4 rounded-lg">
              <img src={product.productImages[0]} alt={product.productName} className="w-full h-full overflow-y-scroll flex flex-wrap justify-center pt-4 relative" />
              <h2 className="text-lg font-medium">{product.productName}</h2>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
