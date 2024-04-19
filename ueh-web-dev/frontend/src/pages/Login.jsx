import React, { useState } from 'react';
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    console.log(`Email: ${email}, Password: ${password}`);
  };

  // Tạo một biến để lưu trạng thái "right-panel-active"
  const containerClassName = isSignUpActive ? 'container_title right-panel-active' : 'container_title';

  return (
    <>
      <div className={containerClassName}>
        <div className="form-container sign-up-container">
          <form className='form_title' action="#">
            <h1 className="h1_title">Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="span_title">or use your email for registration</span>
            <input className='input_title' type="text" placeholder="Name" />
            <input className='input_title' type="email" placeholder="Email" />
            <input className='input_title' type="password" placeholder="Password" />
            <button className='Angel' onClick={handleSignUpClick}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className='form_title' action="#">
            <h1 className="h1_title">Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="span_title">or use your account</span>
            <input className='input_title' type="email" placeholder="Email" />
            <input className='input_title' type="password" placeholder="Password" />
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
