import React from 'react'
import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, ButtonGroup, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function PlanCard({ id, plan_title,  availability_status, date, plan_description, onDelete,onCancel, button, handleShowConfirmation, showConfirmation}) {
    const DeleteConfirmationDialog = ({ onDelete, onCancel }) => (
        <div className=" w-full h-full flex items-center justify-center">
        <div className="flex flex-col py-4 w-full max-w-md gap-6 bg-gray-800 px-4 justify-center
        items-center">
          <p className="text-sm flex justify-center items-center text-white">
            Are you sure you want to delete this plan?
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
    return (
        <div className='flex w-full'>
            <Card>
                <CardBody>
                
                <Stack >
                    <Heading >{plan_title}</Heading>
                    <Text>
                        {plan_description}
                    </Text>
                    <Text className='font-bold'>
                        {availability_status}
                    </Text>
                    <Text className='text-sm'>
                        {date}
                    </Text>
                </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                <ButtonGroup className='gap-12 md:gap-56 md:pl-4'>
                    <Link to={`/dashboard/update-plan/${id}`} >
                        <Button variant='solid' style={{
                            backgroundColor: '#e6faff',
                        }}>
                            Edit
                        </Button>
                    </Link>
                    <Button variant='solid' colorScheme='red'>
                        <div className='w-full text-sm flex justify-end items-end'>
                            {/* Button to trigger the confirmation dialog */}
                            <button onClick={handleShowConfirmation}>Delete Plan</button>

                            {/* Conditionally render the confirmation dialog */}
                            {showConfirmation && (
                                <DeleteConfirmationDialog onDelete={onDelete} onCancel={onCancel} />
                            )}
                        </div>
                    </Button>
                </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PlanCard