import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import instance from '../../utils/api';
import Pro from './Pro';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user } = useAuth();
    const [loggedUser, setLoggedUser] = useState({});
    const { logout } = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
        try{
            const response = await instance.get(`/api/user/${user}`);
            setLoggedUser(response?.data);
        } catch(error) {
            console.error(error);
        }
        }

        fetchUser();
    }, [user])

    const pro = [
        {
            display: "Home",
            to: "/",
        },
        {
            display: "Settings",
            to: "/dashboard/settings",
        },
        {
            display: "Order",
            to: "/dashboard/order",
        },
        {
            display: "Notifications",
            to: "",
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
    
    const [click, setClick] = useState(false)
    
    

  return (
    <div className="flex items-center">
        <div className="flex items-center ms-3 flex-col">
        <div className='flex-col flexitems-center'>
            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300  dark:focus:ring-gray-600" onClick={() => setClick(!click)} aria-expanded="false" >
                <span className="sr-only">Open user menu</span>
                <img className="w-10 h-10 rounded-full" src={loggedUser?.image} alt="user photo"/>

                {
                    click ?
                        <div className="z-50 my-4 text-base list-none bg-white" id="dropdown-user">
                            <div className="px-4 py-3" role="none">
                            <p className="text-sm dark:text-white text-blue-950" role="none">
                                {loggedUser?.username}
                            </p>
                            <p className="text-sm font-medium truncate dark:text-gray-300 text-blue-950" role="none">
                                {loggedUser?.email}
                            </p>
                            </div>
                            <ul className="gap-2 flex-col px-4 flex py-2 " role="none">
                                {pro &&
                                    pro.map((item, i) => (
                                        <Pro className= ''
                                            key={i}
                                            display={item.display}
                                            path={item.to}
                                            icon={item.icon}
                                        />
                                    ))

                                }
                                
                            </ul>
                            <div className='flex items-center bg-white text-blue-950
                            shadow-sm shadow-white gap-14'>
                            <button className='px-2 py-2 lg:px-4' onClick={handleLogout}>Log Out</button>                  
                            <FaPowerOff size={18}/>
                            </div>
                        </div>
                    :
                    <div className="z-50 my-4 text-base list-none hidden bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user"></div>

                }
            </button>
        </div>
        </div>
    </div>
    

  )
}

export default Profile