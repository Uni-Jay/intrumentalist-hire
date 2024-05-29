import { useState } from 'react'
import Content from './Content'
import SideBar from './SideBar'
import { IoMenuSharp } from "react-icons/io5";
import { Button, Grid, GridItem, Show, useDisclosure } from '@chakra-ui/react'
import DrawerBoard from './DashboardDrawer';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Profile from './Profile/profile';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show, setShow] = useState(false);

  const handleToggle = () => {
      
    if(show == true){
      onOpen();
    } else if(show == false){
      onClose();
    }
    setShow(!show);
  }
    
  return (
    <div className='relative flex flex-col'>
      <div className='flex py-4 px-2 bg-[rgb(230,250,255)]
      fixed inset-0 h-20 z-[9999] justify-between'>
        <Show below='md'>
          <Button colorScheme='' color={'black'} onClick={handleToggle} className='hidden'>
            <div>
              <IoMenuSharp size={32}/>
            </div>
          </Button>
        </Show>
        <div className='flex md:justify-between md:items-start
        px-40 md:px-0 z-[10000]'>
          <div className='flex items-center justify-between'>
            <Link to={'/'}>
              <h3 className="text-3xl lg:text-5xl font-semibold font-playpen">MiH</h3>
            </Link>
          </div>
          <Profile className=""/>
        </div>
      </div>
      <Grid templateColumns='repeat(12, 1fr)' >
        <GridItem colSpan={{ base: 12, md:2 }}>
          <div  className="">
            <DrawerBoard show={show} onOpen={onOpen} onClose={onClose}/>
          </div>
        </GridItem>

        <GridItem colSpan={{ base: 12, md: 10 }}>
          <div className='md:p-0 px-8'>
            <Content/>
          </div>
        </GridItem>
      </Grid>
      
    </div>
  )
}

export default Dashboard