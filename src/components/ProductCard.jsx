import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard(props) {
    const product = props.product;

    return (
      <Link to={`/productInfo/${product.productId}`}>
        <div className="w-[300px] h-[450px] m-8 rounded-xl shadow-lg shadow-gray-300 hover:shadow-xl hover:shadow-primary transition-all duration-300 border border-gray-200 hover:border-primary overflow-hidden flex flex-col bg-white">
          {/* Product Image */}
          <img
            src={product.productImages[0]}
            alt={product.productName}
            className="h-[70%] w-full object-cover rounded-t-xl"
          />
  
          {/* Product Details */}
          <div className="h-[40%] p-4 flex flex-col justify-between">
            {/* Product Name */}
            <h1 className="text-xl font-semibold text-gray-800 text-center truncate">
              {product.productName}
            </h1>
  
            {/* Product ID */}
            <h2 className="text-sm text-gray-500 text-center mb-2">{product.productId}</h2>
  
            {/* Product Prices */}
            <div>
              <p className="text-lg font-semibold text-primary ">
                LKR {product.lastPrice.toFixed(2)}
              </p>
              {product.lastPrice < product.price && (
                <p className="text-sm text-gray-400 line-through">
                  LKR {product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
}
 
export default ProductCard;