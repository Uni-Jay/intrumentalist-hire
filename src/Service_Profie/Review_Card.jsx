import React from 'react'

function Card({name, date, email, remark}) {
  return (
    <div>
        <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12  bg-white dark:bg-gray-800 gap-0.5">
            
            <div className="max-w-2xl mx-2  text-gray-500  dark:text-gray-400">
                <h3 className="text-md  text-gray-900 dark:text-white">{remark}</h3>
            </div>
            <figcaption className="flex ">
                {/* <img className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/> */}
                <div className=" dark:text-white  ms-3">
                    <div className='text-sm font-bold uppercase'>{name}</div>
                    <p className="text-sm font-semibold">{email}</p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 ">{date}</div>
                </div>
            </figcaption> 
        </div>   
    </div>
  )
}

export default Card