import React, { Component } from 'react';
import './LoginModal.css'
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

class LoginModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      username: '',
      password: '',
      errorMessage: ''
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  openModal = () => {
    this.setState({
      isOpen: true,
      username: '',
      password: '',
      errorMessage: ''
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  attemptLogin() {
    $.get("http://38.88.74.71:80/login", {username: this.state.username, password: this.state.password},
      function(data) {
        if (data === "ERR: INVALID PASS") {
          this.setState({errorMessage: 'Invalid Password!'});
        } else if (data === "ERR: NO USER") {
          this.setState({errorMessage: 'User does not exist!'})
        } else {
          localStorage.setItem('isLogged', 'true');
          localStorage.setItem('loggedUser', data);
          this.setSerialIDLocalStorage();
        }
      }.bind(this));
  }

  setSerialIDLocalStorage() {
    $.get("http://38.88.74.71:80/getserialid/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser')},
      function(data) {
        localStorage.setItem('serialID', data);
        window.location.reload();
      });
  }

  handleSubmit(event) {
    this.attemptLogin();
    event.preventDefault();
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render () {
    return (
      <div>
        <span onClick={this.openModal}>Login</span>
        <Modal isOpen={this.state.isOpen}
               onRequestClose={this.hideModal}
               contentLabel="Login Modal"
               ariaHideApp={false}
               style={modalStyles}>
          <span className="login-modal-close" onClick={this.hideModal}>X</span>
          <h1>Login</h1>
          <span>Username:</span><br />
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} /><br /><br />
          <span>Password:</span><br />
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} /><br /><br />
          <input className="modal-button button-effects" type="submit" value="Submit" onClick={this.handleSubmit} /><br />
          <span className="error-message">{this.state.errorMessage}</span><br />
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
