import React, {useEffect} from 'react'
import './service.css'
import laundry from '../assets/images/laundry.png'
import laundryWomen from '../assets/images/laundry-women.png'
import pickUp from '../assets/images/pickup-delivery.png'
function Service() {
    useEffect(() => {
        document.getElementsByClassName('nav-item active')[0].classList.remove('active');
        document.getElementById('servicesTab').classList.add('active');
    });
    return (
        <div>
            <div className="container">
                <div className="font-oswald heading"> Services </div>
            </div>
            <div className="flex-container">
                <div className="inner-flex-container" style={{ backgroundColor: "#3e3e3e", maxWidth: "30%" }}>
                    <div className="responsive"><img src={laundry} style={{ height: "100%", width: "100%", objectFit: "contain" }} alt='laundry'/></div>
                    <div className="services-heading"><p className="font-oswald" style={{ fontSize: "1.5rem" }}>Get your clothes washed and delivered in no time.</p></div>
                    <div className="services-text"><p >No more wait times. No more hassle. Do your laundry at ease with Instawash.<br></br>
                        Your one-stop solution for getting your clothes washed, dried , ironed and delivered at your doorstep.</p></div>
                </div>
                <div className="inner-flex-container" style={{ backgroundColor: "#3e3e3e", maxWidth: "30%" }}>
                    <div className="responsive"><img src={laundryWomen} style={{ height: "100%", width: "100%", objectFit: "contain" }} alt='laundryWomen' /></div>
                    <div className="services-heading"><p className="font-oswald" style={{ fontSize: "1.5rem" }}>We Wash, Dry and Iron your clothes</p></div>
                    <div className="services-text"><p >Care and quality are the core values of InstaWash dry cleaning and laundry
                        service.<br></br>
                        Our mission is to provide consistent, quality clothing care with a level of service that exceeds your
                        expectations</p></div>
                </div>
                <div className="inner-flex-container" style={{ backgroundColor: "#3e3e3e", maxWidth: "30%" }}>
                    <div className="responsive"><img src={pickUp}  style={{ height: "100%", width: "100%", objectFit: "contain" }} /></div>
                    <div className="services-heading"><p className="font-oswald" style={{ fontSize: "1.5rem" }}>We do Pickup / Delivery</p></div>
                    <div className="services-text"><p >Explore our Services</p></div>
                </div>
            </div>
        </div>
    )
}
export default Service