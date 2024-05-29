import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../pages/about";
import Forget_password from "../pages/auth/Forget_password";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import Contact from "../pages/contact";
import Services from "../pages/services";
import Service_Profile from "../Service_Profie/Service_Profile";
import FeedbackForm from "../Feedback/FeedbackForm";
import OrderForm from "../Orders/Order_Form";
import Review_Form from "../Service_Profie/Review_Form";


const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/services/single-service/:id" element={<Service_Profile />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/order-form/:id" element={<OrderForm/>}/>
      {/* <Route path="/update-order-form/:id" element={<Review_Form/>}/> */}
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/auth/register" element={<Register/>}/>
      <Route path="/auth/login" element={<Login/>}/>
      <Route path="/review-form" element={<FeedbackForm/>} />
      <Route path="/auth/forget-password" element={<Forget_password/>}/>      
    </Routes>
  )
}

export default AuthRoute