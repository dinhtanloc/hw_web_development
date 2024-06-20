import React, { useRef, useContext, useState,useEffect } from "react";
import { jwtDecode }  from "jwt-decode";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import AuthContext from '../../context/AuthContext.jsx'
import useAxios from "../../utils/useAxios"
import  AuthLoginContext  from "../../context/AuthLoginContext.jsx";



const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];


const Header = ({ onSearch }) => {
  const {user, logoutUser} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();
  const { setShowLogin } = useContext(AuthLoginContext);

  const [nameuser, setName] = useState('');
  const [img,setImage]=useState('');
  const [searchTerm, setSearchTerm] = useState("");

  const api = useAxios();


  const token = localStorage.getItem("authTokens")

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };


  if (token){
    const decoded = jwtDecode(token) 
    var user_id = decoded.user_id
  }


  const handleLogout = e => {
    e.preventDefault()
    
    setCurrentUser(false)
    logoutUser()

  
  }

  const handleLogin= () =>{
    setShowLogin(false)
  }

  const handleRegister = () =>{
    setShowLogin(true)
  }

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("accounts/test/");
        setCurrentUser(true);
        // console.log(res.data)
        const name_login = res.data.response.username;
        // console.log(name_login);
        setName(name_login)
      } catch (error) {
        setCurrentUser(false);
        console.error('Có lỗi xảy ra khi truy cập dữ liệu:', error);

      }
    };

    const fetchProfile = async () => {
      try {
        const res = await api.get("accounts/profile/");
        setCurrentUser(true);
        const profile = res.data;
        var imgUrl = profile.image
        // console.log(imgUrl);
        setImage(imgUrl)
        // setName(profile)
      } catch (error) {
        setCurrentUser(false);
        console.error('Có lỗi xảy ra khi truy cập dữ liệu:', error);

      }
    };

    fetchUser();
    fetchProfile();
  }, []);


  const menuRef = useRef(null);
  // import img from './default.jpg'

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +84-938-922-810
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
              <Link to="/confirmation" className="d-flex align-items-center gap-1">
                <i className="ri-shopping-cart-line"></i> Order
              </Link>
              {currentUser ? (
                  <>
                    {/* <span>Welcome, {currentUser.name}</span> */}
                    {/* <span>{nameuser}</span> */}
                    
                    <Link to="/profile" className=" d-flex align-items-center gap-1">
                      <img src={img} style ={{width:'20px',height:'20px', marginBottom:'2px'}} alt="Default Image" ></img>
                      <span>{nameuser}</span>
                    </Link>
                    <Link to="#" className=" d-flex align-items-center gap-1" onClick={handleLogout}>
                      <i className="ri-login-circle-line"></i> Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className=" d-flex align-items-center gap-1" onClick={handleLogin}>
                      <i className="ri-login-circle-line"></i> Login
                    </Link>

                    <Link to="/register" className=" d-flex align-items-center gap-1" onClick={handleRegister}>
                      <i className="ri-user-line"></i> Register
                    </Link>
                  </>
                )}




                {/* <Link to="/login" className=" d-flex align-items-center gap-1">
                  <i className="ri-login-circle-line"></i> Login
                </Link>

                <Link to="#" className=" d-flex align-items-center gap-1">
                  <i className="ri-user-line"></i> Register
                </Link> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>
                    Auto dealership <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Vietnam</h4>
                  <h6>Ho Chi Minh city, Vietnam</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Monday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input 
                type="text" 
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                 />
                <button onClick={handleSearchSubmit}>
                  <i className="ri-search-line"></i>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
