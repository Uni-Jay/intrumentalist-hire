import React from 'react';
import ContactSection from '../Contact_section/ContactSection';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';



const Contact = () => {
  return (
    <div className='w-full bg-gradient-to-br from-[#020024] via-[#090979] to-[#00d4ff]'>
      <div className='pt-6'>
        <Navbar/>
      </div>
      <div className='items-center flex justify-center py-10 animate__animated animate__slideInDown'>
        <h3 className="text-3xl md:text-4xl font-bold text-white">CONTACT</h3>
      </div>
      <div className=''>
        <ContactSection/>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact