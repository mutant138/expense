// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <Link className="navbar-brand" to="/">Expense Tracker</Link>
      <div className="navbar-collapse">
        <ul className="navbar-nav ml-auto"> {/* This class aligns items to the right */}
          <li className="nav-item">
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
