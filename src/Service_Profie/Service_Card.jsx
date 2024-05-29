import ReactPlayer from 'react-player';
import React, { useRef, useState } from 'react';
import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, ButtonGroup, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import instance from '../utils/api';

function Service_Card({id,onDelete,price, button, handleShowConfirmation, showConfirmation,instrument, description, video_url,}) {
    const playerRef = useRef(null)

    const DeleteConfirmationDialog = ({ onDelete, onCancel }) => (
    <div className=" w-full h-full flex items-center justify-center  ">
    <div className="flex flex-col py-4 w-full max-w-md gap-6  bg-gray-800 px-4">
      <p className="text-sm flex justify-center items-center text-white">
        Are you sure you want to delete this gig?
      </p>
      <div className="flex justify-center items-center text-sm">
        <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md">
          Yes
        </button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded-md">
          No
        </button>
      </div>
        </div>
        </div>
    );
    // const handleDelete = async () => {
    //     try {
    //       const response = await instance.delete('https://localhost:8000/api/gig/${id}');
    //       console.log(response.data);
    //       // Process the response data or perform other operations
    //     } catch (error) {
    //       console.error(error);
    //       // Handle errors, if any
    //     }
    // }
    
    
    
   
    
    
    
    return (
        <div className='flex w-full'>
            <Card>
                <CardBody>
                   {video_url ? <ReactPlayer ref={playerRef} url={video_url} controls={true} 
                   width={280} height={280}/>  : 
                    <div className='flex justify-center items-center flex-col'>
                        <p>No video found.</p>
                    </div>
                   } 
                <Stack mt='6' spacing='3'>
                    <Heading size='sm'>{instrument}</Heading>
                    <Text className='py-2 font-semibold'>
                      N{price}
                    </Text>
                    <Text>
                      {description}
                    </Text>
                    <Text style={{
                        fontWeight: 900,
                        color: '#004080'
                    }}>
                    </Text>
                </Stack>
                </CardBody>
                
                <CardFooter style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: ''
                }}>
                  
                </CardFooter>
            </Card>
        </div>
    )
}

export default Service_Card