import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import SignUpPage from "./pages/SignUpPage";
import "./App.css";
import AdminHomePage from "./pages/adminComponents/AdminHomePage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/loginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserProfile from "./pages/homePageComponents/UserProfile";
import ProductsPage from "./pages/homePageComponents/ProductsPage";
import ShoppingCart from "./pages/homePageComponents/ShoppingCart";
import ShippingPage from "./pages/homePageComponents/ShippingPage";
import MyOrders from "./pages/homePageComponents/MyOrders";
import ProductInfo from "./pages/homePageComponents/ProductInfo";
import CategoryPage from "./pages/homePageComponents/CategoryPage";
import NavBar from "./pages/homePageComponents/NavBar";
import Footer from "./pages/homePageComponents/Footer";
import AboutUs from "./pages/homePageComponents/AboutUs";
import ContactUs from "./pages/homePageComponents/ContactUs";
import FAQ from "./pages/homePageComponents/FAQ";
import Terms from "./pages/homePageComponents/Terms";
import PrivacyPolicy from "./pages/homePageComponents/PrivacyPolicy";
import ShippingPolicy from "./pages/homePageComponents/ShippingPolicy";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <GoogleOAuthProvider clientId="454806191657-i9tsf4tfh0gd0fg8hf3n2ko3785km5e4.apps.googleusercontent.com">
        <Routes>
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();

  // Check if the current route is one of the routes that should not show the NavBar or Footer
  const hideNavBarFooterRoutes = ["/login", "/signup", "/admin"];
  const shouldHideNavBarFooter = hideNavBarFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {/* Conditionally render the NavBar based on the route */}
      {!shouldHideNavBarFooter && <NavBar />}

      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/productInfo/:id" element={<ProductInfo />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/FAQ" element={<FAQ/>} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />

        


        {/* Other Main Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/admin/*" element={<AdminHomePage />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideNavBarFooter && <Footer />}
    </>
  );
}

export default App;
