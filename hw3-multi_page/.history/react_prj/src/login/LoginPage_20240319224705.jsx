// src/login/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Xử lý logic đăng nhập ở đây
        if (username=='lambtvn' && password=='123456'){
          navigate('/');

        }
        return 0;
        
        // Nếu đăng nhập thành công, chuyển hướng sang trang /home
      };
  return (
    <>
    <div>
        <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
    </div>

    </>
  );
};

export default LoginPage;


