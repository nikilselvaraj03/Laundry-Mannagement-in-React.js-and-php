import React from 'react'
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Chat from '../chat/chat';
import OrdersHistory from '../orderHistory/ordersHistory';

import PlaceOrder from '../placeorder/placeorder';
import RegisterIncident from '../registerIncident/registerIncident';
import SubscribeService from '../subscribeService/subscribeService';
import './SideMenuBar.css'
function SideMenuBar () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}");
    // console.log(userInfo)
    return (
        <Router>
            <div className="d-flex flex-direction-row container">
                <div className="font-oswald heading "> Hello {userInfo.First_Name} {userInfo.Last_Name} </div>
            </div>
            <div className="user-dashboard-container h-100 d-flex flex-direction-row">
                <div className="sideNav">
                    <ul className="d-fle flex-direction-column space-between">
                        <li className="sideNavItem " id="order">
                            <Link className="sideNav-link" name="place-order" to="/user">Place Order</Link>
                        </li>
                        <li className="sideNavItem" id="subscribe" >
                            <Link className="sideNav-link" name="subscribeService" to="/Subscribe">Subscribe to Service</Link>
                        </li>
                        <li className="sideNavItem" id="register" >
                            <Link className="sideNav-link" name="registerIncident" to="/Register">Register an Incident</Link>
                        </li>
                        <li className="sideNavItem" id="history">
                            <Link className="sideNav-link" name="history" to="/History">Order History</Link>
                        </li>
                        <li className="sideNavItem" id="chat">
                            <Link className="sideNav-link" name="chats" to="/Chat">Chat</Link>
                        </li>
                    </ul>
                </div>
                <section className='d-flex w-100 justify-center'>
            <Switch>
                <Route exact path='/user'><PlaceOrder/></Route>
                <Route exact path='/Subscribe'><SubscribeService/></Route>
                <Route exact path='/Register'><RegisterIncident/></Route>
                <Route exact path='/History'><OrdersHistory/></Route>
                <Route exact path='/Chat'><Chat/></Route>
            </Switch>
            </section>
            </div>
        </Router>
    )
}
export default SideMenuBar