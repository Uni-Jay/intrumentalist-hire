import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import instance from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaRegEnvelope, FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { Show } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';
import Service_Carousel from './Service_Carousel';
import Footer from '../Footer/Footer';
import ContactSection from '../Contact_section/ContactSection';
import FeedbackList from '../Feedback/FeedbackList';
import Review_List from './Review_List';

function Service_Profile() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    remark: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    console.log("FormErrors:", formErrors);
    setErrors(formErrors);

    if(Object.keys(formErrors).length === 0){

        try {
            
            const formDataToSend = {
              remark: formData.remark
            }

            const response = await instance.post(`/api/booking/`, formDataToSend);
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
              navigation("/services/single-service/:id");
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





  let { id } = useParams();

  const { user } = useAuth();
  const [data, setData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/user/${id}`);
        console.log("user:", response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [gig, setGig] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/gig/user-gigs/${user}`);
        console.log("gig:", response.data);
        setGig(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [userBooking, setUserBooking] = useState([])
  
  

  const serviceTabs = [
    {
      title: "Overview",
      content: <Service_Carousel/>,
    },

    {
      title: "Services Offered",
      content: <Service_Carousel/>,
    },

    {
      title: "Reviews",
      content: <Review_List/>,
    },
  ]

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


  const [selectedTab, setSelectedTab] = useState("Overview");
  const [filteredTab, setFilteredTab] = useState(serviceTabs[0]);

  const filteredTabs = (value) => {
    const filteredTab = serviceTabs.find(item => item.title === value);
    setFilteredTab(filteredTab)
  }

  const handleSelectedTab = (e, value) => {
    e.preventDefault();
    setSelectedTab(value);
    filteredTabs(value);
  }

  return (
   <div>
    <div className='bg-blue-950 py-6 px-4 md:px-0'>
      <Navbar/>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2  md:gap-8 md:px-20 px-4'>
      <div className='mt-10'>
        <div className='flex flex-col gap-2 pb-4'>
          <h2 className='text-4xl font-bold'>Drumming Service</h2>
          <div className='flex gap-2'>
            <IoLocationOutline size={20}/>
            <h2>{data?.location}, {data?.state}</h2>
          </div>
          <span className='bg-blue-950 text-white px-2 py-2 rounded-md w-full'>Drumming</span>
        </div>
        <div className='flex flex-col gap-4'>
          
          <Show above='md'>
            <div className='border-2 rounded-md w-full  border-blue-950'>
              <img src={data?.image} alt='' style={{
                height: 600,
                width: 800,
              }}/>
            </div>
          </Show>
          <Show below='md'>
            <div className='border-2 rounded-md w-full border-blue-950'>
              <img src={data?.image} alt='' style={{
                height: 340,
                width: 340,
              }}/>
            </div>
          </Show>

          
          <div className='flex gap-2 md:gap-6'>
            <button className={`${selectedTab === "Overview" ? "bg-blue-950 text-white" : ""} border-2 px-2 py-2 border-blue-950 rounded-md`} onClick={(e) => handleSelectedTab(e, "Overview")}>Overview</button>
            <button className={`${selectedTab === "Services Offered" ? "bg-blue-950 text-white" : ""} border-2 px-2 py-2 border-blue-950 rounded-md`} onClick={(e) => handleSelectedTab(e, "Services Offered")}>Services Offered</button>
            <button className={`${selectedTab === "Reviews" ? "bg-blue-950 text-white" : ""} border-2 px-2 py-2 border-blue-950 rounded-md`} onClick={(e) => handleSelectedTab(e, "Reviews")}>Reviews</button>
          </div>
        </div>

        {
          filteredTab &&
          <div className='flex flex-col gap-2 mt-6'>
            <h1 className='text-blue-950 font-bold'>{filteredTab.title}</h1>
            <p className='pb-6'>{filteredTab.content}</p>
          </div>
        }
      </div>
      <div className='md:mx-24'>
        <div className='border border-[#003366] border-solid mt-10 rounded-md gap-2 md:mb-10 flex justify-center items-center flex-col'>
          <h1 className='text-blue-950 font-bold pt-6 text-2xl'>N{gig?.price}/hour</h1>
          <Link to={`/order-form/${id}`}><div className='bg-blue-950 md:px-20 px-16 py-2 text-white font-semibold rounded-lg flex gap-4 my-2'>Book Service <FaWhatsapp size={22}/></div></Link>
          <Link to={`/update-order-form/${id}`}><div className='bg-blue-950 md:px-20 px-16 mt-6 mb-4 py-2 text-white    font-semibold rounded-lg flex justify-center gap-4'>Update Booking <FaWhatsapp size={22}/></div></Link>
        </div>
        <div className='border border-[#003366] border-solid mt-10 rounded-md gap-4 px-6 md:mb-10'>
          <div className='flex flex-col gap-4'>
            <h1 className='pt-4 font-medium text-xl text-[#003366]'>Contact Details</h1>
              </div>
              <div>
                <div>
                  <div>
                    <div className='flex gap-4 py-4'>
                      <FaRegEnvelope size={20}/>
                      <h2>{data?.email}</h2>
                    </div>
                    <div className='border-b border-[#003366]'/>
                    <div className='flex gap-4 py-4'>
                      <FiPhone size={20}/>
                      <h2>(+234) {data?.phone_number}</h2>
                    </div>
                    <div className='border-b border-[#003366]'/>
                    <div className='flex gap-4 py-4'>
                      <IoLocationOutline size={20}/>
                      <h2>{data?.location}, {data?.state}</h2>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div className='border border-[#003366] border-solid mt-10 mb-6 rounded-md gap-4 px-6 md:mb-10 animate__animated animate__slideInUp'>
        <div className='flex flex-col gap-4'>
          <h1 className='pt-4 text-xl text-[#003366] font-bold'>Service Provider</h1>
            <div className='flex items-center gap-2'>
              <img src={data?.image} alt=''
              style={{
                height: 40,
                width: 40,
                resize: 'contain',
                borderRadius: 100,
                borderColor: '#003366',
                border: 10
              }}/>
              <div>
                <div>
                  <h2 className='text-[#003366] font-bold'>{data?.fullname}</h2>
                  <p className='font-semibold text-[#cccccc]'>20 Services offered</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <div className='border-b border-[#003366] font-bold py-2'/> 
                <div className='flex items-center justify-around pt-2 pb-6'>
                  <div>
                    <h2 className='font-bold'>Follow Me:</h2>
                  </div>
                  <div className='flex gap-2'>
                    <FaFacebook color='#003366' size={20}/>
                    <FaTwitter color='#003366' size={20}/>
                    <FaInstagram color='#003366' size={20}/>
                  </div>
                </div>  
                </div>
                
              </div>
          </div>
          
        </div>
      </div>
      <div className=''>
        {/* <Service_Carousel/> */}
      </div>
    </div>
    <div className='pt-4'>
      <Footer/>
    </div>
   </div>
  )
}

export default Service_Profile