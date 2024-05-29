import React, { useEffect, useState } from 'react'
import AboutSection from '../About_section/AboutSection'
import ContactSection from '../Contact_section/ContactSection'
import Header from '../Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Scrollbar, A11y } from 'swiper/modules'
import Footer from '../Footer/Footer';
import { Show } from '@chakra-ui/react';
import Card from '../Services/Card';
import instance from '../utils/api';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';

function Home() {
  

  let { id } = useParams();

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/user/all`);
        console.log("user:", response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header/>
      <Carousel/>
      <AboutSection/>
      <ContactSection/>      
      <Footer/>
    </div>
  )
}

export default Home