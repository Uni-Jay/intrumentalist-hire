import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../utils/api';
import Card from '../Feedback/Card';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const FeedbackList = () => {
  const [data, Setdata] = useState([]);

  let { id } = useParams();

  const { user } = useAuth();

  useEffect(() => {
    const fetchGigs = async () => {
      try{
        const response = await instance.get(`/api/booking/user-booking/${id}`);
        console.log("Event:", response.data);
        Setdata(response?.data);
      } catch(error) {
        console.error(error);
      }
    }

        fetchGigs();
    }, [data]);


  return (
    <div>
      <h2>Feedback Reviews</h2>
      <ul>
        {data.map((item, i) => (
          <li key={i} className='pt-20'>
            <Card
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

export default FeedbackList;