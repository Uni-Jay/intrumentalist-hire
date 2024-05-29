import React from 'react';
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Card = ({title, image, content,  reviewCount, reviewComment, image2, starting, price, cont, path, id}) => {
    return (
        <div className="rounded-md overflow-hidden border-[1px] border-gray-400 mx-4 h-auto my-2
        ">
            <div className="flex justify-center items-center w-100">
                <img src={image} alt="image" className=""/>
            </div>

            <div className='flex  gap-2  flex-col'>
                <div className='flex gap-0.5  pl-6 flex-col pt-4'>
                    <div className='flex items-center gap-2'>
                        <img src={image2} alt="profile-img" className='w-10 
                        rounded-full h-10'/>
                        <Link to={`/services/single-service/${id}`}>
                            <h5 className='text-lg font-medium'>{content}</h5>
                        </Link>
                    </div>
                    <h3 className='font-medium text-sm text-gray-400 pl-12'>{title}</h3>
                </div>

                <div className="flex pl-16 gap-2 w-full items-center pb-2">
                    <CiStar color='blue'/>
                    <span className=''>{reviewComment},</span>
                    <span className='text-sm text-gray-400'>{reviewCount}</span>
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