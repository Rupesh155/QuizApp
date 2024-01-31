// src/components/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";


const LoginForm = () => {
    let navigate=   useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    passWord: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Successful login, handle the response accordingly
      const responseData = await response.json();
      console.log('Login successful:', responseData);
      navigate('/admin')
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="login-card">
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="passWord"
            value={formData.passWord}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
        <Link to='/'> SignUp page</Link>
      </form>


    </div>
  );
};

export default LoginForm;
