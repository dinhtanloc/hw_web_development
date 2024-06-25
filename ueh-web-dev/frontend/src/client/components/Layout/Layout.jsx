import React, { Fragment, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from '../../context/AuthContext.jsx'
import useAxios from "../../utils/useAxios.js";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../../pages/Login";
import Routers from "../../routers/Routers";
import axios from 'axios'
import backgroundImage from './slider-2.jpg'; // Đảm bảo đường dẫn này đúng
import ChatPopup from "../UI/ChatPopup.jsx";
import AdminPage from "../../../admin/AdminPage.jsx";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});


const Layout = () => {
  const location = useLocation();
  const {logined} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const api = useAxios()

  
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
  const isAdminPage =location.pathname === "/admin"


    return (
      
      <>
      {!isAdminPage ? (
        <>

        {isLoginPage && (
          <div className="login_outside" style={{ 
            width: '100vw', 
            height: '100vh',
            background: `linear-gradient(rgba(0, 13, 107, 0.5), rgba(0, 13, 107, 0.5)), url("${backgroundImage}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
             }}>
            <Login />
          </div>
        )}
  
        {/* Sử dụng toán tử ba ngôi để kiểm tra điều kiện */}
        {isLoginPage ? null : (
          <Fragment>
            <Header onSearch={handleSearch} />
            <Routers searchTerm={searchTerm} />
        
            <ChatPopup/>
            <Footer />
          </Fragment>
        )}
        {/* {isLoginPage && (
          <div className="login_outside" style={{ 
            width: '100vw', 
            height: '100vh',
            background: `linear-gradient(rgba(0, 13, 107, 0.5), rgba(0, 13, 107, 0.5)), url("${backgroundImage}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
             }}>
            <Login />
          </div>
        )} */}
  
        {/* Sử dụng toán tử ba ngôi để kiểm tra điều kiện */}
        
        </>

      ):(
        <AdminPage/>
      )}
        
      </>
    );

  // }
};

export default Layout;