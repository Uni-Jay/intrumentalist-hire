import React from 'react'
import { Link } from 'react-router-dom'
import {
Box, 
Accordion,
AccordionItem,
AccordionButton,
AccordionPanel,
AccordionIcon,
createMultiStyleConfigHelpers, defineStyle 
} from '@chakra-ui/react'
import { accordionAnatomy } from '@chakra-ui/anatomy'


function BarItems({icon,display, icon2, path, isVisible, children}) {
  // console.log("isVisible:", isVisible);


const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys,
)


// This saves you time, instead of manually setting the size and
// variant every time you use an accordion:


  return (
    <>
    {children && children.length > 0 ?
            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem border='none' w={146} marginLeft={-4}>
                <h2 className='w-full'>
                  <AccordionButton>
                    <Box w={100} style={{
                      display: 'flex',
                      gap: 6,
                    }}>
                      {icon}
                      {display}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <div className='flex flex-col gap-2'>
                      {children.map((child, i) => (
                        <Link to={child.path}>
                          <div className='pl-6 w-full'>
                            <Box style={{
                              
                              
                            }}>
                              {isVisible && child.display}
                            </Box>          
                          </div>
                        </Link>
                      ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>
              </Accordion>
            
            :

          <Link to={path}>
            <div className='flex gap-2 '>
              {icon}
                <Box style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {isVisible && display}
                  {isVisible && icon2}
                </Box>          
            </div>
          </Link>

        }

    
    
    </>
  )
}

export default BarItems