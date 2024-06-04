import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../../pages/Login";
import Routers from "../../routers/Routers";
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});


const Layout = () => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('toi dang o Layout')
    console.log(searchTerm)
  };
  const isLoginPage = location.pathname === "/login";
    return (
      
      <>
        {isLoginPage && (
          <div className="login_outside" style={{ width: '100vw', height: '100vh' }}>
            <Login />
          </div>
        )}
  
        {/* Sử dụng toán tử ba ngôi để kiểm tra điều kiện */}
        {isLoginPage ? null : (
          <Fragment>
            <Header onSearch={handleSearch} />
            <Routers searchTerm={searchTerm} />
            <Footer />
          </Fragment>
        )}
      </>
    );

  // }
};

export default Layout;
