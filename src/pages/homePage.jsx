import React from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1 className="heading">Website Under Construction</h1>
        <p className="subheading">We're working hard to bring you an amazing experience. Stay tuned!</p>
        <div className="button-group">
          <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
          
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
