// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [emailVerified, setEmailVerified] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
    history.push('/signin'); 
  };

  const completeProfileHandler = () => {
    history.push('/complete-profile');
  };

  const verifyEmailHandler = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAz_dFcosMlB5fxUUCBcyNVE3DVNGBYCM8',
        {
          requestType: 'VERIFY_EMAIL',
          idToken: token,
        }
      );
      console.log(response.data)
      alert('Verification email sent! Please check your inbox.');
      setEmailVerified(true)
    } catch (error) {
      console.error('Error sending verification email:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.error.message}`);
      } else {
        alert('Error sending verification email. Please try again later.');
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <Link className="navbar-brand" to="/">Expense Tracker</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {authCtx.isLoggedIn ? (
            <>
              {authCtx.isProfileComplete ? (
                <li className="nav-item">
                  <span className="nav-link">Profile Completed</span>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-warning" onClick={completeProfileHandler}>Complete Profile</button>
                </li>
              )}
              {!emailVerified && (
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={verifyEmailHandler}>Verify Email</button>
                </li>
              )}
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
