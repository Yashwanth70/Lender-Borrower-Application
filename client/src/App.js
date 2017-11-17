import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import './App.css';
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'

class App extends Component {

  // componentDidMount() {
  //   fetch('/api/lender/')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/welcome" component={Profile}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
