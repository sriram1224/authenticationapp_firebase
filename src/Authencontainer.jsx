// AuthenContainer.js
import React, { useState } from 'react';
import SignInForm from './signInform';
import SignupForm from './Signupform';

const AuthenContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      {isSignUp ? <SignupForm toggleForm={toggleForm} /> : <SignInForm toggleForm={toggleForm} />}
    </div>
  );
};

export default AuthenContainer;
