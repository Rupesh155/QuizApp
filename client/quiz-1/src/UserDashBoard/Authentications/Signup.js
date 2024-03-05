// src/components/SignUpForm.js
import React, { useState } from 'react';
import { Link ,useNavigate} from "react-router-dom";
import './Signup.css'

const SignUpForm = () => {
    let navigate=      useNavigate()
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('http://localhost:4000/api/users', {
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
      navigate('/login')
      
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
       
  <Link to='/login'>  Login page</Link>
    </form>
    </div>
  );
};

export default SignUpForm;
