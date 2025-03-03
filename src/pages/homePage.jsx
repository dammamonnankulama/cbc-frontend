import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const images = [
  {
    src: "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//home%206.png",
    link: "/products",
  },
  {
    src: "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images/pixelcut-export.jpg",
    link: "/products",
  },
];

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newArrivals, setNewArrivals] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Initially show 4 products
  const [loading, setLoading] = useState(true);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Fetch new arrivals from the backend
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/latest") // Adjusted the endpoint
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setNewArrivals(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching new arrivals:", error);
        setNewArrivals([]);
      })
      .finally(() => {
        setLoading(false); // ✅ Always update loading state
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="h-screen w-full relative">
      {/* Image Slider */}
      <div className="relative w-full h-[550px] overflow-hidden">
        <div className="relative w-full h-full">
          <Link to={images[currentIndex].link}>
            <img
              src={images[currentIndex].src}
              alt="Featured Product"
              className="w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-700 ease-in-out"
            />
          </Link>
          <Link
            to={images[currentIndex].link}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="w-full py-10 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          New Arrivals
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading new arrivals...</p>
          ) : newArrivals?.length > 0 ? (
            newArrivals.slice(0, visibleProducts).map((product) => (
              <Link
                key={product.productId}
                to={`/productInfo/${product.productId}`}
                className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={product.productImages?.[0] || "fallback-image.jpg"}
                  alt={`Image of ${product.productName || "Product"}`}
                  className="w-full h-70 object-cover rounded-lg"
                  onError={(e) => (e.target.src = "fallback-image.jpg")}
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {product.productName || "Unknown Product"}
                </h3>
                <p className="text-gray-600">
                  ${product.price ? product.price.toFixed(2) : "N/A"}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No new arrivals found.</p>
          )}
        </div>

        {/* Show More Button */}
        {visibleProducts < newArrivals.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleProducts(visibleProducts + 4)}
              className="bg-black text-white px-5 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* Welcome Message */}
      <div className="w-full h-[calc(100vh-700px)] p-4 bg-gray-50 flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Welcome to Our Store
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
