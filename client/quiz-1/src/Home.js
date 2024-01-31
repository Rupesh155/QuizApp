// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Home.css';
const HomePage = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/admin">Admin Panel</Link>
        <Link to="/logout">LogOut</Link>

      </nav>
      <div className="content">
        <h1>Welcome to Coding Thinker</h1>
        <p>Your go-to platform for coding inspiration and knowledge.</p>
      </div>
    </div>
  );
};

export default HomePage;
