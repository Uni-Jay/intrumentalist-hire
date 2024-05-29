import React from 'react';
import { data2 } from './data2';
import { useState } from 'react';
import Map from './Map';
import { Link } from 'react-router-dom';


const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});


    const data2 = [
        {
            id: 1,
            label: "Name:",
            type: "text",
            inputname: "name",
            placeholder: "Enter your name",
            value: formData.name,
            error: errors.name,
            handleChange: (e) => setFormData({
                ...formData,
                name : e.target.value
            })
        },

        {
            id: 2,
            label: "Email:",
            type: "email",
            inputname: "email",
            placeholder: "Enter your email",
            value: formData.email,
            error: errors.email,
            handleChange: (e) => setFormData({
                ...formData,
                email : e.target.value
            })
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);
    }

    const invalidEmail= (email) => {
        const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    const validateForm = () => {
        let errors = {}
        if(!formData.name || formData.name.trim().length === 0){
            errors.name = "Please input your name";
        }
    
        if(!formData.email || formData.email.trim().length === 0){
            errors.email = "Email is required";
        } else if(!invalidEmail(formData.email)){
            errors.email = "Email is invalid";
        }
        
        if(!formData.message || formData.message.trim().length === 0){
            errors.message = "Message can't be empty";
        }
        return errors
    }



  return (
    <div className='flex flex-col'>
        <Link to={"/contact"}>
            <h1 className='text-2xl px-4 pt-4 md:pt-8 lg:px-14 font-bold text-blue-950 animate__animated animate__slideInLeft'>Contact Us:</h1>
        </Link>
        <div className='bg-white w-full p-4 md:pb-8 md:px-8 lg:pb-14 lg:px-14 my-0 h-full grid grid-cols-1 md:grid-cols-2 gap-16'>
            <div className="shadow-lg shadow-primary rounded-lg py-4 px-6 flex flex-col items-start gap-8 animate__animated animate__slideInLeft">
                <div className=''>
                    <h5 className='text-[#000] text-xl my-2'>Need more Inforamtion?</h5>
                    <h3 className='text-black text-3xl lg:text-xl font-bold'>Leave message with us.</h3>
                </div>

                <form className="flex flex-col justify-start items-start gap-4">
                    {data2.map((item, index) => (
                        <div className="w-full flex flex-col" key={index}>
                            <label className="font-semibold my-1">{item.label} <span className='text-[#ee3b3b] text-xl'>*</span></label>
                            <input className="w-full outline-none border-2 border-solid border-gray-400  py-4 px-8 bg-ash rounded-3xl focus-within:border-2 focus-within:border-darkblue focus-within:border-solid font-normal text-[1rem]" name={item.inputname} value={item.value} placeholder={item.placeholder} type={item.type} onChange={item.handleChange}/>
                            {item.error && <p className="my-4 text-sm text-red-400">{item.error}</p>}
                        </div>
                        
                    ))}

                    <div >
                        <label className='font-semibold my-1'>Message: <span className='text-[#ee3b3b] text-xl'>*</span></label>
                        <textarea name="message" placeholder="Leave your reply here"value={formData.message} onChange={(e) => setFormData({
                        ...formData,
                        message : e.target.value
                        })} cols={30} rows={6} className="w-full outline-none border-2 border-solid border-gray-400 py-4 px-8 bg-ash rounded-lg focus-within:border-2 focus-within:border-darkblue focus-within:border-solid font-medium text-[1rem]"/>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>

                    <div className="w-full flex justify-center items-center flex-col my-6">
                        <button className="block w-full font-semibold text-lg bg-primary text-white outline-none border-none py-4 px-6 rounded-3xl hover:bg-siteyellow cursor-pointer hover:text-black"onClick={handleSubmit}>Send Message</button>
                    </div>
                </form>
            </div>


            <div className='h-full flex flex-col flex-wrap w-full animate__animated animate__slideInRight'>
                <Map/>
            </div>
        </div>

    </div>
  )
}

export default ContactSection