import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; // Added Link import
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>404 Error: Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
              <Link to="/">
                <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                  Go to Homepage
                </button>
              </Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
