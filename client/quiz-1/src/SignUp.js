// src/components/SignUpForm.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './SignUp.css';
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      // Successful signup, you can handle the response accordingly
      const responseData = await response.json();
      console.log('Signup successful:', responseData);
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };


  return (
    <div className="signup-card">  
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>
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
      <button type="submit">Sign Up</button>
       
  <Link to='/login'>  Login page</Link>
    </form>
    </div>
  );
};

export default SignUpForm;
