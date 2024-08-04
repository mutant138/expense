import React from 'react';
import './SignIn.css';

const SignIn = () => {

  return (
    <div className="signin-container mt-5">
      <h2 className="signin-title">Sign In</h2>
      <form className="signin-form">
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
