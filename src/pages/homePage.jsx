import React from 'react'
import NavBar from './homePageComponents/NavBar'
import { Route, Routes, Link } from 'react-router-dom'



function HomePage() {
  return (
    <div className='h-screen w-full'>
      
      <div className='w-full  relative'>
        <Link to="/products">
          <img 
            src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//Colorful%20Minimalist%20Beauty%20Care%20Email%20Header.png" 
            alt="Featured Product" 
            className='w-full h-full object-cover rounded-lg shadow-lg'
          />
        </Link>
      </div>
      <div className='w-full h-[calc(100vh-100px-25vh)] p-4 bg-gray-50'>
        <Routes>
          <Route path="/" element={<h1 className='text-center text-3xl font-bold text-gray-800'>Welcome to Our Store</h1>} />
          
        </Routes> 
      </div>
    </div>
  )
}

export default HomePage