import React, { useEffect, useState } from 'react';
import Service_Card from './Service_Card';
import instance from '../utils/api';
import { Carousel } from "@material-tailwind/react";
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';


const Service_Carousel = ({  }) => {

  const { user } = useAuth();
  let { id } = useParams();

  const [gig, setGig] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/gig/user-gigs/${id}`);
        console.log("gig:", response.data);
        setGig(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  // const image = [
  //   {
  //     images: "/images/Phenom.jpg"
  //   },
  //   {
  //     images: "/images/Aaron.jpeg"
  //   },
  //   {
  //     images: "/images/Phenom.jpg"
  //   },
  // ]


  // const nextImage = () => {
  //   setGig((prevIndex) => (prevIndex === gig.length - 1 ? 0 : prevIndex + 1));
  // };

  // const prevImage = () => {
  //   setGig((prevIndex) => (prevIndex === 0 ? gig.length - 1 : prevIndex - 1));
  // };

  return (
    <Carousel transition={{ duration: 2 }} className="rounded-xl">
      <div className='w-full justify-center items-center flex flex-col gap-8'>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
          {gig.map((item, i) =>(
          <Service_Card
            key={i}
            id={item?.id}
            video_url={item.video_url} 
            instrument={item.instrument}
            description={item.description}
            price={item.price}
            />
          ))}
        </ul>
      </div>
      {/* <div>
        <button onClick={prevImage}>&lt;</button>
        <button onClick={nextImage}>&gt;</button>
      </div> */}
      </Carousel>
  );
};

export default Service_Carousel;