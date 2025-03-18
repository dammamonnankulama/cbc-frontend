import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeImage, setActiveImage] = useState(0);

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-square flex flex-col items-center">
      {/* Main image */}
      <img
        src={images[activeImage]}
        alt="Active"
        className="w-full h-full object-cover rounded-lg transition-all ease-in-out duration-500"
      />

      {/* Left and right navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-70"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-70"
      >
        &gt;
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-16 h-16 cursor-pointer object-cover rounded-lg border-2 transition-all ease-in-out duration-300 ${
              activeImage === index
                ? "border-blue-500 scale-110"
                : "border-transparent"
            }`}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
