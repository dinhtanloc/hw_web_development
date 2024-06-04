import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

// Import các thành phần của client và admin
import Clientpage from './client/Clientpage';
import AdminPage from './admin/AdminPage';
// import Routers from './client/routers/Routers';
// import Home from './client/pages/Home';
import Home from "./client/pages/Home";
import About from "./client/pages/About";
import CarListing from "./client/pages/CarListing";
import CarDetails from "./client/pages/CarDetails";
import Blog from "./client/pages/Blog";
import BlogDetails from "./client/pages/BlogDetails";
import NotFound from "./client/pages/NotFound";
import Contact from "./client/pages/Contact";
import Login from "./client/pages/Login";
import Profile from "./client/pages/Profile";
import EditProfile from "./client/pages/EditProfile";
import Confirmation from "./client/pages/Confirmation";
import PrivateRoute from './client/utils/PrivateRoute';
import OrderDetails from "./client/pages/OrderDetails";
import Dashboard from "./admin/pages/Dashboardpage";
import Team from "./admin/pages/Teampage";
import Invoices from "./admin/pages/Invoicespage";
import Contacts from "./admin/pages/Contactpage";
import Bar from "./admin/pages/Barpage";
import Form from "./admin/pages/Formpage";
import Line from "./admin/pages/Linepage";
import Pie from "./admin/pages/Piepage";
import FAQ from "./admin/pages/Faqpage";
import Geography from "./admin/pages/Geographypage";
import Calendar from './admin/pages/Calendarpage';
const App = () => {
  return (
    <Routes>
      {/* Định nghĩa route cho client side */}
        <Route path="/" element={<Clientpage />}>
          <Route path="/" element={<Navigate to="/home" />} />
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
          <Route path="/cars" element={<CarListing/>} />
          <Route path="/cars/:slug" element={<CarDetails />} />
          <Route path="/blogs" element={<Blog/>} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          {/* <Route path="/confirmation" element={<Confirmation />} /> */}
          <Route exact path='/confirmation' element={<PrivateRoute/>}>
                <Route exact path='/confirmation' element={<Confirmation/>}/>
          </Route>
          <Route exact path='/confirmation/:slug' element={<PrivateRoute/>}>
                <Route exact path='/confirmation/:slug' element={<OrderDetails/>}/>
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
      
      </Route>

      <Route path="/admin" element={<AdminPage />}>
              <Route path="/admin" element={<Dashboard />} />
              {/* <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
       </Route>
      {/* Định nghĩa route cho admin side */}

      {/* Định nghĩa route mặc định, có thể chuyển hướng đến client hoặc trang chủ */}
      {/* <Route path="/" element={<Navigate to="/client" />} /> */}
    </Routes>
  );
};

export default App;
