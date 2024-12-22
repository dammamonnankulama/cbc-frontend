import React from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import { FaReact, FaShoppingCart, FaHeadset, FaApple } from 'react-icons/fa';

import NavBar from './homePageComponents/NavBar';


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <NavBar />
      <div className="flex flex-col min-h-screen bg-gray-100">
    
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <section className="bg-white p-10 rounded-lg shadow-lg mb-8">
          <h1 className="text-5xl font-bold mb-4">Welcome to BeautyCare</h1>
          <p className="text-lg mb-6">Your one-stop solution for all beauty products and services.</p>          
        </section>
        
               
      </main>
      <footer className="bg-indigo-700 text-white p-6 text-center">
        <p>&copy; 2023 BeautyCare. All rights reserved.</p>
      </footer>
    </div>
    
      
    </div>

  );
}

export default HomePage;