import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import HomePage from './HomePage'; // Import trang chủ từ nơi phù hợp
import LoginPage from './login/LoginPage'; // Import trang đăng nhập từ ./login/LoginPage

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
