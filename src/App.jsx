import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import "./App.css";
import AdminHomePage from './pages/adminHomePage';
import Cart from './pages/homePageComponents/Offers';
import HelpCenter from './pages/homePageComponents/HelpCenter';
import GetApp from './pages/homePageComponents/GetApp';
import NavBar from './pages/homePageComponents/NavBar';
import { Toaster } from 'react-hot-toast'
import NotFoundPage from './pages/notfoundPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes>
        {/* Root route with nested routes */}
        <Route path="/" element={<HomePage />} />

        {/* Other Main Routes  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/*" element={<AdminHomePage />} />
        <Route path="/*" element={<NotFoundPage />} />
        
               
      </Routes>
    </BrowserRouter>
  );
}

export default App;
