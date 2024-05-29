import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Plans from "../Plans/Plans";
import GigsList from "../Gigs/Your_Gigs";
import AddGig from "../Gigs/AddGig";
import UpdateGig from "../Gigs/UpdateGig";
import UpdatePlan from "../Plans/UpdatePlans";
import OrderForm from "../Orders/Order_Form";
import AddPlan from "../Plans/AddPlan";
import Home_Dashboard from "../Home_Dashboard/Home_Dashboard";
import Settings from "../Settings/Settings";
import Home from "../Home/Home";
import Services from "../pages/services";
import About from "../pages/about";
import Contact from "../pages/contact";
import Service_Profile from "../Service_Profie/Service_Profile";
import FeedbackList from "../Feedback/FeedbackList";
import OrderList from "../Orders/OrderList";


const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/services/single-service/:id" element={<Service_Profile />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/order-form" element={<OrderForm/>}/>
      <Route path="feedback-list/:id" element={<FeedbackList/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="" element={<Home_Dashboard/>}/>
        <Route path="add-plan" element={<AddPlan/>}/>
        <Route path="plans" element={<Plans/>}/>
        <Route path="update-plan/:id" element={<UpdatePlan/>}/>
        <Route path="gig-list" element={<GigsList/>}/>
        <Route path="add-gigs" element={<AddGig/>}/>
        <Route path="update-gigs/:id" element={<UpdateGig/>}/>
        <Route path="order" element={<OrderList/>}/>
        <Route path="settings" element={<Settings/>}/>
      </Route>    
    </Routes>
  )
}

export default AppRoute