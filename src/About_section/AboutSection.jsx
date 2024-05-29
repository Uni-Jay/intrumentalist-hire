import React from 'react'
import { Link } from 'react-router-dom'

const AboutSection = () => {

  return (
    <div>
        <div className='r w-[90%] gap-10 my-20  md:mx-auto h-30 grid grid-cols-1 md:grid-cols-2'>
            <div className='w-full flex flex-col gap-8 animate__animated animate__slideInLeft p-4 md:p-0'>
                <h3 className="text-4xl md:text-5xl font-bold text-blue-950">About <span className="text-4xl md:text-6xl font-semibold font-playpen text-black">M</span><span className='text-primary font-semibold font-playpen'>i</span><span className='text-black text-4xl md:text-6xl font-semibold font-playpen'>H</span></h3>
                <p className='text-sm'>Music Instrumentalist Hire (MiH) was created in order to put end to any disappointment 
                    pertaining to music. Lorem ipsum dolor, 
                    sit amet consectetur adipisicing elit. Deserunt laborum delectus commodi. 
                    Dolorem harum, aliquid sequi earum, magni totam voluptate dignissimos reiciendis 
                    maiores non autem voluptas aut dolorum accusantium praesentium.
                </p>

                <div>
                    <Link to={"/about"} className='text-white bg-primary shadow-lg flex justify-center items-center 
                    shadow-[rgba(255,255,255,0.6)] py-3 rounded-md font-semibold px-6'>Read More</Link>
                </div>
            </div>

            <div className='w-full p-10 bg-blue-950 rounded-lg h-22 animate__animated animate__slideInRight'>
                <img src='/images/musicinstrument.jpg' alt='sax'/>
            </div>
        </div>
    </div>
  )
}

export default AboutSection