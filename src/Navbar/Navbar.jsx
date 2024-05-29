import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { TiBook } from "react-icons/ti";
import { GrServices } from "react-icons/gr";
import { MdOutlinePhoneInTalk, MdOutlineCancel } from "react-icons/md";
import NavItem from "./NavItem";
import { useState, useEffect } from "react";
import { RiMenu2Fill, RiMenuFill } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";


const navItems = [
    {
        display: "Home",
        color: "text-black",
        to: "/home",
        icon: <BiHomeAlt color={"text-gray-700"} className="group-hover:text-primary hover:text-primary " style={{
            fontSize: 16
        }}/>
    },

    {
        display: "About",
        color: "text-black",
        to: "/about",
        icon: <TiBook color={"text-gray-700"} className="group-hover:text-primary hover:text-primary " style={{
            fontSize: 16
        }}/>
    },

    
    {
        display: "Services",
        color: "text-black",
        to: "/services",
        icon: <GrServices color={"text-gray-700"} className="group-hover:text-primary hover:text-primary " style={{
            fontSize: 16
        }}/>
    },

    {
        display: "Contact",
        color: "text-black",
        to: "/contact",
        icon: <MdOutlinePhoneInTalk color={"text-gray-700"} className="group-hover:text-primary hover:text-primary " style={{
            fontSize: 16
        }}/>
    },
]

const Navbar = () => {
    const { isAuthenticated } = useAuth();
    const [isScroll, setIsScroll] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY === 500) {
                setIsScroll(true);
                
            }
        }

        return () => window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`animate__animated animate__slideInDown ${isScroll ? "w-full sticky" : "w-[90%]"} bg-white  opacity--30 shadow-lg shadow-[rgba(0,0,0,0.4)] rounded-md py-4 px-10 mx-auto flex justify-around items-center  gap-6 z-[9999]`}>
            <div className="flex justify-center items-center gap-2">
                <Link to={'/'}>
                    <h3 className="text-xl font-semibold font-playpen">MiH</h3>
                </Link>
                <div className="flex justify-center items-center p-3 bg-primary rounded-full" onClick={() => setShow(!show)}>
                    {
                        show ? 
                        <RiMenu2Fill style={{
                            fontSize: 16,
                            color: "white",
                        }}/>
                        :
                        <RiMenuFill style={{
                            fontSize: 16,
                            color: "white",
                        }}/>
                    }
                </div>
            </div>

            <div className="hidden md:flex md:justify-around  md:items-center gap-4">
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

            <div className="flex justify-center items-center">
            { isAuthenticated() ? 
                <Link to={"/dashboard"} className="bg-primary rounded-full py-3 px-6 text-white text-xs sm:text-sm md:text-lg">Go to Dashboard</Link>
            : 
                <Link to={"/auth/register"} className="bg-primary rounded-full py-3 px-6 text-white text-xs sm:text-sm md:text-lg">Get Started</Link>
            }
            </div>

            {
                show &&
                <div className={`bg-[rgba(0,0,0,0.5)] fixed top-0 bottom-0  right-0 w-full opacity--80 `}>
                    <div className={`${show ? "animate__animated animate__slideInRight" : "animate__animated animate__slideInLeft"} bg-white  w-[40%] fixed top-0 bottom-0 right-0 h-full flex flex-col gap-4`}>
                        <div className={` w-full flex items-end justify-end mt-10 px-10`}>
                            <MdOutlineCancel onClick={() => setShow(false)} style={{
                            fontSize: 36,
                            color: "black",
                            }}/>
                        </div>
                        <div className="flex flex-col gap-8 mt-32 px-6 ">
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

                        <div className="flex flex-col  my-6 px-8">
                            <div className="flex justify-start items-center gap-2">
                                <Link to="/about" className="bg-primary shadow-lg shadow-[rgba(0,0,0,0.6)] py-2 px-4 rounded-md text-white lg:text-md text-sm font-semibold">Find Instrumentalist</Link>
                                <Link to="/about" className="bg-white shadow-lg shadow-[rgba(0,0,0,0.6)] py-2 px-10 rounded-md text-primary lg:text-md text-sm font-semibold">Be Hired</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </nav>
    )

}

export default Navbar