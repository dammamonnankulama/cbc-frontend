import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Products() {
  const [products, setProducts] = useState([]);

  // Fetch products from the server
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []); // Empty dependency array means this runs only once when the component mounts.

  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:5000/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success(res.data.message);

        // Re-fetch products after delete to keep the list updated
        axios.get('http://localhost:5000/api/products')
          .then((res) => {
            setProducts(res.data); // Update state with fresh product list
          })
          .catch((err) => {
            console.error('Error re-fetching products:', err);
            toast.error("Failed to update product list");
          });
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
              <tr className="bg-blue-600 text-white text-sm">
                <th className="py-3 px-6">Product ID</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Last Price</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6">Low Stock Alert</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.productId} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-3 px-6 text-gray-800">{product.productId}</td>
                  <td className="py-3 px-6 text-gray-800">{product.productName}</td>
                  <td className="py-3 px-6 text-gray-800">${product.price}</td>
                  <td className="py-3 px-6 text-gray-800">${product.lastPrice}</td>
                  <td className="py-3 px-6 text-gray-800">{product.stock}</td>
                  <td className={`py-3 px-6 ${product.stock <= product.lowStockAlert ? 'text-red-500' : 'text-gray-800'}`}>
                    {product.lowStockAlert}
                  </td>
                  <td className="py-3 px-6 text-gray-600">{product.description}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center items-center space-x-4">
                      <Link to={`/edit-product/${product.productId}`} className="text-blue-500 hover:text-blue-700">
                        <FaEdit className="text-xl" />
                      </Link>
                      <button onClick={() => handleDelete(product.productId)} className="text-red-500 hover:text-red-700">
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
        <Link to="/admin/products/addProduct" className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          <FaPlus className="text-2xl" />
        </Link>
      </div>
    </div>
  );
}

export default Products;
