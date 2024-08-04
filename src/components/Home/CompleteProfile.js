// src/components/Profile/CompleteProfile.js
import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './CompleteProfile.css';
import axios from 'axios';
import AuthContext from '../../store/auth-context';

const CompleteProfile = () => {
  const nameInputRef = useRef();
  const profilePicInputRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUrl = profilePicInputRef.current.value;
    const token = localStorage.getItem('token');

    console.log({ name: enteredName, address: enteredUrl });
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAz_dFcosMlB5fxUUCBcyNVE3DVNGBYCM8', {
        idToken: token,
        displayName: enteredName,
        photoUrl: enteredUrl,
        returnSecureToken: false,
      });
      console.log(res);

      authCtx.completeProfile();
      history.push('/home');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="complete-profile-container mt-5">
      <h2>Complete Your Profile</h2>
      <form onSubmit={submitHandler} className="complete-profile-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" ref={nameInputRef} placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label>Enter Profile Pic URL</label>
          <input type="text" className="form-control" ref={profilePicInputRef} placeholder="Enter your profile pic URL" required />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
