// src/components/auth/SignIn.js
import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import './SignIn.css';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const navigateToSignUp = () => {
    history.push('/signup');
  };
  const navigateToForgotPassword = () => {
    history.push('/forgot-password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz_dFcosMlB5fxUUCBcyNVE3DVNGBYCM8',
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      console.log(response)
      authCtx.login(response.data.idToken);
      history.push('/home');
    } catch (error) {
      setError(
        error.response?.data?.error?.message || 'Authentication failed. Please try again.'
      );
    }
  };

  return (
    <div className="signin-container mt-5">
      <h2 className="signin-title">Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            ref={emailRef}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="additional-links mt-3">
        <button className="btn btn-link" onClick={navigateToForgotPassword}>Forgot Password?</button>
        <button className="btn btn-link" onClick={navigateToSignUp}>Create a new account</button>
      </div>
    </div>
  );
};

export default SignIn;
