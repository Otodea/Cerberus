import React, { Component } from 'react';
import './Profile.css';

import $ from 'jquery';

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      isLogged: localStorage.getItem('isLogged'),
      loggedUser: localStorage.getItem('loggedUser'),
      serialID: localStorage.getItem('serialID'),
      changeSerialID: '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      serialChangeErrorMessage: '',
      passwordChangeErrorMessage: '',
      passwordConfirmErrorMessage: ''
    };

    this.handleSerialIDChange = this.handleSerialIDChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleNewPasswordConfirmChange = this.handleNewPasswordConfirmChange.bind(this);
    this.handleSerialIDSubmit = this.handleSerialIDSubmit.bind(this);
    this.handleChangePasswordSubmit = this.handleChangePasswordSubmit.bind(this);
  }

  setSerialID() {
    $.post("http://38.88.74.71:80/setserialid/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser'), serialID: this.state.changeSerialID},
      function(data) {
        this.setState({serialID: data, changeSerialID: '', serialChangeErrorMessage: 'Serial ID changed successfully!'});
        localStorage.setItem('serialID', data);
      }.bind(this));
  }

  changePassword() {
    $.post("http://38.88.74.71:80/changepassword/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser'), oldPassword: this.state.oldPassword, newPassword: this.state.newPassword},
      function(data) {
        if (data) {
          this.setState({oldPassword: '', newPassword: '', newPasswordConfirm: '', passwordConfirmErrorMessage: '', passwordChangeErrorMessage: 'Password changed successfully!'});
        } else {
          this.setState({passwordChangeErrorMessage: 'Your old password is incorrect!', passwordConfirmErrorMessage: ''});
        }
      }.bind(this));
  }

  handleSerialIDChange(event) {
    this.setState({changeSerialID: event.target.value});
  }

  handleOldPasswordChange(event) {
    this.setState({oldPassword: event.target.value});
  }

  handleNewPasswordChange(event) {
    this.setState({newPassword: event.target.value});
  }

  handleNewPasswordConfirmChange(event) {
    this.setState({newPasswordConfirm: event.target.value});
  }

  handleSerialIDSubmit(event) {
    this.setSerialID();
    event.preventDefault();
  }

  handleChangePasswordSubmit(event) {
    if (hasWhiteSpace(this.state.newPassword)) {
      this.setState({passwordConfirmErrorMessage: 'Your password cannot have whitespace'});
    } else if (this.state.newPassword !== this.state.newPasswordConfirm) {
      this.setState({passwordConfirmErrorMessage: 'Your passwords do not match!'});
    } else {
      this.changePassword();
    }
    event.preventDefault();
  }

  render () {
    return (
      <section className="profile-section">



        <div className = "profile-landing-image">
          <div className="profile-container">
            <div className="row">
            <div className="main-section offset-lg-4 col-lg-4 col-sm-6 col-12 text-center">
              <div className="row">
                  <div className="profile-header col-lg-12 col-sm-12 col-xs-12 ">
                  <h1 className="profile-welcome"> Welcome {this.state.loggedUser}! </h1>
                  </div>
              </div>
              <div className="row user-detail">
                  <div>
                      <img className = "profile-img-icon" src="https://goo.gl/76rEU5" alt="Profile"/>
                      <h4> {this.state.loggedUser}</h4>
                      <p><i className="fa fa-map-marker" aria-hidden="true"></i> Vancouver, Canada</p>

                      <hr/>

                      <span>SerialID: {this.state.serialID}</span><br />
                      <input className="profile-textbox" type="text" value={this.state.changeSerialID} onChange={this.handleSerialIDChange} /><br />
                      <br/>
                      <input type="submit" className="profile-button button-effects" value="Change ID" onClick={this.handleSerialIDSubmit} /><br />
                      <span>{this.state.serialChangeErrorMessage}</span><br />

                      <hr/>


                      <span>Set New Password</span><br />

                      <input className="profile-textbox" type="password" placeholder="Old Password" value={this.state.oldPassword} onChange={this.handleOldPasswordChange} /><br />
                      <input className="profile-textbox" type="password" placeholder="New Password" value={this.state.newPassword} onChange={this.handleNewPasswordChange} /><br />
                      <input className="profile-textbox" type="password" placeholder="Confirm New Password" value={this.state.newPasswordConfirm} onChange={this.handleNewPasswordConfirmChange} /><br />
                      <span>{this.state.passwordConfirmErrorMessage}</span><br />
                      <input type="submit"className="profile-button button-effects"  value="Change Password" onClick={this.handleChangePasswordSubmit} /><br />
                      <span>{this.state.passwordChangeErrorMessage}</span>
                  </div>
              </div>
              <div className="row user-social-detail">
              </div>
              </div>
          </div>
        </div>
      </div>
    </section>
    );
  }
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

export default Profile;
