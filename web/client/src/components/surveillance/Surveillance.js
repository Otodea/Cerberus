import React, { Component } from 'react';
import './Surveillance.css';
import $ from 'jquery';

class SurveillanceComponent extends Component {

  constructor() {
    super();
    this.state = {
      chat0: '',
      chat1: '',
      chat2: '',
      chat3: '',
      chat4: '',
      chat5: '',
      chat6: '',
      chat7: '',
      chat8: '',
      chat9: '',
      message: '',
      image: '',
      lockState: 'LOCK NOT CONNECTED'
    };

    this.clearChatLog();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearChatLog() {
    $.post("http://38.88.74.71:80/clearchatlog/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser')});
  }

  sendMessage() {
    $.post("http://38.88.74.71:80/chat/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser'), message: "You: ".concat(this.state.message)},
      function() {
        this.setState({message: ''});
      }.bind(this));
  }

  receiveMessage() {
    $.get("http://38.88.74.71:80/chatget/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser')},
      function(data) {
        this.setState({chat0: data[0],
                       chat1: data[1],
                       chat2: data[2],
                       chat3: data[3],
                       chat4: data[4],
                       chat5: data[5],
                       chat6: data[6],
                       chat7: data[7],
                       chat8: data[8],
                       chat9: data[9]});
      }.bind(this));
  }

  getImage() {
    $.get("http://38.88.74.71:80/image/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser')},
      function(data) {
        this.setState({image: "data:image/jpg;base64, ".concat(data)});
      }.bind(this));
  }

  lockDoor() {
    $.post("http://38.88.74.71:80/lockdoor/".concat(localStorage.getItem('loggedUser')), {serialID: localStorage.getItem('serialID')});
  }

  unlockDoor() {
    $.post("http://38.88.74.71:80/unlockdoor/".concat(localStorage.getItem('loggedUser')), {serialID: localStorage.getItem('serialID')});
  }

  checkLockState() {
    $.get("http://38.88.74.71:80/getlockstate/".concat(localStorage.getItem('loggedUser')), {username: localStorage.getItem('loggedUser')},
      function(data) {
        if (data === 1) {
          this.setState({lockState: 'UNLOCKED'});
        } else if (data === 0) {
          this.setState({lockState: 'LOCKED'});
        } else {
          this.setState({lockState: 'LOCK NOT CONNECTED'});
        }
      }.bind(this));
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    this.sendMessage();
    event.preventDefault();
  }

  componentDidMount() {
    this.messageTimer = setInterval(
      () => this.receiveMessage(),
      1000
    );

    this.lockStateTimer = setInterval(
      () => this.checkLockState(),
      1000
    );

    this.imageTimer = setInterval(
      () => this.getImage(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.messageTimer);
    clearInterval(this.imageTimer);
  }

  render () {
    return (
      <div className="surveillance-page">
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <div className="col-md-6 col-sm-12">
              <img className="surveillance-image" src={this.state.image} alt="not loaded"/><br />
              <span>{this.state.lockState}</span><br />
              <button className="surveillance-lock-button button-effects" onClick={this.lockDoor}>Lock</button>
              <button className="surveillance-unlock-button button-effects" onClick={this.unlockDoor}>Unlock</button><br />
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="surveillance-chatbox">
                <span>{this.state.chat9}</span><br />
                <span>{this.state.chat8}</span><br />
                <span>{this.state.chat7}</span><br />
                <span>{this.state.chat6}</span><br />
                <span>{this.state.chat5}</span><br />
                <span>{this.state.chat4}</span><br />
                <span>{this.state.chat3}</span><br />
                <span>{this.state.chat2}</span><br />
                <span>{this.state.chat1}</span><br />
                <span>{this.state.chat0}</span><br />
              </div>
              <form onSubmit={this.handleSubmit}>
                <input className="surveillance-chat-submit" type="text" value={this.state.message} onChange={this.handleChange} />
                <input className="surveillance-chat-button button-effects" type="submit" value="Send" /><br/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SurveillanceComponent;
