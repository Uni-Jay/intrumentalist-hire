import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { IoWarningOutline } from "react-icons/io5";
import { IoNotificationsCircleOutline } from "react-icons/io5"
import { IoIosChatboxes } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import BarItems from './Contents/BarItems';


function SideBar() {
//   const barItems = [
//     {
//       icon: <FaBriefcase size={20}/>,
//       display: 'Gig',
//       icon2: <IoIosArrowForward size={24}/>,
//     },
//     {
//       icon: < GiNotebook size={20}/>,
//       display: 'Plans',
//       path: "/dashboard/plan",
//       icon2: <IoIosArrowForward size={24}/>,
//     },
//     {
//       icon: <FaList size={20}/>,
//       display: 'Order',
//       icon2: <IoIosArrowForward size={24}/>,
//     },
//     {
//       icon: <IoWarningOutline size={20}/>,
//       display: 'Strike',
//       icon2: <IoIosArrowForward size={24}/>,
//     },
//     {
//       icon: <IoNotificationsCircleOutline size={20}/>,
//       display: 'Notification',
//       icon2: <IoIosArrowForward size={24}/>,
//     },
//     {
//       icon: < IoIosChatboxes size={20}/>,
//       display: 'Feedback',
//       icon2: <IoIosArrowForward size={24}/>,
//     },
//     {
//       icon: <IoIosSettings size={20}/>,
//       display: 'Settings',
//       icon2: <IoIosArrowForward size={24}/>,
//     },
//   ]
//   return (
//     <div >
//       <div className='bg-blue-950  text-white fixed top-0 left-0 overflow-y-auto h-min'>
//         <div className='flex flex-col gap-6 py-20 px-6'>
//           <div className='flex flex-col '>
//             <div className='pt-4 pb-6 flex flex-col gap-8 '>
//               {barItems.map((item, i) => (
//                 <BarItems 
//                   key={i}
//                   icon={item.icon}
//                   path={item.path}
//                   display={item.display}
//                   icon2={item.icon2}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className='flex items-center   bg-white text-blue-950
//             rounded-xl border border-blue-950 shadow-sm shadow-white gap-4'>
//             <Link to={"/services"} className=" flex items-center font-bold
//             ">
//               <button className='px-2 py-2 lg:px-4'>Log Out</button>
//             </Link>
//             <FaPowerOff size={18}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
}

export default SideBar