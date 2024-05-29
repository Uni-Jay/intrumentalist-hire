import AppRoute from "./routes/AppRoute";
import AuthRoute from "./routes/AuthRoutes";
import Footer from "./Footer/Footer";
// import Header from "./Header/Header";
// import SimpleMultiForm from "./SimpleMultiForm/SimpleMultiForm";
import { FormProvider } from "./contexts/FormContext";
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./utils/helper";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import ClientForm from "./Client/Client_Form";

const App = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated()){
      navigate("/");
    }
  }, [])

  return (
    <>
      {/* <Header/> */}
      <FormProvider>
        <ChakraProvider theme={theme}>
          { isAuthenticated() ?
            <AppRoute/>
            :
            <AuthRoute/>
          }
        </ChakraProvider>
      </FormProvider>
    {/* <SimpleMultiForm/> */}
      {/* <ClientForm/> */}
    
    </>
  )
}

export default App