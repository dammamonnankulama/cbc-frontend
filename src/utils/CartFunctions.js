// Function to load cart from local storage
export function loadCart() {
  
    const cart = localStorage.getItem('cart');
    if (cart !== null) {
      return JSON.parse(cart);
    }
    else{
        return [];
    }

}
export function addToCart(productId, qty) {
    // Load the cart from local storage
    let cart = loadCart();
  
    // Check if the product is already in the cart
    const index = cart.findIndex((item) => item.productId === productId);
  
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update the quantity
      cart[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      cart.push({ productId, quantity });
    }
  
    // Save the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }