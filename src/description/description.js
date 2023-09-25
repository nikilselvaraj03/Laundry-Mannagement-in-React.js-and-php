import React from "react";
import laundry from '../assets/images/laundry.png'
function HeaderDescription() {
  return (
    // header seaction describing Instawash 
    <div className="poster d-flex justify-around">
      <img src={laundry} height="400" width="400" alt='laundy-done'/>
      <div className="d-flex flex-direction-column justify-center">
        <p className="font-oswald text-header">Get your clothes washed and delivered in no time.</p>
        <p className="text-description">No more wait times. No more hassle. Do your laundry at ease with Instawash.<br />
          Your one-stop solution for getting your clothes washed, dried , ironed and delivered at your doorstep.</p>
      </div>
    </div>
  );
}

export default HeaderDescription;