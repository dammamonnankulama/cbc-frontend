import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./ProductNotFound";

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
            status== "found" && <h1>Product found</h1>
        }


    </div>
  
  

  );
}

export default ProductInfo;
