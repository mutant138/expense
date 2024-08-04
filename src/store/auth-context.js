// src/store/auth-context.js
import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isProfileComplete: false,
  login: (token) => {},
  logout: () => {},
  completeProfile: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialProfileStatus = localStorage.getItem('isProfileComplete') === 'true';

  const [token, setToken] = useState(initialToken);
  const [isProfileComplete, setIsProfileComplete] = useState(initialProfileStatus);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    setIsProfileComplete(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isProfileComplete');
  };

  const completeProfileHandler = () => {
    setIsProfileComplete(true);
    localStorage.setItem('isProfileComplete', 'true');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isProfileComplete: isProfileComplete,
    login: loginHandler,
    logout: logoutHandler,
    completeProfile: completeProfileHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
