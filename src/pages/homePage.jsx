import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTruck,
  faCreditCard,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./homePageComponents/Footer";

const images = [
  {
    src: "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//home%200010.jpg",
    link: "/products",
    title: "Exclusive Discounts Available!",
    buttonText: "View product",
    buttonLink: "/productInfo/CBC0022",
  },

  {
    src: "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//home0011.jpg",
    link: "/products",
    title: "Visit Our Store for More!",
    buttonText: "Visit Store",
    buttonLink: "/products",
  },
  {
    src: "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//home0012.jpg",
    link: "/products",
    title: "Explore the Best Nail Products!",
    buttonText: "Shop Now",
    buttonLink: "/category/nails",
  },
];

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newArrivals, setNewArrivals] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Initially show 4 products
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true); // Loading state for new arrivals

  const [discountProducts, setDiscountProducts] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);

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

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/best-discounts")
      .then((response) => {
        console.log("Discount API Response:", response.data); // Debugging
        setDiscountProducts(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching discount products:", error);
        setDiscountProducts([]);
      })
      .finally(() => {
        setLoadingDiscounts(false); // ✅ Always update loading state
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="h-screen w-full relative">
      {/* Image Slider */}
      <div className="relative w-full min-h-[150px] md:min-h-[700px] lg:min-h-[680px] max-h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
          <Link to={images[currentIndex].link}>
            <img
              src={images[currentIndex].src}
              alt="Featured Product"
              className="w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-700 ease-in-out"
            />
          </Link>

          {/* Dynamic Text and Button */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white">
            <h2 className="text-xl md:text-3xl font-bold drop-shadow-lg">
              {images[currentIndex].title}
            </h2>
            <Link
              to={images[currentIndex].buttonLink}
              className="mt-3 inline-block bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-lg font-semibold shadow-md hover:bg-blue-600 transition"
            >
              {images[currentIndex].buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Running Text */}
      <div className="bg-white text-black py-1 mt-1">
        <div className="overflow-hidden whitespace-nowrap">
          <p className="inline-block animate-marquee text-lg font-semibold">
            <span className="mr-8">Fast delivery </span>
            <span className="mr-8">| Quality products</span>
            <span className="mr-8">| Great customer service</span>
            <span className="mr-8">| Best prices in town</span>
            <span className="mr-8">| Shop now for exclusive deals!</span>
          </p>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="w-full py-10 bg-yellow-50">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-6">
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
                <div className="relative w-full h-65 sm:h-48 md:h-56 lg:h-64">
                  <img
                    src={product.productImages?.[0]}
                    alt={`Image of ${product.productName || "Product"}`}
                    className="w-full h-full object-cover sm:object-contain rounded-lg"
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

      {/* Special Offers Section */}
      <div className="w-full py-10 bg-yellow-50">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-6">
          Special Offers
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {loadingDiscounts ? (
            <p className="text-center text-gray-500">
              Loading special offers...
            </p>
          ) : discountProducts?.length > 0 ? (
            discountProducts.slice(0, visibleProducts).map((product) => (
              <Link
                key={product.productId}
                to={`/productInfo/${product.productId}`}
                className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <div className="relative w-full h-65 sm:h-48 md:h-56 lg:h-64">
                  <img
                    src={product.productImages?.[0]}
                    alt={`Image of ${product.productName || "Product"}`}
                    className="w-full h-full object-cover sm:object-contain rounded-lg"
                    onError={(e) => (e.target.src = "fallback-image.jpg")}
                  />
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {product.productName || "Unknown Product"}
                </h3>
                <p className="text-gray-600 line-through">
                  Rs.{product.price ? product.price.toFixed(2) : "N/A"}
                </p>
                <p className="text-red-600 font-bold">
                  Rs.{product.lastPrice ? product.lastPrice.toFixed(2) : "N/A"}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No special offers available.
            </p>
          )}
        </div>
      </div>

      {/* Category Navigation Section */}
      <div className="w-full py-10 bg-gray-1000">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-6">
          Shop by Category
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-7">
          {[
            {
              name: "Nails",
              image:
                "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//nails.jpg",
              link: "/category/nails",
            },
            {
              name: "Tools",
              image:
                "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//tools.jpg",
              link: "/category/tools",
            },
            {
              name: "Makeup",
              image:
                "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//makeup%20eq.jpg",
              link: "/category/makeup",
            },
            {
              name: "Skin",
              image:
                "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//skin%20care.webp",
              link: "/category/skin-care",
            },
            {
              name: "Hair",
              image:
                "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//hair%20care.jpg",
              link: "/category/hair",
            },
            {
              name: "Perfume",
              image:
                "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//perfume%20cat.jpg",
              link: "/category/perfume",
            },
          ].map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-36 h-36 bg-gray-200 rounded-full overflow-hidden shadow-md transition transform group-hover:scale-110">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "fallback-image.jpg")}
                />
              </div>

              <p className="mt-3 text-lg font-medium text-gray-800 group-hover:text-red-500">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/* Beauty Tips Section */}
      <div className="w-full py-10 bg-yellow-50">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-6">
          Beauty Tips
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {/* Skin Care Tips */}
          <Link
            to="/beauty-tips"
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//beautyTips001.jpg" // Replace with your image URL
              alt="Skin Care Tips"
              className="w-full h-96 object-cover"
              onError={(e) => (e.target.src = "fallback-image.jpg")} // Fallback image in case of errors
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">
                Skin Care Tips
              </h3>
              <p className="text-gray-600">
                Discover the best skin care tips for a glowing and healthy
                complexion. Learn how to properly moisturize and protect your
                skin every day.
              </p>
            </div>
          </Link>

          {/* Hair Care Tips */}
          <Link
            to="/beauty-tips"
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//beautyTips002.jpg" // Replace with your image URL
              alt="Hair Care Tips"
              className="w-full h-96 object-cover"
              onError={(e) => (e.target.src = "fallback-image.jpg")} // Fallback image in case of errors
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">
                Hair Care Tips
              </h3>
              <p className="text-gray-600">
                Get the best tips for hair care, from nourishing your scalp to
                finding the perfect products for every hair type. Achieve shiny,
                healthy hair effortlessly.
              </p>
            </div>
          </Link>
        </div>
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
              <FontAwesomeIcon icon={faCheckCircle} />{" "}
              {/* 100% Authentic icon */}
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
              <FontAwesomeIcon icon={faTruck} />{" "}
              {/* Islandwide Delivery icon */}
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
              <FontAwesomeIcon icon={faCreditCard} />{" "}
              {/* Easy Payment Options icon */}
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
              <FontAwesomeIcon icon={faShieldAlt} />{" "}
              {/* Trusted Online Store icon */}
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

      <Footer />
    </div>
  );
}

export default HomePage;
