import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const images = [
  {
    src: "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//home%206.png",
    link: "/products", // Unique link for this image & button
  },
  {
    src: "https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images/pixelcut-export.jpg",
    link: "/category/skin-care", // Unique link for this image & button
  },
  
];

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newArrivals, setNewArrivals] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Initially show 4 products

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
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((response) => {
        setNewArrivals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the new arrivals:", error);
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  

  return (
    <div className="h-screen w-full relative">
      {/* Image Slider Container with Increased Height */}
      <div className="relative w-full h-[550px] overflow-hidden">
        {/* Only render the active slide */}
        <div className="relative w-full h-full">
          <Link to={images[currentIndex].link}>
            <img
              src={images[currentIndex].src}
              alt="Featured Product"
              className="w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-700 ease-in-out"
            />
          </Link>

          {/* Unique "Shop Now" Button */}
          <Link
            to={images[currentIndex].link}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition"
          >
            Shop Now
          </Link>
        </div>

        
      </div>

      {/* New Arrivals Section */}
      <section className="w-full py-16 bg-gray-100">
        <div className="container mx-auto px-2">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {newArrivals.length === 0 ? (
              <p className="col-span-full text-center text-xl text-gray-600">Loading new arrivals...</p>
            ) : (
              newArrivals.slice(0, visibleProducts).map((product) => (
                <div key={product.productId} className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={product.productImages} // Replace with your actual image URL field
                    alt={product.productName}
                    className="w-full h-90 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{product.productName}</h3>
                  <p className="text-gray-600 mt-2">Rs.{product.lastPrice}</p>
                  <div className="mt-4">
                    <Link
                      to={`/productInfo/${product.productId}`} // Link to individual product page
                      className="text-blue-500 hover:text-blue-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          {newArrivals.length > visibleProducts && (
            <div className="text-center mt-8">
              
            </div>
          )}
        </div>
      </section>

      {/* Other Page Content */}
      <div className="w-full h-[calc(100vh-700px)] p-4 bg-gray-50 flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Welcome to Our Store
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
