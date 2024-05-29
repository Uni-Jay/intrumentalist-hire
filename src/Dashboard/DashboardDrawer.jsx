import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button,
    Show, 
    Hide,
    useDisclosure,
  } from '@chakra-ui/react'
import { useState } from 'react';
import { IoMenuSharp } from "react-icons/io5";
import BarItems from './Contents/BarItems';
import { FaBriefcase, FaPowerOff } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { IoWarningOutline } from "react-icons/io5";
import { IoNotificationsCircleOutline } from "react-icons/io5"
import { IoIosChatboxes } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";


function DrawerBoard({ show, handleToggle}) {

  const { logout } = useAuth();
  const navigate = useNavigate();

    const barItems = [
      {
        id: 1,
        icon: <IoHomeOutline size={20}/>,
        display: 'Home',
        path: "/dashboard/",
      },
      {
        id: 2,
        icon: <FaBriefcase size={20}/>,
        display: 'Gigs',
        path: "#",
        icon2: <IoIosArrowForward size={24}/>,
        children: [
          {
            icon: <FaBriefcase size={20}/>,
            display: 'Your Gigs',
            path: "/dashboard/gig-list",
            icon2: <IoIosArrowForward size={24}/>,
          },

          {
            icon: <FaBriefcase size={20}/>,
            display: 'Add Gig',
            path: "/dashboard/add-gigs",
            icon2: <IoIosArrowForward size={24}/>,
          },
        ]
      },
      {
        id: 3,
        icon: < GiNotebook size={20}/>,
        display: 'Plans',
        path: "#",
        icon2: <IoIosArrowForward size={24}/>,
        children: [
          {
            icon: <FaBriefcase size={20}/>,
            display: 'Plans',
            path: "/dashboard/plans",
            icon2: <IoIosArrowForward size={24}/>,
          },

          {
            icon: <FaBriefcase size={20}/>,
            display: 'Add Plans',
            path: "/dashboard/add-plan",
            icon2: <IoIosArrowForward size={24}/>,
          },
        ]
      },
      {
        id: 4,
        icon: <FaList size={20}/>,
        display: 'Order',
        path: "/dashboard/order",
        
      },
      // {
      //   id: 5,
      //   icon: <IoWarningOutline size={20}/>,
      //   display: 'Strike',
      //   path: "",
      // },
      // {
      //   id: 6,
      //   icon: <IoNotificationsCircleOutline size={20}/>,
      //   display: 'Notification',
      //   path: "",
      // },
      {
        id: 7,
        icon: < IoIosChatboxes size={20}/>,
        display: 'Feedback',
        path: `/feedback-list/${id}`,
      },
      {
        id: 8,
        icon: <IoIosSettings size={20}/>,
        display: 'Settings',
        path: "/dashboard/settings",
        children: [
          {
            icon: <FaBriefcase size={20}/>,
            display: 'Edit Profile',
            path: "/dashboard/settings",
            icon2: <IoIosArrowForward size={24}/>,
          },
        ]
      },
    ]
    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        
        await logout();
        navigate("/auth/login");
        
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
    

  
    return (
      <>

      <Show above='md'>
        <div className='bg-blue-950  text-white fixed top-0 left-0 overflow-y-auto h-screen'>
          <div className='flex flex-col gap-4 py-20 px-6'>
            <div className='flex flex-col '>
              <div className='pt-4 pb-2 flex flex-col gap-4 pl-6'>
                {barItems.map((item, i) => (
                  <BarItems className=''
                    key={i}
                    icon={item.icon}
                    path={item.path}
                    display={item.display}
                    icon2={item.icon2}
                    isVisible={show == false ? true : false}
                    children={item.children}
                  />
                ))}
              </div>
            </div>
            <div className='flex items-center bg-white text-blue-950
              rounded-xl border border-blue-950 shadow-sm shadow-white gap-2'>
              <button className='px-2 py-2 lg:px-4' onClick={handleLogout}>Log Out</button>
              <FaPowerOff size={18}/>
            </div>
          </div>
        </div>
      </Show>
      <Show below='md'>
        <Drawer onClose={handleToggle} isOpen={show} placement='left'>
          <DrawerOverlay />
          <DrawerContent style={{
            backgroundColor: 'transparent'
          }}>
            <DrawerBody>
              <div className='bg-blue-950  text-white fixed top-0 left-0 overflow-y-auto h-screen'>
                <div className='flex flex-col gap-4 py-20 px-6'>
                  <div className='flex flex-col '>
                    <div className='pt-4 pb-2 flex flex-col gap-6 '>
                      {barItems.map((item, i) => (
                        <BarItems 
                          key={i}
                          icon={item.icon}
                          path={item.path}
                          display={item.display}
                          icon2={item.icon2}
                          isVisible={show}
                          children={item.children}
                        />
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center bg-white text-blue-950
                    rounded-xl border border-blue-950 shadow-sm shadow-white gap-2'>
                    <button className='px-2 py-2 lg:px-4' onClick={handleLogout}>Log Out</button>                  
                    <FaPowerOff size={18}/>
      
                  </div>
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
      </>
    )
}
export default DrawerBoard