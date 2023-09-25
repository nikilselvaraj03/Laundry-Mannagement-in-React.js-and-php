import React from 'react'
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Chat from '../chat/chat';
import RegisterIncident from '../registerIncident/registerIncident';
import ScheduleDrop from '../scheduleDrop/scheduleDrop';
import ScheduleHistory from '../scheduleHistory/scheduleHistory';
import './visitorsidemenu.css'
function Visitorsidemenu() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}");
    return (
        <div>
            <Router>
            <div className="d-flex flex-direction-row container">
                <div className="font-oswald heading"> Hello {userInfo.First_Name} {userInfo.Last_Name} </div>
            </div>
            <div className="user-dashboard-container h-100 d-flex flex-direction-row">
                <div className="sideNav">
                    <ul className="d-fle flex-direction-column space-between">
                        <li className="sideNavItem " id="order">
                            <Link className="sideNav-link" name="ScheduleDrop" to="/visitor">Schedule a Drop</Link>
                        </li>
                        <li className="sideNavItem" id="register" >
                            <Link className="sideNav-link" name="registerIncident" to="/Register">Register an Incident</Link>
                        </li>
                        <li className="sideNavItem" id="schedulehistory">
                            <Link className="sideNav-link" name="history" to="/scheduleHistory">Schedule History</Link>
                        </li>
                        <li className="sideNavItem" id="chat">
                            <Link className="sideNav-link" name="chats" to="/Chat">Chat</Link>
                        </li>
                    </ul>
                </div>
                <section className='d-flex w-100 justify-center'>
            <Switch>
                <Route exact path='/visitor'><ScheduleDrop/></Route>
                <Route exact path='/Register'><RegisterIncident/></Route>
                <Route exact path='/scheduleHistory'><ScheduleHistory/></Route>
                <Route exact path='/Chat'><Chat/></Route>
            </Switch>
            </section>
            </div>
            
        </Router>
        </div>
    )
}
export default Visitorsidemenu