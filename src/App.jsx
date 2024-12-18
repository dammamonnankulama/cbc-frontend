import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/notfoundPage';
import SignUpPage from './pages/SignUpPage';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
