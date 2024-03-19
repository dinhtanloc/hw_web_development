// src/login/LoginPage.js
import React from 'react';

const LoginPage = () => {
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


