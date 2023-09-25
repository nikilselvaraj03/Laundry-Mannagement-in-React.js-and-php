import React,{useEffect} from 'react'
import VisitorSideMenu from '../visitorSideMenuBar/visitorsidemenu'
import validateSession from "../session/session";
function Visitor () {
    useEffect(() => {
        validateSession('Visitor');
        document.getElementsByClassName('nav-item active')[0].classList.remove('active');
        document.getElementById('authenticationTab').classList.add('active');
    });
    return(
        <section className="visitor-page hide-section">
        <VisitorSideMenu/>
        </section>
    )
}
export default Visitor