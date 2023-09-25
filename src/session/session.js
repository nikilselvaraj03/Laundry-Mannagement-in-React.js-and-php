export default function validateSession(sessionType) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    if (userInfo && userInfo.User_Type &&
        sessionType === userInfo.User_Type) {
        let element = document.getElementsByClassName('hide-section');
        if(element.length > 0) {element[0].classList.remove('hide-section');}
        document.getElementById('logout-tab').classList.remove('d-none');
        document.getElementById('logout-tab').classList.add('logout-tab');
        document.getElementById('authenticationTab').childNodes[0].innerText = `${userInfo.First_Name} ${userInfo.Last_Name}`;
        return true;
    } else {
        window.location = "/authentication";
    }
}


export function logout() {
    localStorage.setItem("userInfo",'');
    document.getElementById('logout-tab').classList.remove('logout-tab');
    document.getElementById('logout-tab').classList.add('d-none');
    document.getElementById('authenticationTab').childNodes[0].innerText = 'Login/Register'; 
    window.location = "/authentication";
}