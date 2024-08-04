// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthContext from './store/auth-context';

const Home = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome to the Expense Tracker Homepage</h2>
    </div>
  );
};

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        {authCtx.isLoggedIn && <Route path="/home" exact component={Home} />}
        <Route path="*">
          <Redirect to="/signin" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
