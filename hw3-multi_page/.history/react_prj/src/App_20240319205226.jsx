import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './login/LoginPage'; // Import trang đăng nhập từ thư mục login
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Switch>

        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
     
    </>
  )
}

export default App
