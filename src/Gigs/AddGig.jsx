import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import instance from '../utils/api';
import { useNavigate } from 'react-router-dom';


function AddGig() {
  const [formData, setFormData] = useState({
    price: "",
    description: "",
    instrument: "",
      
  });
  const { user } = useAuth();


  const navigation = useNavigate();

  // const handleUpload = () => {
  //   if (selectedFile) {
  //   const formData = new FormData();
  //   formData.append('video', selectedFile);
  // }
  // }
  

  
  
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const response = await instance.get(`/api/user/${user}`);
        const userInfo = response?.data;
        setFormData({
          instrument: userInfo?.instrument,
          price: userInfo?.price,
          description: userInfo?.description,
        })
      } catch(error) {
        console.error(error);
      }
    }
  
    fetchUser();
  }, [user])
  
      



  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log("FormData", formData)
  }


  
  const [video, setVideo] = useState(null);
  
  const handleVideoUpload = (e) => {
    const selectedVideo = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        if(reader.readyState === 2) {
          console.log("Video:", reader.result);
            setVideo(reader.result);
        }
    }

    if(selectedVideo){
        reader.readAsDataURL(selectedVideo);
    }

    console.log("Video", selectedVideo);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    console.log("FormErrors:", formErrors);
    setErrors(formErrors);

    if(Object.keys(formErrors).length === 0){

        try {
            
            const formDataToSend = {
              video_url: video,
              price: formData.price,
              description: formData.description,
              instrument: formData.instrument,
              userId: user
            }

            const response = await instance.post(`/api/gig/`, formDataToSend);
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
              navigation("/dashboard/gig-list");
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


  const playerContainerStyles = {
    marginTop: '20px',
  };



  const validateForm = () => {
    let errors= {}
    if(!formData.instrument || formData.instrument.trim().length === 0){
      errors.instrument = "Please fill this field"
    }
    if(!formData.price || formData.price.trim().length === 0){
      errors.price = "Please input a price"
    }
    if(!formData.description || formData.description.trim().length === 0){
      errors.description = "Please fill this filed"
    } else if (!formData.description || formData.description.trim().length < 5){
      errors.description = "Please input min of 5 characters"
    }
    return errors
  }


return (
  <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-2 mx-auto max-w-2xl lg:pt-28 pt-24">
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Gig</h2>
      <form action="#">
          <div className="grid gap-4 grid-cols-1 sm:gap-6 ">
            <div className=''>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
              
              {video && (
                <div style={playerContainerStyles}>
                  <ReactPlayer url={video} controls
                  />
                  <button onClick={handleVideoUpload}>Upload Video</button>
                </div>
              )}
            </div>
            <div className="">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instrument</label>
              <input type="text" name="instrument" id="name" value={formData.instrument} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Drummer" required=""/>
              {errors.instrument && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.instrument}</p>}
            </div>
            <div className="">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
              <input type="text" name="price" id="name" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$500" required=""/>
              {errors.price && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.price}</p>}
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea id="description" rows="8" cols="10" name='description' value={formData.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 " placeholder="Your description here"></textarea>
              {errors.description && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.description}</p>}
            </div>
          </div>
          <button type="submit" className="md:inline-flex flex items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={handleSubmit}>
            Add Gig
          </button>
          
      </form>
  </div>
  <ToastContainer/>
  </section>
  
)
            
}

export default AddGig