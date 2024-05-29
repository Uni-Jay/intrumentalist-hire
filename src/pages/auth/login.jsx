import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import { useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import instance from "../../utils/api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../contexts/AuthContext';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Show } from '@chakra-ui/react';
import Footer from '../../Footer/Footer';

const Login =() => {

  const { login } = useAuth();
  
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const data3 = [
    {
      id: 1,
      label: "Email:",
      inputname: "email",
      type: "email",
      placeholder: "Enter Your Email",
      value: formData.email,
      error: errors.email,
      handleChange: (e) => setFormData({
        ... formData,
        email: e.target.value
      })
    },
    {
      id: 3,
      label: "Password:",
      inputname: "password",
      type: "password",
      placeholder: "Enter Your Password",
      value: formData.password,
      error: errors.password,
      handleChange: (e) => setFormData({
        ...formData,
        password: e.target.value
      })
    }
  ]

  const invalidEmail= (email) => {
    const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = (values) => {
    let errors= {}

    if (!values.email || values.email.trim().length === 0){
      errors.email = "Email is required"
    } else if (!invalidEmail(values.email)){
      errors.email = "Invalid Email"
    }
    
    if (!values.password || values.password.trim().length === 0){
      errors.password = "Password is required"
    } else if (!values.password || values.password.trim().length < 8){
      errors.password = "Password should not be less than 8 and greater than 16"
    } else if (!values.password || values.password.trim().length > 16){
      errors.password = "Password should not be less than 8 and greater than 16"
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if(Object.keys(formErrors).length == 0){
      try {

        const formDataToSend = { 
          email: formData?.email, 
          password: formData?.password
       }

       console.log("formDataToSend:", formDataToSend);
       await login(formDataToSend);

       toast.success("Login successfully!", {
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
        navigation("/dashboard");
      }, 5000)

    }catch(error) {
          console.log("error:", error);
          if(error?.response?.data?.success === false){
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

          } else if(error?.response?.data?.message) {
            toast.error("Invalid credentials", {
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
    } else {
      console.log("Form errors", errors);
    }

    // console.log("Form errors", formErrors)
    // console.log("FormData", formData)
  }

  return (
    <div className=''>
      <div className='py-4 bg-blue-950'>
        <Navbar/>
      </div>
      <div className='flex py-10 px-8'>
        <form className='h-500 w-full'>
          <div className='flex items-center justify-center flex-col w-full gap-8'>
            <div>
              <h3 className='text-2xl md:text-4xl font-bold text-primary flex items-center justify-center'>Login Here</h3>
            </div>
            <div className='px-16 py-4 shadow-md  md:shadow-lg md:shadow-primary shadow-primary mx-6'>
              <div className='flex flex-col my-2 justify-start items-start gap-4'>
                {data3.map((item, i) => (
                  <div className='' key={i}>
                    <label className='text-blue-950 font-bold text-md md:text-lg'>{item.label}</label>
                    <input className='w-full border-2 border-solid border-gray-400 rounded-lg pl-4' type={item.type} placeholder={item.placeholder} 
                    name={item.inputname} onChange={item.handleChange}/>
                    {item.error && <p className='my-2 md:my-4 text-sm text-red-400'>{item.error}</p>}
                  </div>
                ))}
              </div>
              <div className='flex gap-2 justify-center'>
                <Link to={"/auth/forget-password"} className=" flex text-black text-sm items-end  md:text-md
                ">forget password</Link>
              </div>          
              <div className='flex justify-center items-center my-3'>
                <button className=" w-full rounded-3xl font-semibold text-ms md:text-lg bg-blue-950 text-white outline-none border-none py-1 px-2 
                cursor-pointer"onClick={handleSubmit}>Login</button>
              </div>
              <div className=''>
                <p className='text-sm flex justify-center'>Don't have an account?</p>
                <Link to={"/auth/register"} className=" text-primary text-sm  md:text-md
                flex items-center justify-center">Click Here!</Link>
              </div>
            </div>
          </div>
        </form>
        
      </div>
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default Login