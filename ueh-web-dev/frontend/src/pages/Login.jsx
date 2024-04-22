import React, { useState } from 'react';
import "../styles/login.css";
import axios from 'axios'
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});

const Login = () => {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  useEffect(() => {
    client.get("/accounts/user/")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/accounts/register/",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "/accounts/login/",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/accounts/login/",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/accounts/logout/",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  // Tạo một biến để lưu trạng thái "right-panel-active"
  const containerClassName = isSignUpActive ? 'container_title right-panel-active' : 'container_title';
  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
        </div>
    );
  }
  return (
    <>
      <div className={containerClassName}>
      {/* // To sign up */}
        <div className="form-container sign-up-container">
          <form className='form_title' onSubmit={e => submitRegistration(e)}>
            <h1 className="h1_title">Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
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
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
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
              <p className='p_title'>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1_title">Hello, Friend!</h1>
              <p className='p_title'>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      <footer className='footer_title'>
        <p className='p_title'>
          Created with <i className="fa fa-heart"></i> by
          <a className="a_title" target="_blank" href="https://florin-pop.com">Florin Pop</a>
          - Read how I created this and how you can join the challenge
          <a className="a_title" target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
        </p>
      </footer>
    </>
  );
};

export default Login;
