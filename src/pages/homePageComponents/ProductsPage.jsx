import React from 'react';
import  { useEffect, useState } from 'react';
import axios from 'axios'

function ProductsPage() {

    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-lg mb-6">Browse through our collection of beauty products.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.productId} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
              {/* Image Slideshow */}
              {product.productImages && product.productImages.length > 0 ? (
                <ProductImageSlideshow images={product.productImages} />
              ) : (
                <div className="w-full h-36 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{product.description}</p>
                <p className="text-lg font-semibold mb-4">${product.price}</p>
                <div className="flex justify-between">
                  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Buy
                  </button>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Slideshow component to handle multiple images
const ProductImageSlideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}
        alt={`Product image ${currentImageIndex + 1}`}
        className="h-50 object-cover rounded-t-lg shadow-lg mx-auto"
        style={{ width: "50%" }}
      />

      {/* Previous and Next Buttons */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};



export default ProductsPage