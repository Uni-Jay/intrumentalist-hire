import React, { useEffect, useState } from 'react'
import PlanCard from './PlanCard'
import { table } from './Table'
import { Grid, GridItem } from '@chakra-ui/react'
import instance from '../utils/api';
import { useAuth } from '../contexts/AuthContext';


function Plans() {

  const { user } = useAuth();
  const [plan, setPlan] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/plan/user-plans/${user}`);
        console.log("plans:", response.data);
        setPlan(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const [showConfirmation, setShowConfirmation] = useState(false);
  const [planId, setPlanId] = useState(null);

  const handleShowConfirmation = (id) => {
    // setShowConfirmation(true);
    setPlanId(id)
  };


  const handleCancel = () => {
    // setShowConfirmation(false);
    setPlanId(null);
  };


  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`/api/plan/${id}`);
      console.log(response.data);
      // Process the response data or perform other operations
    } catch (error) {
      console.error(error);
      // Handle errors, if any
    }
  }
  return (
    <div className=" pt-24 px-2">
      <div className='w-full justify-center items-center flex flex-col gap-6'>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
        {plan.map((item, i) =>(
            <PlanCard
            key={i}
            id={item?.id}
            plan_description={item.plan_description} 
            plan_title={item.plan_title}
            availability_status={item.availability_status}
            image={item.image}
            date={item.date}
            button={item.button}
            button2={item.button2}
            showPopup={() => DeleteConfirmationDialog(item?.id)}
            onDelete={() => handleDelete(item?.id)}
            onCancel={handleCancel}
            showConfirmation={item?.id == planId}
            handleShowConfirmation={() => handleShowConfirmation(item?.id)}
            />
            ))}
        </ul>
      </div>
    </div>
      
  )
}

export default Plans