import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Footer.css';
import instagram from '../assets/images/instagram.png'
import facebook from '../assets/images/facebook.png'
import twitter from '../assets/images/twitter.png'
import yelp from '../assets/images/yelp.png'
// import Home from './Home';
function Footer() {
return(
    //footer containing links and copyright information 
    <Router>
    <footer className="w-100 d-flex flex-direction-column align-items-center">
      <div className="social-media-links d-flex flex-direction-row justify-around">
        <Link to='/'><img src= {instagram} alt='logo-instagram'/></Link>
        <Link to='/'><img src= {facebook} alt='logo-facebook'/></Link>
        <Link to='/'><img src= {twitter} alt='logo-twitter'/></Link>
        <Link to='/'><img src= {yelp} alt='logo-yelp'/></Link>
      </div>
      <ul className="footer-links d-flex flex-direction-row justify-around">
        <li className="footer-link-item"><Link to='/'>Home</Link></li>
        <li className="footer-link-item"><Link to='/'>Services</Link></li>
        <li className="footer-link-item"><Link to='/'>About</Link></li>
        <li className="footer-link-item"><Link to='/'>Terms</Link></li>
        <li className="footer-link-item"><Link to='/'>Privacy Policy</Link></li>
      </ul>
      <p className="copyright d-flex justify-center">InstaWash © 2021. All Rights Reserved.</p>
    </footer>
    </Router>);
}

export default Footer;