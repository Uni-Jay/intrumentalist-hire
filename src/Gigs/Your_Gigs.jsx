import {useEffect, useState} from 'react'
import { Grid, GridItem, Text } from '@chakra-ui/react'
import ListCard from './ListCard'
import { card } from './Card'
import { useAuth } from '../contexts/AuthContext'
import instance from '../utils/api'
import { Link } from 'react-router-dom';
import axios from 'axios'



function GigsList() {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState({});

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

  const [data, setData] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/gig/user-gigs/${user}`);
        console.log("Gigs:", response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => {
    setShowConfirmation(false);
  };
    

  // handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(`https://localhost:8000/api/gig/${id}`);
  //     console.log(response.data);
  //     // Process the response data or perform other operations
  //   } catch (error) {
  //     console.error(error);
  //     // Handle errors, if any
  //   }
  // }

  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`/api/gig/${id}`);
      console.log(response.data);
      // Process the response data or perform other operations
    } catch (error) {
      console.error(error);
      // Handle errors, if any
    }
  }
  const getCurrentTime = () => {
    const currentHour = new Date().getHours();
    return currentHour;
  };

  const getGreeting = () => {
    const currentHour = getCurrentTime();

    if (currentHour >= 4 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

    

  return (
    <div className="">
      <div className='pt-20 flex md:justify-between md:items-center flex-col md:flex-row gap-4 md:px-8 pb-4'>
        <div className='flex'>
          <p>{getGreeting()}<span className='text-blue-950 font-bold'> {loggedUser?.username}</span></p>
        </div>
        <div className='pt-4'>
          <p className='font-bold'>Your Gigs</p>
          <div className='flex gap-2'>
            <Link to={'/dashboard'}>
              <button className='hover:underline hover:text-blue-950'>Dashboard</button>
            </Link>
            <div className='hover:underline hover:text-blue-950'>Gigs</div>
            <div className='hover:underline hover:text-blue-950'>Your Gigs</div>
          </div>
        </div>
      </div>
      <div className='w-full justify-center items-center flex flex-col gap-2 lg:px-10'>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
          {data.map((item, i) => (
            <ListCard
              key={i}
              id={item?.id}
              description={item.description}
              instrument={item.instrument}
              video_url={item.video_url}
              date={item.date}
              button={item.button}
              button2={item.button2}
              showPopup={() => DeleteConfirmationDialog(item?.id)}
              onDelete={() => handleDelete(item?.id)}
              onCancel={handleCancel}
              showConfirmation={showConfirmation}
              handleShowConfirmation={handleShowConfirmation}
            />
          ))}
        </ul>
      </div>
    </div>
      
  )
}

export default GigsList