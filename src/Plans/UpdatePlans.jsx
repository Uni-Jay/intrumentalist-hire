import React, { useEffect, useState } from 'react'
import { usedescription, useRef } from 'react';
import ReactPlayer from 'react-player';
import { LuUpload } from "react-icons/lu";
import { useAuth } from '../contexts/AuthContext';
import instance from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencil } from 'react-icons/fa6';
import { Radio } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';

function UpdatePlan(props) {

  let { id } = useParams();

  const { user } = useAuth();
  const [formData, setFormData] = useState({
    plan_title: "",
    date: "",
    plan_description: "",
    availability_status: "",
    time_from: "",
    time_to: ""
      
  });
  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value);

    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    console.log("Form errors", formErrors);

    if(Object.keys(formErrors).length === 0){

      try {
          
          const formDataToSend = {
            plan_title: formData.plan_title,
            date: formData.date,
            plan_description: formData.plan_description,
            availability_status: formData.availability_status,
            time_from: formData.time_from,
            time_to: formData.time_to,
            user_id: user
          }

          console.log("FormDataSend:", formDataToSend);

          const response = await instance.put(`/api/plan/${id}`, formDataToSend);
          console.log("Message:", response.data);

          toast.success(response?.data?.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });
      } catch (error) {
          if(error?.response?.data?.error){
              // const errorMessages = error?.response?.data?.message?.errors
                // for(const err of errorMessages){
                  toast.error(error?.response?.data?.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                // }
  
            }
        }
  }
    
  }
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const response = await instance.get(`/api/plan/${id}`);
        const userInfo = response?.data;
        console.log("userInfo:", userInfo);

        setFormData({
            plan_title: userInfo?.plan_title,
            date: userInfo?.date,
            plan_description: userInfo?.plan_description,
            time_from: userInfo?.time_from,
            time_to: userInfo?.time_to,
            availability_status: userInfo?.availability_status
        })

        
      } catch(error) {
        console.error(error);
      }
    }
  
fetchUser();
  }, [user])

  
  

  const validateForm = () => {
    let errors= {}
    if(!formData.plan_title || formData.plan_title.trim().length === 0){
      errors.plan_title = "Please fill this field"
    }
    if(!formData.date || formData.date.trim().length === 0){
      errors.date = "Date is required"
    }
    if(!formData.availability_status){
      errors.availability_status = "Availability-status is required"
    }
    if(!formData.time_from){
      errors.time_from = "Empty space"
    }
    if(!formData.time_to){
      errors.time_to = "Empty space"
    }
    if(!formData.plan_description || formData.plan_description.trim().length === 0){
      errors.description = "Please fill this filed"
    } else if (!formData.plan_description || formData.plan_description.trim().length < 5){
      errors.plan_description = "Please input min of 5 characters"
    }
    return errors
  }
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-2xl lg:pt-28">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Plan</h2>
        <form action="#">
          
          <div className="sm:col-span-2 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" name="plan_title" id="name" value={formData.plan_title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title" required=""/>
            {errors.plan_title && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.plan_title}</p>}
          </div>
          <div className="sm:col-span-2 mt-4">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input type="date" name="date" id="name" value={formData.date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="dd/mm/yyyy" required=""/>
            {errors.date && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.date}</p>}
          </div>
          <div className="sm:col-span-2 mt-4">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Availability</label>
            <div className="flex gap-10">
              <Radio name="availability_status" label="Yes" value="yes" onChange={(e) => setFormData({...formData, availability_status: "yes"})} checked={formData.availability_status == "yes"}/>
              <Radio name="availability_status" label="No" value="no"  onChange={(e) => setFormData({...formData, availability_status: "no"})} checked={formData.availability_status == "no"}/>
            </div>
          </div>
          <div className='flex flex-col pt-6 pb-6'>
            <h2>Time:</h2>
            <div className='flex gap-6'>
              <div className="sm:col-span-2 mt-4">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From:</label>
              <input type="text" name="time_from" id="name" value={formData.time_from} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="00:00am" required=""/>
              {errors.time_from && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.time_from}</p>}
              </div>
              <div className="sm:col-span-2 mt-4">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To:</label>
              <input type="text" name="time_to" id="name" value={formData.time_to} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="00:00pm" required=""/>
              {errors.time_to && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.time_to}</p>}
              </div>
            </div>
          </div>  
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" rows="8" cols={10} name='plan_description' value={formData.plan_description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
            {errors.plan_description && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.plan_description}</p>}
          </div>
        
        <button type="submit" className="md:inline-flex flex items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={handleSubmit}>
          Update Plan
        </button>
        </form>
    </div>
    <ToastContainer/>
  </section>
  )
}

export default UpdatePlan