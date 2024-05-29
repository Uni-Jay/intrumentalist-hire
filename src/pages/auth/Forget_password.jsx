import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'

function Forget_password() {
  return (
    <div>
      <form class="max-w-s pt-18 mb-6">
      <div>
        <div className='bg-blue-950 py-6'>
          <Navbar/>
        </div>
        <div className='flex flex-col gap-10 pt-8'>
          <div className='item-center flex justify-center'>
            <h1 className='text-2xl font-semibold pt-4'>Forget Password</h1>
          </div>
          <div className='w-full items-center flex justify-center flex-col'>
            <label for="email-address-icon" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email:</label>
            <div className='flex flex-col gap-4'>
              <div class="relative">
                <input type="text" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"/>
              </div>
              <div className='items-center justify-center flex w-full'>
                <Link>
                  <button className='bg-blue-950 px-16 py-4 text-white rounded-xl w-full'>Submit</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>     
    </form>
    <Footer/> 
    </div>
   

  )
}

export default Forget_password