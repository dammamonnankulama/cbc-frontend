import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "./ProductNotFound";
import ImageSlider from "../../components/ImageSlider";
import { addToCart } from "../../utils/CartFunctions";
import toast from "react-hot-toast";

function ProductInfo() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" }); // State for new review
  const [isReviewing, setIsReviewing] = useState(false); // State to toggle review form visibility
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Product ID:", productId);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.type === "admin") {
      setIsAdmin(true);
    }

    // Fetch product details
    axios

      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        if (res.data == null) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });

    // Fetch customer reviews for this product
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/reviews/${productId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setReviews(res.data); // Only set the state if it's an array
        } else {
          setReviews([]); // Clear reviews if the response is not an array
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviews([]); // Optional: Clear reviews if there's an error
      });
  }, [productId]);

  function onAddToCartClick() {
    addToCart(product.productId, 1);
    toast.success(product.productId + " Added to Cart");
  }

  function onBuyNowClick() {
    navigate("/shipping", {
      state: {
        items: [{ productId: product.productId, qty: 1 }],
      },
    });
  }

  // Handle review form submission
  const handleReviewSubmit = () => {
    if (!newReview.rating || !newReview.comment) {
      toast.error("Rating and Comment are required!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in to submit a review.");
      return;
    }

    const payload = {
      productId: product.productId,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    console.log("Sending payload:", payload); // Log the payload

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/reviews", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token if authenticated
        },
      })
      .then((res) => {
        toast.success("Review added successfully!");
        setReviews((prevReviews) => [...prevReviews, res.data.review]); // Add the new review to the state
        setIsReviewing(false); // Close the review form
        setNewReview({ rating: 0, comment: "" }); // Reset the form
      })
      .catch((err) => {
        console.error("Error adding review:", err);
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message); // Display the error message from backend
        } else {
          toast.error("Failed to add review. Please try again later.");
        }
      });
  };
  const handleDeleteReview = (reviewId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in as an admin.");
      return;
    }

    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL + `/api/reviews/delete/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast.success("Review deleted successfully");
        setReviews(reviews.filter((review) => review.reviewId !== reviewId));
      })
      .catch((err) => {
        console.error("Error deleting review:", err);
        toast.error("Failed to delete review");
      });
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col">
      {/* Loading State */}
      {status === "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-b-primary"></div>
        </div>
      )}

      {/* Not Found State */}
      {status === "not-found" && <ProductNotFound />}

      {/* Found State */}
      {status === "found" && (
        <div className="flex flex-col lg:flex-row gap-8 p-8 h-full overflow-hidden">
          {/* Image Section */}
          <div className="w-full lg:w-[30%] h-auto flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <ImageSlider images={product.productImages} />
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-[65%] h-auto p-6 bg-white rounded-xl shadow-lg flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.productName}
            </h1>
            <h2 className="text-2xl text-gray-500 mb-6">
              {product.altNames.join(" | ")}
            </h2>

            <p className="text-xl font-semibold text-primary mb-4">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500 mr-2">
                  LKR {product.price.toFixed(2)}
                </span>
              )}
              LKR {product.lastPrice.toFixed(2)}
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={onAddToCartClick}
                className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>
              <button
                onClick={onBuyNowClick}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md flex-1 overflow-y-auto max-h-[calc(50vh)] lg:max-h-[calc(80vh)]">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Customer Reviews
              </h2>

              {/* Add Review Button */}
              <button
                onClick={() => setIsReviewing(true)}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 mb-4"
              >
                Add Your Review
              </button>

              {reviews.length === 0 ? (
                <p className="text-gray-600">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <div className="space-y-4 overflow-y-auto">
                  {/* Display reviews with scroll if they overflow */}
                  {reviews.map((review) => (
                    <div
                      key={review.reviewId}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <p className="text-lg font-semibold">
                        ⭐ {review.rating} / 5
                      </p>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-sm text-gray-500">- {review.email}</p>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteReview(review.reviewId)}
                          className="text-red-500 text-sm hover:text-red-700 focus:outline-none"
                        >
                          Delete Review
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal for Adding Review */}
          {isReviewing && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">
                  Write Your Review
                </h3>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({ ...newReview, rating: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    min="1"
                    max="5"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    rows="4"
                  />
                </div>

                <button
                  onClick={handleReviewSubmit}
                  className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-lg hover:bg-green-600 w-full"
                >
                  Submit Review
                </button>

                <button
                  onClick={() => setIsReviewing(false)}
                  className="mt-4 px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-lg hover:bg-red-600 w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
