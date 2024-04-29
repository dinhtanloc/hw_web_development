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

  
  // useEffect(() => {
  //   client.get("/accounts/user/")
  //   .then(function(res) {
  //     setCurrentUser(true);
  //     const user_login = res.data
  //   })
  //   .catch(function(error) {
  //     setCurrentUser(false);
  //   });
  // }, []);


  // Kiểm tra xem URL hiện tại có phải là trang login không
  if(currentUser){
    return(
      <Fragment>
      <Header currentUser={user_login} />
      <Routers />
      <Footer />
    </Fragment>

    )
  }
  else{
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
            <Header />
            <Routers />
            <Footer />
          </Fragment>
        )}
      </>
    );

  }
};

export default Layout;
