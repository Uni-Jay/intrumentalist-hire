import React from 'react'
import Navbar from '../Navbar/Navbar'
import "./Header.css";
import { Link } from 'react-router-dom';


const Header = () => {



  return (
        <header className="relative overlay flex flex-col bg-cover bg-no-repeat bg-fixed min-h-[100vh] z-[2]" style={{
            backgroundImage: 'url("/images/instrument-hero3.jpg")'
        }}>
        <Navbar/>
        

            <section className="z-[20] md:w-[90%] md:mx-auto animate__animated animate__slideInLeft grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <div className="flex flex-col gap-5 my-20 md:p-0 p-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-4xl md:text-7xl font-bold text-white">Hire the best</h3>
                        <h3 className="text-2xl md:text-4xl font-bold text-white">Instrumentalist here</h3>
                        <p className="text-white text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, doloribus. Ipsam eius provident minus nisi hic sequi libero.</p>
                    </div>
                    <div className='w-full flex justify-start items-center gap-5'>
                        <Link to="/services" className="bg-primary shadow-lg shadow-[rgba(255,255,255,0.6)] py-3 px-5 rounded-md text-white font-medium">Find Instrumentalist</Link>
                        <Link to="/auth/login" className="bg-white shadow-lg shadow-[rgba(255,255,255,0.6)] py-3 px-5 rounded-md text-primary font-semibold">Be Hired</Link>
                    <div/>

                </div>
            </div>
        </section>
    </header>
  )
}

export default Header