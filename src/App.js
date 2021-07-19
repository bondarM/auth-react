import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";

import { AuthProvider } from "./context/AuthContext.js";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={UserPage} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>

      </Router>
    </AuthProvider>

  );
}

export default App;
