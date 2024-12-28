import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

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
    <div className="p-8 relative">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <p className="text-lg mb-6">Browse through our collection of beauty products.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Last Price</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Low Stock Alert</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td className="py-2 px-4 border-b">{product.productId}</td>
                <td className="py-2 px-4 border-b">{product.productName}</td>
                <td className="py-2 px-4 border-b">${product.price}</td>
                <td className="py-2 px-4 border-b">${product.lastPrice}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">{product.lowStockAlert}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center space-x-2">
                    <Link to={`/edit-product/${product.productId}`} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </Link>
                    <button onClick={() => {
                      alert(product.productId);
                      const token = localStorage.getItem("token");
                      axios.delete(`http://localhost:5000/api/products/${product.productId}`, {
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                      })
                        .then((res) => {
                          console.log(res.data);
                          toast.success(res.data.message);
                         
                        })
                        .catch((err) => {
                          console.error(err);
                          toast.error("Failed to delete product");
                        });
                    }} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/admin/products/addProduct" className="absolute bottom-3 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
        <FaPlus />
      </Link>
    </div>
  );
}

export default Products;