// Function to load cart from local storage
export function loadCart() {
  const cart = localStorage.getItem("cart");
  if (cart !== null) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}
export function addToCart(productId, qty) {
  // Load the cart from local storage
  let cart = loadCart();

  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex(
    (item) => item.productId === productId
  );

  if (existingProductIndex !== -1) {
    // If the product is already in the cart, update the quantity
    cart[existingProductIndex].qty += qty;
    if (cart[existingProductIndex].qty <= 0) {
      // If the quantity is 0 or less, remove the product from the cart
      cart.splice(existingProductIndex, 1);
    }
  } else {
    // If the product is not in the cart, add it
    cart.push({ productId, qty });
  }
  saveCart(cart);
}
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}
