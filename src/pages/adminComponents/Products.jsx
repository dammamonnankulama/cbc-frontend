import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <p className="text-lg mb-6">Browse through our collection of beauty products.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.productId} className="bg-white p-4 rounded-lg shadow-md">
            {product.productImages && product.productImages.length > 0 ? (
              <img
              src={product.productImages[0]} 
              alt={product.productName} 
              className="h-50 object-cover rounded-t-lg shadow-lg mx-auto" 
              style={{ width: '50%' }} 
            />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
