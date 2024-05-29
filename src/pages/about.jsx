import React from 'react';
import AboutSection from '../About_section/AboutSection';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Aboutus from '../About_section/About';



const About = () => {
  return (
    <div>
      <div className='w-full bg-gradient-to-br from-[#020024] via-[#090979] to-[#00d4ff]' >
        <div className='pt-6'>
          <Navbar/>
        </div>
        <div className='items-center flex justify-center py-20 animate__animated animate__slideInDown'>
          <h3 className="text-3xl md:text-4xl font-bold text-white font-inter">ABOUT US</h3>
        </div>
      </div>
      <div className=''>
        <Aboutus/>
      </div>
      <Footer/>
    </div>
  )
}

export default About