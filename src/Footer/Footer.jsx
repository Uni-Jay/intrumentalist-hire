import React from "react";
import { FiPhoneIncoming } from "react-icons/fi";
import { CgMail } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import IconItems from "./IconItems";
import { BiHomeAlt } from "react-icons/bi";
import { TiBook } from "react-icons/ti";
import { GrServices } from "react-icons/gr";
import { MdOutlinePhoneInTalk, MdOutlineCancel } from "react-icons/md";
import NavItem from "../Navbar/NavItem";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineCopyright } from "react-icons/md";
import FotItems from "./FotItems";
import { FaFacebook,  FaTwitter} from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";


const Footer =() => {

  const navItems = [
    {
        display: "Home",
        to: "/home",
        color: "text-white",
        icon: <BiHomeAlt color={"text-gray-700"}style={{
            fontSize: 16
        }}/>
    },

    {
        display: "About",
        to: "/about",
        color: "text-white",
        icon: <TiBook color={"text-gray-700"}style={{
            fontSize: 16
        }}/>
    },

    
    {
        display: "Services",
        to: "/services",
        color: "text-white",
        icon: <GrServices color={"text-gray-700"} style={{
            fontSize: 16
        }}/>
    },

    {
        display: "Contact",
        to: "/contact",
        color: "text-white",
        icon: <MdOutlinePhoneInTalk color={"text-gray-700"} style={{
            fontSize: 16
        }}/>
    },
  ]
  const items = [
    {
      display: "Copyright 2023 | MiH",
      color: "text-white",
      icon: "",
    }
  ]
  const iconItems = [
    {
      display: "+234-907-605-2317",
      color: "text-white",
      icon: <FiPhoneIncoming color={"text-gray-700"} style={{
          fontSize: 16
      }}/>
    },
    {
      display: "info@MiF.com",
      color: "text-white",
      icon: <CgMail color={"text-gray-700"} style={{
          fontSize: 16
      }}/>
    },
    {
      display: "Lagos-road, Ikorodu, Lagos, Nigeria.",
      color: "text-white",
      icon: <ImLocation color={"text-gray-700"} style={{
          fontSize: 16
      }}/>
    },
  ]
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-950 flex flex-col bg-cover bg-no-repeat bg-fixed md bottom-0">
        <div className=" md:w-[90%] md:mx-auto gap-10 p-4 md:py-10 p">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg-20 ">
              <div className="lg:flex justify-start flex flex-col lg:flex-col gap-8 animate__animated animate__slideInLeft">
                <div className="relative lg:my-0 mb-4 flex justify-start items-start">
                  <h3 className="text-4xl md:text-4xl text-white font-semibold font-playpen">MiH</h3>
                </div>
                
                <div className="w-full my-4 lg:my-2 gap-5 flex flex-col">
                  <p className="text-white flex justify-center items-center text-sm">
                    Music Instrumentalist Hire (MiH) was created in order to put end to any disappointment 
                  </p>
                  <div className="text-white flex flex-col gap-3 items-start justify-start">
                    {iconItems &&
                        iconItems.map((item, i) => (
                            <IconItems
                                key={i} 
                                display={item.display}
                                icon={item.icon}
                            />
                        ))
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 animate__animated animate__slideInUp">
                <div className="w-full my-16 lg:my-2 gap-6 md:items-start lg:flex md:justify-start flex  lg:items-center flex-col">
                  <h5 className=" my-2 lg:my-0 font-bold text-white text-2xl">
                    Quick Link
                  </h5>
                  <div className="flex flex-col gap-8 text-white">
                    {navItems &&
                      navItems.map((item, i) => (
                        <NavItem
                          key={i} 
                          display={item.display}
                          path={item.to}
                          icon={item.icon}
                        />
                      ))
                    }
                  </div>
                  </div>
                </div>              
                  <div className="flex flex-col gap-5 animate__animated animate__slideInRight">
                    <div className="text-white gap-7">
                      <h3 className="my-4 lg:my-0 font-bold text-white text-2xl">Get Latest Updates</h3>
                      <p>Sign Up to our Newsletter</p>
                    </div>
                    <div className="bg-white flex sm:flex-row justify-between items-center w-full rounded-full focus-within:border-solid focus-within:border-white focus-within:border-2 p-1 my-5 overflow-hidden">
                      <input placeholder="Enter Your Email" name="newsletter" type="text" className="border-none outline-none text-black w-full block sm:w-auto px-4 text-[1rem] mb-2 sm:mb-0"/>
                      <button className="bg-primary rounded-full grid grid-cols-2 md:flex md:items-center p-2 sm:w-[30%] w-full gap-2">
                        <span className="text-white font-semibold text-sm">Send</span>
                        <RiSendPlaneFill className="text-white  text-lg"/>
                      </button>
                    </div>
                  </div>
              
              </div>
          <hr className="border-t-[1px] border-solid border-white lg:my-4 w-[90%] flex 
          justify-center items-center"
          />
        </div>
        <section className="md:w-[90%] md:mx-auto gap-10 grid grid-col-1 md:grid-cols-2 mb-8 p-2 md:p-0">
          <div className="text-white text-xl font-playpen animate__animated animate__slideInLeft my-2">
            <div className="flex gap-2 pl-4">
              <MdOutlineCopyright color={"text-gray-700"} size={16}/>
              <span className="text-sm -pt-4">{currentYear} | MiH</span>
            </div>
          </div>
          <div className="flex gap-4 my-4 items-end animate__animated animate__slideInRight">
            <FaFacebook className="bg-white rounded-full text-center text-lg"/>
            <FaTelegram className="bg-white rounded-full text-center text-lg"/>
            <AiFillInstagram className="bg-white rounded-full text-center text-lg"/>
            <FaTwitter className="bg-white rounded-full text-center text-lg"/>
          </div>
        </section>
       
            
    </footer>
  )
}

export default Footer