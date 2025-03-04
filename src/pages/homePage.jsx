import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTruck, faCreditCard, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from "./homePageComponents/Footer";

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
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true); // Loading state for new arrivals
  const [loadingTrendingProducts, setLoadingTrendingProducts] = useState(true); // Loading state for trending products
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [visibleTrendingProducts, setVisibleTrendingProducts] = useState(4);

  // Auto-slide every 5 seconds
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
        setLoadingNewArrivals(false); // ✅ Always update loading state
      });
  }, []);

  // Fetch trending products from the backend
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders/trending")
      .then((response) => {
        console.log("Trending Products:", response.data); // Debugging
        setTrendingProducts(
          Array.isArray(response.data.trendingProducts)
            ? response.data.trendingProducts
            : []
        );
      })
      .catch((error) => {
        console.error("Error fetching trending products:", error);
        setTrendingProducts([]);
      })
      .finally(() => {
        setLoadingTrendingProducts(false);
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
          {loadingNewArrivals ? (
            <p className="text-center text-gray-500">Loading new arrivals...</p>
          ) : newArrivals?.length > 0 ? (
            newArrivals.slice(0, visibleProducts).map((product) => (
              <Link
                key={product.productId}
                to={`/productInfo/${product.productId}`}
                className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <div className="relative w-full h-64">
                  <img
                    src={product.productImages?.[0]}
                    alt={`Image of ${product.productName || "Product"}`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => (e.target.src = "fallback-image.jpg")}
                  />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {product.productName || "Unknown Product"}
                </h3>
                <p className="text-gray-600">
                  Rs.{product.price ? product.price.toFixed(2) : "N/A"}
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

      {/* Trending Products Section */}
      <div className="w-full py-10 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Trending Products
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {loadingTrendingProducts ? (
            <p className="text-center text-gray-500">
              Loading trending products...
            </p>
          ) : trendingProducts?.length > 0 ? (
            trendingProducts
              .slice(0, visibleTrendingProducts)
              .map((product) => (
                <Link
                  key={product.productId}
                  to={`/productInfo/${product.productId}`}
                  className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">
                    {product.productName || "Unknown Product"}
                  </h3>
                  <p className="text-gray-600">
                    Rs.{product.price ? product.price.toFixed(2) : "N/A"}
                  </p>
                </Link>
              ))
          ) : (
            <p className="text-center text-gray-500">
              No trending products found.
            </p>
          )}
        </div>

        {/* See More Link (Left Aligned) */}
        {visibleTrendingProducts < trendingProducts.length && (
          <div className="mt- px-20 text-right">
             <button
              onClick={() => setVisibleTrendingProducts(visibleTrendingProducts + 4)}
              className="text-blue-600 hover:underline text-lg font-semibold"
            >
             See More →
            </button>
          </div>
        )}
      </div>

   {/* Features Section */}
<div className="w-full py-16 bg-gray-50">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
    Why Shop With Us?
  </h2>

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4">
    {/* Feature 1: 100% Authentic */}
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="text-blue-600 text-4xl mb-4">
        <FontAwesomeIcon icon={faCheckCircle} /> {/* 100% Authentic icon */}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        100% Authentic
      </h3>
      <p className="text-gray-600">
        100% Authentic Products from Trusted Sellers
      </p>
    </div>

    {/* Feature 2: Islandwide Delivery */}
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="text-green-600 text-4xl mb-4">
        <FontAwesomeIcon icon={faTruck} /> {/* Islandwide Delivery icon */}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Islandwide Delivery
      </h3>
      <p className="text-gray-600">
        Quick and Secure delivery within 1-3 working days
      </p>
    </div>

    {/* Feature 3: Easy Payment Options */}
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="text-yellow-600 text-4xl mb-4">
        <FontAwesomeIcon icon={faCreditCard} /> {/* Easy Payment Options icon */}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Easy Payment Options
      </h3>
      <p className="text-gray-600">
        Flexible Payment Methods for Your Convenience
      </p>
    </div>

    {/* Feature 4: Trusted Online Store */}
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="text-purple-600 text-4xl mb-4">
        <FontAwesomeIcon icon={faShieldAlt} /> {/* Trusted Online Store icon */}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Trusted Online Store
      </h3>
      <p className="text-gray-600">
        Shop with Confidence, Secure and Reliable
      </p>
    </div>
  </div>
</div>

<Footer/>
    </div>
    
  );
}

export default HomePage;
