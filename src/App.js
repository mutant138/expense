import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CompleteProfile from './components/Home/CompleteProfile';
import Home from './components/Home/Home';
import AuthContext from './store/auth-context';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/complete-profile" component={CompleteProfile} />
        <Route path="/home">
          {authCtx.isLoggedIn ? <Home /> : <Redirect to="/signin" />}
        </Route>
        <Redirect from="/" to={authCtx.isLoggedIn ? "/home" : "/signin"} />
      </Switch>
    </Router>
  );
};

export default App;
