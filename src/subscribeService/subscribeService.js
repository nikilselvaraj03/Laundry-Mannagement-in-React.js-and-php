import axios from 'axios'
import React, { Component } from 'react'
import './subscribeService.css'
class SubscribeService extends Component {
  constructor(props){
    super(props)
    this.state = {
      fname:'',
      lname:'',
      email:'',
      phoneNumber:'',
      subscribe:'',
      plan:'',
      day:'',
      address:'',
      city:'',
      State:'',
      customerID:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    })
  }
  handleClear(event){
    this.setState({
      fname:'',
      lname:'',
      email:'',
      phoneNumber:'',
      subscribe:'',
      plan:'',
      day:'',
      address:'',
      city:'',
      State:''
    })
  }
  handleSubmit(event){
    console.log("State Data"+JSON.stringify(this.state))
    event.preventDefault();
    // this.setState({
    //   customerID:localStorage.getItem("userInfo").ID
    // })
    axios({
        method:'post',
        url:process.env.REACT_APP_API_PATH + '/subscribeService.php',
        headers: {
            'content-type':'application/json'
        },
        data:this.state
    }).then(result => {
        console.log("Data posted "+result.data);
            var x = document.getElementById("snackbar-service");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            this.handleClear();
    }).catch(error => {
      console.log(error.message)
      var x = document.getElementById("snackbar-service");
      x.className = "show danger";
      x.innerText = 'Subscription Failed';
      setTimeout(function(){
           x.className = x.className.replace("show", "");
      }, 5000);
    })
  }
  render() {
    return (
      <div>
        <div id="subscribeService" className="info-content">
          <div className="font-oswald d-flex flex-direction-row w-100  justify-center sideNavHeader"> Subscribe to a Service
          </div>
          <div className="form">
            <form className="d-flex flex-direction-column w-100 align-items-center subscribe-form" encType="text/plain" onSubmit={this.handleSubmit}>
              <div className="d-flex flex-direction-column subscribe-container">
                <div className="d-flex flex-direction-row justify-center media">
                  <input type="text" id="fname" name="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange} required />
                  <input type="text" id="lname" name="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleChange} required />
                </div>
                <div className="d-flex flex-direction-row justify-center media">
                  <input type="text" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}  required />
                  <input type="number" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={this.state.phoneNumber} onChange={this.handleChange} required />
                </div>
                <div className="d-flex flex-direction-row justify-center media">
                  <select name="subscribe" id="subscribe" className="font-roboto subscribeSelect" value={this.state.subscribe} onChange={this.handleChange} required>
                    <option hidden >Services</option>
                    <option value="Pick Up">Pick Up</option>
                    <option value="Delivery">Delivery</option>
                    <option value="PickUpDelivery">Pick Up and Delivery</option>
                  </select>
                  <select name="plan" id="plan" className="font-roboto subscribeSelect" value={this.state.plan} onChange={this.handleChange}>
                    <option hidden >Subscription Type</option>
                    <option value="Weekly Once">Weekly Once</option>
                    <option value="Once Every two weeks">Once every two weeks</option>
                    <option value="Montly">Montly</option>
                  </select>
                  <select name="day" id="day" className="font-roboto subscribeSelect" value={this.state.day} onChange={this.handleChange}>
                    <option hidden >Select Prefered Day</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div className="d-flex flex-direction-row justify-center media">
                  <input type="text" id="address" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} required />
                  <input type="text" id="city" name="city" placeholder="City" required value={this.state.city} onChange={this.handleChange}/>
                  <input type="text" id="State" name="State" placeholder="State" value={this.state.State} onChange={this.handleChange} required />
                </div>
                <div className="d-flex w-100 flexdirection-row justify-center subscribeButton">
                  <button className="btn clear" type="reset" onClick={this.handleClear}>Clear</button>
                  <button className="btn subscribe" type="submit">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="snackbar-service">
          Subscription added
        </div>
      </div>
    )
  }
}
export default SubscribeService