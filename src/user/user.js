import React, {useEffect} from 'react'
import UserSideMenu from '../sideMenuBar/SideMenuBar'
import validateSession from "../session/session";
function User () {
    
    useEffect(() => {
        validateSession('User');
        document.getElementsByClassName('nav-item active')[0].classList.remove('active');
        document.getElementById('authenticationTab').classList.add('active');
    });
    return(
        <section className="user-page hide-section">
        <UserSideMenu/>
        </section>
    )
}
export default User