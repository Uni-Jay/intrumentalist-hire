import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Home_Card from './Home_Card'
// import { home } from './Home'
import { FaRegEnvelope } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import {useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import instance from '../utils/api'
import Profile from '../Dashboard/Profile/profile';


function Home_Dashboard() {
    const { user } = useAuth();
    const [loggedUser, setLoggedUser] = useState({});
    const [userGigs, setUserGigs] = useState([]);
    const [userPlans, setUserPlans] = useState([]);
    const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const response = await instance.get(`/api/user/${user}`);
        console.log("user:", response.data);
        setLoggedUser(response?.data);
      } catch(error) {
        console.error(error);
      }
    }
        fetchUser();
    }, [user]);

   


  useEffect(() => {
    const fetchGigs = async () => {
      try{
        const response = await instance.get(`/api/gig/user-gigs/${user}`);
        console.log("Gigs:", response.data);
        setUserGigs(response?.data);
      } catch(error) {
        console.error(error);
      }
    }

    fetchGigs();
  }, [user]);


  useEffect(() => {
    const fetchGigs = async () => {
      try{
        const response = await instance.get(`/api/plan/user-plans/${user}`);
        console.log("Events:", response.data);
        setUserPlans(response?.data);
      } catch(error) {
        console.error(error);
      }
    }

        fetchGigs();
    }, [user]);


    useEffect(() => {
        const fetchGigs = async () => {
          try{
            const response = await instance.get(`/api/gig/user-booking/${user}`);
            setUserOrder(response?.data);
          } catch(error) {
            console.error(error);
          }
        }
    
            fetchGigs();
    }, [user]);

  const home = [
    {
        id: 1,
        title: "No of Gigs",
        button2: `${userGigs.length}`,
        bgColor: '#FF9900',
        description: "The number of Gigs, you have is",
        color: '#FF9900',
        path: "/dashboard/gig-list",
        image: "/images/3D-2.png"
    },
    {
        id: 2,
        title: "No of Plans",
        button2: `${userPlans.length}`,
        description: "The number of Plan, you have is",
        bgColor: '#FF9900',
        color: '#7be495',
        path: "",
        image: "/images/3D-1.png"
    },
    {
        id: 3,
        title: "No of Orders",
        description: "The number of Order, you have is",
        button2: `${userOrder.length}`,
        bgColor: '#FF9900',
        color: "#000099",
        image: "/images/3D-3.png",
        path: "/dashboard/order"
    },
    
  ]

  const getCurrentTime = () => {
    const currentHour = new Date().getHours();
    return currentHour;
  };

  const getGreeting = () => {
    const currentHour = getCurrentTime();

    if (currentHour >= 0 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

    return (
        <div className=" pt-24 px-4 w-full">
           <div className='flex pb-4'>
              <p>{getGreeting()}<span className='text-blue-950 font-bold'> {loggedUser?.username}</span></p>
            </div>
            <Grid  templateColumns='repeat(3, 1fr)' gap={2}>
            {home.map((item, i) =>(
                <GridItem className='' key={i} colSpan={{base: 3, md:2, lg: 1 }}>
                <Home_Card
                title={item.title}
                description={item.description}
                button2={item.button2}
                bgColor={item.bgColor}
                color={item.color}
                path={item.path}
                images={item.image}/>
                </GridItem>
            ))}
            </Grid>
           <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className=''>
                <div className='border border-[rgb(0,51,102)] border-solid mt-10 rounded-md gap-4  px-4 mb-4 md:mb-10'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='pt-4 font-medium text-xl text-[#003366]'>Profile</h1>
                            <div className='flex items-center gap-2'>
                                <img src={loggedUser.image} alt=''
                                style={{
                                    height: 40,
                                    width: 40,
                                    resize: 'contain',
                                    borderRadius: 100,
                                    borderColor: '#003366',
                                    border: 10
                                }}/>
                                <div>
                                    <div>
                                        <h2 className='text-[#003366]'>{loggedUser?.fullname}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div>
                                <div>
                                    <div className='flex gap-2 py-4'>
                                        <FaRegEnvelope size={20}/>
                                        <h2 className='text-sm md:text-md'>{loggedUser?.email}</h2>
                                    </div>
                                    <div className='border-b border-[#003366]'/>
                                    <div className='flex gap-4 py-4'>
                                        <FiPhone size={20}/>
                                        <h2>(+234) {loggedUser?.phone_number}</h2>
                                    </div>
                                    <div className='border-b border-[#003366]'/>
                                    <div className='flex gap-4 py-4'>
                                        <IoLocationOutline size={20}/>
                                        <h2>{loggedUser?.location}, {loggedUser?.state}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
           </div>
        </div>
            
    )
}

export default Home_Dashboard