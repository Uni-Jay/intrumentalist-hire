import React, { useEffect } from 'react'
import { useState, } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import instance from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencil } from 'react-icons/fa6';
import Resizer from "react-image-file-resizer";

function Settings() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        password: '',
        street_name: '',
        street_number: '',
        location: '',
        lga: '',
        state: '',
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try{
            const response = await instance.get(`/api/user/${user}`);
            const userInfo = response?.data;
            setFormData({
                fullname: userInfo?.fullname,
                email: userInfo?.email,
                phone_number: userInfo?.phone_number,
                street_name: userInfo?.street_name,
                street_number: userInfo?.street_number,
                location: userInfo?.location,
                lga: userInfo?.lga,
                state: userInfo?.state,
            })

            setImage(userInfo?.image);
          } catch(error) {
            console.error(error);
          }
        }
      
         fetchUser();
    }, [user])

    const [loggedUser, setLoggedUser] = useState({});

    const [errors, setErrors] = useState({});
    const inputs = [
        {
          label: "Fullname:",
          inputname: "fullname",
          type: "fullname",
          placeholder: "Enter Your Fullname",
          value: formData.fullname,
          error: errors.fullname,
          handleChange: (e) => setFormData({
            ... formData,
            fullname: e.target.value
          })
        },
        {
            label: "Phone No.:",
            inputname: "phone_number",
            type: "phone_number",
            placeholder: "Enter Your Phone No.",
            value: formData.phone_number,
            error: errors.phone_number,
            handleChange: (e) => setFormData({
              ... formData,
              phone_number: e.target.value
            })
        },
        {
            label: "Street Name:",
            inputname: "street_name",
            type: "street_name",
            placeholder: "Enter Your Street_name",
            value: formData.street_name,
            error: errors.street_name,
            handleChange: (e) => setFormData({
              ... formData,
              street_name: e.target.value
            })
        },
        {
            label: "Street No.:",
            inputname: "street_number",
            type: "street_number",
            placeholder: "Enter Your Street No.",
            value: formData.street_number,
            error: errors.street_number,
            handleChange: (e) => setFormData({
              ... formData,
              street_number: e.target.value
            })
        },
        {
            label: "Location:",
            inputname: "location",
            type: "location",
            placeholder: "Enter Your Location",
            value: formData.location,
            error: errors.location,
            handleChange: (e) => setFormData({
              ... formData,
              location: e.target.value
            })
        },
        {
            label: "LGA:",
            inputname: "lga",
            type: "lga",
            placeholder: "Enter Your LGA",
            value: formData.lga,
            error: errors.lga,
            handleChange: (e) => setFormData({
              ... formData,
              lga: e.target.value
            })
        },
        {
            label: "State:",
            inputname: "state",
            type: "state",
            placeholder: "Enter Your State",
            value: formData.state,
            error: errors.state,
            handleChange: (e) => setFormData({
              ... formData,
              state: e.target.value
            })
        },
    ]
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        console.log("FormErrors:", formErrors);
        setErrors(formErrors);

        if(Object.keys(formErrors).length === 0){

            try {
                
                const formDataToSend = {
                    fullname: formData.fullname,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    street_number: formData.street_number,
                    street_name: formData.street_name,
                    location: formData.location,
                    lga: formData.lga,
                    state: formData.state,
                    image: image,
                }

                const response = await instance.put(`/api/user/${user}`, formDataToSend);
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
            }
    }
    
    const invalidEmail= (email) => {
        const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    const validateForm = () => {
        let errors = {}
        if(!formData.fullname || formData.fullname.trim().length === 0){
            errors.fullname = "Fullname is required"
        } else if (!formData.fullname || formData.fullname.trim().length < 5){
        errors.fullname = "Minimum of 6 letters is required"
        }
        if (!formData.phone_number || formData.phone_number.trim().length === 0){
            errors.phone_number = "Phonenumber is required"
        } else if (!formData.phone_number || formData.phone_number.trim().length < 9){
        errors.phone_number = "Please input correct phonenumber"
        }
        if (!formData.email || formData.email.trim().length === 0){
        errors.email = "Email is required"
        } else if (!invalidEmail(formData.email)){
        errors.email = "Invalid Email"
        }
        if (!formData.street_name || formData.street_name.trim().length === 0){
            errors.street_name = "Street Name is required"
        }
        if (!formData.street_number){
        errors.street_number = "Street Number is required"
        }
        if (!formData.location || formData.location.trim().length === 0){
        errors.location = "Please input a Location"
        }
        if (!formData.lga || formData.lga.trim().length === 0){
            errors.lga = "Please input a LGA"
        }
        if (!formData.state || formData.state.trim().length === 0){
        errors.state = "Please select a state"
        }
        return errors
    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            30,
            30,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

    const handleImageUpload = async (e) => {    
        const file = e.target.files[0];
        const reader = new FileReader();
        const image = await resizeFile(file);

        reader.onload = () => {
            if(reader.readyState === 2) {
                setImage(reader.result);
            }
        }

        if(file){
            reader.readAsDataURL(file);
        }
        console.log("Image", image);
        
    }
  return (
    <div className='pt-28'>
        <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center'>
                <h1 className='text-3xl'>Edit Profile</h1>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='flex justify-center items-center'>
                    <div className=''>
                        <img src={image} alt=''
                        style={{
                            height: 160,
                            width: 160,
                            resize: 'contain',
                            borderRadius: 100,
                            border: 'solid',
                            borderColor: '#003366'
                        }}/>                   
                    </div>
                    <div className='flex pt-24 relative'>
                        <input id='file-upload' type='file' accept='image/*' onChange={handleImageUpload} className='hidden'/>
                        <label htmlFor='file-upload'>
                            <FaPencil size={30} className='absolute -right-2 bottom-4' style={{
                                border: 'solid',
                                borderWidth: 0.4,
                                paddingInline: 4,
                                backgroundColor: '#003366',
                                color: 'white',
                                borderRadius: 100
                            }}/>

                        </label>
                    </div>
                </div>
               <div className='py-10 md:mx-auto md:w-[80%] flex flex-col justify-start items-start gap-4'>
                
                    <div className='grid grid-col-1 md:grid-cols-2 gap-4 px-6'>
                        {inputs.map((item, i) => (
                            <div className='flex-col gap-2' key={i}>
                                <label className='text-blue-950 font-bold text-sm md:text-lg'>{item.label}</label>
                                <input className='w-full border border-solid border-gray-400 rounded-lg px-4 py-2' type={item.type} placeholder={item.placeholder} 
                                name={item.inputname} value={item.value} onChange={item.handleChange}/>
                                {item.error && <p className='my-2 md:my-4 text-sm text-red-400'>{item.error}</p>}
                            </div>
                        ))}
                    </div>

                    <div className='w-full flex justify-end items-end md:px-20'>     
                        <button className='bg-[#003366] px-6 py-2 rounded-lg block text-white' onClick={handleSubmit}>Save</button>
                    </div>
                </div> 
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Settings