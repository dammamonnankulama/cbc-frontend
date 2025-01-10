import React from 'react'
import NavBar from './homePageComponents/NavBar'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage'
import ProductInfo from './homePageComponents/ProductInfo'
import ProductsPage from './homePageComponents/ProductsPage'

function HomePage() {
  return (
    <div className='h-screen w-full'>
      <NavBar />
      <div className='w-full h-[calc(100vh-100px)] '>
      <Routes path="/*">
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/products" element={<ProductsPage/>} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          
          
        </Routes> 

      </div>

      
    </div>
  
    
  )
}

export default HomePage