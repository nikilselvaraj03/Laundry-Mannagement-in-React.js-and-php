import axios from 'axios'
import React, { Component } from 'react'
import './registerIncident.css'
class RegisterIncident extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      phoneNumber: '',
      register: '',
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }
  handleClear() {
    this.setState({
      fname: '',
      lname: '',
      email: '',
      phoneNumber: '',
      register: '',
      query: ''
    })
  }
  handleSubmit(event) {
    console.log("State Data" + JSON.stringify(this.state))
    event.preventDefault();
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_PATH + '/registerIncident.php',
      headers: {
        'content-type': 'application/json'
      },
      data: this.state
    }).then(result => {
      console.log("Data posted " + result.data);
      var x = document.getElementById("snackbar-register");
      x.className = "show";
      x.innerText ="Registration Sucessfull"
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      this.handleClear();
    }).catch(err => {
      console.log(err.message)
      var x = document.getElementById("snackbar-register");
      x.className = "show danger";
      x.innerText = 'Request not submitted';
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 5000);
    })
  }
  render() {
    return (
      <div>
        <div id="registerIncident" className="info-content">
          <div className="font-oswald d-flex flex-direction-row w-100  justify-center sideNavHeader">Register Incident and
            Requests</div>
          <div className="form">
            <form className="d-flex flex-direction-column w-100 align-items-center register-incident-form" onSubmit={this.handleSubmit} encType="text/plain">
              <div className="d-flex flex-direction-column register-container">
                <div className="d-flex flex-direction-row justify-center media">
                  <input type="text" id="fname" name="fname" placeholder="First Name" maxLength='25' value={this.state.fname} onChange={this.handleChange} required />
                  <input type="text" id="lname" name="lname" placeholder="Last Name" maxLength='25' value={this.state.lname} onChange={this.handleChange} required />
                </div>
                <div className="d-flex flexdirection-row justify-center media">
                  <input type="text" id="email" name="email" placeholder="Email" 
                  value={this.state.email} onChange={this.handleChange} 
                  pattern="[^ @]*@[^ @]*" onInvalid={(event) => event.target.setCustomValidity('Please provide a valid email address Ex:aaa@google.com')} 
                  onInput={(event) => event.target.setCustomValidity('')}
                  required />
                  <input type="number" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" minLength='10' maxLength='12' value={this.state.phoneNumber} onChange={this.handleChange} required />
                </div>
                <div className="d-flex flexdirection-row justify-center media">
                  <select name="register" id="register" className="font-roboto registerSelect" value={this.state.register} onChange={this.handleChange} required>
                    <option hidden >Select one...</option>
                    <option value="Incident">Register an Incident</option>
                    <option value="Request">Register a Request</option>
                  </select>
                </div>
                <div className="d-flex flexdirection-row justify-center media ">
                  <textarea id="query" className="font-roboto registerTextArea" name="query" placeholder="Enter your query" value={this.state.query} onChange={this.handleChange}></textarea>
                </div>
                <div className="d-flex w-100 flexdirection-row justify-center">
                  <button className="btn clear" type="reset" onClick={this.handleClear}>Clear</button>
                  <button className="btn submit" type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="snackbar-register">
        </div>
      </div>
    )
  }
}

export default RegisterIncident