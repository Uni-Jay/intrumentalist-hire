import React from 'react';
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Card = ({title, image, content,  reviewCount, reviewComment, image2, starting, price, cont, path, id}) => {
    return (
        <div className="rounded-md overflow-hidden border-[1px] border-gray-400 md:mr-4 h-auto mb-6
        ">
            <div className=" ">
                <img src={image} alt="image" className="w-full h-34 -px-2"/>
            </div>

            <div className='flex gap-2 w-full flex-col mx-2 lg:items-center md:flex'>
                <div className='flex gap-0.5 flex-col pt-4'>
                    <div className='flex items-center gap-2'>
                        <img src={image2} alt="profile-img" className='w-10 
                        rounded-full h-10  hidden md:display'/>
                        <Link to={`/services/single-service/${id}`}>
                            <h5 className='text-sm md:text-lg font-medium flex items-center pl-0.5'>{content}</h5>
                        </Link>
                    </div>
                </div>
                
                <h3 className='font-medium text-sm text-gray-400 pl-0.5 pr-2'>{title}</h3>

                <div className="flex w-full pb-6 flex-col md:flex-row md:items-center md:justify-center">
                    <div className='flex gap-0.5 pr-4'>
                        <CiStar color='blue'/>
                        <span className='text-sm'>{reviewComment},</span>
                    </div>
                    <span className='text-sm text-gray-400 font-bold flex items-center pl-4 md:pl-0'>{reviewCount}.</span>
                </div>
                {/* <div className='pl-6'>
                    <hr className="border-t-[1px] border-solid border-black lg:my-1 w-[90%] flex 
                    justify-center items-center"/>
                </div> */}
                
            </div>
            {/* <div className='flex justify-center items-center pl-4 mt-4 pb-4 gap-2'>
                <div className='flex gap-4'>
                    <img src={image2} alt="profile-img" className='w-10 
                    rounded-full h-10'/>
                    <h4 className='w-full'>{cont}</h4>
                </div>

                <div className='pr-4'>
                    <h4>{starting} <b>{price}</b></h4>
                </div>
            </div> */}
        </div>
    )
}

export default Card