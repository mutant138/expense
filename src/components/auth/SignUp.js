// src/components/SignUp.js
import React, { useRef, useState , useContext , useHistory} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import AuthContext from '../../store/auth-context';


const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const authCtx = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Implement further sign-up logic here (e.g., API call)
    console.log('Email:', email);
    console.log('Password:', password);
    let userInfo = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      let res = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAz_dFcosMlB5fxUUCBcyNVE3DVNGBYCM8',
        userInfo
      );
      console.log(res.data);
      setSuccess('Sign up successful!');
      setError('');
      authCtx.login(res.data.idToken)
      history.push('/home');
      
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error?.message || 'Something went wrong. Please try again.'
      );
      setSuccess('');
    }

    // Reset form
    emailRef.current.value = '';
    passwordRef.current.value = '';
    confirmPasswordRef.current.value = '';
  };

  return (
    <div className="signup-container mt-5">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="signup-footer mt-3">
        <p>Have an account? <Link to="/signin">Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
