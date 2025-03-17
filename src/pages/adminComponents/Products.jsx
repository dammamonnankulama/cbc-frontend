import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Products() {
  const [products, setProducts] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0); // Trigger for re-fetching data

  // Fetch products from the server
  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, [fetchTrigger]); // Depend on fetchTrigger to refetch when it changes

  // edit product navigation
  const navigate = useNavigate();

  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success(res.data.message);
        setFetchTrigger((prev) => prev + 1); // Trigger re-fetch by updating fetchTrigger
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete product");
      });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Products</h1>
        <p className="text-lg text-gray-600 mb-6">Browse through our collection of beauty products.</p>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white text-xs sm:text-sm">
                <th className="py-3 px-4 sm:px-6">Product ID</th>
                <th className="py-3 px-4 sm:px-6">Product Name</th>
                <th className="py-3 px-4 sm:px-6">Price</th>
                <th className="py-3 px-4 sm:px-6">Last Price</th>
                <th className="py-3 px-4 sm:px-6">Stock</th>
                <th className="py-3 px-4 sm:px-6">Low Stock Alert</th>
                <th className="py-3 px-4 sm:px-6">Description</th>
                <th className="py-3 px-4 sm:px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.productId} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-3 px-4 sm:px-6 text-gray-800">{product.productId}</td>
                  <td className="py-3 px-4 sm:px-6 text-gray-800">{product.productName}</td>
                  <td className="py-3 px-4 sm:px-6 text-gray-800">LKR.{product.price}</td>
                  <td className="py-3 px-4 sm:px-6 text-gray-800">LKR.{product.lastPrice}</td>
                  <td className="py-3 px-4 sm:px-6 text-gray-800">{product.stock}</td>
                  <td className={`py-3 px-4 sm:px-6 ${product.stock <= product.lowStockAlert ? 'text-red-500' : 'text-gray-800'}`}>
                    {product.lowStockAlert}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-gray-600">{product.description}</td>
                  <td className="py-3 px-4 sm:px-6 text-center">
                    <div className="flex justify-center items-center space-x-4">
                      <button onClick={() => navigate(`/admin/products/editProducts`, { state: { product: product } })} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <FaEdit className="text-xl" />
                      </button>
                      <button onClick={() => handleDelete(product.productId)} className="text-red-500 hover:text-red-700" title="Delete">
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Product Button */}
        <Link to="/admin/products/addProducts" className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          <FaPlus className="text-2xl" />
        </Link>
      </div>
    </div>
  );
}

export default Products;
