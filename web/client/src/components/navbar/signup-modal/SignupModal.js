import React, { Component } from 'react';
import './SignupModal.css'
import Modal from 'react-modal';
import $ from 'jquery';

const modalStyles = {
  content : {
    top                   : '25%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    textAlign            : 'center',
    width: '35vw'
  }
};

class SignupModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      username: '',
      password: '',
      confirmPassword: '',
      usernameErrorMessage: '',
      passwordErrorMessage: '',
      confirmErrorMessage: '',
      successMessage: ''
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
  }

  openModal = () => {
    this.setState({
      isOpen: true,
      username: '',
      password: '',
      confirmPassowrd: '',
      usernameErrorMessage: '',
      passwordErrorMessage: '',
      confirmErrorMessage: '',
      successMessage: ''
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  attemptSignup() {
    $.post("http://38.88.74.71:80/createuser", {username: this.state.username, password: this.state.password},
      function(data) {
        if (data) {
          this.setState({
            successMessage: 'User Created Successfully',
            username: '',
            password: '',
            confirmPassword: ''
          });
        } else {
          this.setState({successMessage: 'User already exists! Please choose another username'});
        }
      }.bind(this));
  }

  handleSubmit(event) {
    var valid = true;
    if (this.state.password !== this.state.confirmPassword) {
      valid = false;
      this.setState({confirmErrorMessage: 'Your passwords do not match!'});
    } else {
      this.setState({confirmErrorMessage: ''});
    }

    if (this.state.username === '') {
      valid = false;
      this.setState({usernameErrorMessage: 'Please enter a username!'});
    } else if (hasWhiteSpace(this.state.username)) {
      valid = false;
      this.setState({usernameErrorMessage: 'Please ensure your username has no spaces'});
    } else {
      this.setState({usernameErrorMessage: ''});
    }

    if (this.state.password === '') {
      valid = false;
      this.setState({passwordErrorMessage: 'Please enter a password!'});
    } else if (hasWhiteSpace(this.state.password)) {
      valid = false;
      this.setState({passwordErrorMessage: 'Please ensure your password has no spaces'});
    } else {
      this.setState({passwordErrorMessage: ''});
    }

    if (valid) {
      this.attemptSignup();
    }
    event.preventDefault();
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
    this.setState({confirmPassword: event.target.value});
  }

  render () {
    return (
      <div>
        <span onClick={this.openModal}>Sign Up</span>
        <Modal isOpen={this.state.isOpen}
               onRequestClose={this.hideModal}
               contentLabel="Login Modal"
               ariaHideApp={false}
               style={modalStyles}>
          <span className="signup-modal-close" onClick={this.hideModal}>X</span>
          <h1>Sign Up</h1>
          <span>Username:</span><br />
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} /><br />
          <span className="error-message">{this.state.usernameErrorMessage}</span><br />
          <span>Password:</span><br />
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} /><br />
          <span className="error-message">{this.state.passwordErrorMessage}</span><br />
          <span>Confirm Password:</span><br />
          <input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} /><br />
          <span className="error-message">{this.state.confirmErrorMessage}</span><br />
          <input className="modal-button button-effects" type="submit" value="Submit" onClick={this.handleSubmit} /><br />
          <span className="error-message">{this.state.successMessage}</span><br />
        </Modal>
      </div>
    );
  }
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

export default SignupModal;
