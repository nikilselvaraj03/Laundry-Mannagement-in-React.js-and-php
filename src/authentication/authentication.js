import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './authentication.css'
import Login from "./login/login";
function Authentication() {
    return(
        <Router>
        <section className='authentication-section'>
        <Switch>
        <Route exact path='/authentication'><Login/></Route>
        </Switch>
        </section>
        </Router>
    )
}

export default Authentication;