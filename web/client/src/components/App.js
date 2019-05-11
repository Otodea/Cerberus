import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';

// components
import Navbar from './navbar/Navbar';
import Index from './index/Index';
import Surveillance from './surveillance/Surveillance';
import AboutCerberus from './about-cerberus/AboutCerberus';
import Team from './team/Team';
import Contact from './contact/Contact';
import Profile from './profile/Profile';
import ScrollUp from './scroll-up/ScrollUp';
import Footer from './footer/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: localStorage.getItem('isLogged')
    };
  }

  render() {
    if (this.state.isLogged === 'true') {
      return (
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' render={(props) => (
              <Index />
            )} />
            <Route exact path='/surveillance' render={(props) => (
                <Surveillance />
              )} />
            <Route exact path='/about-cerberus' render={(props) => (
                <AboutCerberus />
              )} />
            <Route exact path='/team' render={(props) => (
                <Team />
              )} />
            <Route exact path='/contact' render={(props) => (
                <Contact />
              )} />
            <Route exact path='/profile' render={(props) => (
                <Profile />
              )} />
            <Footer />
            <ScrollUp />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' render={(props) => (
              <Index />
            )} />
            <Route exact path='/about-cerberus' render={(props) => (
                <AboutCerberus />
              )} />
            <Route exact path='/team' render={(props) => (
                <Team />
              )} />
            <Route exact path='/contact' render={(props) => (
                <Contact />
              )} />
              <Footer />
              <ScrollUp />
          </div>
        </Router>
      );
    }
  }
}

export default App;
