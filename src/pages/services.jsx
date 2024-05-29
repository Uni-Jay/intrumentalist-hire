import React from 'react'
import ServicesSection from '../Services/ServicesSerction'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Services = () => {
  return (
    <div className=''>
      <Navbar/>
      <div className='items-center flex justify-center pt-8 animate__animated animate__slideInDown'>
        <h3 className="text-3xl md:text-4xl font-bold text-primary">SERVICE</h3>
      </div>
      <div className=' bg-white pb-10'>
        <ServicesSection/>
      </div>
      <Footer/>
    </div>
  )
}

export default Services