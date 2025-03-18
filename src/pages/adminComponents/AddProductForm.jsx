import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/MediaUpload";
import { motion } from "framer-motion";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const altNames = alternativeNames.split(",");
    const imageUrls = await Promise.all(imageFiles.map(file => uploadMediaToSupabase(file)));
    
    const product = {
      productId,
      productName,
      altNames,
      productImages: imageUrls,
      price,
      lastPrice,
      stock,
      description,
      discount,
      lowStockAlert,
      category,
    };

    const token = localStorage.getItem("token");
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/admin/products");
      toast.success("Product added successfully");
    } catch (err) {
      toast.error("Failed to add product");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Add New Product</h1>
        <div className="space-y-4">
          {[{ label: "Product ID", state: productId, setState: setProductId },
            { label: "Product Name", state: productName, setState: setProductName },
            { label: "Alternative Names", state: alternativeNames, setState: setAlternativeNames },
            { label: "Price", state: price, setState: setPrice, type: "number" },
            { label: "Last Price", state: lastPrice, setState: setLastPrice, type: "number" },
            { label: "Discount (%)", state: discount, setState: setDiscount, type: "number" },
            { label: "Stock", state: stock, setState: setStock, type: "number" },
            { label: "Low Stock Alert", state: lowStockAlert, setState: setLowStockAlert, type: "number" }
          ].map(({ label, state, setState, type = "text" }, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-gray-700 font-medium">{label}</label>
              <input 
                type={type} 
                value={state} 
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder={`Enter ${label}`} 
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Product Images</label>
            <input 
              type="file" 
              multiple 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setImageFiles(e.target.files)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="" disabled>Select a category</option>
              <option value="makeup">Makeup</option>
              <option value="hair">Hair</option>
              <option value="skin-care">Skin Care</option>
              <option value="body">Body</option>
              <option value="nails">Nails</option>
              <option value="tools">Tools</option>
              <option value="perfume">Perfume</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Product Description"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
            onClick={handleSubmit}
          >
            Add Product
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
