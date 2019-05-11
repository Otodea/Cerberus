import React, { Component } from 'react';
import './Contact.css';
import $ from 'jquery';

class ContactComponent extends Component {

    constructor(props) {
      super(props);
      this.state = {
        comment: '',
        email: '',
        name: '',
        isDone: false,
        emptyMessage: '',
        emailMessage: ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

    handleCommentChange(event) {
      this.setState({comment: event.target.value});
    }

    sendComment() {
      $.post("http://38.88.74.71:80/writecomment", {name: this.state.name, email: this.state.email, comment: this.state.comment});
    }

    handleSubmit(event) {
      if (this.state.comment === '' || this.state.email === '' || this.state.name === '') {
        this.setState({emptyMessage: 'Please fill out all fields!', emailMessage: ''});
      } else if(!validateEmail(this.state.email)) {
        this.setState({emptyMessage: '', emailMessage: 'Please enter a valid email!'});
      } else {
        this.setState({isDone: true});
        this.sendComment();
      }
      event.preventDefault();
    }
/*    componentDidUpdate () {
      alert(document.querySelector('input[name=myRadio]:checked').value);
    }
*/
    render() {



    if(this.state.isDone === false){
      return (


        <div className = "contact-page">


        <div className="header-image">
          <div className="container-fluid">
              <h1 className="index-landing-header"><b>Contact Us</b> </h1>
          </div>
        </div>


        <div className="row">
        <div className="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
          <div className= "info-contact col-md-6 col-sm-12">

          <h2> <font size="6" face="Quicksand">Contact Us<br/></font></h2>


          <font size="4" color="#aa784d">EMAIL: </font>
          <font size="4" color="#9ba0a3">info@cerberus.com</font>

          <br />

          <font size="4" color="#aa784d">PHONE: </font>
          <font size="4" color="#9ba0a3">1.604.764.9134</font>

          <br />

          <h4 className="contact-info">Cerberus is committed to provide its customers with the best products possible. In case of any questions or concerns, please use the provided
          space below or otherwise, email us directly at info@cerberus.com We will be more than happy to hear from you. </h4>
          ​
          </div>


          <div className= "contactUs-contact col-md-6 col-sm-12">

            <form onSubmit={this.handleSubmit}>

              <label>
                Name
              </label>
              <br />
              <input className="contact-form-textbox" type="text" value={this.state.name} onChange={this.handleNameChange} />


              <br/><br/>

              <label>
                Email
              </label>
              <br />
              <input className="contact-form-textbox" type="text" value={this.state.email} onChange={this.handleEmailChange} /><br/>
              <span className="error-message">{this.state.emailMessage}</span>


              <br/>

              <label>
                Comment
              </label>
              <br />
              <textarea className="contact-form-textbox contact-form-textarea" value={this.state.comment} onChange={this.handleCommentChange} />

              <br/ >

            <input className="contact-button button-effects" type="submit" value="Submit" /><br />
            <span className="error-message">{this.state.emptyMessage}</span><br/>
          </form>


          </div>
        </div>
</div>

          <br/> <br/> <br/>

          <div className= "row">
          <h1> Give Us A Visit Today!  </h1>

          <br/ >
          </div>

          <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d2603.7724066228075!2d-123.25154148418177!3d49.261759579329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x548672ca2d57b88b%3A0xf3a83ff5b054ce4d!2sMacleod+Bldg%2C+2356+Main+Mall%2C+Vancouver%2C+BC+V6T+1Z4!3m2!1d49.2616124!2d-123.24936779999999!5e0!3m2!1sen!2sca!4v1522539358560"
           title="google-maps" className ="map-contact"  allowFullScreen ></iframe>


        </div>


      );

      }


      else{
        return (
          <div className = "contact-page">
          <div className="header-image">
            <div className="container-fluid">
                <div className="col-lg-6 col-lg-offset-3 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                <h1 className="index-landing-header"><b>Contact Us</b> </h1>
              </div>
            </div>
          </div>




            <div className= "info-contact col-lg-4 col-lg-offset-1 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">

            <h2> <font size="6" face="Quicksand">Contact Us<br/></font></h2>


            <font size="4" color="#aa784d">EMAIL /</font>
            <font size="4" color="#9ba0a3">info@cerberus.com</font>

            <br />

            <font size="4" color="#aa784d">PHONE /</font>
            <font size="4" color="#9ba0a3">1.604.764.9134</font>

            <br />

            <h4>Cerberus is committed to provide its customers with the best products possible. In case of any questions or concerns, please use the provided
            space below or otherwise, email us directly at info@cerberus.com We will be more than happy to hear from you. </h4>
            ​
            </div>


            <div className= "contactUs-contact col-lg-6 col-lg-offset-1 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">

              <h3>Thank you. Your information has been submitted. </h3>


            </div>


            <br/> <br/> <br/>

            <div className= "col-lg-6 col-lg-offset-3 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
            <h4> Give Us A Visit Today!  </h4>

            <br/ >
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d2603.7724066228075!2d-123.25154148418177!3d49.261759579329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x548672ca2d57b88b%3A0xf3a83ff5b054ce4d!2sMacleod+Bldg%2C+2356+Main+Mall%2C+Vancouver%2C+BC+V6T+1Z4!3m2!1d49.2616124!2d-123.24936779999999!5e0!3m2!1sen!2sca!4v1522539358560"
             title="google-maps" className ="map-contact"  allowfullscreen ></iframe>


          </div>


        );

        }

    }
  }

  function validateEmail(email) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(String(email).toLowerCase());
  }

export default ContactComponent;
