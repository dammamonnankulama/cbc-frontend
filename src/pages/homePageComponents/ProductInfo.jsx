import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./ProductNotFound";
import ImageSlider from "../../components/ImageSlider";

function ProductInfo() {
  // useParams is a hook that allows you to access the URL parameters in your component.
  const params = useParams();

  const productId = params.id; // Access the id parameter from the URL

  const [product, setProduct] =useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log("Product ID:", productId);
    
    axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products/'+productId)
      .then((res) => {
        console.log(res.data);

        if(res.data == null){
            setStatus("not-found")
          }
  
          if(res.data != null){
            setProduct(res.data)
            setStatus("found")
          }

      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []); 

  return (
    <div className='w-full h-[calc(100vh-100px)] '>
        {
        status == "loading"&&(
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32  border-2 border-gray-500 border-b-accent border-b-4"></div>

          </div>
        )
      }
        {
        status == "not-found"&&(
          <ProductNotFound/>
        )
      }
        {
        status == "found"&&(
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[35%] h-full">
            <ImageSlider images={product.productImages}/>
          </div>
          <div className="w-[65%] h-full p-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
            <h1 className="text-3xl font-bold text-gray-500">{product.altNames.join(" | ")}</h1>
            <p className="text-xl text-gray-600">{
            (product.price>product.lastPrice)&&
            <span className="line-through text-red-500">LKR.{product.price}</span>
            } <span>{"LKR."+product.lastPrice}</span></p>
            <p className="text-lg text-gray-600 line-clamp-3">{product.description}</p>
          </div>
        </div>
        )
      }


    </div>
  
  

  );
}

export default ProductInfo;
