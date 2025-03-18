import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";


function ProductsPage() {
  // 🔹 State to store fetched products
  const [products, setProducts] = useState([]);
  
  // 🔹 Tracks the loading state: "loading", "loaded", or "error"
  const [loadingStatus, setLoadingStatus] = useState("loading"); 
  
  // 🔹 Stores the search query input
  const [query, setQuery] = useState("");

  // 🔹 Fetch products when the page loads
  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data); // ✅ Debugging: Logs fetched data
          setProducts(res.data); 
          setLoadingStatus("loaded"); // ✅ Update loading state
        })
        .catch((err) => toast.error("Error loading products")); // ❌ Handle errors
    }
  }, []);

  // 🔹 Handles search functionality
  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");

    if (query === "") {
      // ✅ Fetch all products if search input is empty
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch(() => toast.error("Error loading products"));
    } else {
      // ✅ Fetch filtered products based on search input
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch(() => toast.error("Error loading products"));
    }
  }

  return (
    <div className="w-full h-full pt-4 relative">
      {/* 🔹 Search Bar */}
      <div className="absolute w-full flex justify-center">
        <input
          type="text"
          className="w-1/2 p-2 absolute z-50 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search Products"
          onChange={search}
          value={query}
        />
      </div>

      {/* 🔹 Display Products when loading is complete */}
      {loadingStatus === "loaded" && (
        <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center pt-4 relative">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} /> // ✅ Unique key for better rendering
          ))}
        </div>
      )}

      {/* 🔹 Show loading spinner while fetching data */}
      {loadingStatus === "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-500 border-b-blue-500"></div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
