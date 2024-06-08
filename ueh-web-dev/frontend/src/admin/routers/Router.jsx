import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboardpage";
import Teampage from "../pages/Teampage";
import Invoicespage from "../pages/Invoicespage";
import ProductPage from "../pages/Productpage";
import Bar from "../pages/Barpage";
import Form from "../pages/Formpage";
import Line from "../pages/Linepage";
import Pie from "../pages/Piepage";
import FAQ from "../pages/Faqpage";
import Geography from "../pages/Geographypage";
import Calendar from "../pages/Calendarpage";
import Addproduct from "../pages/Addproduct";
import OrderDashboard from "../pages/OrderDashboard";
import ProductDashboard from "../pages/ProductDashboard";
import StaffDashboard from "../pages/StaffDashboard";
const Routers = () => {
    return (
      <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/team" element={<Teampage />} />
              <Route path="/admin/products" element={<ProductPage />} />
              <Route path="/admin/create-products" element={<Addproduct />} />
              <Route path="/admin/orders" element={<Invoicespage />} />
              <Route path="/admin/order-dashboard" element={<OrderDashboard />} />
              <Route path="/admin/product-dashboard" element={<ProductDashboard />} />
              <Route path="/admin/staff-dashboard" element={<StaffDashboard />} />
              <Route path="/admin/form" element={<Form />} />
              <Route path="/admin/bar" element={<Bar />} />
              <Route path="/admin/pie" element={<Pie />} />
              <Route path="/admin/line" element={<Line />} />
              <Route path="/admin/faq" element={<FAQ />} />
              <Route path="/admin/calendar" element={<Calendar />} />
              <Route path="/admin/geography" element={<Geography />} />
      </Routes>
    );
  };
  
  export default Routers;