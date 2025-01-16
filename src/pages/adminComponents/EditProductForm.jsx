import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/MediaUpload";

export default function EditProductForm() {
  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Get the product object from the location state(json)
  const location = useLocation();
  //console.log(location);
  const product = location.state.product

  const altNames = product.altNames.join(",");

  if(product == null){
    navigate("/admin/products");
  }


// change the usestate default values to the product object values
  const [productId, setProductId] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alternativeNames, setAlternativeNames] = useState(product.altNames);
  const [imageFiles, setImageFiles] = useState([]);

  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);
  const [lowStockAlert, setLowStockAlert] = useState(product.lowStockAlert);

  async function handleSubmit() {
    const altNames = alternativeNames.join(",").split(",");

    //Upload images to cloudinary
    //Use the uploadMediaToSupabase function to upload each image file
    const promisesArray = [];
    let imageUrls = product.productImages;
    if(imageFiles.length > 0){


    
    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }
    imageUrls = await Promise.all(promisesArray);
    console.log(imageUrls);
  }


    const productData = {
      productId: productId,
      productName: productName,
      altNames: altNames,
      productImages: imageUrls,
      price: price,
      lastPrice: lastPrice,
      stock: stock,
      description: description,
      lowStockAlert: lowStockAlert,
    };

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/products/"+product.productId,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/admin/products");
      toast.success("Product Updated successfully");
    } catch (err) {
      toast.error("Failed to Update product");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Product Form
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Product ID<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Product ID"
              value={productId}
              required
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Product Name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Alternative Names
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Alternative Names (comma-separated)"
              value={alternativeNames}
              onChange={(e) => setAlternativeNames(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Image URLs</label>
            <input
              type="file"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              onChange={(e) => {
                setImageFiles(e.target.files);
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Price<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Last Price<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Last Price"
              required
              value={lastPrice}
              onChange={(e) => setLastPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Stock</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Low Stock Alert<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Low Stock Alert Threshold"
              value={lowStockAlert}
              required
              onChange={(e) => setLowStockAlert(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
            onClick={handleSubmit}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
