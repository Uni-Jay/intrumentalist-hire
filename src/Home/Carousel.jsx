import React, { useEffect, useRef, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import instance from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import Card from './Card';


export default function Carouel() {

  let { id } = useParams();

  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(20);
  const prependNumber = useRef(1);
  // Create array with 20 slides
  const [slides, setSlides] = useState(
    
  );

  const [data, setData] = useState(Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`))
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

  const prepend = () => {
    setData([
      `Data ${prependNumber.current - 2}`,
      `Data ${prependNumber.current - 1}`,
      ...data,
    ]);``
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };



  const append = () => {
    setData([...data, 'Data ' + ++appendNumber.current]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <div className='animate__animated animate__slideInLeft'>
      <div className='text-4xl flex justify-center items-center pt-6 text-blue-950'>
        <Link to={'/services'}>
          <h1>Service</h1>
        </Link>
      </div>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        virtual
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} virtualIndex={item} className='md:px-4 pt-10 px-2 gap-2 w-full md:flex'>
            <Card
            content={item.username} 
            title={item.phone_number}
            image={item.image}
            reviewComment={item.lga}
            reviewCount={item.state}
            cont={item.cont}
            image2={item.image}
            starting={item.starting}
            // path={path}
            id={item.id}
            price={item.price}/>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <p className="append-buttons">
        <button onClick={() => prepend()} className="prepend-2-slides">
          Prepend 2 Slides
        </button>
        <button onClick={() => slideTo(1)} className="prepend-slide">
          Slide 1
        </button>
        <button onClick={() => slideTo(250)} className="slide-250">
          Slide 10
        </button>
        <button onClick={() => slideTo(500)} className="slide-500">
          Slide 20
        </button>
        <button onClick={() => append()} className="append-slides">
          Append Slide
        </button>
      </p> */}
    </div>
  );
}