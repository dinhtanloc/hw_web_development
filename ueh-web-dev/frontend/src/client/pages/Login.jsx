import React, { useState, useContext } from 'react';
import "../styles/login.css";
import axios from 'axios'
import { jwtDecode }  from "jwt-decode";
import AuthContext from '../context/AuthContext'
import  AuthLoginContext  from '../context/AuthLoginContext';
import useAxios from "../utils/useAxios"

import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;


const Login = () => {
  const {loginUser} = useContext(AuthContext);
  const { registerUser } = useContext(AuthContext);
  const {user, logoutUser} = useContext(AuthContext);
  const { showLogin } = useContext(AuthLoginContext);
  const [isSignUpActive, setIsSignUpActive] = useState(!showLogin);


  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          setIsSignUpActive(showLogin);
        }, 100); // Delay một chút để đảm bảo hiệu ứng hoạt động
    }, []);
  

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

 
  function submitRegistration(e) {
    e.preventDefault()
    registerUser(email, username, password)
    setIsSignUpActive(false);

  }

  function submitLogin(e) {
    e.preventDefault()
    // const email = e.target.email.value
    // const password = e.target.password.value

    email.length > 0 && loginUser(email, password)
    setCurrentUser(true)
   

  
  }


  // Tạo một biến để lưu trạng thái "right-panel-active"
  const containerClassName = isSignUpActive ? 'container_title right-panel-active' : 'container_title';
  return (
    <>
      <div className={containerClassName}>
      {/* // To sign up */}
        <div className="form-container sign-up-container">
          <form className='form_title' onSubmit={e => submitRegistration(e)}>
            <h1 className="h1_title">Create Account</h1>
            <div className="social-container">
            <a href="#" className="social">
                {/* <i className="fab fa-facebook-f"></i> */}
                <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            </div>
            <span className="span_title">or use your email for registration</span>
            <input className='input_title' type="text" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)} />
            <input className='input_title' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className='input_title' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className='Angel' onClick={handleSignUpClick}>Sign Up</button>
          </form>
        </div>

        {/* form signin */}
        <div className="form-container sign-in-container">
          <form className='form_title' action="#" onSubmit={e => submitLogin(e)}>
            <h1 className="h1_title">Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                {/* <i className="fab fa-facebook-f"></i> */}
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <span className="span_title">or use your account</span>
            <input className='input_title'  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='input_title' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a className="a_title" href="#">Forgot your password?</a>
            <button className='Angel' onClick={handleSignInClick}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1_title">Welcome Back!</h1>
              <p className='p_title'>To inform newest products please login to join with us</p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1_title">Welcom to Car Retailer!</h1>
              <p className='p_title'>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      <footer className='footer_title'>
        <p className='p_title'>
          Created with <i className="fa fa-heart"></i> by
          <a className="a_title" target="_blank" href="https://www.facebook.com/profile.php?id=100010680972124"> Loc Dinh </a>
          - Read how I created this and give me ten points in Web programming subject
          {/* <a className="a_title" target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>. */}
        </p>
      </footer>
    </>
  );
};

export default Login;
