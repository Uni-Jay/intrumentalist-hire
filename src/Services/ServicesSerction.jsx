import React, { useEffect, useState } from 'react'
import SavItems from './SavItems';
import Card from './Card';
import { data4 } from './data4';
import instance from '../utils/api';
import Marquee from "react-fast-marquee";


const ServicesSection = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/user/all`);
        console.log("user:", response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);







  const savItems = [
    {
      display: "All Categories",
      color: "text-black",
    },
    {
      display: "Flute",
      color: "text-black",       
    },
    {
      display: "Banjo",
      color: "text-black",       
    },
    {
      display: "Guitar",
      color: "text-black",       
    },
    {
      display: "Cello",
      color: "text-black",       
    },
    {
      display: "Harp",
      color: "text-black",       
    },
    {
      display: "Clarinet",
      color: "text-black",       
    },
    {
      display: "Accordion",
      color: "text-black",       
    },
    {
      display: "Basson",
      color: "text-black",       
    },
    {
      display: "Harmonica",
      color: "text-black",       
    },
    {
      display: "Cymbal",
      color: "text-black",       
    },
    {
      display: "Piano",
      color: "text-black",       
    },
  ]
  
  const allItems = [
    {
      display: "All Fliter"
    },
    {
      display: "Location",
    },
    {
      display: "Services"
    },
    {
      display: "Price"
    }
  ]







  
  return (
    <div className='animate__animated animate__slideInLeft'>
      <div className="flex gap-6 md:pl-6  px-14 border-ash pt-10 pb-4 ">
        <select className='bg-[#f2f2f2] px-4 rounded-lg '>
        {savItems &&
          savItems.map((item, i) => (
            <option value={item.color} key={i}>
               {item.display}
            </option>
          ))}
        </select>
        <select className='bg-[#f2f2f2] px-4 rounded-lg '>
        {allItems &&
          allItems.map((item, i) => (
            <option  key={i}>
               {item.display}
            </option>
          ))}
        </select>
      </div>
      

      <Marquee>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 px-10 md:px-2'>
          {data.map((item, i) =>(
            <div className='' key={i}>
              <Card
              content={item.username} 
              title={item.phone_number}
              image={item.image}
              reviewComment={item.lga}
              reviewCount={item.state}
              cont={item.cont}
              image2={item.image}
              starting={item.starting}
              // path={path}
              id={item.id}
              price={item.price}/>
            </div>
          ))}
        </div>
      </Marquee>
      
      
      
    </div>
  )
}

export default ServicesSection