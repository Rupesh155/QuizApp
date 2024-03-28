// src/components/SignUpForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUpForm = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passWord: '',
    otpEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.otpEmail }),
      });

      if (!response.ok) {
        throw new Error('OTP send failed');
      }

      // OTP sent successfully, you can handle the response accordingly
      const responseData = await response.json();
      console.log('OTP sent:', responseData);
      // Navigate to OTP verification page
      navigate(`/verify-otp?email=${formData.otpEmail}`);
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your backend verifies the OTP and signs up the user
      const response = await fetch('http://localhost:4000/api/signup', {
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
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className="signup-card">
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
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
      </form>
      <form className="otp-form" onSubmit={handleOtpSubmit}>
        <label>
          Enter Email for OTP:
          <input
            type="email"
            name="otpEmail"
            value={formData.otpEmail}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Send OTP</button>
      </form>
      <div className="login-options">
        <span>Or sign up/login with:</span>
        <div className="google-login">
          {/* Add your Google login/signup button here */}
          <button>Sign up/login with Google</button>
        </div>
      </div>
      <div>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
