import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboardpage";
import Team from "../pages/Teampage";
import Invoices from "../pages/Invoicespage";
import Contacts from "../pages/Productpage";
import Bar from "../pages/Barpage";
import Form from "../pages/Formpage";
import Line from "../pages/Linepage";
import Pie from "../pages/Piepage";
import FAQ from "../pages/Faqpage";
import Geography from "../pages/Geographypage";
import Calendar from "../pages/Calendarpage";
import Addproduct from "../pages/Addproduct";

const Routers = () => {
    return (
      <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/team" element={<Team />} />
              <Route path="/admin/products" element={<Contacts />} />
              <Route path="/admin/create-products" element={<Addproduct />} />
              <Route path="/admin/invoices" element={<Invoices />} />
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