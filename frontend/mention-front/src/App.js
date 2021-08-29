import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import PrivateRoute from './lib/PrivateRoute'

import SearchBar from "./components/SearchBar";
import ResultPage from "./components/ResultPage";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";


function App() {
  return (
    <Router>
      <div className="container">
      <Route path="/search" exact component={SearchBar} />
      <Route path="/result" exact component={ResultPage} />
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      </div>
    </Router>
  );
}

export default App;
