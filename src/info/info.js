import React from "react";
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import laundryWoman from '../assets/images/laundry-women.png';
import arrowRight from '../assets/images/arrow-right-white.png';
import pickupDelivery from '../assets/images/pickup-delivery.png';
function HeaderInfo() {
    return (
        <Router>
        {/* Info section below header */}
            <section className='info-section-container'>
                <div className="d-flex flex-direction-row justify-around info-link">
                    <p>
                        <span className="font-oswald text-header"> We Wash, Dry and Iron your clothes</span><br /><br />
                        <span className="about-description">Care and quality are the core values of InstaWash dry cleaning and laundry
                            service.<br />
                            Our mission is to provide consistent, quality clothing care with a level of service that exceeds your
                            expectations</span><br />
                        <br /><Link to="/about" className="services-link">Read more about us <img className="arrow-right" alt='right arrow'
                            src={arrowRight} /></Link>
                    </p>
                    <img src={laundryWoman} alt='laundry and woman' />
                </div>
                <hr className="page-break" />
                <div className="d-flex flex-direction-row justify-around info-link">
                    <img src={pickupDelivery} alt='pickup and delivery'/>
                    <p>
                        <span className="font-oswald text-header">
                            And the cherry on top <br /> We do Pickup / Delivery </span><br /><br />
                        <Link className="services-link" to="/services">Explore our Services <img className="arrow-right" alt='right arrow'
                            src={arrowRight} /></Link>
                    </p>
                </div>
                <hr className="page-break" />
            </section>
            <Switch>
                <Route path='/about'></Route>
                <Route path='/services'></Route>
            </Switch>
        </Router>
    );
}

export default HeaderInfo;