import React, { Fragment, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from '../../context/AuthContext.jsx';
import useAxios from "../../utils/useAxios.js";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../../pages/Login";
import Routers from "../../routers/Routers";
import axios from 'axios';
import backgroundImage from './slider-2.jpg'; 
import ChatPopup from "../UI/ChatPopup.jsx";
import AdminPage from "../../../admin/AdminPage.jsx";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const Layout = () => {
  const location = useLocation();
  const { logined } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("accounts/test/");
        setCurrentUser(true);
      } catch (error) {
        setCurrentUser(false);
        console.error('Có lỗi xảy ra khi truy cập dữ liệu:', error);
      }
    };
    fetchUser();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return <AdminPage />;
  }

  return (
    <>
      {isLoginPage ? (
        <div
          className="login_outside"
          style={{
            width: '100vw',
            height: '100vh',
            background: `linear-gradient(rgba(0, 13, 107, 0.5), rgba(0, 13, 107, 0.5)), url("${backgroundImage}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Login />
        </div>
      ) : (
        <Fragment>
          <Header onSearch={handleSearch} />
          <Routers searchTerm={searchTerm} />
          <ChatPopup />
          <Footer />
        </Fragment>
      )}
    </>
  );
};

export default Layout;
