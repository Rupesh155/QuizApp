import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Authentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome to the Dashboard!</p>
      ) : (
        <div>
          <LoginForm setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}
    </div>
  );
};

export default Authentication;
