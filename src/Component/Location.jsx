import { useFormContext } from '../contexts/FormContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react'

function Location({prevStep, nextStep, handleChange}) {
    const { formData, errors } = useFormContext();
    const inputs = [
        {
            id: 1,
            label: "Street Number:",
            inputname: "street_number",
            type: "streetnumber",
            placeholder: "Enter Your Street number",
            value: formData.street_number,
            error: errors.street_number,
            handleChange: handleChange,
        },
        {
            id: 2,
            label: "Street Name:",
            inputname: "street_name",
            type: "streetname",
            placeholder: "Enter Your Street name",
            value: formData.street_name,
            error: errors.street_name,
            handleChange: handleChange,
        },
        {
            id: 3,
            label: "Location:",
            inputname: "location",
            type: "location",
            placeholder: "Enter Your Location",
            value: formData.location,
            error: errors.location,
            handleChange: handleChange,
        },
    ]
    const Continue = e => {
        e.preventDefault();
        nextStep();
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // const formErrors = validateForm();
        // setErrors(formErrors);
    
        // console.log("Form errors", formErrors)
        console.log("FormData", formData)
    }
  return (
    <div>
        <form className='flex justify-center items-center w-full'>
            <div className='mt-12'>
            <div className='flex flex-col my-6 justify-start items-start gap-4'>
                {inputs.map((item, i) =>(
                <div className='form-cont' key={i}>
                    <div className='form-cont'>
                        <label className='text-primary font-bold text-lg'>{item.label}</label>
                        <input className='border-2 border-solid w-full border-gray-400 px-4 rounded-lg' type={item.type} name={item.inputname} value={item.value}
                        placeholder={item.placeholder} onChange={item.handleChange}/>
                    </div>
                    {item.error && <p className='text-red-400 text-sm px-2'>{item.error}</p>}
                </div>
                
                ))}
            </div>
            
            <div className='flex justify-around'>
                <div className='w-[25%] flex flex-col my-6'>
                    <button className="block w-full rounded-3xl font-semibold text-lg bg-primary text-white outline-none border-none py-1 px-1 
                    cursor-pointer" onClick={Previous}>Back</button>
                </div>
                <div className='w-[25%] flex flex-col my-6'>
                    <button className="block w-full rounded-3xl font-semibold text-lg bg-primary text-white outline-none border-none py-1 px-1
                    cursor-pointer" onClick={Continue}>Next</button>
                </div>
            </div>
            </div>
        </form>
    </div>
  )
}

export default Location