import React, { Component } from 'react';
import './Team.css';

class TeamComponent extends Component {
  render () {
    return (

      <div className="team-page">
        <div className="header-image">
          <div className="container-fluid">
              <div className="col-lg-6 col-lg-offset-3 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
              <h1 className="index-landing-header">About The Team</h1>
            </div>
          </div>
        </div>

        <h1>Meet The Team!</h1>

        <div className="team-paragraph-set">
          <p className= "team-paragraph-1 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
          The minds behind Cerberus are from a wide variety of backgrounds and have come together to build a product intended to make
          everyone's life that much more convenient. All of the members are bright undergraduate students from the University of British
          Columbia studying Computer Engineering. While some come from international backgrounds to pursue higher educations, others
          have deep-seeded local roots in engineering and a breadth of experience in software development. Additionally, the group brings
          in experience from entirely different fields of science and research to contribute towards the creation of a unique product.
          Feel free to learn more about each individual by clicking on the profile links below. </p>
        </div>

        <div className = "row">
          <div className="team-profiles-row container col-md-8 col-md-offset-2 col-sm-12">

            <div className="row">

              <div className="col-md-4 col-sm-12">
                <div className="thumbnail width-fix">
                  <img src="https://goo.gl/gk2FQ9" alt="..."/>
                  <div className="caption">
                    <h3>Abbas</h3>
                    <h2 className="team-position">Web Developer </h2>
                    <p><a href="https://www.linkedin.com/in/abbas-kashanipour-0568a9b4/" target="_blank" rel="noopener noreferrer" className="btn btn-primary img-responsive" role="button">View Profile</a></p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="thumbnail width-fix">
                  <img src="https://goo.gl/nwg7X5" alt="..."/>
                  <div className="caption">
                    <h3>Sina</h3>
                    <h2 className="team-position">System Architect </h2>
                    <p><a href="https://www.facebook.com/sina.saleh.16" target="_blank" rel="noopener noreferrer" className="btn btn-primary img-responsive" role="button">View Profile</a></p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="thumbnail width-fix">
                  <img src="https://goo.gl/3kSMJD" alt="..."/>
                  <div className="caption">
                    <h3>William</h3>
                    <h2 className="team-position">Senior Developer </h2>
                    <p><a href="https://www.facebook.com/wchoiboi" target="_blank" rel="noopener noreferrer" className="btn btn-primary img-responsive" role="button">View Profile</a></p>
                  </div>
                </div>
              </div>
              </div>
              <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="thumbnail width-fix">
                  <img src="https://goo.gl/txMEia" alt="..."/>
                  <div className="caption">
                    <h3>Osama</h3>
                    <h2 className="team-position">Head of R&D </h2>
                    <p><a href="https://www.facebook.com/Osama.K.Dawood" target="_blank" rel="noopener noreferrer" className="btn btn-primary img-responsive" role="button">View Profile</a></p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="thumbnail width-fix">
                  <img src="https://goo.gl/3FFGPh" alt="..."/>
                  <div className="caption">
                    <h3>Ben</h3>
                    <h2 className="team-position"> Application Developer </h2>
                    <p><a href="https://www.facebook.com/ben.harder2" target="_blank" rel="noopener noreferrer" className="btn btn-primary img-responsive" role="button">View Profile</a></p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="thumbnail width-fix">
                  <img src="https://goo.gl/2tza6m" alt="..."/>
                  <div className="caption">
                    <h3>Randy</h3>
                    <h2 className="team-position">Business Manager</h2>
                    <p><a href="https://www.linkedin.com/in/randy-jama/" target="_blank" rel="noopener noreferrer" className="btn btn-primary img-responsive" role="button">View Profile</a></p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamComponent;
