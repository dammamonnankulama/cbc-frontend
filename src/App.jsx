import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import "./App.css";
import AdminHomePage from './pages/adminComponents/AdminHomePage';
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/loginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';




function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <GoogleOAuthProvider clientId="454806191657-i9tsf4tfh0gd0fg8hf3n2ko3785km5e4.apps.googleusercontent.com">
      <Routes >  
        {/* Root route with nested routes */}
        <Route path="/*" element={<HomePage />} />
        

        
        

        
        {/* Other Main Routes  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        <Route path="/admin/*" element={<AdminHomePage />} />
       
        {/* Not Found Route */}
        
       
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
//https://cbc-backend-gzve.onrender.com