import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import "./App.css";
import AdminHomePage from './pages/adminHomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/*" element={<AdminHomePage />} />
        
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
