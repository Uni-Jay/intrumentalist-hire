import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../utils/api';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from './Review_Card';


const Review_List = () => {
  const [userBooking, setUserBooking] = useState([]);

  let { id } = useParams();

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/booking/user-booking/${id}`);
        console.log("booking:", response.data);
        setUserBooking(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <strong>Feedback Reviews:</strong>
      <ul>
        {userBooking?.map((item, i) => (
          <li className=''>
            <Card
              key={i} 
              name={item.client.fullname}
              remark={item.remark}
              email={item.client.email}
              date={item.updated_at}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review_List;