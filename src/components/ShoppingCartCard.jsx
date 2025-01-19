import React from "react";

function ShoppingCartCard(props) {
  const productId = props.productId;
  const qty = props.qty;

  return (
    <div className="border w-1/2 flex justify-between items-center">
        <span>{productId}</span>
        <span>x</span>
        <span>{qty}</span>

    </div>
  );
  
}

export default ShoppingCartCard;
