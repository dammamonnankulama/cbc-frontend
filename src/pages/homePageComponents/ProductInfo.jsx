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
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [isReviewing, setIsReviewing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [youMayLike, setYouMayLike] = useState([]); // State for related products
  const [category, setCategory] = useState(""); // State to store the product's category
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
          setCategory(res.data.category); // Set the category from the fetched product
          setStatus("found");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });

    // Fetch reviews for this product
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/reviews/${productId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setReviews([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
      });

    // Fetch related products in the same category
    if (category) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/category/${category}`
        )
        .then((res) => {
          if (res.data) {
            setYouMayLike(res.data.slice(0, 3)); // Show only 3 related products
          }
        })
        .catch((err) => {
          console.error("Error fetching related products:", err);
        });
    }
  }, [productId, category]);

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

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/reviews", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Review added successfully!");
        setReviews((prevReviews) => [...prevReviews, res.data.review]);
        setIsReviewing(false);
        setNewReview({ rating: 0, comment: "" });
      })
      .catch((err) => {
        console.error("Error adding review:", err);
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
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
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col">
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
        <div className="flex flex-col lg:flex-row gap-8 p-8">
          {/* Image Section */}
          <div className="w-full lg:w-[30%] h-auto flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <ImageSlider
              images={product.productImages}
              className="w-full h-full object-cover rounded-lg mt-6"
            />
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
                  {/* Show only first 2 reviews initially */}
                  {reviews
                    .slice(0, showMore ? reviews.length : 2)
                    .map((review) => (
                      <div
                        key={review.reviewId}
                        className="bg-white p-4 rounded-lg shadow"
                      >
                        <p className="text-lg font-semibold">
                          ⭐ {review.rating} / 5
                        </p>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          - {review.email}
                        </p>
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

                  {/* Show "See More" if there are more than 2 reviews */}
                  {reviews.length > 2 && !showMore && (
                    <button
                      onClick={() => setShowMore(true)}
                      className="text-blue-500 text-sm mt-4"
                    >
                      See More
                    </button>
                  )}

                  {/* Hide "See More" button after it's clicked */}
                  {showMore && reviews.length > 2 && (
                    <button
                      onClick={() => setShowMore(false)}
                      className="text-blue-500 text-sm mt-4"
                    >
                      See Less
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* You May Like Section (Updated) */}
      {youMayLike.length > 0 && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            You May Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youMayLike.map((relatedProduct) => (
              <div
                key={relatedProduct.productId}
                className="bg-white p-2 rounded-lg shadow-lg flex flex-col items-center"
              >
                <div
                  onClick={() =>
                    navigate(`/productInfo/${relatedProduct.productId}`)
                  }
                  className="cursor-pointer"
                >
                  <img
                    src={relatedProduct.productImages[0]}
                    alt={relatedProduct.productName}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-2 text-center">
                  {relatedProduct.productName}
                </h3>
                <p className="text-md text-primary mt-1 text-center">
                  LKR {relatedProduct.lastPrice.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
