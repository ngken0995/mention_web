import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <div className="container">
      <Route path="/" exact component={SearchBar} />
      <Route path="/result" exact component={ResultPage} />
      </div>
    </Router>
  );
}

export default App;
