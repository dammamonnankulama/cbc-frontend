import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import "./App.css";
import AdminHomePage from './pages/adminComponents/AdminHomePage';
import { Toaster } from 'react-hot-toast'
import NotFoundPage from './pages/notfoundPage';
import ProductsPage from './pages/homePageComponents/ProductsPage';


function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes >  
        {/* Root route with nested routes */}
        <Route path="/*" element={<HomePage />} />
        
        {/* Other Main Routes  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        <Route path="/admin/*" element={<AdminHomePage />} />
       
        {/* Not Found Route */}
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
