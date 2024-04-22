import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../../pages/Login";
import Routers from "../../routers/Routers";

const Layout = () => {
  const location = useLocation();

  // Kiểm tra xem URL hiện tại có phải là trang login không
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
          {/* <Routers /> */}
          {/* <Footer /> */}
        </Fragment>
      )}
    </>
  );
};

export default Layout;
