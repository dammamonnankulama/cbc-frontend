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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route with nested routes */}
        <Route path="/*" element={<HomePage />} />

        {/* Other Main Routes  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/*" element={<AdminHomePage />} />
        
               
      </Routes>
    </BrowserRouter>
  );
}

export default App;
