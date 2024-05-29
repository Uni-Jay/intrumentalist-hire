import React from 'react';
import { useState } from 'react';
import SelectionDropdown from '../../SelectionDropdown/SelectionDropdown';
import { Link } from 'react-router-dom';


const Register = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    phonenumber: '',
    password: '',
    address: '',
  })

  const [errors, setErrors] = useState({});

  const inputs= [
    {
      id: 1,
      label: "Fullname:",
      inputname: "fullname",
      type: "text",
      placeholder: "Enter Your Fullname",
      value: formData.fullname,
      error: errors.fullname,
      handleChange: (e) => setFormData({
        ...formData,
        fullname: e.target.value
      })
    },
    {
      id: 2,
      label: "Username:",
      inputname: "username",
      type: "text",
      placeholder: "Enter Your Username",
      value: formData.username,
      error: errors.username,
      handleChange: (e) => setFormData({
        ...formData,
        username: e.target.value
      })
    },
    {
      id: 3,
      label: "Email:",
      inputname: "email",
      type: "email",
      placeholder: "Enter Your Email",
      value: formData.email,
      error: errors.email,
      handleChange: (e) => setFormData({
        ...formData,
        email: e.target.value
      })
    },
    {
      id: 4,
      label: "Phone Number:",
      inputname: "phonenumber",
      type: "text",
      placeholder: "Enter Your Phonenumber",
      value: formData.phonenumber,
      error: errors.phonenumber,
      handleChange: (e) => setFormData({
        ...formData,
        phonenumber: e.target.value
      })
    },
    {
      id: 5,
      label: "Password:",
      inputname: "password",
      type: "password",
      placeholder: "Enter Your Password",
      value: formData.value,
      error: errors.password,
      handleChange: (e) => setFormData({
        ...formData,
        password: e.target.value
      })
    },
    {
      id: 6,
      label: "Address:",
      inputname: "address",
      type: "text",
      placeholder: "Enter Your Address",
      value: formData.address,
      error: errors.address,
      handleChange: (e) => setFormData({
        ...formData,
        address: e.target.value
      })
    },
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    console.log("Form errors", formErrors)
    console.log("FormData", formData)
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

    if (!formData.username || formData.username.trim().length === 0){
      errors.username = "Username is required"
    } else if (!formData.username || formData.username.trim().length < 4){
      errors.username = "Input atleast 5 letters"
    }
    if (!formData.phonenumber || formData.phonenumber.trim().length === 0){
      errors.phonenumber = "Phonenumber is required"
    } else if (!formData.phonenumber || formData.phonenumber.trim().length < 9){
      errors.phonenumber = "Please input correct phonenumber"
    }
    if (!formData.email || formData.email.trim().length === 0){
      errors.email = "Email is required"
    } else if (!invalidEmail(formData.email)){
      errors.email = "Invalid Email"
    }
    if (!formData.password || formData.password.trim().length === 0){
      errors.password = "Password is required"
    } else if (!formData.password || formData.password.trim().length < 8){
      errors.password = "Password should not be less than 8 and greater than 16"
    } else if (!formData.password || formData.password.trim().length > 16){
      errors.password = "Password should not be less than 8 and greater than 16"
    }
    if (!formData.address || formData.address.trim().length === 0){
      errors.address = "Address is required"
    }
    if (!formData.country || formData.country.trim().length === 0){
      errors.country = "Please select a country"
    }

    return errors
  }


  return (
    <div className='grid grid-cols-2 md:grid-cols-1 mx-16 w-[90%] animate__animated animate__slideInUp'>
      <div>
        
      </div>

      <form>
        <div className='mt-11'>
          <div className=''>
            <h3 className='text-xl md:text-5xl font-bold text-primary'>Register Here!!!</h3>
          </div>
          <div className='flex flex-col my-6 justify-start items-start gap-4 w-[25%]'>
            {inputs.map((item, i) =>(
              <div className='form-cont' key={i}>
                <label className='text-primary font-bold text-lg'>{item.label}</label>
                <input className='w-full border-2 border-solid border-gray-400' type={item.type} name={item.inputname}
                placeholder={item.placeholder} onChange={item.handleChange}/>
                {item.error && <p className='my-4 text-sm text-red-400'>{item.error}</p>}
              </div>
            
            ))}
          </div>
          <SelectionDropdown
          />
          <div>
            <p>Already have an account?</p>
            <Link to={"/auth/login"} className=" px-6 flex items-center text-primary text-xs sm:text-sm md:text-lg">Click Here!</Link>
          </div>
          <div className='w-[25%] flex flex-col my-6'>
            <button className="block w-full rounded-3xl font-semibold text-lg bg-primary text-white outline-none border-none py-4 px-6 
            cursor-pointer"onClick={handleSubmit}>Sign In</button>
          </div>
        </div>

        
      </form>
    </div>
  )
}

export default Register