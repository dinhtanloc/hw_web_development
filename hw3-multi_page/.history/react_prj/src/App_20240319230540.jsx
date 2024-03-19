import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import HomePage from './HomePage'; // Import trang chủ từ nơi phù hợp
import LoginPage from './login/LoginPage'; // Import trang đăng nhập từ ./login/LoginPage
import Home from './home/Home'; // Import trang
import MyProfile from './my-profile/MyProfile';
import Password from './my-profile/password/password';

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="my-profile/password" element={<Password />} />
      </Routes>
    </>
  );
}

export default App;
