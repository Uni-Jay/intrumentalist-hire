import React from 'react'
import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, ButtonGroup, Text } from '@chakra-ui/react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Home_Card({ title, button2, bgColor, color, description, path, images}) {
    return (
            <Card style={{
            // backgroundColor: 'white',
            backgroundColor: '#ffffcc',
            display: 'flex',
            }}>
                <CardBody>
                    <div className='flex gap-4'>
                        <div>
                            <Stack mt='4' spacing='2'>
                                <Heading size='md'
                                style={{
                                    color: '#003366',
                                }}>{title}</Heading>
                            </Stack>
                            <div className='flex flex-col gap-2 pt-2'>
                                <div className='flex justify-center items-center'>
                                    <Text style={{
                                        color: '#333333',
                                        fontWeight: 600
                                    }}>{description}</Text>
                                    <img src={images} style={{
                                        height: 120,
                                        width: 120,
                                        resize: 'contain',
                                    }}/>   
                                </div>
                                <div className='flex justify-between'>
                                    <Text style={{
                                    backgroundColor: '#E6FAFF',
                                    color: '#003366',
                                    width: 40,
                                    display: 'flex',
                                    paddingInline: 8,
                                    paddingBlock: 2,
                                    borderRadius: 6,
                                    fontWeight: 800,
                                    }}>{button2}</Text>
                                    <Link to={ path }>
                                        <FaArrowRight size={24}  style={{
                                        justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        color: '#003366'
                                        }}/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </CardBody>
               
            </Card>
    )
}

export default Home_Card