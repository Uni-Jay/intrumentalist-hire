import React from 'react';
import SelectionDropdown from '../SelectionDropdown/SelectionDropdown';
import { useFormContext } from '../contexts/FormContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetails = ({prevStep, navigate,handleChange, selectionProps,selectedPropsData, selectedPropschange}) => {
    const { formData, errors, setFormData } = useFormContext();
    

    const navigation = useNavigate();

    const inputs = [
        {
            id: 1,
            label: "LGA:",
            inputname: "lga",
            type: "lga",
            placeholder: "lga",
            value: formData.lga,
            error: errors.lga,
            handleChange: handleChange,
        },
    ]

    const handleSubmit = async (e) => {
       e.preventDefault();

        if(Object.keys(errors).length == 0 && formData.step == 4){
            try {

             const formDataToSend = { 
                fullname: formData?.fullname, 
                username: formData?.username, 
                email: formData?.email, 
                phone_number: formData?.phone_number, 
                street_number: formData?.street_number, 
                street_name: formData?.street_name, 
                location: formData?.location, 
                lga: formData?.lga, 
                state: formData?.state, 
                password: formData?.password
            }
            
            console.log("formDataToSend:", formDataToSend);
             const response = await axios.post('http://localhost:8000/api/auth/register', formDataToSend);

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
                navigation("/auth/login");
            }, 5000)

             
            } catch(error) {
                console.log("error:", error.response);
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
                    toast.error(error?.response?.data?.message, {
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
    }
    
    const Previous = (e) => {
        e.preventDefault();
        prevStep();
    }
    
    
  return (
    <div>
        <form className='flex justify-center items-center w-full flex-col px-2'>
            <div className='flex mt-12'>
                {inputs.map((item, i) =>(
                <div className='form-cont' key={i}>
                    <div className=''>
                        <label className='text-primary font-bold text-lg'>{item.label}</label>
                        <input className='rounded-lg border-2 border-solid border-gray-400 px-4 w-full' type={item.type} name={item.inputname} value={item.value}
                        placeholder={item.placeholder} onChange={item.handleChange}/>
                    </div>
                    {item.error && <p className='text-red-400 text-sm'>{item.error}</p>}
                </div>   
                
                ))}
            </div>
            <div className='mt-'>
            <SelectionDropdown
                errors={errors}
                selectionData={selectionProps}
                // formData={selectedPropsData}
                // handleChange={selectedPropschange}
            />
            <div className='flex justify-around'>
                <div className='flex flex-col my-6'>
                    <button className="block w-full rounded-3xl font-semibold text-lg bg-primary text-white outline-none border-none py-1 px-1 
                    cursor-pointer"onClick={Previous}>Back</button>
                </div>
                <div className='flex flex-col my-6'>
                    <button className="block w-full rounded-3xl font-semibold text-lg bg-primary text-white outline-none border-none py-1 px-1
                    cursor-pointer"onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}

export default UserDetails