import React, { useState } from 'react';
import "../styles/login.css";
import { callAPI } from "../utils/api-caller";
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  // const handleLogin = () => {
  //   // Xử lý logic đăng nhập ở đây
  //   console.log(`Email: ${email}, Password: ${password}`);
  // };
  // const URL_SERVER = 'http://localhost:8000';

  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      setRegistrationToggle(false);
    } else {
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "/api/login",
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
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }
// to log out from our account
  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // const response = await callAPI('/accounts/login/', 'POST', {
  //     //   email: email,
  //     //   password: password
  //     // });
  //     const response = await axios.post(`${URL_SERVER}/accounts/login/`, {
  //       email: email,
  //       password: password
  //     });
  //     console.log('bibi'); // Thực hiện xử lý dữ liệu trả về từ API
  //     console.log(response.data); // Thực hiện xử lý dữ liệu trả về từ API

  //     // Reset form fields
  //     setEmail('');
  //     setPassword('');
  //     setError('');
  //   } catch (error) {
  //     console.error(error); // Xử lý lỗi nếu có
  //     setError('Invalid credentials');
  //   }
  // };

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
