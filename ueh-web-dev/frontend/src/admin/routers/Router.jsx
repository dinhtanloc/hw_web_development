import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboardpage";
import Team from "../pages/Teampage";
import Invoices from "../pages/Invoicespage";
import Contacts from "../pages/Contactpage";
import Bar from "../pages/Barpage";
import Form from "../pages/Formpage";
import Line from "../pages/Linepage";
import Pie from "../pages/Piepage";
import FAQ from "../pages/Faqpage";
import Geography from "../pages/Geographypage";
import Calendar from "../pages/Calendarpage";

const Routers = () => {
    return (
      <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
      </Routes>
    );
  };
  
  export default Routers;