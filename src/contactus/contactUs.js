import React,{Component}from 'react'
import axios from 'axios'
import './contactUs.css'
// import '../../../Static website/src/themes/dark.css'
class ContactUs extends Component {
    componentDidMount(){
        document.getElementsByClassName('nav-item active')[0].classList.remove('active');
        document.getElementById('servicesTab').classList.add('active');
    }
    constructor(props){
        super(props)
        this.state = {
            fname:'',
            lname:'',
            email:'',
            PhoneNumber:'',
            query:'',
            mailSent:false,
            error:null
    };  
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
    validateForm (){
        let contactFname = document.forms["contactForm"]["fname"].value;
        let contactLname = document.forms["contactForm"]["lname"].value
        let contactPno = document.forms["contactForm"]["PhoneNumber"].value
        if (contactFname.length>25){
        alert("First Name cannot be more than 25 characters");
        document.contactForm.fname.focus();
        return false;
        }
        if (contactLname.length>25){
            alert("Last Name cannot be more than 25 characters");
            document.contactForm.lname.focus();
            return false
        }
        if (contactPno.length > 10){
            alert("Phone number should be less than 10 digits ");
            document.contactForm.PhoneNumber.focus();
            return false
        }
    }
    handleSubmit(event) {
        // console.log(this.state)
        event.preventDefault();
        this.validateForm()
        axios({
            method:'post',
            url:process.env.REACT_APP_API_PATH + '/contactUs.php',
            headers: {
                'content-type':'application/json'
            },
            data:this.state
        }).then(result => {
            console.log(result.data)
        }).catch(error => {
            this.setState({
                error: error.message
            })
        })
      }
    handleClear(event){
        event.preventDefault();
        this.setState({
            fname:'',
            lname:'',
            email:'',
            PhoneNumber:'',
            query:''
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="font-oswald heading"> Contact Us </div>
                </div>
                <div className="formContainer contact-form">
                    <div className="field-container">  
                    <div className="innerHeading">
                        <p>Your feedback matters. Write to us if you have any questions, queries or suggestions regarding any
                        page/content </p>
                    </div>  
                    <div className="form">
                        <form name="contactForm" className="d-flex flex-direction-column w-100" onSubmit={this.handleSubmit} encType="text/plain" required> 
                            <div className="d-flex flex-direction-row mediaPhone">
                                <input type="text" id="fname" name="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange} required/>
                                 <input type="text" id="lname" name="lname" placeholder="Last Name" value={this.state.lname}  onChange={this.handleChange} required/>    
                            </div>
                            <div className="d-flex flex-direction-row mediaPhone">
                                <input type="text" id="email" name="email" placeholder="E-mail" pattern="[^ @]*@[^ @]*" onInvalid={(event) => event.target.setCustomValidity('Please provide a valid email address Ex:aaa@google.com')} onInput={(event) => event.target.setCustomValidity('')} value={this.state.email} onChange={this.handleChange} required/>
                                <input type="number" id="PhoneNumber" name="PhoneNumber" minLength='10' maxLength='12' placeholder="Phone Number" value={this.state.PhoneNumber} onChange={this.handleChange}  required/>
                            </div>
                            <div className="d-flex flex-direction-row mediaPhone">
                                <textarea id="query" className="font-roboto" name="query" placeholder="Enter your query" value={this.state.query} onChange={this.handleChange}  required></textarea>
                            </div>
                            <div className="d-flex flex-direction-row buttons mediaPhone">
                                <button className="btn clear" type="reset" onClick={this.handleClear}>Clear</button>
                                <button className="btn submit" type="submit">Submit</button>
                            </div>
                        </form>   
                    </div>
                    </div>
                </div>
                <div>
                    {this.state.mailSent ? <p>Mail sent</p> : <p></p>}
                </div>
            </div>
        
        );
    }
}

export default ContactUs