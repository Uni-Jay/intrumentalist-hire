import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { LuUpload } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import instance from '../utils/api';
// import EventSelect from './EventSelect';

function OrderForm(props) {

  
  const [formData, setFormData] = useState({
    client_id: 0,
    event_date: "",
    event_period: "",
    event_from: "",
    event_to: "",
    review: "",
    showup_status: "",
    event_id: 0,
    user_id: 0,
    fullname: "",
    location: "",
    email: "",
    event_details: "",
    street_name: "",
   
  });



  const [errors, setErrors] = useState({});

  let { id } = useParams();

  const [data, setData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/user/${id}`);
        console.log("user:", response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const [options, setOptions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/event/all`);
        console.log("event:", response.data);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  const { label, name, } = props;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log("FormData", formData)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    console.log("FormErrors:", formErrors);
    setErrors(formErrors);

    if(Object.keys(formErrors).length === 0){

        try {
            
            const formDataClient = {
              fullname: formData.fullname,
              location: formData.location,
              email: formData.email,
              street_name: formData.street_name,
            }
            
            const clientResopnse = await instance.post(`/api/client/`, formDataClient);
            const clientId = clientResopnse?.data?.clientId;

            const formDataToSend = {
              client_id: clientId,
              event_date: formData.event_date,
              event_period: formData.event_period,
              event_from: formData.event_from,
              event_to: formData.event_to,
              review: formData.review,
              event_status: "pending",
              showup_status: formData.showup_status,
              event_id: parseInt(formData.event_id),
              user_id: Id,
            }

            const response = await instance.post(`/api/booking/`, formDataToSend);
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

            setTimeout(() => {
              navigation("/");
            }, 5000)

          } catch (error) {
          console.log("Error:", error);
          if(error?.response?.data?.message){
           
            const errorMessages = error?.response?.data?.message?.errors
              for(const err of errorMessages){
                toast.error(err?.msg, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }

          }

          if(error?.response?.data?.error){
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

          }
          }
    }
  }
  
  const Id = data.id

  const invalidEmail= (email) => {
    const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    let errors= {}
    // if(!formData.client_id || formData.client_id.trim().length === 0){
    //   errors.client_id = "Please fill this field"
    // }
    if(!formData.fullname || formData.fullname.trim().length === 0){
      errors.fullname = "Please fill this field"
    }
    if(!formData.location || formData.location.trim().length === 0){
      errors.location = "Please fill this field"
    }
    if (!formData.email || formData.email.trim().length === 0){
      errors.email = "Email is required"
    } else if (!invalidEmail(formData.email)){
      errors.email = "Invalid Email"
    }
    if(!formData.street_name || formData.street_name.trim().length === 0){
      errors.street_name = "Please fill this field"
    }
    if(!formData.event_date || formData.event_date.trim().length === 0){
      errors.event_date = "Please input a Event Date"
    }
    if(!formData.event_period || formData.event_period.trim().length === 0){
      errors.event_period = "Please fill this filed"
    }
    if(!formData.event_from || formData.event_from.trim().length === 0){
      errors.event_from = "Please fill this filed"
    }
    if(!formData.event_to || formData.event_to.trim().length === 0){
      errors.event_to = "Please fill this filed"
    }
    return errors
  }
  return (
  <section className="bg-white dark:bg-gray-900">
    <div className='py-6 bg-blue-950 md:px-2'>
      <Navbar/>
    </div>
    <div className="py-8 px-4 mx-auto max-w-2xl lg:pt-28">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white flex justify-center">Booking</h2>
        <form action="#">
          
          {/* <div className="sm:col-span-2 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
            <input type="text" name="client_id" id="name" value={formData.client_id} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="E.g Tunmise" required=""/>
            {errors.client_id && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.client_id}</p>}
          </div> */}
          <div className="sm:col-span-2 mt-4">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input type="date" name="event_date" id="name" value={formData.event_date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="dd/mm/yyyy" required=""/>
            {errors.event_date && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.event_date}</p>}
          </div>
      
          <div className='flex flex-col pt-6 pb-6'>
            <h2>Time:</h2>
            <div className='flex flex-col'>
              <div className='flex gap-6'>
                <div className="sm:col-span-2 mt-4">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From:</label>
                  <input type="time" name="event_from" id="name" value={formData.event_from} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="00:00am" required=""/>
                  {errors.event_from && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.event_from}</p>}
                </div>
                <div className="sm:col-span-2 mt-4">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To:</label>
                  <input type="time" name="event_to" id="name" value={formData.event_to} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="00:00pm" required=""/>
                  {errors.event_to && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.event_to}</p>}
                </div>
              </div>
            </div>

          
          </div>
          <div className="sm:col-span-2 mt-4">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Period/Hour</label>
            <input type="text" name="event_period" id="name" value={formData.event_period} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="00:00am" required=""/>
            {errors.event_period && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.event_period}</p>}
          </div>
          <div>
          {/* <EventSelect/>  */}
          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event</label>
          <select className='w-full text-sm py-2 border-2 rounded-md px-4' name='event_id' onChange={handleChange} >
            <option>Select Event</option>
            {options?.map((item, i) => {
              console.log("item.id:", item.id);
              return (
                <option key={i} value={item.id} className='w-full px-2'>
                  
                  {item.name}
                </option>
              )
            })}
          </select>
          
          </div>
          <div>
            <textarea name="review" placeholder="Leave your reply here"value={formData.review} onChange={handleChange} cols={30} rows={6} className="w-full outline-none border-2 border-solid border-gray-400 py-4 px-8 bg-ash rounded-lg focus-within:border-2 focus-within:border-darkblue focus-within:border-solid font-medium text-[1rem]"/>
            {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}
          </div>
        </form>
    </div>

    <div className="py-8 px-4 mx-auto max-w-2xl lg:pt-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center">Client Info</h2>
        <form action="#">
          
          <div className="sm:col-span-2 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fullname:</label>
            <input type="text" name="fullname" id="name" value={formData.fullname} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="E.g Tunmise" required=""/>
            {errors.fullname && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.fullname}</p>}
          </div>
          
          <div className="sm:col-span-2 mt-4">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="joe@gmail.com" required=""/>
            {/* {errors.event_date && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.event_date}</p>} */}
          </div>
          <div className="sm:col-span-2 mt-4">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street name:</label>
            <input type="text" name="street_name" id="name" value={formData.street_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="abiola street" required=""/>
            {errors.street_name && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.street_name}</p>}
          </div>
          <div className="sm:col-span-2 mt-4">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location:</label>
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ikorodu" required=""/>
            {errors.loction && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.loction}</p>}
          </div>
          
          
          <button type="submit" className="md:inline-flex flex items-center px-5 py-2.5 mt-2 sm:mt-4 text-sm font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={handleSubmit}>
            Submit
          </button>
        </form>
    </div>
      <Footer/>
    <ToastContainer/>
  </section>
  )
}

export default OrderForm