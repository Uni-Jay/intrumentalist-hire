import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { LuUpload } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import instance from '../utils/api';

function UpdateGig() {

  let { id } = useParams();

  console.log("Gig Id:", id);


  const { user } = useAuth();
  const [formData, setFormData] = useState({
    instrument: "",
    price: "",
    description: "",
    video_url: ""
  });
  
  const [errors, setErrors] = useState({});

  const handleUpload = () => {
    if (selectedFile) {
    const formData = new FormData();
    formData.append('video', selectedFile);
    }
  }

  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log("FormData", formData)
  }

  const [videoFile, setVideoFile] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const uploadVideo = async () => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await axios.put(`api/gig/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Video uploaded successfully!', response.data);
      // Handle success, e.g., display a success message or update state
    } catch (error) {
      console.error('Error uploading video', error);
      // Handle error, e.g., display an error message or update state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    console.log("FormErrors:", formErrors);
    setErrors(formErrors);

    if(Object.keys(formErrors).length === 0){

        try {
            
            const formDataToSend = {
                title: formData.title,
                price: formData.price,
                description: formData.description,
                video_url: formData.video_url,
            }

            const response = await instance.put(`/api/gig/${id}`, formDataToSend);
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

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const response = await instance.get(`/api/gig/${id}`);
        const userInfo = response?.data;
        console.log("userInfo:", response?.data);

        setFormData({
            instrument: userInfo?.instrument,
            price: userInfo?.price,
            description: userInfo?.description,
            video_url: userInfo?.video_url,
            user_id: user
        });

        
      } catch(error) {
        console.error(error);
      }
    }
    // setVideoFile(userInfo?.videoFile)
    fetchUser();
  }, [user])
      
      const video_url = () => {
       return 'https://youtu.be/0BIaDVnYp2A';
      }
      const playerRef = useRef(null)
    
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
            <div className="py-8 px-4 mx-auto max-w-2xl lg:pt-28">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Gig</h2>

                <form action="#">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 ">
                      <div>
                        <input type="file" accept="video/*" onChange={onFileChange} />
                        
                        {videoFile && (
                          <div className='w-80 h-80 mb-10'>
                            <ReactPlayer url={URL.createObjectURL(videoFile)} controls />
                            <button onClick={uploadVideo}>Upload Video</button>
                          </div>
                        )}
                      </div>

                        <div className="sm:col-span-2 mt-4">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instrument</label>
                          <input type="text" name="instrument" id="name" value={formData.instrument} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Instrument" required=""/>
                          {errors.instrument && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.instrument}</p>}
                        </div>

                        <div className="sm:col-span-2 mt-4">
                          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                          <input type="text" name="price" id="name" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$500" required=""/>
                          {errors.price && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.price}</p>}
                        </div> 

                        <div className="sm:col-span-2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>

                          <textarea id="description" rows="8" cols="10" name='description' value={formData.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 " placeholder="Your description here"></textarea>
                          {errors.description && <p className='py-2 md:py-2 text-sm text-red-400'>{errors.description}</p>}
                        </div>
                    </div>

                    <button type="submit" className="md:inline-flex flex items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={handleSubmit}>
                        Update Gig
                    </button>

                </form>
            </div>
          <ToastContainer/>
        </section>
    )
                     
}


export default UpdateGig