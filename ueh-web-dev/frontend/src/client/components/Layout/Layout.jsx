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
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});


const Layout = () => {
  const location = useLocation();
  const {logined} = useContext(AuthContext);
  console.log('meomeo',logined)
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const api = useAxios()

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("accounts/test/");
        setCurrentUser(true);
        console.log(res.data)
        // console.log(name_login);
      } catch (error) {
        setCurrentUser(false);
        console.error('Có lỗi xảy ra khi truy cập dữ liệu:', error);

      }
    };
    fetchUser();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('toi dang o Layout')
    console.log(searchTerm)
  };
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";


    return (
      
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
            {/* {(logined || currentUser) ?  <Popup />:  <Popup />}
            {console.log('logined: ', logined)}
            {console.log('current' ,currentUser)} */}
            <ChatPopup/>
            <Footer />
          </Fragment>
        )}
      </>
    );

  // }
};

export default Layout;