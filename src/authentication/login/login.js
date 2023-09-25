import React, { useState , useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import login from '../../assets/images/login.png'
import Registration from "../registration/registration";
import axios from 'axios';
function Login() {
    const initialState = {email:'',password:'',forgotPassword:false};
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}");
    useEffect(() => {
        document.getElementsByClassName('nav-item active')[0].classList.remove('active');
        document.getElementById('authenticationTab').classList.add('active');
        if(userInfo && JSON.stringify(userInfo) !== '{}' && userInfo.User_Type) {
            window.location = `/${userInfo.User_Type}`
        }
        else {
            let element = document.getElementsByClassName('hide-section')
            if(element.length > 0) { element[0].classList.remove('hide-section') };
        }
    });
    const [state,setState] = useState({});
    const [credentials, setCredentials] = useState(initialState);
    function handleChange(event) {
        const { name, value } = event.target;
        setCredentials({...credentials,[name]:value })
        document.getElementById('invalid-cred').classList.add('d-none');
    }

    function onSignin(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/login.php',
            headers: {
                'content-type': 'application/json'
            },
            data: credentials
        })
            .then(result => {
                setState({
                    dataSent: result.data.sent,
                });
                document.getElementById('invalid-cred').classList.add('d-none');
                setCredentials(initialState);
                localStorage.setItem("userInfo", JSON.stringify(result.data));
                window.location = `/${result.data.User_Type}`
            })
            .catch(error => {
                setState({
                    error: error.message
                });
                setCredentials(initialState);
                document.getElementById('invalid-cred').classList.remove('d-none');
                console.log(state['error']);
            });
    }
    return (
        <Router>
            <Switch>
                <Route exact path='/registration'><Registration /></Route>
                <Route exact path='/authentication'>
                    {/* login section */}
                    <div className="d-flex flex-direction-row justify-around login-section fade hide-section">
                        <div className="image-container">
                            <img src={login} width="650px" height="550px" alt='loginimage' />
                        </div>
                        <div className="login-container">
                            <div className="d-flex justify-center login-header font-oswald">Welcome back</div>
                            <form className="d-flex flex-direction-column w-100" onSubmit={onSignin}>
                                <div className="d-flex flex-direction-column">
                                    <input type="email" id="email" name="email" placeholder="Email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" size="30" required 
                                        onInvalid={(event) => event.target.setCustomValidity('Please provide a valid email address')}
                                        onInput={(event) => event.target.setCustomValidity('')}
                                        value={credentials['email']} onChange={handleChange}/>
                                    <input type="password" id="password" name="password" placeholder="Password"
                                        minLength="8" required value={credentials['password']} onChange={handleChange}/>
                                </div>
                                <div className="d-flex flex-direction-column align-items-center">
                                    <button className="btn login-btn" type="submit">Sign in</button>
                                    <br />
                                    <div id="invalid-cred" className="d-none">Invalid Email address or Password!</div>
                                    <br />
                                    <p>Don't have an account yet? <Link className='link-style'
                                        to="/registration">Register</Link> here</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Login;