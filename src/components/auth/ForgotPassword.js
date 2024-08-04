// src/components/auth/ForgotPassword.js
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const emailRef = useRef();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    try {
      await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAz_dFcosMlB5fxUUCBcyNVE3DVNGBYCM8',
        {
          requestType: 'PASSWORD_RESET',
          email,
        }
      );
      setMessage('Check your email for a password reset link.');
      setTimeout(() => history.push('/signin'), 3000);
    } catch (error) {
      setError(
        error.response?.data?.error?.message || 'Failed to send reset email. Please try again.'
      );
    }
  };

  return (
    <div className="forgot-password-container mt-5">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            ref={emailRef}
            required
          />
        </div>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
