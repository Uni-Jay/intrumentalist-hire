import React, { Component, useState } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Success from './Success';
import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { validatePersonalDetails, validateUserDetails, validateEmailPassword, validateLocation } from '../Validate/Validation';
import EmailPassword from './EmailPassword';
import { useFormContext } from '../contexts/FormContext';
import Location from './Location';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
    const { formData, setFormData, errors, setErrors} = useFormContext();
    const [selectionFormData, setSelectionFormData] = useState({
      state: "",
      city: ""
    })

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);

  

    // const values = { email, username, password, firstName, lastName, country }

    
      
    //go back to previous step
    const prevStep = () => {
      const {step} = formData;
      const formErrors = validateForm(step);
      console.log("Prev Errors:", formErrors);
      console.log("Prev Step:", step);
        setErrors(formErrors);

        if(Object.keys(formErrors).length == 0){
        setFormData({
            ...formData,
            step: (step == 1 || step < 1)  ?  1 : step - 1,
        });
      }
    }
    //go back to next step
    const nextStep = () => {
      const {step} = formData;
      const formErrors = validateForm(step);
      console.log("Next Errors:", formErrors);
      console.log("Next Step:", step);
      setErrors(formErrors);

      if(Object.keys(formErrors).length == 0 && formData.step <= 5){
        setFormData({
            ...formData,
            step: step + 1,
        });

        }
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
    //Handle this change
    const handleChange = (e) => {
      console.log(e.target.value);

      setFormData({
        ...formData,
        [e.target.name] : e.target.value,
      })
    }

    const formDataUserDetails = {
      step: formData.step,
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      location: formData.location,
      street_number: formData.street_number,
      street_name: formData.street_name,
      lga: formData.lga,
      state: formData.state,
      city: formData.city,
    }
    const formDataLocation = {
      step: formData.step,
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      location: formData.location,
      street_number: formData.street_number,
      street_name: formData.street_name,
      lga: formData.lga,
      state: formData.state,
      city: formData.city,
    }
    const formDataEmailPassword = {
      step: formData.step,
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      location: formData.location,
      street_number: formData.street_number,
      street_name: formData.street_name,
      state: formData.state,
      city: formData.city,
      lga: formData.lga
    }

    const validateForm = (currentStep) => {
      switch (currentStep) {
        case 1:
          return validatePersonalDetails(formData);
        case 2:
          return validateEmailPassword(formDataEmailPassword);
        case 3:
          return validateLocation(formDataLocation);
        case 4:
          return validateUserDetails(formDataUserDetails);
        default:
          break;
      }
    }
    
    const selectionProps = {
      countries: countries,
      selectedCountry: selectedCountry,
      setCountries: setCountries,
      setSelectedCountry: setSelectedCountry,
      states: states,
      selectedState: selectedState,
      setStates: setStates,
      setSelectedState: setSelectedState,
      cities: cities,
      selectedCity: selectedCity,
      setCities: setCities,
      setSelectedCity: setSelectedCity,
    }

        const renderComponents = (step) => {
            switch (step) {
                case 1: 
                  return (
                    <PersonalDetails
                      nextStep={nextStep}
                      handleChange={handleChange}
                    />
                  )
                case 2: 
                  return (
                    <EmailPassword 
                      prevStep={prevStep}
                      nextStep={nextStep}
                      handleChange={handleChange}
                      values={formData}
                      errors={errors}
                    />
                  )
                  case 3: 
                  return (
                    <Location 
                      prevStep={prevStep}
                      nextStep={nextStep}
                      handleChange={handleChange}
                      values={formData}
                      errors={errors}
                    />
                  )
                case 4: 
                  return (
                    <UserDetails 
                      prevStep={prevStep}
                      nextStep={nextStep}
                      handleChange={handleChange}
                      values={formData}
                      errors={errors}
                      selectionProps={selectionProps}
                      selectedPropsData={selectionFormData}
                      selectedPropschange={setSelectionFormData}
                    />
                  )
                case 5:
                  return (
                    <Success />
                  )
                // never forget the default case, otherwise VS code would be mad!
                default: 
                   break;
              }
        }
        


        return (
            <div className=' w-full'>
              <div className='font-playpen'>
                <div className='bg-primary'>
                  <div className='pt-6 pb-8'>
                    <Navbar/>
                  </div>
                </div>
                <div className='flex justify-center items-center flex-col'>
                  <div className='flex items-center px-20 pt-20 justify-center gap-2 animate__animated animate__slideInDown'>                
                    <h3 className="text-2xl md:text-3xl font-bold text-primary">REGISTER</h3>
                    <div className="">
                      <Link to={"/auth/login"} className="bg-white rounded-full py-3 md:px-2 text-primary text-md font-semibold md:text-lg">Sign In</Link>
                    </div>
                  </div>
                  <div className='flex md:px-18 px-6 w-full py-8 justify-center items-centershadow shadow-primary  animate__animated animate__slideInDown text-primary'>
                    <div className='bg-white rounded-md flex shadow-md shadow-primary justify-center items-center
                    px-10'>
                      <div className='flex justify-center items-center'>
                        {renderComponents(formData.step)}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div>
              <ToastContainer />
            </div>
        )
}



export default SignUp