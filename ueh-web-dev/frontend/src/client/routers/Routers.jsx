import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import PrivateRoute from "../utils/PrivateRoute";
import Confirmation from "../pages/Confirmation";
import OrderDetails from "../pages/OrderDetails";
import Dashboard from "../../admin/pages/Dashboardpage";
import LoadingPage from "../components/UI/LoadingComponent";

const Routers = ({ searchTerm }) => {
      const [isLoading, setIsLoading] = useState(true);
      const location = useLocation();

      useEffect(() => {
            setIsLoading(true);
        
            const timer = setTimeout(() => {
              setIsLoading(false);
            }, 1000); // Giả lập thời gian tải trang
        
            return () => clearTimeout(timer);
          }, [location]);
        
          if (isLoading) {
            return <LoadingPage />;
          }
        
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/register" element={<Login />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/login" element={<Login />} />
      {/* <PrivateRoute path='/profile/' element = {<Profile />}/> */}
      {/* <Route path="/profile/" element={<Profile />} /> */}
      <Route exact path='/profile/' element={<PrivateRoute/>}>
            <Route exact path='/profile/' element={<Profile/>}/>
      </Route>
      <Route exact path='/profile/edit/' element={<PrivateRoute/>}>
            <Route exact path='/profile/edit/' element={<EditProfile/>}/>
      </Route>
      {/* <Route path="/profile/edit/" element={<EditProfile />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing searchTerm={searchTerm} />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog searchTerm={searchTerm} />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      {/* <Route path="/confirmation" element={<Confirmation />} /> */}
      <Route exact path='/confirmation' element={<PrivateRoute/>}>
            <Route exact path='/confirmation' element={<Confirmation/>}/>
      </Route>
      <Route exact path='/confirmation/:orderId' element={<PrivateRoute/>}>
            <Route exact path='/confirmation/:orderId' element={<OrderDetails/>}/>
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
