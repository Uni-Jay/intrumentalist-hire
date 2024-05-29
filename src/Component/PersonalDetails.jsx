import React from 'react'
import { Link } from 'react-router-dom';
import { useFormContext } from '../contexts/FormContext';

const PersonalDetails = ({nextStep, handleChange}) => {
    const { formData, errors } = useFormContext();
    console.log("FormData Personal:", formData);

    const inputs = [
        {
            id: 1,
            label: "Fullname:",
            inputname: "fullname",
            type: "text",
            placeholder: "Enter Your Fullname",
            value: formData.fullname,
            error: errors.fullname,
            onChange: handleChange,
        },
        {
            id: 2,
            label: "Username:",
            inputname: "username",
            type: "text",
            placeholder: "Enter Your Username",
            value: formData.username,
            error: errors.username,
            onChange: handleChange,
        },
    ]
    const Continue = e => {
        e.preventDefault();
        nextStep();
    }
  return (
    <div>
        <form className='flex justify-center items-center w-full px-2'>
            <div className='mt-12'>
            <div className='flex flex-col my-6 justify-start items-start gap-4'>
                {inputs.map((item, i) =>(
                <div className='form-cont' key={i}>
                    <div className=''>
                        <label className='text-primary font-bold text-md'>{item.label}</label>
                        <input className='rounded-lg w-full px-4 border-2 border-solid border-gray-400' type={item.type} name={item.inputname} value={item.value}
                        placeholder={item.placeholder} onChange={item.onChange}/>
                    </div>
                    {item.error && <p className='text-red-400 text-sm py-2'>{item.error}</p>}
                </div>   
                
                ))}
            </div>
            <div className='flex-col my-6 flex justify-center items-center'>
            <button className=" rounded-3xl text-lg bg-primary text-white border-none py-2 px-12 
                cursor-pointer"onClick={Continue}>Next</button>
            </div>
            <div className='gap-2 pb-8 px-6 flex justify-center flex-col md:flex-row'>
              <p className='text-sm text-black'>Already have an account?</p>
              <Link to={"/auth/login"} className="text-primary text-sm md:text-sm items-center flex justify-center">Click Here!</Link>
            </div>
      
            </div>
        </form>
    </div>
  )
}

export default PersonalDetails