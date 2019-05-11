import React, { Component } from 'react';
import './AboutCerberus.css';

class AboutCerberusComponent extends Component {
  render () {
    return (
      <div className="about-cerberus-page">
        <div className="header-image">
          <div className="container-fluid">
              <h1 className="index-landing-header"> About Cerberus </h1>
          </div>
        </div>
        <div className="row">

            <div className="about-paragraph-set1 col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-sm-offset-3 col-xs-9 col-xs-offset-1">
              <h1 className= "about-h1">What Is Cerberus?</h1>
              <br/><br/>
              <p>
              Ever leave your keys at work and get locked out of your home? Hate it when a delivery arrives at your door but you are not home?
              Do you wish you could let someone into your home to feed your pets without giving them the key? Well, we have got you covered! </p>
              <p>
              Cerberus Pro is the brainchild of a young group of UBC Computer Engineering students who wished to find a solution to these
              common problem. In a nutshell, the device allows the owner to view and communicate with visitors at the door on a mobile app
              or website, and choose to unlock the door wirelessely at a simple push of a button. The goal is to provide a slew of
              features based on having the convenience of not needing a key to access ones home, including secret knocks and keypad
              codes that bypass the system. With Cerberus Pro, life is made simpler. </p>
            </div>

            <div className="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-0 col-sm-5 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                  <img className = "about-img" src="https://goo.gl/DHFmqf" alt="Forest"/>
            </div>
        </div>
        <hr className = "about-hr"/>
        <br/>  <br/>
        <div>
          <h1 className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1"> Our Mission: Security, Affordibility, Ease Of Use </h1>

          <div className= "about-paragraph-set2 col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
            <p>
            Cerberus is on a mission to reduce crime in neighborhoods. With affordable solutions that work on any home, Ring is committed to offering smart security that’s accessible to everyone. Cerberus lets you stop crime before it happens. Because with Cerberus, you’re always home.
            </p>
          </div>
          <div className="row about-ceberus-footer-padding">
            <div className="col-lg-2 col-lg-offset-2 col-md-1 col-md-offset-2 col-sm-5 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                  <img className = "about-img-icon" src="https://goo.gl/pAFpRj" alt="Forest"/>
            </div>

            <div className="col-lg-2 col-lg-offset-1 col-md-1 col-md-offset-2 col-sm-5 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                  <img className = "about-img-icon" src="https://goo.gl/5p475X" alt="Forest"/>
            </div>

            <div className="col-lg-2 col-lg-offset-1 col-md-1 col-md-offset-2 col-sm-5 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                  <img className = "about-img-icon" src="https://goo.gl/V31rZU" alt="Forest"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutCerberusComponent;
