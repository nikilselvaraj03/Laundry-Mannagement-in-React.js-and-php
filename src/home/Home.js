import React, {useEffect} from "react";
import Carousel from "../carousel/carousel";
import HeaderDescription from "../description/description";
import HeaderInfo from "../info/info";
import './Home.css'
import Footer from "../footer/Footer";
function Home() {
  useEffect(() => {
      document.getElementsByClassName('nav-item active')[0].classList.remove('active');
      document.getElementById('homeTab').classList.add('active');
  });
  return (
    <section className='info-section-container '>
      <HeaderDescription />
      <HeaderInfo/>
      <Carousel/>
      <Footer/>
    </section>
  );
}
export default Home;