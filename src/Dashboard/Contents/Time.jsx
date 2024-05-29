import React from 'react'
import { useState } from 'react';

function Time() {
    const [formData, setFormData] = useState({
        from: "",
        From: "",
        To: ""
    });

    const [errors, setError] = useState({});
    const planForm = [
        {
            id: 1,
            label: "From:",
            inputname: "from",
            type: "time",
            value: formData.from,
            error: errors.from,
            handleChange: (e) => setFormData({
              ... formData,
              from: e.target.value
            })
        },
        {
            id: 2,
            label: "To:",
            inputname: "to",
            type: "time",
            value: formData.to,
            error: errors.to,
            handleChange: (e) => setFormData({
              ... formData,
              to: e.target.value
            })
        },
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setError(formErrors);

        console.log("Form errors", formErrors)
        console.log("FormData", formData)
    }

    const validateForm = () => {
        let errors= {}
        if (!formData.from || formData.from.trim().length === 0){
            errors.from = "From is required"
        }
        return errors
    }

  return (
    <div>
        <div className='flex flex-col '>
            <label className='text-blue-950 font-bold text-md md:text-lg'>Time:</label>
            <div className='flex  justify-start items-start gap-4'>
              {planForm.map((item, i) => (
                <div className='' key={i}>
                  <label className='text-blue-950 font-bold text-sm md:text-md'>{item.label}</label>
                  <input className='w-full border-2 border-solid border-gray-400 rounded-lg pl-4' type={item.type} 
                  name={item.inputname} onChange={item.handleChange}/>
                  {item.error && <p className='my-2 md:my-4 text-sm text-red-400'>{item.error}</p>}
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Time
