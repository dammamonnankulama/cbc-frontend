import React from 'react'
import NavBar from './homePageComponents/NavBar'
import { Route, Routes } from 'react-router-dom'

import ProductInfo from './homePageComponents/ProductInfo'
import ProductsPage from './homePageComponents/ProductsPage'
import ShoppingCart from './homePageComponents/ShoppingCart'
import ShippingPage from './homePageComponents/ShippingPage'
import MyOrders from './homePageComponents/MyOrders'
import UserProfile from './homePageComponents/UserProfile'
import CategoryPage from './homePageComponents/CategoryPage'

function HomePage() {
  return (
    <div className='h-screen w-full'>
      <NavBar />
      <div className='w-full h-[calc(100vh-100px)] '>
      <Routes path="/*">
          <Route path="/" element={<h1>Home Page</h1>} />
          
          <Route path="/products" element={<ProductsPage/>} />
          <Route path="/cart" element={<ShoppingCart/>} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          
          
        </Routes> 

      </div>

      
    </div>
  
    
  )
}

export default HomePage