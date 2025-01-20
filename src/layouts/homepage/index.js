import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import typography from "assets/theme/base/typography";
import React, { useState } from 'react';
import './Banner.css';
import './Protect.css'; 

import Bannerbg from './image/bannerbg.jpg';
import slide1 from './image/slide1.jpg';
import slide2 from './image/slide2.jpg';
import SoftBox from "components/SoftBox";
import calender  from './image/calender.jpg';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
import arrow from '../../assets/images/scroll.jpg';
import slide3 from './image/slide3.jpg';
import protect from './image/protect.jpg';
import CoverLayout from "layouts/authentication/components/CoverLayout";
import pdfFile from './image/blueprint.pdf';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { Link } from "react-router-dom";


import { BrowserRouter } from "react-router-dom";
function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);


  const slides = [
    { image: slide1 , text: 'Protect Their Tomorrow, Vaccinate Today.' },
    { image: slide2 , text: 'Shielding Futures, One Shot at a Time.' },
    { image: slide3, text: 'Vaccination: Small Needle, Big Protection.' }
  ];
 
  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + slides.length) % slides.length);
  };
  const openPdf = () => {
    window.open(pdfFile, '_blank');
  };
  
  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdfFile;
    link.download = 'blueprint.pdf';
    link.click();
  };
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const scrollToMiddle = () => {
    const middleOfPage = document.documentElement.scrollHeight / 2;
    window.scrollTo({ top: middleOfPage, behavior: 'smooth' });
  };
  const images = [
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-18_0.jpg.webp?itok=azMM4EGX",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-19.jpg.webp?itok=WWb4-pig",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-20.jpg.webp?itok=13INv3_e",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-21_0.jpg.webp?itok=-rGZRfDb",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-22_1.jpg.webp?itok=K1xWIr9w",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-23_0.jpg.webp?itok=z67O56os",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-24.jpg.webp?itok=5MgwMvRM",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-25.jpg.webp?itok=raCYXKdY",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-26.jpg.webp?itok=EsBzMye4",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-27.jpg.webp?itok=R2mBhPSf",
    "https://www.unicef.org/india/sites/unicef.org.india/files/styles/media_large_image/public/Immunization%20Schedule%20-%20FB-28.jpg.webp?itok=1q_rpOFo"
  ];


  
    return (
        
       <div>
        <DefaultNavbar />
     <br></br> <br></br>
     <br></br> <br></br>
        <section >
           <div className="carouselbanner"  >
             <div className="carousel-slide">
               <img src={slides[slideIndex].image} alt="Slide" />
               
             <div className="carousel-text">
          {/* <h2>Slide {slideIndex + 1}</h2> */}
          
              <Link to="/authentication/sign-up">
                <button className="register-button">Register</button>
              </Link>

          <p>{slides[slideIndex].text}</p>
        </div>
      </div>
       
      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>
      <button className="scroll-button" onClick={scrollToMiddle}>
      <img src={arrow} alt="Down Arrow" />
      </button>
    </div>
        </section>
        <section>

        <div style={{marginLeft:"5%", marginRight:"5%"}}>

<div >
  <br/>
  <br/>
      <h1 className="protect_taital">Why Immunization ?</h1>
      <p className="protect_text">During the vulnerable years from birth to age 12, children face risks from various diseases due to underdeveloped immune systems. Vaccination offers crucial protection against these diseases, preventing serious consequences and transmission to others.</p>
    </div>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', }}>
  <div style={{ flex: 0.8 }}>
    <img src={protect} alt="Image" style={{ maxWidth: '85%', height: '70%' }} />
  </div>
  <div style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center',marginLeft: '50px' }}>
    <div>
      <ul>
        <li><h1 className="hands_text">Protection against diseases like Hepatatis,<br />Polio and others</h1> </li>
        <li><h1 className="hands_text">As of 2022 there are still 20.5 million<br /> children missing out on lifesaving vaccines globally</h1> </li>
        <li><h1 className="hands_text">Avoid touching eyes,<br />nose and mouth</h1> </li>
      </ul>
    </div>

  </div>
</div >
      
</div>
        </section>
        <section>
        <div style={{marginLeft:"5%", marginRight:"5%",marginTop:"5%"}}>
        <h1 className="protect_taital" >When and How ?</h1>
<br/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', }}>

        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginLeft: '5px',marginTop:"28px" }}>
        
        <br/>
            <p className="protect_text">The process of vaccination in India begins from the day of birth itself. This continues till the age of 16 with a span of days, weeks sometimes even months or years. A proper scheduled chart is provided here.</p>
          
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <button onClick={openPdf} className="chart-button" >Chart</button>
        <button onClick={downloadPdf} className="download-button">Download</button>
      </div></div>
      <div style={{ flex: 1 }}>
        <img src={calender} alt="Chart Image" style={{ maxWidth: '90%', height: '75%'  }}/>
      </div>

      </div>
    </div>
        </section>
                




        <section className='slider'>
        <div style={{ position: 'relative', maxWidth: '50%', maxHeight: '50%', margin: 'auto', marginTop: '50px' }}>
          <h2 style={{ textAlign: 'center' }}>Know your child&apos;s vaccination schedule</h2>
          
          <Carousel autoPlay={false} infiniteLoop showThumbs={false} showStatus={false} interval={2000} selectedItem={currentIndex}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
          <div className="button-container left">
            <button onClick={handlePreviousImage}>❮</button>
          </div>
          <div className="button-container right">
            <button onClick={handleNextImage}>❯</button>
          </div>

        </div>
      </section>
      <section>
        <div className="update_section">
          <div className="infocontainer">
            <h1 className="update_taital">Stay Informed, Protect Your Little Ones</h1>
            <p className="lorem_text">Register Now for Timely Vaccination Reminders & Essential Vaccine Information!</p>
            <br />
            <Link to="/authentication/sign-in">
              <button className="register-button">Sign In</button>
            </Link>
          </div>
        </div>
      </section> 

      <section className="footer">
        <div className="row">
          <div className="column">
            <h3 className="footer-heading">Resources</h3>
            <br/>
            <ul className="footer-list">
              <li><a href="https://www.unicef.org/india/stories/know-your-childs-vaccination-schedule">Unicef</a></li>
              <li><a href="https://www.who.int/health-topics/vaccines-and-immunization#tab=tab_1">World Health Organization</a></li>
              <li><a href="https://www.apollocradle.com/specialities/paediatrics/immunization/vaccination-schedule/">Apollo</a></li>
              <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4928529/">National Institutes of Health</a></li>
              <li><a href="https://iapindia.org/vaccine-information/">Indian Academy of Paediatrics</a></li>
            </ul>
          </div>
          <div className="column"><h3 className="footer-heading">About</h3>
          <br/>
            <p>We endeavor to build stronger immunities.</p>
            <p>Because, We Care ❤️</p></div>
          <div className="column">
            <h3 className="footer-heading">Contact Us</h3>
            <br/>
            <ul className="footer-list">
              <li>Call +91 1234567890</li>
              <li>nixx@gmail.com</li>
            </ul></div>
        </div>
      </section>
      
</div>
    );
  }
  
  export default Home;
  