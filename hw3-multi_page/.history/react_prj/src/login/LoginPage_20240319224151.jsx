// src/login/LoginPage.js
import React from 'react';

const LoginPage = () => {
  return (
    <>
    <div>
        <h2>Login</h2>
              <div>
                  <label>Username: </label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div>
                  <label>Password: </label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit">Login</button>
    </div>

    </>
  );
};

export default LoginPage;


